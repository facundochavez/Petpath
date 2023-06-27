import { createContext, useContext, useState } from 'react';
import { useRef } from 'react';
import tourBreeds from '../../data/tour-breeds.data.json';
import { useGlobalContext } from './global.context';
import { useSwiperContext } from './swiper.context';
const { tourCat } = tourBreeds;

export const TourContext = createContext();

const TourProvider = ({ children }) => {
  const { setGlobalContext } = useGlobalContext();
  const [tourIsActive, setTourIsActive] = useState(false);
  const { setActiveSwiperIndex } = useSwiperContext();
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const steps = [
    {
      title: 'Welcome to Petpath!',
      description: `At first we'll give you a random breed...`,
      placement: 'top',
      target: () => ref1.current
    },
    {
      title: 'Breed levels',
      description: `These are the breed levels. Here you can learn a lot about the animal behavior and its traits.`,
      target: () => ref2.current
    },
    {
      title: 'Make a request!',
      description: `By selecting any button, you can ask for more, equal or less of that level. We'll give you a new breed that meets your requirement, trying to keep the other levels close enough.`,
      target: () => ref3.current
    },
    {
      title: 'Path and options',
      description: (
        <div>
          <p>
            Here you can view the path you&apos;ve made so far. Additionally, you can sign up or log in
            to save your path and favorite breeds.
          </p>
          <p>
            <br />
            <b>And thats all! Let&apos;s explore some breeds!</b>
          </p>
        </div>
      ),
      target: () => ref4.current
    }
  ];

  function startTour() {
    setActiveSwiperIndex(0);
    setGlobalContext('tour');
    setTimeout(() => {
      setTourIsActive(true);
    }, 500);
  }

  //// COMPONENT
  return (
    <TourContext.Provider
      value={{
        tourCat,
        tourIsActive,
        setTourIsActive,
        ref1,
        ref2,
        ref3,
        ref4,
        steps,
        startTour
      }}>
      {children}
    </TourContext.Provider>
  );
};

export const useTourContext = () => {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error('TourContext must be used within a TourProvider');
  }
  return context;
};

export default TourProvider;