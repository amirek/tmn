var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.get('/classes', getClasses);
router.get('/classes/:id', getClass);
router.put('/classes/:id', putClass);
router.post('/classes', postClass);
router.delete('/classes/:id', deleteClass);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

function getUsers(req, res, next) {
    res.status(200).send(data.users);
}

function getUser(req, res, next) {
    var id = +req.params.id;
    var user = data.users.filter(function (p) {
        return p.Id === id;
    })[0];

    if (user) {
        res.status(200).send(user);
    } else {
        four0four.send404(req, res, 'user ' + id + ' not found');
    }
}

function getClasses(req, res, next) {
    res.status(200).send(data.classes);
}

function getClass(req, res, next) {
    var id = +req.params.id;
    var classes = data.classes.filter(function (p) {
        return p.Id === id;
    })[0];

    if (classes) {
        res.status(200).send(classes);
    } else {
        four0four.send404(req, res, 'class ' + id + ' not found');
    }
}

function putClass(req, res, next) {
    res.status(200).send(req.body);
}

function postClass(req, res, next) {
    var obj = req.body;
    obj.Id = Math.floor((Math.random() * 100000) + 10); //set a random Id
    res.status(200).send(obj);
}

function deleteClass(req, res, next) {
    res.status(200).send('');
}
