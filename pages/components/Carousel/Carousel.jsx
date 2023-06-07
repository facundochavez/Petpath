import styles from './Carousel.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
SwiperCore.use([Navigation]);
import { useTourContext } from 'pages/context/tour.context';
import { useExploredBreedsContext } from 'pages/context/exploredBreeds.context';
import { useSwiperContext } from 'pages/context/swiper.context';
import BreedCard from 'components/BreedCard/BreedCard';
import { useGlobalContext } from 'pages/context/global.context';

const Carousel = () => {
  const { globalContext } = useGlobalContext();
  const { exploredCats, showMoveButtons } = useExploredBreedsContext();
  const { showTour, tourCat } = useTourContext();
  const { setSwiper, setActiveSwiperIndex } = useSwiperContext();

  const exploredBreeds = globalContext === 'tour' ? [tourCat] : exploredCats;

  ////COMPONENT
  return (
    <section className={styles.carousel} style={{ pointerEvents: showTour ? 'none' : 'unset' }}>
      <Swiper
        touchStartPreventDefault={false}
        onSwiper={(s) => {
          setSwiper(s);
        }}
        onSlideChange={(s) => setActiveSwiperIndex(s.activeIndex)}
        style={{
          width: '100%',
          maxWidth: '400px',
          overflow: 'visible'
        }}
        slidesPerView={1}
        spaceBetween={0}
        navigation={false}
        speed={500}
        allowSlidePrev={showMoveButtons}>
        {exploredBreeds.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              {({ isActive, isPrev }) => (
                <BreedCard
                  key={index}
                  isFirst={index + 1 === 1}
                  isLast={index + 1 === exploredBreeds.length}
                  isActive={isActive}
                  isPrev={isPrev}
                  breed={item}
                  cardIndex={index}
                />
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Carousel;
