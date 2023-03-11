const { Thought, User } = require('../models');

const userController = {

getUser(req, res) {
    User.find()
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
},

createUser(req, res) {
    User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
},

updateUser(req, res) {
    User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { runValidators: true, new: true }
    )
    .then((user) =>
        !user
        ? res.status(404).json({ message: 'No user with this id!' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},

getOneUser(req, res) {
    User.findOne({ _id: req.params.id })
    .then((user) =>
        !user
        ? res.status(404).json({ message: 'No user with this id!' })
        : res.json(user));
},

deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.id })
    .then((user) =>
        !user
        ? res.status(404).json({ message: 'No such user exists' })
        : Thought.findOneAndUpdate(
            { user: req.params.id },
            { $pull: { user: req.params.id } },
            { new: true }
            )
    )
    .then((thought) =>
        !thought
        ? res.status(404).json({
            message: 'User deleted, but no thoughts found',
            })
        : res.json({ message: 'User successfully deleted' })
    )
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
},

addFriend(req, res) {
    console.log('You just added a friend');
    console.log(req.body);
    User.findOneAndUpdate(
    { _id: req.params.id },
    { $addToSet: { thought: req.body } },
    { runValidators: true, new: true }
    )
    .then((user) =>
        !user
        ? res
            .status(404)
            .json({ message: 'No friends found with that ID :(' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},

removeFriend(req, res) {
    User.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { friend: { friends: req.params.friendId } } },
    { runValidators: true, new: true }
    )
    .then((user) =>
        !user
        ? res
            .status(404)
            .json({ message: 'No student found with that ID :(' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},


};

module.exports = userController;






