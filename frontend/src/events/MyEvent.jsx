import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../url";

function MyEvent() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch user events
  const fetchEvents = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/events/myevents`, config);
      setEvents(data);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setLoading(false);
    }
  };
    
  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.length !== 0 ? (
        events.map((event) => (
          <Link
            key={event._id}
            to={`/events/${event._id}`}  // Ensuring the event id is passed to the URL
            className="bg-white p-4 rounded shadow hover:shadow-lg transition duration-300"
          >
            <div className="bg-white p-4 rounded shadow hover:shadow-lg transition duration-300">
              <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
              <p className="text-gray-600">{event.description}</p>
              <div className="mt-4">
                <Link to={`/events/update/${event._id}`} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                  Update
                </Link>
                <Link to={`/events/delete/${event._id}`} className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </Link>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="text-center text-gray-500 text-lg col-span-3">No events found. Add an event.</div>
      )}
    </div>
  );
}

export default MyEvent;
