import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifytoken.js";

const router = express.Router();
/*
router.get("/prueba", verifyToken, (req, res, next) => {
  res.send("Hola, estoy autenticado!");
});

router.get("/prueba/:id", verifyUser, (req, res, next) => {
  res.send("Hola, estoy autenticado Y PUEDO ELIMINAR!");
});

router.get("/admin/:id", verifyAdmin, (req, res, next) => {
  res.send("Hola ADMIN estoy autenticado Y PUEDE HACER TODAS LAS ACCIONES!");
});
*/

// Update
router.put("/:id", verifyUser, updateUser);

// Delete
router.delete("/:id", verifyUser, deleteUser);

// Get
router.get("/:id", verifyUser, getUser);

// Get ALL
router.get("/", verifyAdmin, getUsers);

export default router;
