import NavButton from 'components/NavButton/NavButton';
import styles from './Header.module.scss';
import Image from 'next/image';
import { useTourContext } from 'pages/context/tour.context';
import { useExploredBreedsContext } from 'pages/context/exploredBreeds.context';
import { useModalsContext } from 'pages/context/modals.context';
import { Dropdown } from 'antd';
import { useGlobalContext } from 'pages/context/global.context';
import { AnimatePresence } from 'framer-motion';
import { useAuthContext } from 'pages/context/auth.context';
import { LogoutOutlined, RedoOutlined, StepForwardOutlined, UserOutlined } from '@ant-design/icons';
import { useSwiperContext } from 'pages/context/swiper.context';

const Header = () => {
  const { ref4 } = useTourContext();
  const {
    setPathModalOpen,
    setLoginModalOpen,
    setConfirmRestartModalOpen,
    setConfirmLogoutModalOpen
  } = useModalsContext();
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { currentUser } = useAuthContext();
  const { startTour } = useTourContext();
  const { exploredCats, showMoveButtons } = useExploredBreedsContext();

  const items = [
    !currentUser
      ? {
          label: 'Login / Sign up',
          icon: <UserOutlined />,
          key: '0',
          onClick: () => setLoginModalOpen(true)
        }
      : {
          label: `${currentUser.email}`,
          type: 'text',
          block: 'true'
        },
    {
      label: 'Start tour',
      icon: <StepForwardOutlined />,
      key: '1',
      onClick: () => {
        setGlobalContext('tour');
        startTour();
      },
      disabled: !showMoveButtons
    },
    {
      label: 'Restart my path',
      icon: <RedoOutlined />,
      key: '2',
      disabled: exploredCats.length === 0,
      onClick: () => setConfirmRestartModalOpen(true)
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
      onClick: () => setConfirmLogoutModalOpen(true)
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
            <NavButton>
              <Dropdown
                menu={{
                  items
                }}
                placement='bottomRight'
                trigger='click'>
                <Image src={'icons/burger-icon.svg'} width={50} height={50} alt='Burger icon' />
              </Dropdown>
            </NavButton>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
