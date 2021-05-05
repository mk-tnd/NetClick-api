module.exports = (sequelize, DataTypes) => {
  const UserPackage = sequelize.define("UserPackage",
    {},
    { tableName: 'userpackages', underscored: true })
  UserPackage.associate = models => {
    UserPackage.belongsTo(models.User,
      {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
        onDlelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      })
    UserPackage.belongsTo(models.Package,
      {
        foreignKey: {
          name: 'packageId',
          allowNull: false
        },
        onDlelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      })
  }
  return UserPackage
}