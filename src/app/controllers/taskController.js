const express = require ('express');
const router = express.Router();

const authMiddleware = require ('../middlewares/auth');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    res.send ('ola');
});

module.exports = app => app.use('/products', router);