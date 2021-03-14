const express = require('express');

const router = express.Router();

const Messages = require('../../frontend/src/components/Messages');

router.get('/', (req, res) => {
    Messages.find({ })
        .then((data) => {
            //console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('Error: ', error);
        });
});

router.post('/save', (req, res) => {
    console.log('English: ', req.body);
    const data = req.body;

    const newMessage = new Messages(data);
    newMessage.save((error) => {
        if (error) {
            res.status(500).json({msg: 'Sorry internal server errors'});
            return;
        } 
        return res.json({
            //msg: 'Your data has been saved!'
        });
    });
});

router.delete('/deleteAll', (req, res) => {
    Messages.deleteMany({}, function (err) {
        if (err) {
            res.status(500).send({ error: "Could not clear database..." });
        } else {
            res.status(200).send({ message: "All info was deleted succesfully..." });
        }
    });
});

router.get('/name', (req, res) => {
    const data = {
        username: 'jim,',
        age: 31
    };
    res.json(data);
});

module.exports = router;