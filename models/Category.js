module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      tableName: "categories",
      timestamps: false,
      underscored: true,
    }
  );
  Category.associate = (models) => {
    Category.hasMany(models.Video, {
      foreignKey: {
        name: "categoryId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };
  return Category;
};
