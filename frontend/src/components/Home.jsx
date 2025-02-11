import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../url";

function Home() {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([
    "select a category",
    "Cultural",
    "Sports",
    "Music",
    "Educational",
    "Corporate",
    "Entertainment",
    "Food & Drink",
    "Health & Wellness",
    "Arts",
    "Social",
    "Tech & Innovation",
    "Political",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("Select a category");
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date)
      ? "Invalid Date"
      : date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      let url = `${baseUrl}/api/events/query?`;
  
      // Append category filter to the URL if selected
      if (selectedCategory) {
        url += `category=${selectedCategory}`;
      }
  
      // Append startTime filter to the URL if selected
      if (selectedDate) {
        const formattedDate = selectedDate;  // Format date if needed
        url += `&startTime=${formattedDate}`;
      }
  
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          setEvents([]);
        }
      } catch (error) {
        setError("Error fetching events.");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchEvents();
  }, [selectedCategory, selectedDate]);
  
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white">Filters</h2>

          {/* Category Filter */}
          <div className="mb-6">
            <label className="block text-lg text-white mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 rounded-lg bg-white text-gray-700 border-2 border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >

              {/* Placeholder option */}
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div className="mb-6">
            <label className="block text-lg text-white mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-3 rounded-lg bg-white text-gray-700 border-2 border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
        </div>

        {/* Events Content */}
        <div className="col-span-2">
          <h2 className="text-2xl font-semibold mb-6 text-center text-blue-800">
            Upcoming Events
          </h2>

          {loading && (
            <p className="text-center text-lg text-gray-600">
              Loading events...
            </p>
          )}
          {error && <p className="text-center text-lg text-red-500">{error}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.length > 0 ? (
              events.map((event) => (
                <Link
                  key={event._id}
                  to={`/events/${event._id}`}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
                >
                  <h3 className="text-xl font-bold text-blue-600 mb-3">
                    {event.name}
                  </h3>
                  <p className="text-lg text-gray-600 mb-2">
                    <span className="font-semibold">Category:</span>{" "}
                    {event.category}
                  </p>
                  <p className="text-lg text-gray-600 mb-2">
                    <span className="font-semibold">Date:</span>{" "}
                    {event.startTime ? formatDate(event.startTime) : "Unknown"}
                  </p>
                  <p className="text-lg text-gray-700">{event.description}</p>
                </Link>
              ))
            ) : (
              <p className="text-center text-lg text-gray-600">
                No events found for this filter.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
