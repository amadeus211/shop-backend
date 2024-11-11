import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../app/globals.css";
import BackToHomeIcon from "../components/BackHome";

const ClientsPage = () => {
  const [resonses, setResonses] = useState([]);
  const [filteredresonses, setFilteredResonses] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/responses");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setResonses(data);
        setFilteredResonses(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchResponses();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filtered = resonses.filter((responce) =>
      responce.phoneNumber.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredResonses(filtered);
  };

  const handleDelete = async (responceId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/responses/${responceId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete client");
      }
      setResonses(resonses.filter((resonse) => resonse._id !== responceId));
      setFilteredResonses(
        filteredresonses.filter((resonse) => resonse._id !== responceId)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <BackToHomeIcon></BackToHomeIcon>

      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Список відгуків
      </h1>

      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Пошук за номером телефону..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredresonses.length > 0 ? (
          filteredresonses.map((resonse) => (
            <div
              key={resonse._id}
              className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {resonse.description}
              </h2>
              <p className="text-gray-600 mb-2">
                Телефон: {resonse.phoneNumber}
              </p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleDelete(resonse._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Видалити
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-600">
            Відгуків не знайдено
          </p>
        )}
      </div>
    </div>
  );
};

export default ClientsPage;
