import styles from './Carousel.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
SwiperCore.use([Navigation]);
import { useTourContext } from 'pages/context/tour.context';
import { useExploredBreedsContext } from 'pages/context/exploredBreeds.context';
import { useSwiperContext } from 'pages/context/swiper.context';
import BreedCard from 'components/BreedCard/BreedCard';
import { useGlobalContext } from 'pages/context/global.context';
import { useRef, useEffect } from 'react';

const Carousel = () => {
  const swiperRef = useRef(null);
  const { globalContext, showLoadingScreen, setShowLoadingScreen } = useGlobalContext();
  const { exploredCats, showMoveButtons } = useExploredBreedsContext();
  const { tourIsActive, tourCat } = useTourContext();
  const { swiper, setSwiper, setActiveSwiperIndex } = useSwiperContext();
  const exploredBreeds = globalContext === 'tour' ? [tourCat] : exploredCats;

  useEffect(() => {
    if (exploredBreeds.length > 1 && swiper && swiper.params) {
      setTimeout(() => {
        swiper.slideTo(exploredBreeds.length - 1);
      }, 150);
    }
    if (showLoadingScreen === 'yourPath') {
      setTimeout(() => {
        setShowLoadingScreen('none');
      }, 500);
    }
  }, [swiper, exploredBreeds[exploredBreeds.length - 1], exploredBreeds.length]);

  ////COMPONENT
  return (
    <section className={styles.carousel} style={{ pointerEvents: tourIsActive ? 'none' : 'unset' }}>
      <Swiper
        ref={swiperRef}
        touchStartPreventDefault={false}
        onSlideChange={(s) => setActiveSwiperIndex(s.activeIndex)}
        onSwiper={(s) => setSwiper(s)}
        style={{
          width: '100%',
          maxWidth: '400px',
          overflow: 'visible'
        }}
        slidesPerView={1}
        spaceBetween={0}
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
