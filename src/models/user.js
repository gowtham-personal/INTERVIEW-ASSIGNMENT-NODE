module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
      },
      host: {
        type: DataTypes.STRING,
        field: "host",
      },
      user: {
        type: DataTypes.STRING,
        field: "user",
      },
      api_token: {
        type: DataTypes.STRING,
        field: "api_token",
      },
      email: {
        type: DataTypes.STRING,
        field: "email",
      },
      password: {
        type: DataTypes.STRING,
        field: "password",
      },
      old_password: {
        type: DataTypes.STRING,
        field: "old_password",
      },
      log_ip: {
        type: DataTypes.STRING,
        field: "log_ip",
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      tableName: "users",
    }
  );
  return users;
};
