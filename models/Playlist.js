module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist',
    {
      playlistName: { type: DataTypes.STRING, allowNull: false }
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
        onDlelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      })
    Playlist.hasMany(models.Video,
      {
        foreignKey: {
          name: 'playlistId',
          allowNull: false
        },
        onDlelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      })
  }
  return Playlist
}