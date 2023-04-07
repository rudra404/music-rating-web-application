module.exports = (sequelize, DataTypes) => {
  const Passwords = sequelize.define("Passwords", {
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    iv: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Passwords;
};
