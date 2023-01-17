const { User, Thought} = require("../models");

module.exports = {
    getUser(req, res) {
        User.find({})
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    getSingleUer(req, res) {
        User.findOne({ _id:  req.params.userId })
        .populate("thoughts")
        .populate("friends")
        .select("-_v")
        .then((user) =>
        !user
        ? res.status(404)({ message:"No user with that ID" })
        : res.json(user))

        .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err)
            return res.status(500).json(err);
        });
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) => 
        !user
        ? res.status(404).json({ message: "No User with that ID" })
        : res.json(user))

        .catch((err) => res.status(500).json(err));
    },
       
}