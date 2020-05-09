// middleware because there are multiple actions on the site that require user to be logged in
module.exports = (req, res, next) => {
  if (!req.user) return res.status(401).send({ error: 'Must be logged in. ' });

  next();
};
