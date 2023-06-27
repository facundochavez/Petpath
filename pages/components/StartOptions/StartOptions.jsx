import styles from './StartOptions.module.scss';
import Button from 'components/Button/Button';
import { motion } from 'framer-motion';
import { useExploredBreedsContext } from 'pages/context/exploredBreeds.context';
import { useGlobalContext } from 'pages/context/global.context';
import { useSwiperContext } from 'pages/context/swiper.context';
import { useTourContext } from 'pages/context/tour.context';

const StartOptions = () => {
  const { addNewBreed } = useExploredBreedsContext();
  const { startTour } = useTourContext();
  const { setActiveSwiperIndex } = useSwiperContext();

  const objectAnimation = {
    hidden: { opacity: 0, y: 100 },
    show: { opacity: 1, y: 0 }
  };

  //// COMPONENT
  return (
    <div className={styles.start_options}>
      <motion.div
        className={styles.start_options__max_width_container}
        transition={{
          staggerChildren: 0.05
        }}
        initial='hidden'
        animate='show'>
        <motion.h2
          className={styles.start_options__max_width_container__title}
          variants={objectAnimation}>
          <span>Discover and learn</span> about the cutest cats in the world 🐱
        </motion.h2>

       

        <motion.div
          className={styles.start_options__max_width_container__buttons}
          variants={objectAnimation}>
          {/* TOUR BUTTON */}
          <Button type='secondary' onClick={startTour}>
            STAR TOUR
          </Button>
          {/* START BUTTON */}
          <Button
            type='primary'
            onClick={() => {
              setActiveSwiperIndex(0);
              addNewBreed({});
            }}>
            LET&apos;S EXPLORE!
          </Button>
        </motion.div>

        <motion.h3
          className={styles.start_options__max_width_container__promise}
          variants={objectAnimation}>
          ... dogs will come soon 🐶
        </motion.h3>

      </motion.div>
    </div>
  );
};

export default StartOptions;
