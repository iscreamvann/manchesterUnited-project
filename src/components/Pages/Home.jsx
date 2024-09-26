import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div 
      name="Home" 
      className="flex flex-col items-center justify-center h-screen space-y-6" 
      style={{ background: 'linear-gradient(to top right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.05)), #C80202' }}
    >
      <img 
        src="/manu-logo.png" 
        className="w-48 h-auto mt-4 mb-8 transform transition-transform duration-300 hover:scale-110" 
        alt="Logo" 
      />
      <div className="flex flex-col items-center space-y-4">
        {["Fixtures", "Standings", "Squad", "About the Project"].map((text, index) => (
          <Link 
            key={index} 
            to={`/${text.toLowerCase().replace(/ /g, '-')}`} 
            className="text-4xl font-bold text-white bg-transparent hover:text-[#FFE501] hover:underline transition-colors duration-300 focus:outline-none oswald-700 cursor-pointer"
          >
            {text}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;