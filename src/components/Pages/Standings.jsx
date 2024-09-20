import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Standings = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [heading, setHeading] = useState("Standings");

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await fetch(`/api/v4/competitions/PL/standings`, {
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
        setStandings(data.standings[0].table);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  if (loading) return <p className="text-center oswald-700">Loading standings...</p>;
  if (error) return <p className="text-center text-red-600 oswald-700">Error: {error}</p>;

  return (
    <div 
      className="Standings text-center mx-auto" 
      style={{ background: 'linear-gradient(to top right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.05)), #C80202' }}
    >
      <div className="pt-10 pb-5">
        <Link 
          to="/" 
          className="text-7xl mb-2 underline font-bold text-white bg-transparent 
                     transition-colors duration-500 
                     hover:text-[#FFE501] hover:underline 
                     focus:outline-none oswald-700 cursor-pointer"
          onMouseEnter={() => setHeading("Home")}
          onMouseLeave={() => setHeading("Standings")}
        >
          {heading}
        </Link>
      </div>
      <table className="mt-4 mx-auto w-10/12 border border-collapse border-gray-400 bg-white">
        <thead>
          <tr className="bg-gray-200 text-black">
            <th className="py-2 px-4 text-xl font-bold oswald-400">Position</th>
            <th className="py-2 px-4 text-xl font-bold oswald-400">Team</th>
            <th className="py-2 px-4 text-xl font-bold oswald-400">Played</th>
            <th className="py-2 px-4 text-xl font-bold oswald-400">Wins</th>
            <th className="py-2 px-4 text-xl font-bold oswald-400">Draws</th>
            <th className="py-2 px-4 text-xl font-bold oswald-400">Losses</th>
            <th className="py-2 px-4 text-xl font-bold oswald-400">GF</th>
            <th className="py-2 px-4 text-xl font-bold oswald-400">GA</th>
            <th className="py-2 px-4 text-xl font-bold oswald-400">GD</th>
            <th className="py-2 px-4 text-xl font-bold oswald-400">Points</th>
          </tr>
        </thead>
        <tbody>
          {standings.map(team => (
            <TeamStanding
              key={team.team.id}
              position={team.position}
              name={team.team.name}
              playedGames={team.playedGames}
              won={team.won}
              draw={team.draw}
              lost={team.lost}
              goalsFor={team.goalsFor}
              goalsAgainst={team.goalsAgainst}
              goalDifference={team.goalDifference}
              points={team.points}
              isManU={team.team.name === "Manchester United FC"}
              isRelegationZone={team.position >= 18}
            />
          ))}
        </tbody>
      </table>
      <div className="pb-5" />
    </div>
  );
};

const TeamStanding = ({ 
  position, 
  name, 
  playedGames, 
  won, 
  draw, 
  lost, 
  goalsFor, 
  goalsAgainst, 
  goalDifference, 
  points, 
  isManU,
  isRelegationZone
}) => {
  return (
    <tr className={`TeamStanding__Row ${isRelegationZone ? "bg-[#FFE501]" : ""}`}>
      <td className="py-2 text-lg font-semibold text-center text-black oswald-400">{position}</td>
      <td className={`py-2 font-bold oswald-400 ${isManU ? "text-red-600" : "text-black"} cursor-pointer`}>
        <div className="overflow-hidden whitespace-nowrap">{name}</div>
      </td>
      <td className="py-2 font-bold oswald-400 text-black">{playedGames}</td>
      <td className="py-2 font-bold oswald-400 text-black">{won}</td>
      <td className="py-2 font-bold oswald-400 text-black">{draw}</td>
      <td className="py-2 font-bold oswald-400 text-black">{lost}</td>
      <td className="py-2 font-bold oswald-400 text-black">{goalsFor}</td>
      <td className="py-2 font-bold oswald-400 text-black">{goalsAgainst}</td>
      <td className="py-2 font-bold oswald-400 text-black">{goalDifference}</td>
      <td className="py-2 font-bold oswald-400 text-black">{points}</td>
    </tr>
  );
};

TeamStanding.propTypes = {
  position: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  playedGames: PropTypes.number.isRequired,
  won: PropTypes.number.isRequired,
  draw: PropTypes.number.isRequired,
  lost: PropTypes.number.isRequired,
  goalsFor: PropTypes.number.isRequired,
  goalsAgainst: PropTypes.number.isRequired,
  goalDifference: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  isManU: PropTypes.bool.isRequired,
  isRelegationZone: PropTypes.bool.isRequired,
};

export default Standings;
