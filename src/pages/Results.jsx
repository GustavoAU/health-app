import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProviders } from "../services/apiHelper";
import ProviderCard from "../components/ProviderCard";


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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results for: {userQuery}</h1>

      <div className="max-w-2xl mx-auto mb-6 p-4 bg-gradient-to-r from-indigo-100 to-white border-l-4 border-indigo-400 rounded shadow">
        <h2 className="text-sm font-semibold text-indigo-700 mb-1">Health Assistant Suggests:</h2>
        <p className="text-gray-800">{aiSuggestion}</p>
      </div>

      {providers.length === 0 ? (
        <p className="text-gray-500 italic">No providers found for this query.</p>
      ) : (
        providers.map((provider) => (
          <div
            key={provider.id}
            className="p-4 bg-white border rounded-lg shadow-md mb-4 transition hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{provider.name}</h3>
              <span className="text-sm bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                {provider.specialty}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Distance: <strong>{provider.distance}</strong> km · Rating:{" "}
              <strong>{provider.rating}</strong> ★
            </p>
            <button className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded-md text-sm">
              Book Appointment
            </button>
          </div>
        ))
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {providers.map((provider) => (
    <ProviderCard key={provider.id} {...provider} />
  ))}
</div>

    </div>
  );
};

export default Results;