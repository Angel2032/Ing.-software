import User from "../models/user.js"; // Cambio "user" a "User" para que coincida con la importación
import bcrypt from "bcryptjs";
import { createError } from "./../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const pass = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      // Cambio "NewUser" a "newUser"
      username: req.body.username,
      email: req.body.email,
      password: pass,
    });
    const savedUser = await newUser.save(); // Cambio "NewUser" a "newUser"
    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "!Usuario no existe"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Datos de acceso incorrectos"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...other } = user._doc;

    res
      .cookie("acces_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...other }); // Cambio "savedUser" a "user"
  } catch (err) {
    next(err);
  }
};
