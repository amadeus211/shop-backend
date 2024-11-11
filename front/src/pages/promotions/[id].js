import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../../app/globals.css";
import BackToHomeIcon from "../../components/BackHome";

const EditPromotionPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [promotion, setPromotion] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchPromotion = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/promotions/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch promotion data.");
        const data = await response.json();
        console.log(data);

        setPromotion(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPromotion();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/promotions/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(promotion),
        }
      );
      if (!response.ok) throw new Error("Failed to update promotion.");
      router.push("/promotions");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromotion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!promotion) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <BackToHomeIcon></BackToHomeIcon>

      <h1 className="text-2xl font-semibold mb-4">Редагувати акцію</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-gray-700">Назва</label>
          <input
            type="text"
            name="title"
            value={promotion.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Опис</label>
          <textarea
            name="description"
            value={promotion.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Дата початку</label>
          <input
            type="date"
            name="startDate"
            value={promotion.startDate.slice(0, 10)}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Дата закінчення</label>
          <input
            type="date"
            name="endDate"
            value={promotion.endDate.slice(0, 10)}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Зберегти зміни
        </button>
        <button
          type="button"
          onClick={() => router.push("/promotions")}
          className="ml-4 bg-gray-500 text-white px-4 py-2 rounded"
        >
          Скасувати
        </button>
      </form>
    </div>
  );
};

export default EditPromotionPage;
