const UploadModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "uploads",
    {
      profilename: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};

export default UploadModel;
