import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProviders } from "../services/apiHelper";

const Results = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userQuery = searchParams.get("search") || "";
  const aiSuggestion = searchParams.get("ai") || "No AI data yet";

  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const loadProviders = async () => {
      const providerList = await fetchProviders(userQuery);
      setProviders(providerList);
    };

    loadProviders();
  }, [userQuery]);

  return (
    <div>
      <h1>Search Results for: {userQuery}</h1>
      <p>AI Suggested: {aiSuggestion}</p>

      {providers.length === 0 ? (
        <p>No providers found for this query.</p>
      ) : (
        providers.map((provider) => (
          <div key={provider.id} className="p-4 border rounded-lg shadow-md mb-2">
            <h3>{provider.name} - {provider.specialty}</h3>
            <p>Distance: {provider.distance} km | Rating: {provider.rating} ★</p>
            <button className="bg-blue-600 text-white px-4 py-1 rounded">Book Appointment</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Results;