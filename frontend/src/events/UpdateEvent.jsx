import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../url";

function UpdateEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [updatedEvent, setUpdatedEvent] = useState({
    name: "",
    description: "",
    category: "",
    startTime: "",
    endTime: ""
  });
  const [error, setError] = useState(null);

  const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/events/${id}`, config);
        setEvent(data);
        setUpdatedEvent(data); // Set all fields from the fetched event
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateEvent = async () => {
    try {
      await axios.put(`${baseUrl}/api/events/${id}`, updatedEvent, config);
      navigate("/events"); // Redirect after successful update
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      {event && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Update Event</h2>

          <input
            type="text"
            name="name"
            value={updatedEvent.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            placeholder="Name"
          />
          <textarea
            name="description"
            value={updatedEvent.description}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            placeholder="Description"
          />
          <input
            type="text"
            name="category"
            value={updatedEvent.category}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            placeholder="Category"
          />
          <input
            type="datetime-local"
            name="startTime"
            value={updatedEvent.startTime}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            placeholder="Start Time"
          />
          <input
            type="datetime-local"
            name="endTime"
            value={updatedEvent.endTime}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            placeholder="End Time"
          />

          <button onClick={updateEvent} className="bg-blue-500 text-white p-2 rounded">
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default UpdateEvent;