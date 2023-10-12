import jwt from "jsonwebtoken";
import { createError } from "./../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.acces_token;
  if (!token) {
    return next(createError(401, "usted no se ha auntenticado"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(401, "token no valido"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(
        createError(403, "no esta autorizado para realizar esta solicitud!!")
      );
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(
        createError(403, "no esta autorizado para realizar esta solicitud!!")
      );
    }
  });
};
