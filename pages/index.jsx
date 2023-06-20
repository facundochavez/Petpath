import Header from 'pages/components/Header/Header';
import styles from 'styles/home.module.scss';
import Head from 'next/head';
import 'swiper/css';
import { useEffect } from 'react';
import StartOptions from 'pages/components/StartOptions/StartOptions';
import { useExploredBreedsContext } from './context/exploredBreeds.context';
import Navigator from './components/Navigator/Navigator';
import Carousel from './components/Carousel/Carousel';
import Tour from './components/Tour/Tour';
import PathModal from './components/Modals/PathModal/PathModal';
import { useGlobalContext } from './context/global.context';
import LoginModal from './components/Modals/LoginModal/LoginModal';
import { useBackendContext } from './context/backend.context';
import { useAuthContext } from './context/auth.context';
import { useSwiperContext } from './context/swiper.context';
import {
  ConfirmResetModal,
  ConfirmLogoutModal
} from './components/Modals/ConfirmModals/ConfirmModals';

export default function Home() {
  const { setExploredCats, exploredCats, setShowMoveButtons } = useExploredBreedsContext();
  const { globalContext } = useGlobalContext();
  const { currentUser } = useAuthContext();
  const { getDataBaseBreeds, getExploredCats, resetBackend } = useBackendContext();
  const { setActiveSwiperIndex } = useSwiperContext();

  // RESET BACKEND
  useEffect(() => {
    const handleExploredCats = async () => {
      if (currentUser) {
        setShowMoveButtons(false);
        await getDataBaseBreeds(currentUser.uid);
        setActiveSwiperIndex(0);
        setExploredCats(getExploredCats);
        setShowMoveButtons(true);
      } else {
        setExploredCats([]);
        resetBackend();
      }
    };
    handleExploredCats();
  }, [currentUser, getExploredCats.length]);

  //// COMPONENT
  return (
    <>
      <Head>
        <title>Paw Explorer</title>
        <link rel='icon' href='/images/paw-explorer-symbol.svg' type='image/svg+xml' />
      </Head>
      <Header />
      <main className={styles.main}>
        {exploredCats.length === 0 && globalContext !== 'tour' ? (
          <StartOptions />
        ) : (
          <>
            <Navigator />
            <Carousel />
          </>
        )}
      </main>
      <Tour />
      <PathModal />
      <LoginModal />
      <ConfirmResetModal />
      <ConfirmLogoutModal />
    </>
  );
}
