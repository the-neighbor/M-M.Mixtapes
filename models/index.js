const User = require('./User');
const Mixtape = require('./Mixtape');
const Song = require('./Song');

User.hasMany (Mixtape, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
    });

Mixtape.belongsTo(User, {
    foreignKey: 'user_id'
});

Mixtape.hasMany(Song, {
    foreignKey: 'mixtape_id',
    onDelete: 'CASCADE'
});

Song.belongsTo(Mixtape, {
    foreignKey: 'mixtape_id'
});

module.exports = { User, Mixtape, Song };