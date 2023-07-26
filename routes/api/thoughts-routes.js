const router = require("express").Router();
const { Thought } = require('../../models');

//get thoughts
router.get('/', (req, res) => {
    Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
});

//get thought by id
router.get('/:id', (req, res) => {
    Thought.findOne({
        _id: req.params.id
    })
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'Thought Not found' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
});

//create thought
router.post('/', (req, res) => {
    Thought.create(req.body)
        .then((userdata) => res.json(userdata))
        .catch((err) => res.status(500).json(err));
});

//update thought by id
router.put('/:id', (req, res) => {
    Thought.findOneAndUpdate({ _id: req.params.id }, body, { new: true })
        .then((userdata) => {
            if (!userdata) {
                res.status(404).json({ message: "Thought not found!" });
                return;
            }
            res.json(userdata);
        })
        .catch((err) => res.status(500).json(err));
});


//delete thought
router.delete('/:id', (req, res) => {
    Thought.findOneAndDelete({ _id: req.params.id })
        .then((userdata) => {
            if (!userdata) {
                res.status(404).json({ message: "Thought not found!" });
                return;
            }
            res.json(userdata);
        })
        .catch((err) => res.status(500).json(err));
});


//add reaction
router.post('/:thoughtId/reactions', (req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: body } },
        { new: true }
      )
        .then((dbdata) => {
          if (!dbdata) {
            res.status(404).json({ message: "Thought not found!" });
            return;
          }
          res.json(dbdata);
        })
        .catch((err) => res.json(err));
});

//delete reaction
router.delete('/:thoughtId/reactions/:reactionid', (req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionid } } },
        { new: true }
      )
        .then((dbdata) => res.json(dbdata))
        .catch((err) => res.json(err));
});



module.exports = router;
