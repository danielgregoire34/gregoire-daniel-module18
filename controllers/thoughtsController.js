const { Thought, User } = require('../models');


const thoughtController = {

    getThought(req, res) {
        Thought.find({})
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    
    createThought(req, res) {
        Thought.create(req.body)
        .then((thoughtsData) => {
        return User.findOneAndUpdate(
                { _id: req.body.userid },
                { $push:{ thought: thoughtsData._id}},
                { new: true }
                )
        })
        .then(user => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    
    updateThought(req, res) {
        Thought.findOneAndUpdate(
        { _id: req.params.thoughtid },
        { $set: req.body },
        { runValidators: true, new: true }
        )
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'cannot update thought with this id!' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.id })
        .then((thoughtsData) =>
            !thoughtsData
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought));
    },
    
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtid })
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No such thought exists' })
            : Thought.findOneAndUpdate(
                { _id: req.params.thoughtid },
                { $pull: { thought: req.params.thoughtid } },
                { new: true }
                )
        )
        .then((thought) =>
            !thought
            ? res.status(404).json({
                message: 'Thought deleted, but no thoughts found',
                })
            : res.json({ message: 'Thought successfully deleted' })
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    
    addReaction(req, res) {
        console.log('You just added a reaction');
        console.log(req.body);
        Thought.findOneAndUpdate(
        { _id: req.params.thoughtid },
        { $addToSet: { reaction: req.body } },
        { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
            ? res
                .status(404)
                .json({ message: 'No reaction found with that ID :(' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
        { _id: req.params.thoughtid },
        { $pull: { reaction: { reactions: req.params.reactionsId } } },
        { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
            ? res
                .status(404)
                .json({ message: 'No reaction found with that ID :(' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    
    



};


module.exports = thoughtController;