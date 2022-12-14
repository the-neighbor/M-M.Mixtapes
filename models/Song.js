const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

class Song extends Model {}

Song.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false
        },
        album: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mixtape_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'mixtape',
                key: 'id'
            },
        },
    }, {
        sequelize,
        timestamps: true,
        modelName:"song"
    }
);

module.exports = Song;