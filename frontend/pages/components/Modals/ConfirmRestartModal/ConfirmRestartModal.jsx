import styles from './ConfirmRestartModal.module.scss';
import { useModalsContext } from 'context/modals.context';
import { ConfigProvider, theme } from 'antd';
import { Modal } from 'antd';
import CloseButton from 'components/CloseButton/CloseButton';
import { useExploredBreedsContext } from 'context/exploredBreeds.context';

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
          <p>You will lose the path you&apos;ve made so far.</p>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default ConfirmRestartModal;
