import { Tour as AntTour } from 'antd';
import { useExploredBreedsContext } from 'context/exploredBreeds.context';
import { useGlobalContext } from 'context/global.context';
import { useTourContext } from 'context/tour.context';

const Tour = () => {
  const { tourIsActive, setTourIsActive, steps } = useTourContext();
  const { setGlobalContext, setShowLoadingScreen } = useGlobalContext();
  const { exploredCats } = useExploredBreedsContext();

  ////COMPONENT
  return (
    <AntTour
      open={tourIsActive}
      onClose={() => {
        exploredCats.length !== 0 && setShowLoadingScreen('yourPath');
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
