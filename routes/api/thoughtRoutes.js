const router = require('express').Router();

const {
    getThought,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../constrollers.thoughtController');

router.route('/')
.get(getThought)
.post(createThought);

router.route(':/thoughtId')
.get(getOneThought)
.put(updateThought)
.delete(deleteThought);

router.route('/:thoughtId/reactions')
.post(createReaction);

router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;