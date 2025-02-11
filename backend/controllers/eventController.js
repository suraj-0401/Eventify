import asyncHandler from "express-async-handler";
import Event from "../models/eventModel.js";

// @desc    Create a new event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const  { name, description, startTime,endTime, category } = req.body
  const newEvent = new Event({
    name,
    category,
    description,
    startTime,
    endTime,
    creator: req.user._id,
  })

  await newEvent.save()
  res.status(201).json(newEvent)
});

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({});
  res.json(events);
});


const getMyEvents = asyncHandler(async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const userId = req.user._id;

  try {
    const events = await Event.find({ creator: userId }).populate("creator", "name email");

    if (!events.length) {
      return res.status(404).json({ message: "No events found for this user" });
    }

    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Error fetching events" });
  }
});



// @desc    Get an event by ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id).populate("creator", "name");
  if (event) {
    res.json(event);
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

const getCategoryEvent = asyncHandler(async (req, res) => {
  try {
    const { category, startTime } = req.query;
    let queryArray = [];

    // If category is provided, add category filter to the query array
    if (category) {
      queryArray.push({ category: category });
    }

    // If startTime is provided, filter by 'startTime'
    if (startTime) {
      const startDate = new Date(startTime); // Convert the date string to a Date object
      if (isNaN(startDate)) {
        return res.status(400).json({ message: "Invalid date format" });
      }

      // Set the start and end of the day for filtering
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(startDate);
      endDate.setHours(23, 59, 59, 999);

      queryArray.push({ startTime: { $gte: startDate, $lte: endDate } });
    }

    // Construct query object using '$or' if both filters are provided
    let queryObject = queryArray.length > 0 ? { $or: queryArray } : {};

    // Fetch events based on the queryObject
    const particularEvent = await Event.find(queryObject);

    // Return events if found
    if (particularEvent.length > 0) {
      res.json(particularEvent);
    } else {
      res.status(404).json({ message: "No events found matching the filter" });
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ msg: "Server error" });
  }
});




// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    event.name = req.body.name || event.name;
    event.category = req.body.category || event.category;
    event.description = req.body.description || event.description;
    event.startTime = req.body.startTime || event.startTime;
    event.endTime = req.body.endTime || event.endTime;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin

const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  // Use 'creator' instead of 'user'
  if (event.creator.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("You can only delete your own events");
  }

  await Event.deleteOne({ _id: req.params.id });

  res.json({ message: "Event removed" });
});


const joinEvent = async (req, res) => {
  try {
    const userId = req.user.id; 
    const eventId = req.params.id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    // ✅ Prevent duplicate joins
    if (event.attendees.includes(userId)) {
      return res.status(400).json({ message: "You have already joined this event." });
    }

    // ✅ Add the user to the attendees list
    event.attendees.push(userId);
    await event.save();

    res.json({ message: "Successfully joined the event!", attendees: event.attendees });
  } catch (error) {
    res.status(500).json({ message: "Failed to join the event.", error: error.message });
  }
};

export { createEvent, getEvents, getEventById, getCategoryEvent, getMyEvents, updateEvent, deleteEvent,joinEvent };
