import { useState } from "react";
import "../../app/globals.css";
import { useRouter } from "next/router";


const NewPromotionModal = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPromotion = { title, description, startDate, endDate };

    try {
      const response = await fetch("http://localhost:5000/api/promotions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPromotion),
      });

      if (response.ok) {
        const createdPromotion = await response.json();
        onCreate(createdPromotion); 
        onClose(); 
      } else {
        throw new Error("Failed to create promotion");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clode = () =>{
    router.push(`/promotions`);
   
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Нова акція</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Назва"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full mb-2 p-2 border rounded"
          />
          <textarea
            placeholder="Опис"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full mb-2 p-2 border rounded"
          ></textarea>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="w-full mb-4 p-2 border rounded"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Створити
          </button>
          <button type="button" onClick={onClose} className="w-full mt-2 p-2 text-gray-600">
            Закрити
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPromotionModal;
