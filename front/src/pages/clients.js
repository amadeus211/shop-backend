import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; 
import "../app/globals.css"
import  BackToHomeIcon  from "../components/BackHome"

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter(); 

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/clients');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setClients(data);
        setFilteredClients(data); 
      } catch (error) {
        setError(error.message);
      }
    };

    fetchClients();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filtered = clients.filter(client =>
      client.phoneNumber.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredClients(filtered);
  };

  const handleDelete = async (clientId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/clients/${clientId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete client');
      }
      setClients(clients.filter(client => client._id !== clientId)); 
      setFilteredClients(filteredClients.filter(client => client._id !== clientId));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (clientId) => {
    router.push(`/edit-client/${clientId}`);
  };

  return (
    <div className="container mx-auto p-6">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <BackToHomeIcon></BackToHomeIcon>
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Список клієнтів</h1>

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
        {filteredClients.length > 0 ? (
          filteredClients.map(client => (
            <div
              key={client._id}
              className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{client.name}</h2>
              <p className="text-gray-600 mb-2">Телефон: {client.phoneNumber}</p>
              <p className="text-sm text-gray-500">Бонуси: {client.bonusPoints}</p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleDelete(client._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Видалити
                </button>
                <button
                  onClick={() => handleEdit(client._id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Редагувати
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-600">Клієнтів не знайдено</p>
        )}
      </div>
    </div>
  );
};

export default ClientsPage;
