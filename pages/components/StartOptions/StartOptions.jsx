import styles from './StartOptions.module.scss';
import Button from 'components/Button/Button';
import { motion } from 'framer-motion';
import { useExploredBreedsContext } from 'pages/context/exploredBreeds.context';
import { useTourContext } from 'pages/context/tour.context';

const StartOptions = () => {
  const { addNewBreed } = useExploredBreedsContext();
  const { startTour } = useTourContext();

  const animationProps = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
  };

  //// COMPONENT
  return (
    <div className={styles.start_options}>
      <div className={styles.start_options__max_width_container}>
        <motion.h2
          className={styles.start_options__max_width_container__title}
          {...animationProps}
        >
          <span>Discover and learn</span> about the cutest breeds in the world
          🐶🐱
        </motion.h2>
        <motion.div
          className={styles.start_options__max_width_container__buttons}
          {...animationProps}
          transition={{ delay: 0.05 }}
        >
          <Button
            type='secondary'
            onClick={() => {
              startTour();
            }}
          >
            STAR TOUR
          </Button>
          <Button type='primary' onClick={addNewBreed}>
            LET'S EXPLORE!
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default StartOptions;
