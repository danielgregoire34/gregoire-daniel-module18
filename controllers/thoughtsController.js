const { Thought, User } = require('../models');


const thoughtController = {

    getThought(req, res) {
        Thought.find()
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    
    createThought(req, res) {
        Thought.create(req.body)
        .then((thoughtData) => {
        return User.findOneAndUpdate(
                { _id: req.body.id },
                { $push:{ thought:thoughtData._id}},
                { new: true }
                )
        })
        .then(userData => res.json(userData))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    
    updateThought(req, res) {
        Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.id })
        .then((thoughtData) =>
            !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thoughtData));
    },
    
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.id })
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No such thought exists' })
            : Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { thought: req.params.id } },
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
        { _id: req.params.id },
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
        { _id: req.params.id },
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