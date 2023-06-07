import { Tour as AntTour } from 'antd';
import { useExploredBreedsContext } from 'pages/context/exploredBreeds.context';
import { useGlobalContext } from 'pages/context/global.context';
import { useSwiperContext } from 'pages/context/swiper.context';
import { useTourContext } from 'pages/context/tour.context';

const Tour = () => {
  const { setExploredCats } = useExploredBreedsContext();
  const { showTour, setShowTour, steps } = useTourContext();
  const { setGlobalContext } = useGlobalContext();

  ////COMPONENT
  return (
    <AntTour
      open={showTour}
      onClose={() => {
        setShowTour(false);
        setExploredCats([]);
        setGlobalContext('start');
      }}
      steps={steps}
      onFinish={() => {
        setExploredCats([]);
        setGlobalContext('start');
      }}
    />
  );
};

export default Tour;
