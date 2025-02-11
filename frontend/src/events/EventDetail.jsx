import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../url";
import { io } from "socket.io-client";

const socket = io(baseUrl);

function EventDetail() {
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joinError, setJoinError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/events/${id}`);
        setEvent(res.data);
        setAttendees(res.data.attendees || []);
      } catch (err) {
        setError("Failed to load event details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();

    // ✅ Listen for real-time attendee updates
    socket.emit("joinEvent", id);
    socket.on("updateAttendees", () => {
      fetchEvent(); // Refresh event data when a new attendee joins
    });

    return () => {
      socket.off("updateAttendees"); // ✅ Cleanup listener on unmount
    };
  }, [id]);

  const joinEventHandle = async () => {
    try {
      setJoinError(null);
      setSuccessMessage(null);

      const token = localStorage.getItem("authToken");

      if (!token) {
        setJoinError("Authentication required. Please log in.");
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post(`${baseUrl}/api/events/${id}/join`, {}, config);
      setSuccessMessage(res.data.message || "You have successfully joined the event!");
    } catch (err) {
      setJoinError(err.response?.data?.message || "Failed to join the event.");
    }
  };

  // ✅ Format Date Function
  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!event) return <div>Event not found!</div>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">{event.name}</h2>

      {/* ✅ Display Creator's Name */}
      <p className="mb-2"><strong>Organizer:</strong> {event.creator?.name || "Unknown"}</p>
      
      <p className="mb-2"><strong>Category:</strong> {event.category}</p>
      <p className="mb-4"><strong>Description:</strong> {event.description}</p>
      <p className="mb-4"><strong>Start Time:</strong> {event.startTime ? formatDateTime(event.startTime) : "Unknown"}</p>
      <p className="mb-4"><strong>End Time:</strong> {event.endTime ? formatDateTime(event.endTime) : "Unknown"}</p>

      {/* Sessions List */}
      <div className="mb-4">
        <strong>Sessions:</strong>
        {event.sessions && event.sessions.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {event.sessions.map((session) => (
              <li key={session.id} className="p-4 border rounded bg-gray-100">
                <h3 className="text-lg font-semibold">{session.name}</h3>
                <p className="text-gray-500"><strong>Category:</strong> {session.category}</p>
                <p className="text-gray-600"><strong>Description:</strong> {session.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No sessions available.</p>
        )}
      </div>

      {/* Attendees List */}
      <div className="mb-4">
        <strong>Attendees:</strong>
        {attendees.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {attendees.map((attendee, index) => (
              <li key={index} className="p-2 border rounded bg-gray-100">{attendee}</li>
            ))}
          </ul>
        ) : (
          <p>No attendees yet.</p>
        )}
      </div>

      {/* Join Event Button */}
      <button
        onClick={joinEventHandle}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Join Event
      </button>

      {/* Join Event Status Messages */}
      {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
      {joinError && <p className="text-red-600 mt-2">{joinError}</p>}
    </div>
  );
}

export default EventDetail;