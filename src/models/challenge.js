module.exports = (connection, DataTypes) => {
    const schema = {
        imageUrl: { type: DataTypes.STRING, },
        title: { type: DataTypes.STRING, },
        distanceKM: { type: DataTypes.STRING, },
        distanceMi: { type: DataTypes.STRING, },
        description: { type: DataTypes.STRING, },
    };

    const ChallengeModel = connection.define('Challenge', schema);
    return ChallengeModel;
};