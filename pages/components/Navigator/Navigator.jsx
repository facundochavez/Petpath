import styles from './Navigator.module.scss';
import { useExploredBreedsContext } from 'pages/context/exploredBreeds.context';
import { useSwiperContext } from 'pages/context/swiper.context';
import MoveButton from 'components/MoveButton/MoveButton';
import LoadingPaws from 'components/LoadingPaws/LoadingPaws';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { AnimatePresence, motion } from 'framer-motion';
import { useGlobalContext } from 'pages/context/global.context';
import { useTourContext } from 'pages/context/tour.context';

const Navigator = () => {
  const { globalContext } = useGlobalContext();
  const { exploredCats, showMoveButtons, handleFav } = useExploredBreedsContext();
  const { swiper, activeSwiperIndex } = useSwiperContext();
  const { tourCat } = useTourContext();

  const exploredBreeds = globalContext === 'tour' ? [tourCat] : exploredCats;

  ////COMPONENT
  return (
    <section className={styles.navigator}>
      {/* PREVIOUS BUTTON */}
      <div className={styles.navigator__button_container}>
        {showMoveButtons && activeSwiperIndex > 0 && (
          <MoveButton type='previous' onClick={() => swiper.slidePrev()} />
        )}
      </div>

      {/* TITLE CONTAINER */}
      {showMoveButtons ? (
        <div
          className={styles.navigator__title_container}
          onClick={() => handleFav(activeSwiperIndex)}>
          <h2>{exploredBreeds[activeSwiperIndex].name}</h2>

          {!exploredBreeds[activeSwiperIndex].fav ? (
            <motion.div key='unfav' className={styles.navigator__title_container__fav_button}>
              <HeartOutlined />
            </motion.div>
          ) : (
            <motion.div
              key='fav'
              className={styles.navigator__title_container__fav_button}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                damping: 12 ,
                stiffness: 1500
              }}>
              <HeartFilled style={{ color: 'var(--color-primary)' }} />
            </motion.div>
          )}
        </div>
      ) : (
        <LoadingPaws />
      )}

      {/* NEXT BUTTON */}
      <div className={styles.navigator__button_container}>
        {showMoveButtons && activeSwiperIndex + 1 < exploredBreeds.length && (
          <MoveButton type='next' onClick={() => swiper.slideNext()} />
        )}
      </div>
    </section>
  );
};

export default Navigator;
