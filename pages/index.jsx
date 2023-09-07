import styles from 'styles/home.module.scss';
import Header from 'pages/components/Header/Header';
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
import ConfirmRestartModal from './components/Modals/ConfirmRestartModal/ConfirmRestartModal';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Footer from './components/Footer/Footer';
import PrivacyModal from './components/Modals/PrivacyModal/PrivacyModal';
import TermsModal from './components/Modals/TermsModal/TermsModal';
import DonateModal from './components/Modals/DonateModal/DonateModal';

export default function Home() {
  const { setExploredCats, exploredCats, setShowMoveButtons } = useExploredBreedsContext();
  const { globalContext, setShowLoadingScreen } = useGlobalContext();
  const { currentUser } = useAuthContext();
  const { getDataBaseBreeds, getExploredCats, resetBackend } = useBackendContext();
  const { setActiveSwiperIndex } = useSwiperContext();

  useEffect(() => {
    const handleExploredCats = async () => {
      if (currentUser) {
        setShowLoadingScreen('yourPath')
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, getExploredCats.length]);

  //// COMPONENT
  return (
    <>
      <Head>
        <title>Petpath</title>
        <link rel='icon' href='/images/petpath-symbol.svg' type='image/svg+xml' />
      </Head>
      <Header />
      <LoadingScreen />
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
      <Footer />
      <Tour />
      <PathModal />
      <LoginModal />
      <ConfirmRestartModal />
      <PrivacyModal />
      <TermsModal />
      <DonateModal />
    </>
  );
}
