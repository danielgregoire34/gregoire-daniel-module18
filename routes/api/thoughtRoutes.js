const router = require('express').Router();
const {
getThought,
createThought,
updateThought,
getOneThought,
deleteThought,
addReaction,
removeReaction
} = require('../../controllers/thoughtsController');

router.route('/').get(getThought).post(createThought);

router.route('/:thoughtid').put(updateThought).get(getOneThought).delete(deleteThought);

router.route('/:id/:id/reactions/:reactionId').post(addReaction);

router.route('/:id/reactions/:reactionId').delete(removeReaction);

module.exports = router;