const router = require('express').Router();

const {
    getUser,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend

} = require('../../controllers/userController');

router.route('/')
    .get(getUser)
    .post(createUser);

router.route('/:userId')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);

router.route('/:userID/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;