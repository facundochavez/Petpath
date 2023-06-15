import styles from './StartOptions.module.scss';
import Button from 'components/Button/Button';
import { motion } from 'framer-motion';
import { useGlobalContext } from 'pages/context/global.context';
import { useTourContext } from 'pages/context/tour.context';

const StartOptions = () => {
  const { startExploring } = useGlobalContext();
  const { startTour } = useTourContext();

  const animationProps = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 }
  };

  //// COMPONENT
  return (
    <div className={styles.start_options}>
      <div className={styles.start_options__max_width_container}>
        <motion.h2 className={styles.start_options__max_width_container__title} {...animationProps}>
          <span>Discover and learn</span> about the cutest cats in the world 🐱
        </motion.h2>
        <motion.div
          className={styles.start_options__max_width_container__buttons}
          {...animationProps}
          transition={{ delay: 0.05 }}>
          {/* TOUR BUTTON */}
          <Button type='secondary' onClick={startTour}>
            STAR TOUR
          </Button>
          {/* START BUTTON */}
          <Button type='primary' onClick={startExploring}>
            LET'S EXPLORE!
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default StartOptions;
