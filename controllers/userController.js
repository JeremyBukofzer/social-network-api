const { User, Thought } = require("../models");
const { findOneAndUpdate } = require("../models/Thought");

module.exports = {
    getUser(req, res) {
        User.find({})
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate("thoughts")
            .populate("friends")
            .select("-_v")
            .then((user) =>
                !user
                    ? res.status(404)({ message: "No user with that ID" })
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

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No User with that ID" })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: "User and Thought have been deleted!" }))
            .catch((err) => res.status(500).json(err))
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404)({ message: "No user with that ID" })
                    : res.json(user))

            .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req, res) {
        User, findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then(
                (user) =>
                    !user
                        ? res.status(404)({ message: "No user with that ID" })
                        : res.json(user))
            .catch((err) => res.status(500).json(err))
    },

};