const Sequelize = require('sequelize');
const UserModel = require('./user');
const ProgressModel = require('./progress');
const ChallengeModel = require('./challenge');

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
    const Challenge = ChallengeModel(connection, Sequelize);

    Challenge.belongsTo(User);
    Progress.belongsTo(User);


    connection.sync({ alter: true });
    return {
        User,
        Progress,
        Challenge,
    };
};

module.exports = setupDatabase();