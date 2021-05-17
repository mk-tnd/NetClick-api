module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profile",
    {
      profileName: { type: DataTypes.STRING, allowNull: false, unique: true },
      profilePicture: { type: DataTypes.STRING },
      profileType: { type: DataTypes.ENUM({ values: ["Adult", "Kids"] }), allowNull: false },
      profileStatus: { type: DataTypes.ENUM({ values: ["Actived", "Deleted"] }), allowNull: false }
    },

    {
      tableName: 'profiles',
      underscored: true,
      timestamps: false
    })
  Profile.associate = models => {
    Profile.belongsTo(models.User,
      {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      })
    Profile.hasMany(models.Playlist,
      {
        foreignKey: {
          name: 'profileId',
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      })
  }
  return Profile
}