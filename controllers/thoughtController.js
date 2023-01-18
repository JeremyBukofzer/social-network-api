const { User, Thought } = require("../models");

module.exports = {

    getThought(req, res) {
        Thought.find({})
            .then((thought) => res.json(thougt))
            .catch((err) => res.status(500).json(err));
    },

    getOneThought(req, res) {
        Thought, findOne({ _id: req.params.thoughtId })
            .select("-_v")
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No Thought with that ID!" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No Thought with that ID!" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, New: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No Thought with that ID!" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoguthId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No Thought with that ID!" })
                    : res.findOneAndUpdate(
                        { thoughts: req.params.thoguthId },
                        { $pull: { thoughts: req.params.thoguthId } },
                        { new: true }
                    )
            )
            .then((user) =>
            !user
            ? res.status(404).json({ message: "Thought deleted" })
            : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoguthId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: "No thought with that ID!" })
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoguthId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: "No thought with that ID!" })
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
};