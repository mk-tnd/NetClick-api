module.exports = (sequelize, DataTypes) => {
  const Package = sequelize.define(
    "Package",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      videoQuality: {
        type: DataTypes.ENUM({values: ["welcome","silver","gold","platinum"]}),
        allowNull: false
      },
      resolutions: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }

      
    }
  );
  return Package;
}