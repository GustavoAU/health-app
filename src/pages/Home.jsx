import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { askHealthAI } from "../services/apiHelper";

const Home = () => {
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    if (!query) return;
    
    const aiResponse = await askHealthAI(query); // 🔥 AI interaction happens here
    console.log("AI Suggested:", aiResponse);
    
    // 🔁 Pass AI response along with user query
    navigate(`/results?search=${encodeURIComponent(query)}&ai=${encodeURIComponent(aiResponse)}`);
  };

  return (
    <div className="p-6">
      <SearchBar onSearch={handleSearch} />
    </div>
  );
};

export default Home;