import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Fixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [heading, setHeading] = useState("Fixtures");

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const response = await fetch(`/api/v4/teams/66/matches`, {
          method: 'GET',
          headers: {
            "X-Auth-Token": "9faff14fdd794308bf6621633fc038fb",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }

        const data = await response.json();
        setFixtures(data.matches);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFixtures();
  }, []);

  if (loading) return <p className="text-center oswald-700">Loading fixtures...</p>;
  if (error) return <p className="text-center text-red-600 oswald-700">Error: {error}</p>;

  return (
    <div 
      className="Fixtures text-center mx-auto" 
      style={{ background: 'linear-gradient(to top right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.05)), #323231' }}
    >
      <div className="pt-10 pb-5">
        <Link 
          to="/" 
          className="text-7xl mb-2 underline font-bold text-white bg-transparent 
                     transition-colors duration-500 
                     hover:text-[#FFE501] hover:underline 
                     focus:outline-none oswald-700 cursor-pointer"
          onMouseEnter={() => setHeading("Home")}
          onMouseLeave={() => setHeading("Fixtures")}
        >
          {heading}
        </Link>
      </div>
      <p className="oswald-400">Total Matches: {fixtures.length}</p>
      <table className="mt-4 mx-auto w-full">
        <thead>
          <tr>
            <th className="text-xl font-bold text-white oswald-400 underline">Home</th>
            <th className="text-xl font-bold text-white oswald-400 underline">Score</th>
            <th className="text-xl font-bold text-white oswald-400 underline">Away</th>
          </tr>
        </thead>
        <tbody>
          {fixtures.map(fixture => (
            <Fixture
              key={fixture.id}
              date={new Date(fixture.utcDate).toLocaleString()}
              home={fixture.homeTeam.name}
              away={fixture.awayTeam.name}
              score={fixture.status === "FINISHED" 
                ? `${fixture.score.fullTime.home} - ${fixture.score.fullTime.away}` 
                : "TBD"}
              played={fixture.status === "FINISHED"}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Fixture = ({ date, home, away, score, played }) => {
  return (
    <>
      <tr>
        <td />
        <td className="MatchDate text-lg font-semibold text-center oswald-400">{date}</td>
        <td />
      </tr>
      <tr className="Fixture__Row2 transition-transform duration-200 transform hover:scale-105">
        <td className={`font-bold oswald-400 ${home === "Manchester United FC" ? "text-white-600" : "text-[#FFE501]"} cursor-pointer`}>
          <div className="overflow-hidden whitespace-nowrap">{home}</div>
        </td>
        <td className={`font-bold bg-[#C80202] text-white ${!played ? "bg-secondary" : ""} cursor-pointer`}>
          <div className="overflow-hidden whitespace-nowrap">{score}</div>
        </td>
        <td className={`font-bold oswald-400 ${away === "Manchester United FC" ? "text-white-600" : "text-[#FFE501]"} cursor-pointer`}>
          <div className="overflow-hidden whitespace-nowrap">{away}</div>
        </td>
      </tr>
    </>
  );
};

Fixture.propTypes = {
  date: PropTypes.string.isRequired,
  home: PropTypes.string.isRequired,
  away: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  played: PropTypes.bool.isRequired,
};

export default Fixtures;
