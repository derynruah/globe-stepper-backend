module.exports = (connection, DataTypes) => {
    const schema = {
        user: DataTypes.STRING,
        challengeId: DataTypes.STRING,
        distance: DataTypes.STRING
    };

    const ProgressModel = connection.define('Progress', schema);
    return ProgressModel;
};