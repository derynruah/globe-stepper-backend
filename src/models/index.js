const Sequelize = require('sequelize');
const UserModel = require('./user');
const ProgressModel = require('./progress');

const { PGDATABASE, PGUSER, PGPASSWORD, PGHOST, PGPORT } = process.env;

const setupDatabase = () => {
    const connection = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
        host: PGHOST,
        port: PGPORT, 
        dialect: 'postgres',
        logging: false,
    });

    const User = UserModel(connection, Sequelize);
    const Progress = ProgressModel(connection, Sequelize);


    connection.sync({ alter: true });
    return {
        User,
        Progress,
    };
};

module.exports = setupDatabase();