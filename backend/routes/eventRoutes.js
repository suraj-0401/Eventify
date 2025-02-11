import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getMyEvents,
  getCategoryEvent,
  joinEvent,
} from "../controllers/eventController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

const eventRoutes = (io) => {
  router.route("/")
    .get(getEvents)
    .post(protect, admin, createEvent);

  router.route("/myevents")
    .get(protect, getMyEvents);

  router.route("/query")
    .get(getCategoryEvent);

  // ✅ Ensure `io` is passed to the joinEvent controller for real-time updates
  router.route("/:id/join")
    .post(protect, (req, res) => joinEvent(req, res, io));

  router.route("/:id")
    .get(getEventById)
    .put(protect, admin, updateEvent)
    .delete(protect, admin, deleteEvent);

  return router;
};

export default eventRoutes;
