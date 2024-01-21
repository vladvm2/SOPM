import React, { createContext, useContext, useState } from 'react';

const RatingContext = createContext();

export const useRating = () => useContext(RatingContext);

export const RatingProvider = ({ children }) => {
  const [rating, setRating] = useState(0);

  return (
    <RatingContext.Provider value={{ rating, setRating }}>
      {children}
    </RatingContext.Provider>
  );
};
