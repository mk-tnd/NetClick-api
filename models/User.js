module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: { type: DataTypes.STRING, allowNull: false },
      role: {
        type: DataTypes.ENUM({ values: ["admin", "user"] }),
        allowNull: false,
      },
      status: { type: DataTypes.ENUM({ values: ["active", "nonactive"] }) },
    },

    {
      tableName: "users",
      underscored: true
    }
  );
  User.associate = models => {
    User.hasMany(models.UserPackage,
      {
        foreignKey: {
          name: 'userId',
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      })
    User.hasMany(models.Profile,
      {
        foreignKey: {
          name: 'userId',
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      })
  }
  return User;
};
