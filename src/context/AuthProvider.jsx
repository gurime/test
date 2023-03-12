import { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const authContextValue = {
    login: async (email, password) => {
      try {
        const res = await axios.post('http://localhost:4005/login', { email, password });
        const data = res.data;
        if (data.user) {
          setUser(data.user);
        }
        return data;
      } catch (error) {
        console.error(error);
      }
    },
    logout: async () => {
      try {
        await axios.post('http://localhost:4005/logout');
        setUser(null);
      } catch (error) {
        console.error(error);
      }
    },
    register: async (firstName, lastName, email, password, name) => {
      try {
        const res = await axios.post('http://localhost:4005/register', { firstName, lastName, email, password, name });
        const data = res.data;
        if (data.user) {
          setUser(data.user);
        }
        return data;
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
