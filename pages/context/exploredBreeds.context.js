import { createContext, useContext, useEffect, useState } from 'react';
import loadingBreed from '../../data/loading-breed.data.json';
import { useSwiperContext } from './swiper.context';
import { useBackendContext } from './backend.context';
import { useAuthContext } from './auth.context';
import { useGlobalContext } from './global.context';

export const ExploredBreedsContext = createContext();

export const ExploredBreedsProvider = ({ children }) => {
  const { fetchNewBreed, updateDataBaseBreeds, resetBackend } = useBackendContext();
  const { currentUser } = useAuthContext();
  const { setActiveSwiperIndex } = useSwiperContext();
  const { setShowLoadingScreen } = useGlobalContext();
  const [showMoveButtons, setShowMoveButtons] = useState(true);
  const [exploredCats, setExploredCats] = useState([]);

  useEffect(() => {
    const handleUpdateDataBase = async () => {
      showMoveButtons && currentUser && (await updateDataBaseBreeds(currentUser.uid, exploredCats));
    };
    exploredCats.length !== 0 && handleUpdateDataBase();
  }, [exploredCats]);

  //// ADD NEW BREED
  const addNewBreed = async ({ selected_index, selected_level, selected_action }) => {
    exploredCats.length === 0 && setShowLoadingScreen('randomBreed');
    setShowMoveButtons(false);

    // HANDLE REQUEST ARROW IF CARD IS DEFINED
    {
      selected_index !== undefined &&
        handleRequestArrow(selected_index, selected_level, selected_action);

      // TAKING OF THE LAST CARDS IF SELECTED INDEX IS NOT LAST
      selected_index + 1 < exploredCats.length &&
        setExploredCats((prevExploredBreeds) => [
          ...prevExploredBreeds.slice(0, selected_index + 1)
        ]);
    }

    // PUTTING LOADING CARD
    setExploredCats((prevExploredBreeds) => [...prevExploredBreeds, loadingBreed]);

    // GETING NEW BREED
    const newBreed = await fetchNewBreed(selected_index, selected_level, selected_action);
    setExploredCats((prevExploredBreeds) => [...prevExploredBreeds.slice(0, -1), newBreed]);

    setShowLoadingScreen('none');
    setShowMoveButtons(true);
  };

  //// HANDLE SELECTED LEVEL AND ACTION (FOR REQUEST ARROW)
  function handleRequestArrow(selected_index, selected_level, selected_action) {
    const newExploredBreeds = [...exploredCats];
    newExploredBreeds[selected_index].selected_level = selected_level;
    newExploredBreeds[selected_index].selected_action = selected_action;
    setExploredCats(newExploredBreeds);
  }

  //// HANDLE FAVOURITE
  function handleFav(index) {
    const newExploredBreeds = [...exploredCats];
    newExploredBreeds[index].fav = !newExploredBreeds[index].fav;
    setExploredCats(newExploredBreeds);
  }

  //// RESTART PATH
  async function restartPath() {
    setShowLoadingScreen('randomBreed');
    setActiveSwiperIndex(0);
    setExploredCats([]);
    await resetBackend();
    addNewBreed({});
  }

  //// COMPONENT
  return (
    <ExploredBreedsContext.Provider
      value={{
        exploredCats,
        setExploredCats,
        showMoveButtons,
        addNewBreed,
        handleFav,
        setShowMoveButtons,
        restartPath
      }}>
      {children}
    </ExploredBreedsContext.Provider>
  );
};

export const useExploredBreedsContext = () => {
  const context = useContext(ExploredBreedsContext);
  if (context === undefined) {
    throw new Error('ExploredBreedsContext must be used within a ExploredBreedsProvider');
  }
  return context;
};
