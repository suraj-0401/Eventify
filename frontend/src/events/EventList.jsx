import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../url";

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/events`);
        setEvents(res.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <Link
            key={event._id}
            to={`/events/${event._id}`}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <p className="text-gray-600">{event.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default EventList;
