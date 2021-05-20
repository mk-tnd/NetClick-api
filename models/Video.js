module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define(
    "Video",
    {
      thumbnail: { type: DataTypes.STRING, allowNull: false, unique: true },
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      vname: { type: DataTypes.STRING, allowNull: false, unique: true },
      description: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM({ values: ["Showing", "Deleted"] }),
        allowNull: false,
      },
    },
    {
      tableName: "videos",
      underscored: true,
    }
  );
  Video.associate = (models) => {
    Video.hasMany(models.Playlist, {
      foreignKey: {
        name: "videoId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    Video.belongsTo(models.Category, {
      foreignKey: {
        name: "categoryId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };
  return Video;
};
