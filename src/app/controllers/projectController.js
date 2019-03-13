const express = require ('express');
const router = express.Router();

const authMiddleware = require ('../middlewares/auth');

const { Project } = require ('../models');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    console.log(req.userId)
    res.status(200).send({ok:true, user : req.userId});
});

module.exports = app => app.use('/projects', router);