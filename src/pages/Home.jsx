import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { askHealthAI } from "../services/apiHelper";
import Header from "../components/Header";
import ProviderCard from "../components/ProviderCard"; 
import { 
  BeakerIcon, 
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  BuildingOffice2Icon 
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import doctorsData from "../data/doctors.json";
import smartSuggestions from "../data/suggestions.json";







const doctors = doctorsData;
const groupedDoctors = doctorsData.reduce((acc, doctor) => {
  if (!acc[doctor.category]) {
    acc[doctor.category] = [];
  }
  acc[doctor.category].push(doctor);
  return acc;
}, {});


const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const card = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};


const Home = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [favorites, setFavorites] = useState(
  JSON.parse(localStorage.getItem("pinnedSuggestions") || "[]")
);
  const [searchHistory, setSearchHistory] = useState(
  JSON.parse(localStorage.getItem("searchHistory") || "[]")
);

useEffect(() => {
  const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
  setSearchHistory(history);

  localStorage.setItem("pinnedSuggestions", JSON.stringify(favorites));
}, [selectedCategory, favorites]);

 const handleSearch = async (query) => {
  if (!query) return;

  const aiResponse = await askHealthAI(query);

  // Save to localStorage
  const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
  const updatedHistory = [query, ...history.filter(q => q !== query)].slice(0, 5); // store last 5 unique
  localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

  navigate(`/results?search=${encodeURIComponent(query)}&ai=${encodeURIComponent(aiResponse)}`);
};
  
const categories = [
  { name: "Medicine", icon: BeakerIcon },
  { name: "Checkup", icon: ClipboardDocumentCheckIcon },
  { name: "Healthcare", icon: UserGroupIcon },
  { name: "Hospital", icon: BuildingOffice2Icon }
];

const [sortBy, setSortBy] = useState("rating"); // or "distance"




  return (
<>
  <Header />

  {/* 🔹 Hero Section */}
  <section className="bg-gradient-to-r from-indigo-100 to-white py-16 text-center mb-10 rounded-lg shadow">
    <div className="max-w-2xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-800 mb-4">
        Find Healthcare That Fits You
      </h2>
      <p className="text-gray-700 text-base md:text-lg mb-6">
        Search doctors, specialists, or symptoms and let our AI assist you in seconds.
      </p>
    </div>
  </section>

    {/* 🔹 Categories */}

  <section className="px-6 mb-6">
  <h3 className="text-lg font-semibold text-gray-700 mb-2">What do you need?</h3>
  <motion.div
  className="grid grid-cols-2 sm:grid-cols-4 gap-4"
  variants={container}
  initial="hidden"
  animate="show"
>

     {categories.map(({ name, icon: Icon }) => (
    <motion.div
      key={name}
      variants={card}
    onClick={() => setSelectedCategory(name)}
    className={`group flex flex-col items-center justify-center space-y-2 bg-indigo-100 text-indigo-800 py-6 rounded-xl font-semibold shadow hover:shadow-md cursor-pointer transition transform hover:scale-101 duration-200 ease-in-out ${
      selectedCategory === name ? "ring-2 ring-indigo-500" : ""
    }`}
  >
 <Icon className={`h-6 w-6 transition duration-300 ${
    selectedCategory === name
      ? "text-indigo-600"
      : "group-hover:text-indigo-500 text-indigo-800"
  }`} />
    <span>{name}</span>
   </motion.div>

))}
</motion.div>

</section>

  {/* 🔹 Search Section */}
 {!selectedCategory && (
  <p className="text-center text-sm text-gray-500 mb-2">
    Please select a category to start your search
  </p>
)}

{selectedCategory && (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="p-6"
  >
    <SearchBar
      onSearch={handleSearch}
      placeholder={`Search in ${selectedCategory.toLowerCase()}...`}
    />
     <button onClick={() => setSelectedCategory("")} className="text-sm text-indigo-600 underline mt-2 transition=0.2s all ease-in-out">
    Clear selection
  </button>

 


  </motion.div>
)}

{favorites.length > 0 && (
  <div className="mt-6">
    <h4 className="text-sm text-gray-600 mb-2">⭐ Your Pinned Suggestions</h4>
    <div className="flex flex-wrap gap-2">
      {favorites.map((term, idx) => (
        <button
          key={idx}
          onClick={() => handleSearch(term)}
          className="bg-yellow-50 text-yellow-800 border border-yellow-300 text-xs px-3 py-1 rounded-full hover:bg-yellow-100 transition"
        >
          {term}
        </button>
      ))}
    </div>
  </div>
)}

{selectedCategory && smartSuggestions[selectedCategory]?.length > 0 && (
  <div className="mt-4">
    <h4 className="text-sm text-gray-600 mb-2">
      Suggested for {selectedCategory}:
    </h4>
    <div className="flex flex-wrap gap-2">
      {smartSuggestions[selectedCategory].map((term, idx) => {
        const isPinned = favorites.includes(term);

        return (
          <div key={idx} className="relative group">
            <button
              onClick={() => handleSearch(term)}
              className="bg-white border border-indigo-200 text-indigo-700 text-xs px-3 py-1 rounded-full hover:bg-indigo-50 transition pr-6"
            >
              {term}
            </button>

            <span
              onClick={() =>
                setFavorites(prev =>
                  isPinned
                    ? prev.filter(f => f !== term)
                    : [term, ...prev].slice(0, 10)
                )
              }
              className={`absolute top-1.5 right-1 text-sm cursor-pointer transition ${
                isPinned
                  ? "text-yellow-500"
                  : "text-gray-300 group-hover:text-yellow-400"
              }`}
              title={isPinned ? "Unpin" : "Pin"}
            >
              ★
            </span>
          </div>
        );
      })}
    </div>
  </div>
)}


{selectedCategory && searchHistory.length > 0 && (
  <div className="px-6 mb-4">
    <h4 className="text-sm text-gray-600 mb-2">Recent Searches:</h4>
    <div className="flex flex-wrap gap-2">
      {searchHistory.map((term, idx) => (
        <button
          key={idx}
          onClick={() => handleSearch(term)}
          className="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full hover:bg-indigo-200 transition"
        >
          {term}
        </button>
      ))}
    </div>
  </div>
)}

{/* 🔹 Sorting UI */}

<div className="px-6 mb-4 flex items-center justify-end gap-2">
  <span className="text-sm text-gray-600">Sort by:</span>
  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="text-sm border border-gray-300 rounded px-2 py-1"
  >
    <option value="rating">Top Rated</option>
    <option value="distance">Nearest</option>
  </select>
</div>



{/* 🔹 Live Consultations Section */}
{Object.entries(
  selectedCategory
    ? { [selectedCategory]: groupedDoctors[selectedCategory] || [] }
    : groupedDoctors
).map(([category, docs]) => (

  <section key={category} className="px-6 mb-8">
    <h3 className="text-lg font-semibold text-indigo-800 mb-3">{category}</h3>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {[...docs]
  .sort((a, b) =>
    sortBy === "distance"
      ? a.distance - b.distance
      : b.rating - a.rating
  )
  .map((doc) => (
    <ProviderCard key={doc.id} {...doc} />
  ))}

    </div>
  </section>
))}



</>
  );
};

export default Home;