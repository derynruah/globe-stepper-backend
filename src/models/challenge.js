module.exports = (connection, DataTypes) => {
    const schema = {
        staticId: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Challenge needs a static Id.',
                },
            },
        },
        title: {
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Challenge needs a title.',
                },
            },
        },
        distanceKM: {
            type: DataTypes.INTERGER,
            allowNull: false, 
            validate: {
                notNull: {
                    args: true,
                    msg: 'Challenge needs a distance.',
                },
            },
        },
        description: {
            type: DataTypes.MEDIUMTEXT,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Challenge needs a description',
                },
            },
        },
    };

    const ChallengeModel = connection.define('Challenge', schema);
    return ChallengeModel;
};