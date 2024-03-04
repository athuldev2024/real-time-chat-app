export const authenticate = (req, res) => {
  const {
    params: { code },
  } = req;

  req.session.visited = true;

  return res.status(Number(code)).json({
    message: "success",
  });
};

export const authorize = (req, res, next) => {
  if (!req.session.id) {
    return res.sendStatus(401);
  }

  next();
};
