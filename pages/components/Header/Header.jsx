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
import { Dropdown, Space } from 'antd';
import { useGlobalContext } from 'pages/context/global.context';
import { AnimatePresence } from 'framer-motion';
import { useAuthContext } from 'pages/context/auth.context';
import { LogoutOutlined, RedoOutlined, StepForwardOutlined, UserOutlined } from '@ant-design/icons';

const Header = () => {
  const { ref4 } = useTourContext();
  const { setPathModalOpen, setLoginModalOpen } = useModalsContext();
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { dispatch } = useAuthContext();
  const { currentUser } = useAuthContext();
  const { startTour } = useTourContext();
  const { exploredCats } = useExploredBreedsContext();

  const items = [
    !currentUser && {
      label: 'Login / Sign up',
      icon: <UserOutlined />,
      key: '0',
      onClick: () => setLoginModalOpen(true),
      visible: false
    },
    {
      label: 'Start tour',
      icon: <StepForwardOutlined />,
      key: '1',
      onClick: () => {
        setGlobalContext('tour');
        startTour();
      }
    },
    {
      label: 'Restart my path',
      icon: <RedoOutlined />,
      key: '2',
      disabled: exploredCats.length === 0
    },
    {
      type: 'divider'
    },
    {
      label: 'Logout',
      icon: <LogoutOutlined />,
      key: '3',
      disabled: !currentUser,
      danger: true,
      onClick: () => {
        dispatch({ type: 'LOGOUT' });
      }
    }
  ];

  ////COMPONENT
  return (
    <div className={styles.header}>
      <div className={styles.header__max_width_container}>
        <div className={styles.header__max_width_container__content}>
          <Image src={'images/paw-explorer-logo.svg'} width={145} height={60} alt='PawMatch logo' />
          <nav ref={ref4}>
            <AnimatePresence>
              {(exploredCats.length !== 0 || globalContext === 'tour') && (
                <NavButton onClick={() => setPathModalOpen(true)}>
                  <Image src={'icons/path-icon.svg'} width={50} height={50} alt='Path icon' />
                </NavButton>
              )}
            </AnimatePresence>
            <Dropdown
              menu={{
                items
              }}
              placement='bottomRight'
              trigger={['click']}>
              <NavButton>
                <Image src={'icons/burger-icon.svg'} width={50} height={50} alt='Burger icon' />
              </NavButton>
            </Dropdown>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
