import { Tour as AntTour } from 'antd';
import { useExploredBreedsContext } from 'pages/context/exploredBreeds.context';
import { useGlobalContext } from 'pages/context/global.context';
import { useSwiperContext } from 'pages/context/swiper.context';
import { useTourContext } from 'pages/context/tour.context';

const Tour = () => {
  const { tourActive, setTourActive, steps } = useTourContext();
  const { setGlobalContext } = useGlobalContext();

  ////COMPONENT
  return (
    <AntTour
      open={tourActive}
      onClose={() => {
        setTourActive(false);
        setGlobalContext('exploring');
      }}
      steps={steps}
      onFinish={() => {
        setGlobalContext('exploring');
      }}
    />
  );
};

export default Tour;
