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
    Video.belongsTo(models.Playlist,
      {
        foreignKey: {
          name: 'playlistId',
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
        onDlelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      })
  }
  return Video
}