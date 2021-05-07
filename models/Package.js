module.exports = (sequelize, DataTypes) => {
  const Package = sequelize.define(
    "Package",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      videoQuality: {
        type: DataTypes.ENUM({ values: ["welcome", "silver", "gold", "platinum"] }),
        allowNull: false
      },
      resolutions: {
        type: DataTypes.ENUM({ values: ["480p", "720p", "1080p", "1440p"] }),
        allowNull: false,
        unique: true
      },
      price: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      packageTime: {
        type: DataTypes.INTEGER,
        allowNull: false
      }


    },
    {
      tableName: 'packages',
      underscored: true,
      timestamps: false
    }
  );
  Package.asscoiate = models => {
    Package.hasMany(models.UserPackage,
      {
        foreignKey: {
          name: 'packageId',
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      })
  }
  return Package;
}