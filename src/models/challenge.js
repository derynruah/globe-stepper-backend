module.exports = (connection, DataTypes) => {
    const schema = {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        km: DataTypes.STRING
    };

    const ChallengeModel = connection.define('Challenge', schema);
    return ChallengeModel;
};