import { createContext, useContext, useState } from 'react';

export const SwiperContext = createContext();

export const SwiperProvider = ({ children }) => {
  const [swiper, setSwiper] = useState(null);
  const [activeSwiperIndex, setActiveSwiperIndex] = useState(0);
  const [slideToLast, setSlideToLast] = useState(false);

  //// COMPONENT
  return (
    <SwiperContext.Provider
      value={{
        swiper,
        setSwiper,
        activeSwiperIndex,
        setActiveSwiperIndex,
        slideToLast,
        setSlideToLast
      }}>
      {children}
    </SwiperContext.Provider>
  );
};

export const useSwiperContext = () => {
  const context = useContext(SwiperContext);
  if (context === undefined) {
    throw new Error('SwiperContext must be used within a SwiperProvider');
  }
  return context;
};
