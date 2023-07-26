const router = require("express").Router();
const { User } = require('../../models');

//get user
router.get('/', (req, res) => {
    User.find()
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
});

//get user by id
router.get('/:id', (req, res) => {
    User.findOne({
        _id: req.params.id
    })
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'User Not found' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
});

//create user
router.post('/', (req, res) => {
    User.create(req.body)
        .then((userdata) => res.json(userdata))
        .catch((err) => res.status(500).json(err));
});

//update user by id
router.put('/:id', (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, body, { new: true })
        .then((userdata) => {
            if (!userdata) {
                res.status(404).json({ message: "User not found!" });
                return;
            }
            res.json(userdata);
        })
        .catch((err) => res.status(500).json(err));
});


//delete user
router.delete('/:id', (req, res) => {
    User.findOneAndDelete({ _id: req.params.id })
        .then((userdata) => {
            if (!userdata) {
                res.status(404).json({ message: "User not found!" });
                return;
            }
            res.json(userdata);
        })
        .catch((err) => res.status(500).json(err));
});


//add a friend to a particular user
router.post('/:id/friends/:friendsId', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { friends: req.params.friendsId } },
        { new: true }
    )
        .then((userdata) => res.json(userdata))
        .catch((err) => res.status(500).json(err));
});

//delete a friend to a particular user
router.delete('/:id/friends/:friendsId', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendsId } },
        { new: true }
    )
        .then((userdata) => {
            res.json(userdata);
        })
        .catch((err) => res.status(400).json(err));
});




module.exports = router;
