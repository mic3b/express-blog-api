import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.cookies.jwt;

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.body = {
      title: req.body.title,
      content: req.body.content,
      userId: verified.id,
    };
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
