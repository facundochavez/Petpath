import { createContext, useContext, useState } from 'react';
import loadingBreed from '../../data/loading-breed.data.json';
import { useSwiperContext } from './swiper.context';

export const ExploredBreedsContext = createContext();

export const ExploredBreedsProvider = ({ children }) => {
  const [exploredBreeds, setExploredBreeds] = useState([]);
  const [showMoveButtons, setShowMoveButtons] = useState(true);
  const { swiper } = useSwiperContext();
  const [allBreedsLength, setAllBreedsLength] = useState(0)

  //// ADD NEW BREED
  async function addNewBreed({
    selected_index,
    selected_level,
    selected_action,
  }) {
    setShowMoveButtons(false);

    // HANDLE REQUEST ARROW IF CARD IS DEFINED
    {
      selected_index !== undefined &&
        handleRequestArrow(selected_index, selected_level, selected_action);
    }

    // TAKING OF THE LAST CARDS IF SELECTED INDEX IS NOT LAST
    {
      selected_index + 1 < exploredBreeds.length &&
        setExploredBreeds((prevExploredBreeds) => [
          ...prevExploredBreeds.slice(0, selected_index + 1),
        ]);
    }

    // PUTTING LOADING CARD
    setExploredBreeds((prevExploredBreeds) => [
      ...prevExploredBreeds,
      loadingBreed,
    ]);

    // SWIPE TO NEXT CARD IF ISN'T THE FIRST ONE
    {
      exploredBreeds.length !== 0 &&
        setTimeout(() => {
          swiper.slideNext();
        }, 150);
    }

    // GETING NEW BREED
    const response = await fetch(
      `http://localhost:8000/get_breed/?selected_index=${selected_index}&selected_level=${selected_level}&selected_action=${selected_action}`
    );
    const newBreed = await response.json();
    setExploredBreeds((prevExploredBreeds) => [
      ...prevExploredBreeds.slice(0, -1),
      newBreed,
    ]);

    setShowMoveButtons(true);
  }

  //// HANDLE SELECTED LEVEL AND ACTION (FOR REQUEST ARROW)
  function handleRequestArrow(selected_index, selected_level, selected_action) {
    const newExploredBreeds = [...exploredBreeds];
    newExploredBreeds[selected_index].selectedLevel = selected_level;
    newExploredBreeds[selected_index].selectedAction = selected_action;
    setExploredBreeds(newExploredBreeds);
  }

  //// HANDLE FAVOURITE
  const [tap, setTap] = useState(false);
  function handleFav(index) {
    setTap(true);
    const newExploredBreeds = [...exploredBreeds];
    newExploredBreeds[index].fav = !newExploredBreeds[index].fav;
    setExploredBreeds(newExploredBreeds);
    setTimeout(() => {
      setTap(false);
    }, 300);
  }

  //// COMPONENT
  return (
    <ExploredBreedsContext.Provider
      value={{
        exploredBreeds,
        setExploredBreeds,
        showMoveButtons,
        addNewBreed,
        tap,
        handleFav,
        allBreedsLength,
        setAllBreedsLength
      }}
    >
      {children}
    </ExploredBreedsContext.Provider>
  );
};

export const useExploredBreedsContext = () => {
  const context = useContext(ExploredBreedsContext);
  if (context === undefined) {
    throw new Error(
      'ExploredBreedsContext must be used within a ExploredBreedsProvider'
    );
  }
  return context;
};
