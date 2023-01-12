const { Schema, model } = require('mongoose');

const userSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type:String,
            unique: true,
            required: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/] 
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }],
        friends: [{
            type:Schema.Types.ObjectId,
            ref: 'Users',
        }]

    },
    {
        toJSON: {
            virtuals: true, 
            getters: true,
        },
        id: false
    }
)

const Users = model('Users', userSchema);

module.exports = Users