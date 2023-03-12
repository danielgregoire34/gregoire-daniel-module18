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

router.route('/:thoughtid/:reactions').post(addReaction);

router.route('/:thoughtid/reactions/:reactionId').delete(removeReaction);

module.exports = router;