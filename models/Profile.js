module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profile",
    {
      profileName: { type: DataTypes.STRING, allowNull: false, unique: true },
      profilePicture: { type: DataTypes.STRING, validate: { isURL: true } },
      profileType: { type: DataTypes.ENUM({ values: ["Adult", "Child"] }) }
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
        onDlelete: 'RESTRICT',
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