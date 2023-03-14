module.exports = (connection, DataTypes) => {
    const schema = {
        distance: DataTypes.STRING
    };

    const ProgressModel = connection.define('Progress', schema);
    return ProgressModel;
};