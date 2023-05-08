import Header from 'components/Header/Header';
import MoveButton from 'components/MoveButton/MoveButton';
import BreedCard from 'components/BreedCard/BreedCard';
import styles from 'styles/home.module.scss';
import Head from 'next/head';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useState, useEffect } from 'react';
import getBreed from 'services/getBreed';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingPaws from 'components/LoadingPaws/LoadingPaws';
import StartOptions from 'components/StartOptions/StartOptions';

export default function Home() {
  const [exploredBreeds, setExploredBreeds] = useState([]);
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showMoveButtons, setShowMoveButtons] = useState(true);
  const [showTour, setShowTour] = useState(false);

  // ADD NEW BREED
  async function addNewBreed({ tour } = { tour: false }) {
    const loadingBreed = {
      id: null,
      name: null,
      images: null,
      description: null,
      levels: [null, null, null, null, null, null],
      extra_levels: [null, null, null, null, null, null],
      from_id: null,
      from_level: null,
      from_requeriment: null,
    };
    setShowMoveButtons(false);
    setExploredBreeds((prevExploredBreeds) => [
      ...prevExploredBreeds,
      loadingBreed,
    ]);

    // SWIPE TO NEXT CARD IF ISN'T FIRST ONE
    {
      exploredBreeds.length !== 0 &&
        setTimeout(() => {
          swiper.slideNext();
        }, 150);
    }

    // GETING NEW BREED
    const newBreed = await getBreed({ tour: tour });
    setTimeout(() => {
      setExploredBreeds((prevExploredBreeds) => [
        ...prevExploredBreeds.slice(0, -1),
        newBreed,
      ]);
    }, !tour? 500 : 0);
    setShowMoveButtons(true);
  }

  // HANDLE TOUR
  const handleTour = () => {
    addNewBreed({ tour: true });
  };

  //// COMPONENT
  return (
    <>
      <Head>
        <title>Paw Explorer</title>
      </Head>
      <Header />
      <main className={styles.main}>
        {exploredBreeds.length == 0 ? (
          /* START OPTIONS */
          <StartOptions handleTour={handleTour} addNewBreed={addNewBreed} />
        ) : (
          /* SWIPER */
          <>
            {/* NAVIGATION SECTION */}
            <section className={styles.navigator_section}>
              <div className={styles.navigator_section__button_container}>
                <AnimatePresence>
                  {showMoveButtons &&
                    activeIndex > 0 &&
                    exploredBreeds[activeIndex].name && (
                      <MoveButton
                        type='previous'
                        onClick={() => swiper.slidePrev()}
                      />
                    )}
                </AnimatePresence>
              </div>
              <div className={styles.navigator_section__title_container}>
                <h2>
                  {(showMoveButtons && exploredBreeds[activeIndex].name) || (
                    <LoadingPaws />
                  )}
                </h2>
              </div>
              <div className={styles.navigator_section__button_container}>
                <AnimatePresence>
                  {showMoveButtons &&
                    activeIndex + 1 < exploredBreeds.length && (
                      <MoveButton
                        type='next'
                        onClick={() => swiper.slideNext()}
                      />
                    )}
                </AnimatePresence>
              </div>
            </section>

            {/* CAROUSEL SECTION */}
            <section className={styles.carousel_section}>
              <Swiper
                touchStartPreventDefault={false}
                onSwiper={(s) => {
                  setSwiper(s);
                }}
                onSlideChange={(s) => setActiveIndex(s.activeIndex)}
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  overflow: 'visible',
                }}
                slidesPerView={1}
                spaceBetween={0}
                navigation={false}
                speed={500}
                allowSlidePrev={exploredBreeds[activeIndex].name}
              >
                {!showTour ? (
                  exploredBreeds.map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        {({ isActive, isPrev }) => (
                          <BreedCard
                            isFirst={index + 1 === 1}
                            isLast={index + 1 === exploredBreeds.length}
                            isActive={isActive}
                            isPrev={isPrev}
                            breed={item}
                            addNewBreed={addNewBreed}
                          />
                        )}
                      </SwiperSlide>
                    );
                  })
                ) : (
                  <TourCards />
                )}
              </Swiper>
            </section>
          </>
        )}
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const firstBreed = await getBreed('none', 'none', 'none');
  return {
    props: {
      firstBreed,
    },
  };
}
