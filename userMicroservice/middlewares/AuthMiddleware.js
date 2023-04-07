const { verify } = require("jsonwebtoken");
const secret = "oSeRxVnEwc0e1DaHtzw7xvddolbDu08u"; //32 char secret

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    const validToken = verify(accessToken, secret);
    req.user = { validToken };
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
