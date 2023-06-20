import { Tour as AntTour } from 'antd';
import { useExploredBreedsContext } from 'pages/context/exploredBreeds.context';
import { useGlobalContext } from 'pages/context/global.context';
import { useSwiperContext } from 'pages/context/swiper.context';
import { useTourContext } from 'pages/context/tour.context';

const Tour = () => {
  const { tourIsActive, setTourIsActive, steps } = useTourContext();
  const { setGlobalContext } = useGlobalContext();

  ////COMPONENT
  return (
    <AntTour
      open={tourIsActive}
      onClose={() => {
        setTourIsActive(false);
        setGlobalContext('exploring');
      }}
      steps={steps}
      onFinish={() => {
        setGlobalContext('exploring');
      }}
      indicatorsRender={(current, total) => (
        <span>
          {current + 1} / {total}
        </span>
      )}
      
    />
  );
};

export default Tour;
