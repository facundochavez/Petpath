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
import PathModal from './components/PathModal/PathModal';
import { useGlobalContext } from './context/global.context';

export default function Home() {
  const { globalContext } = useGlobalContext();
  const { allCatsLength, setAllCatsLength } = useExploredBreedsContext();

  // RESET BACKEND
  useEffect(() => {
    async function firstFetch() {
      const response = await fetch(`http://localhost:8000/get_breed/?reset=${true}`);
      const data = await response.text();
      const length = parseInt(data);
      {
        allCatsLength === 0 && setAllCatsLength(length);
      }
    }
    firstFetch();
  }, []);

  //// COMPONENT
  return (
    <>
      <Head>
        <title>Paw Explorer</title>
        <link rel='icon' href='/images/paw-explorer-symbol.svg' type='image/svg+xml' />
      </Head>
      <Header />
      <main className={styles.main}>
        {
          (globalContext === 'start' ? (
            <StartOptions />
          ) : (
            <>
              <Navigator />
              <Carousel />
            </>
          ))
        }
      </main>
      <Tour />
      <PathModal />
    </>
  );
}
