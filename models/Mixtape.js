const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Mixtape extends Model {}

Mixtape.init(
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
        description: {
            type: DataTypes.STRING,
            defaultValue: "No description provided."
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            },
        },
    }, {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        modelName:"mixtape"
    }
);

module.exports = Mixtape;