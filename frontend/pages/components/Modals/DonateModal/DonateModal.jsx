import styles from './DonateModal.module.scss';
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
  okText: 'Donate now',
  cancelText: 'No, thanks'
};

const DonateModal = () => {
  const { donateModalOpen, setDonateModalOpen } = useModalsContext();

  //// COMPONENT
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm
      }}>
      <Modal
        closeIcon={false}
        open={donateModalOpen}
        onOk={() => {
          window.open("https://paypal.me/FacundoChavez?country.x=AR&locale.x=es_XC", "_blank");
          setDonateModalOpen(false);
        }}
        onCancel={() => setDonateModalOpen(false)}
        {...confirmModalStyle}>
        <div className={styles.donate_modal}>
          <span>Are you enjoying this app?</span>
          <p>
            You can support my work by donating any amount you like via PayPal. Donations will be
            used to create more free applications and buy kibble for my pets.
            <br/>🐱🐶❤️
          </p>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default DonateModal;
