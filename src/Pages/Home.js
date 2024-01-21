import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // În momentul încărcării componentei, navighează direct la 'MenuPage'
  useEffect(() => {
    navigate('/menupage');
  }, [navigate]);

  // Componenta nu are nevoie să returneze un JSX vizibil, deoarece va redirecționa imediat
  return null;
};

export default Home;
