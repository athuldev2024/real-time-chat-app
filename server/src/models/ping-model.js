const PingModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "pings",
    {
      sender: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      receiver: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};

export default PingModel;
