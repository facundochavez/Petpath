import Header from 'components/Header/Header';
import MoveButton from 'components/MoveButton/MoveButton';
import BreedCard from 'components/BreedCard/BreedCard';
import styles from 'styles/home.module.scss';
import Head from 'next/head';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingPaws from 'components/LoadingPaws/LoadingPaws';
import StartOptions from 'components/StartOptions/StartOptions';
import tourBreeds from '../data/tourBreedsData.json';
import { useRef } from 'react';
import { Tour, ConfigProvider } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
const { cat } = tourBreeds;

export default function Home() {
  const [exploredBreeds, setExploredBreeds] = useState([]);
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showMoveButtons, setShowMoveButtons] = useState(true);

  // RESET
  useEffect(() => {
    fetch(`http://localhost:8000/get_breed/?reset=${true}`);
  }, []);

  // TOUR
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const [showTour, setShowTour] = useState(false);
  const steps = [
    {
      title: 'Welcome to Paw Explorer!',
      description: `At first we'll give you a random breed...`,
      placement: 'top',
      target: () => ref1.current,
    },
    {
      title: 'Breed levels',
      description: `These are the breed levels. Here you can learn a lot about the animal behavior and its traits.`,
      target: () => ref2.current,
    },
    {
      title: 'Make a request!',
      description: `By selecting any button, you can ask for more, equal or less of that level. We'll give you a new breed that meets that requirement, trying to keep the other levels close enough.`,
      target: () => ref3.current,
    },
    {
      title: 'Path and options',
      description: (
        <div>
          <p>
            Here you can view the path you've made so far. Additionally, you can
            sign up or log in to save your path and favorite breeds.
          </p>
          <p>
            <br />
            <b>And thats all! Let's explore some breeds!</b>
          </p>
        </div>
      ),
      target: () => ref4.current,
    },
  ];
  function startTour() {
    setExploredBreeds([cat]);
    setTimeout(() => {
      setShowTour(true);
    }, 500);
  }

  //// ADD NEW BREED
  async function addNewBreed({
    selected_index,
    selected_level,
    selected_action,
  }) {
    const loadingBreed = {
      id: null,
      name: null,
      images: null,
      description: null,
      fav: null,
      selected_level: null,
      selected_action: null,
      levels: [null, null, null, null, null, null],
      extra_levels: [null, null, null, null, null, null],
    };

    setShowMoveButtons(false);

    // HANDLE REQUEST ARROW IF CARD IS DEFINED
    {
      selected_index !== undefined &&
        handleRequestArrow(selected_index, selected_level, selected_action);
    }

    // TAKING OF THE LAST CARDS IF SELECTED INDEX IS NOT LAST
    {
      selected_index + 1 < exploredBreeds.length &&
        setExploredBreeds((prevExploredBreeds) => [
          ...prevExploredBreeds.slice(0, selected_index + 1),
        ]);
    }

    // PUTTING LOADING CARD
    setExploredBreeds((prevExploredBreeds) => [
      ...prevExploredBreeds,
      loadingBreed,
    ]);

    // SWIPE TO NEXT CARD IF ISN'T THE FIRST ONE
    {
      exploredBreeds.length !== 0 &&
        setTimeout(() => {
          swiper.slideNext();
        }, 150);
    }

    // GETING NEW BREED
    const response = await fetch(
      `http://localhost:8000/get_breed/?selected_index=${selected_index}&selected_level=${selected_level}&selected_action=${selected_action}`
    );
    const newBreed = await response.json();
    setExploredBreeds((prevExploredBreeds) => [
      ...prevExploredBreeds.slice(0, -1),
      newBreed,
    ]);

    setShowMoveButtons(true);
  }

  //// HANDLE SELECTED LEVEL AND ACTION (FOR REQUEST ARROW)
  function handleRequestArrow(selected_index, selected_level, selected_action) {
    const newExploredBreeds = [...exploredBreeds];
    newExploredBreeds[selected_index].selectedLevel = selected_level;
    newExploredBreeds[selected_index].selectedAction = selected_action;
    setExploredBreeds(newExploredBreeds);
  }

  //// HANDLE FAVOURITE
  const [tap, setTap] = useState(false);
  function handleFav(index) {
    setTap(true);
    const newExploredBreeds = [...exploredBreeds];
    newExploredBreeds[index].fav = !newExploredBreeds[index].fav;
    setExploredBreeds(newExploredBreeds);
    setTimeout(() => {
      setTap(false);
    }, 300);
  }

  //// COMPONENT
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#00BC6B',
          },
        }}
      >
        <Head>
          <title>Paw Explorer</title>
          <link
            rel='icon'
            href='/images/paw-explorer-symbol.svg'
            type='image/svg+xml'
          />
        </Head>
        <Header ref4={ref4} />
        <main className={styles.main}>
          {exploredBreeds.length == 0 ? (
            /* START OPTIONS */
            <StartOptions startTour={startTour} addNewBreed={addNewBreed} />
          ) : (
            <>
              {/* NAVIGATION SECTION */}
              <section className={styles.navigator_section}>
                {/* PREVIOUS BUTTON */}
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
                {/* TITLE CONTAINER */}
                <div className={styles.navigator_section__title_container}>
                  {/* TITLE */}
                  <h2>
                    {(showMoveButtons && exploredBreeds[activeIndex].name) || (
                      <LoadingPaws />
                    )}
                  </h2>
                  {/* HEARTH */}
                  {showMoveButtons && exploredBreeds[activeIndex].name ? (
                    <div
                      className={
                        styles.navigator_section__title_container__fav_button
                      }
                      onClick={() => handleFav(activeIndex)}
                    >
                      {!exploredBreeds[activeIndex].fav ? (
                        <HeartOutlined />
                      ) : (
                        <>
                          {tap ? (
                            <motion.div
                              style={{ position: 'absolute' }}
                              initial={{ opacity: 1, scale: 1 }}
                              animate={{ opacity: 0, scale: 1.7 }}
                              transition={{ ease: 'easeOut' }}
                            >
                              <HeartFilled
                                style={{ color: 'var(--color-primary)' }}
                              />
                            </motion.div>
                          ) : null}
                          <HeartFilled
                            style={{ color: 'var(--color-primary)' }}
                          />
                        </>
                      )}
                    </div>
                  ) : null}
                </div>
                {/* NEXT BUTTON */}
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
              <section
                className={styles.carousel_section}
                style={{ pointerEvents: showTour ? 'none' : 'unset' }}
              >
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
                  {exploredBreeds.map((item, index) => {
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
                            cardIndex={index}
                            ref1={ref1}
                            ref2={ref2}
                            ref3={ref3}
                            ref4={ref4}
                          />
                        )}
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </section>
            </>
          )}
        </main>
        <Tour
          open={showTour}
          onClose={() => {
            setShowTour(false);
            setExploredBreeds([]);
          }}
          steps={steps}
          onFinish={() => setExploredBreeds([])}
        />
      </ConfigProvider>
    </>
  );
}
/* 
export async function getServerSideProps() {
  const firstBreed = await getBreed('none', 'none', 'none');
  return {
    props: {
      firstBreed,
    },
  };
} */
