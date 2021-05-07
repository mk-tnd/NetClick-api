module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video',
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      description: DataTypes.STRING
    },
    {
      tableName: 'videos', underscored: true
    })
  Video.associate = models => {
    Video.hasMany(models.Playlist,
      {
        foreignKey: {
          name: 'videoId',
          allowNull: false
        },
        onDlelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      })
    Video.belongsTo(models.Category,
      {
        foreignKey: {
          name: 'categoryId',
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      })
  }
  return Video
}