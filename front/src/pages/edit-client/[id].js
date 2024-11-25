import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '../../app/globals.css';
import  BackToHomeIcon  from "../../components/BackHome"

const EditClientPage = () => {
  const [client, setClient] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query; 

  useEffect(() => {
    if (id) {
      const fetchClient = async () => {
        try {
          const response = await fetch(`http://localhost:5001/api/clients/${id}`);
          if (!response.ok) {
            throw new Error('Client not found');
          }
          const data = await response.json();
          setClient(data);
        } catch (error) {
          setError(error.message);
        }
      };
      fetchClient();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:5001/api/clients/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(client),
      });
      if (!response.ok) {
        throw new Error('Failed to update client');
      }
      router.push('/clients'); 
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (event) => {
    setClient({
      ...client,
      [event.target.name]: event.target.value,
    });
  };

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <BackToHomeIcon></BackToHomeIcon>

      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Редагувати клієнта</h1>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="name">
            Ім'я
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={client.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="phoneNumber">
            Номер телефону
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={client.phoneNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="bonusPoints">
            Бонуси
          </label>
          <input
            type="number"
            id="bonusPoints"
            name="bonusPoints"
            value={client.bonusPoints}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Зберегти зміни
        </button>
      </form>
    </div>
  );
};

export default EditClientPage;
