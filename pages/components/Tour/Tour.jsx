import { Tour as AntTour } from 'antd';
import { useExploredBreedsContext } from 'pages/context/exploredBreeds.context';
import { useSwiperContext } from 'pages/context/swiper.context';
import { useTourContext } from 'pages/context/tour.context';

const Tour = () => {
  const { setExploredBreeds } = useExploredBreedsContext();
  const { showTour, setShowTour, steps } = useTourContext();

  ////COMPONENT
  return (
    <AntTour
      open={showTour}
      onClose={() => {
        setShowTour(false);
        setExploredBreeds([]);
      }}
      steps={steps}
      onFinish={() => setExploredBreeds([])}
    />
  );
};

export default Tour;
