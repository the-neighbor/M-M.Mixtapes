const router = require('express').Router();
const userRoutes = require('./user-routes');
const mixtapeRoutes = require('./mixtape-routes');
const songRoutes = require('./song-routes');

router.use('/users', userRoutes);
// router.use('/mixtapes', mixtapeRoutes);
// router.use('/songs', songRoutes);

module.exports = router;