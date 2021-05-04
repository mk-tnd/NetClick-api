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

    { tableName: "users", underscored: true }
  );
  return User;
};
