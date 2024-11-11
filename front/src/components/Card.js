const Card = ({ title, link }) => (
    <div className="max-w-md rounded-lg overflow-hidden shadow-xl p-14 bg-white hover:shadow-2xl transition-shadow duration-300 border-2 border-gray-600">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h2>
      <a
        href={link}
        className="inline-block py-3 px-6 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
      >
        Перейти
      </a>
    </div>
  );
  
  export default Card;
  