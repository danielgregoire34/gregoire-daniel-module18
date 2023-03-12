const router = require('express').Router();
const {
getUser,
createUser,
updateUser,
getOneUser,
deleteUser,
addFriend,
removeFriend
} = require('../../controllers/userController');

router.route('/').get(getUser).post(createUser);

router.route('/:userid').put(updateUser).get(getOneUser).delete(deleteUser);

router.route('/:id/:id/friends/:friendId').post(addFriend);

router.route('/:id/friends/:friendId').delete(removeFriend);

module.exports = router;