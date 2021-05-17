module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist',
    {
      playlistName: { type: DataTypes.STRING, allowNull: false },

    },
    {
      tableName: 'playlists',
      underscored: true,
      timestamps: false
    })
  Playlist.associate = models => {
    Playlist.belongsTo(models.Profile,
      {
        foreignKey:
        {
          name: 'profileId',
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      })
    Playlist.belongsTo(models.Video,
      {
        foreignKey: {
          name: 'videoId',
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      })
  }
  return Playlist
}