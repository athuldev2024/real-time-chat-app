export const authenticate = (req, res) => {
  const {
    params: { code, id },
  } = req;

  return res.status(Number(code)).json({
    message: "success",
    id,
  });
};

export const authorize = (req, res, next) => {
  next();
};
