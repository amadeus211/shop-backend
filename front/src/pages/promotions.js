import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../app/globals.css";
import NewPromotionModal from "./promotions/new";
import BackToHomeIcon from "../components/BackHome";

const PromotionsPage = () => {
  const [promotions, setPromotions] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/promotions");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setPromotions(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPromotions();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("uk-UA", options);
  };

  const deletePromotion = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/promotions/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete promotion");
      }
      setPromotions((prevPromotions) =>
        prevPromotions.filter((promotion) => promotion._id !== id)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  const handleEdit = (id) => {
    router.push(`/promotions/${id}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <BackToHomeIcon></BackToHomeIcon>

      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Список акцій
      </h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="text-center mb-6">
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Створити нову акцію
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.length > 0 ? (
          promotions.map((promotion) => (
            <div
              key={promotion._id}
              className="border p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="font-bold text-xl text-gray-800 mb-4">
                {promotion.title}
              </h2>
              <p className="text-gray-600 mb-4">{promotion.description}</p>
              <p className="text-sm text-gray-500">
                Дата початку: {formatDate(promotion.startDate)}
              </p>
              <p className="text-sm text-gray-500">
                Дата завершення: {formatDate(promotion.endDate)}
              </p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(promotion._id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                >
                  Редагувати
                </button>
                <button
                  onClick={() => deletePromotion(promotion._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Видалити
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-600">Акцій не знайдено</p>
        )}
      </div>

      {isModalOpen && (
        <NewPromotionModal
          onClose={handleCloseModal}
          onCreate={(newPromotion) =>
            setPromotions((prev) => [...prev, newPromotion])
          }
        />
      )}
    </div>
  );
};

export default PromotionsPage;
