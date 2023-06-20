import styles from './ConfirmModals.module.scss';
import { useModalsContext } from 'pages/context/modals.context';
import { ConfigProvider, theme } from 'antd';
import { Modal } from 'antd';
import CloseButton from 'components/CloseButton/CloseButton';
import { useExploredBreedsContext } from 'pages/context/exploredBreeds.context';
import { useSwiperContext } from 'pages/context/swiper.context';
import { useAuthContext } from 'pages/context/auth.context';

const confirmModalStyle = {
  centered: 'true',
  width: '500',
  closeIcon: <CloseButton />,
  okButtonProps: { size: 'large' },
  cancelButtonProps: { size: 'large' },
  okText: 'Yes',
  cancelText: 'No'
};

const ConfirmRestartModal = () => {
  const { confirmRestartModalOpen, setConfirmRestartModalOpen } = useModalsContext();
  const { restartPath } = useExploredBreedsContext();

  //// COMPONENT
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm
      }}>
      <Modal
        closeIcon={false}
        open={confirmRestartModalOpen}
        onOk={async () => {
          setConfirmRestartModalOpen(false);
          await restartPath();
        }}
        onCancel={() => setConfirmRestartModalOpen(false)}
        {...confirmModalStyle}>
        <div className={styles.confirm_modal}>
          <span>Are you sure you want to restart?</span>
          <p>You will lose the path you've made so far.</p>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

const ConfirmLogoutModal = () => {
  const { confirmLogoutModalOpen, setConfirmLogoutModalOpen } = useModalsContext();
  const { setExploredCats } = useExploredBreedsContext();
  const { setActiveSwiperIndex } = useSwiperContext();
  const { dispatch } = useAuthContext();

  //// COMPONENT
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm
      }}>
      <Modal
        open={confirmLogoutModalOpen}
        onOk={() => {
          setConfirmLogoutModalOpen(false);
          setActiveSwiperIndex(0);
          dispatch({ type: 'LOGOUT' });
          localStorage.clear();
          setExploredCats([]);
        }}
        onCancel={() => setConfirmLogoutModalOpen(false)}
        {...confirmModalStyle}>
        <div className={styles.confirm_modal}>
          <span>Are you sure you want to logout?</span>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export { ConfirmRestartModal as ConfirmResetModal, ConfirmLogoutModal };
