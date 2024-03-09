import { DataTypes } from "sequelize";
import { sequelize } from "../config/connection.js"

const book = sequelize.define('Book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ISBN: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default book;
