import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../url";

function CreateEvent() {
  const [name, setName] = useState("");
  const[startTime,setStartTime]=useState("");
  const[endTime,setEndTime]=useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Authentication token missing. Please log in again.");
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${baseUrl}/api/events`,
        {
          name,
          description,
          category,
          startTime,
          endTime
        },
        config
      );

      alert("Successfully created event");
      localStorage.setItem("eventId", data._id);
      navigate(`/events/${data._id}`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create event. Please try again."
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create New Event</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="category" className="block mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select Category</option>
            <option value="Cultural">Cultural</option>
            <option value="Sports">Sports</option>
            <option value="Music">Music</option>
            <option value="Educational">Educational</option>
            <option value="Corporate">Corporate</option>
            <option value="Charity">Charity</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Food & Drink">Food & Drink</option>
            <option value="Health & Wellness">Health & Wellness</option>
            <option value="Art">Art</option>
            <option value="Social">Social</option>
            <option value="Tech & Innovation">Tech & Innovation</option>
            <option value="Political">Political</option>
          </select>
        </div>

        <div>
          <label htmlFor="startTime" className="block mb-1">
            Start Time
          </label>
          <input
            type="datetime-local"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="endTime" className="block mb-1">
            End Time
          </label>
          <input
            type="datetime-local"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;
