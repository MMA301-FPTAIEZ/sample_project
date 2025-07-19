import { createContext, useContext, useEffect, useState } from 'react';
import { instance } from '../lib/axios';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const res = await instance.get('/');
      setPlayers(res.data);
    };

    fetchPlayers();
  }, []);

  useEffect(() => {
    const teams = players.map((player) => player.team);
    setTeams([...new Set(teams)]);
  }, [players]);

  return (
    <AppContext.Provider
      value={{
        players,
        teams,
        setPlayers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
