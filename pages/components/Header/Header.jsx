import NavButton from 'components/NavButton/NavButton';
import styles from './Header.module.scss';
import Image from 'next/image';
import { useTourContext } from 'pages/context/tour.context';
import { Modal } from 'antd';
import { useState } from 'react';
import { useExploredBreedsContext } from 'pages/context/exploredBreeds.context';
import { useSwiperContext } from 'pages/context/swiper.context';
import PathModal from '../PathModal/PathModal';
import { useModalsContext } from 'pages/context/modals.context';

const Header = () => {
  const { ref4 } = useTourContext();
  const { setPathModalOpen } = useModalsContext();

  ////COMPONENT
  return (
    <div className={styles.header}>
      <div className={styles.header__max_width_container}>
        <div className={styles.header__max_width_container__content}>
          <Image src={'images/paw-explorer-logo.svg'} width={180} height={63} alt='PawMatch logo' />
          <nav ref={ref4}>
            <NavButton onClick={() => setPathModalOpen(true)}>
              <Image src={'icons/path-icon.svg'} width={50} height={50} alt='Path icon' />
            </NavButton>
            <NavButton>
              <Image src={'icons/burger-icon.svg'} width={50} height={50} alt='Burger icon' />
            </NavButton>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
