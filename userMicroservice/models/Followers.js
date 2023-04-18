module.exports = (sequelize, DataTypes) => {
  const Followers = sequelize.define("Followers", {
    userID: {
      // person app user wants to follows uname
      type: DataTypes.STRING,
      allowNull: false,
    },
    followerID: {
      // app users uname
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Followers;
};
