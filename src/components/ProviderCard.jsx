import { motion } from "framer-motion";
const ProviderCard = ({ name, specialty, distance, rating, gender = "male" }) => {
  return (
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
  className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition"
>
  <div className="flex items-center gap-3 mb-2">
  <img
    src={
      gender === "female"
        ? "/avatars/female-avatar.svg"
        : "/avatars/male-avatar.svg"
    }
    alt={`${gender} avatar`}
    className="w-10 h-10 rounded-full object-cover border border-gray-300"
  />
  <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
</div>


  <p className="text-sm text-indigo-600 mb-2">{specialty}</p>
  <p className="text-sm text-gray-500">
    Distance: <strong>{distance} km</strong> · Rating: <strong>{rating} ★</strong>
  </p>
  <button className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded-md text-sm">
    Book Now
  </button>
</motion.div>
  );
};

export default ProviderCard;