import styles from './Navigator.module.scss';
import { useExploredBreedsContext } from 'pages/context/exploredBreeds.context';
import { useSwiperContext } from 'pages/context/swiper.context';
import MoveButton from 'components/MoveButton/MoveButton';
import LoadingPaws from 'components/LoadingPaws/LoadingPaws';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const Navigator = () => {
  const { exploredBreeds, showMoveButtons, tap, handleFav } = useExploredBreedsContext();
  const { swiper, activeSwiperIndex } = useSwiperContext();

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
      <div className={styles.navigator__title_container}>
        {/* TITLE */}
        <h2>{(showMoveButtons && exploredBreeds[activeSwiperIndex].name) || <LoadingPaws />}</h2>
        {/* HEARTH */}
        {showMoveButtons && exploredBreeds[activeSwiperIndex].name ? (
          <div
            className={styles.navigator__title_container__fav_button}
            onClick={() => handleFav(activeSwiperIndex)}>
            {!exploredBreeds[activeSwiperIndex].fav ? (
              <HeartOutlined />
            ) : (
              <div>
                {tap ? (
                  <motion.div
                    style={{ position: 'absolute' }}
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.7 }}
                    transition={{ ease: 'easeOut' }}>
                    <HeartFilled style={{ color: 'var(--color-primary)' }} />
                  </motion.div>
                ) : null}
                <HeartFilled style={{ color: 'var(--color-primary)' }} />
              </div>
            )}
          </div>
        ) : null}
      </div>
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
