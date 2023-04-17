module.exports = (sequelize, DataTypes) => {
  const Followers = sequelize.define("Followers", {
    user: {
      // person app user wants to follows uname
      type: DataTypes.STRING,
      allowNull: false,
    },
    follower: {
      // app users uname
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Followers;
};
