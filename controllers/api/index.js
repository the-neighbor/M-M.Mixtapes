const router = require('express').Router();
const userRoutes = require('./user-routes');
const mixtapeRoutes = require('./mixtape-routes');

router.use('/users', userRoutes);
router.use('/mixtapes', mixtapeRoutes);

module.exports = router;