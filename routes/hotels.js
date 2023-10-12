import express from "express";
import { createError } from "../utils/error.js";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifytoken.js";

const router = express.Router();

// Create a new hotel
router.post("/", verifyAdmin, createHotel);

// Update
router.put("/:id", verifyAdmin, updateHotel);

//Delete
router.delete("/:id", verifyAdmin, deleteHotel);

//Get
router.get("/:id", getHotel);

//Get ALL
router.get("/", getHotels);

export default router;
