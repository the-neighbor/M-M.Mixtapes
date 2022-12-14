const router = require('express').Router();
const { User, Mixtape, Song } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const mixtapeData = await Mixtape.findAll();
        const mixtapes = mixtapeData.map((mixtape) =>       
        mixtape.get({ plain: true })
        );
        res.json(mixtapes);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', withAuth, async (req, res) => {
    try {
        const mixtapeData = await Mixtape.findByPk(req.params.id, {
        include: [{ model: Song }],
        });
        const mixtape = mixtapeData.get({ plain: true });
        res.json(mixtape);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        
        const newMixtape = await Mixtape.create({
        ...req.body,
        user_id: req.session.user_id,
        });
        const id = newMixtape.id;
        let songs = req.body.songs;
        songs = songs.map((song) => {
            song.mixtape_id = id;
            return song;
        });
        const newSongs = await Song.bulkCreate(songs);
        const newMixtapeWithSongs = await Mixtape.findByPk(id, {
            include: [{ model: Song }],
        });
        res.status(200).json(newMixtapeWithSongs);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const mixtapeData = await Mixtape.destroy({
        where: {
            id: req.params.id,
            user_id: req.session.user_id,
        },
        });

        if (!mixtapeData) {
        res.status(404).json({ message: 'No mixtape found with this id!' });
        return;
        }

        res.status(200).json(mixtapeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const mixtapeData = await Mixtape.update(req.body, {
        where: {
            id: req.params.id,
            user_id: req.session.user_id,
        },
        });
        if (!mixtapeData) {
        res.status(404).json({ message: 'No mixtape found with this id!' });
        return;
        }
        const songData = await Song.destroy({
            where: {
                mixtape_id: req.params.id,
            },
            });
        let songs = req.body.songs;
        songs = songs.map((song) => {
            song.mixtape_id = req.params.id;
            return song;
        });
        const newSongs = await Song.bulkCreate(songs);
        const newMixtapeWithSongs = await Mixtape.findByPk(req.params.id, {
            include: [{ model: Song }],
        });
        res.status(200).json(newMixtapeWithSongs);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;