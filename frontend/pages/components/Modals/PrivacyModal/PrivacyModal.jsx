import styles from './PrivacyModal.module.scss';
import { useModalsContext } from 'context/modals.context';
import { ConfigProvider, theme } from 'antd';
import { Modal, Tabs } from 'antd';
import CloseButton from 'components/CloseButton/CloseButton';

const PrivacyModal = () => {
  const { privacyModalOpen, setPrivacyModalOpen } = useModalsContext();

  ////COMPONENT
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm
      }}>
      <Modal
        width={500}
        title='Privacy Policy'
        centered
        open={privacyModalOpen}
        onCancel={() => setPrivacyModalOpen(false)}
        closeIcon={<CloseButton />}
        footer={null}>
        <div className={styles.privacy_modal}>
          <p>Last updated: August 30, 2023</p>
          <h3>Welcome to Petpath! </h3>
          <p>
            Your privacy is important to us. This Privacy Policy explains how we collect, use, and
            safeguard your personal information when you use Petpath&apos;s website and services.
          </p>
          <h3>Information We Collect </h3>
          <p>
            We only collect your email address and password for registration purposes. Your email
            address will be used to notify you about new features and changes in our application. We
            do not share or use your email address for any other purpose.
          </p>
          <h3>How We Use Your Information</h3>
          <p>
            Your email address is used solely to inform you about new features and policy changes
            within the application. We do not send newsletters or promotional content.
          </p>
          <h3>Data Security</h3>
          <p>
            We take data security seriously. Your information is stored securely on Firebase
            servers.
          </p>
          <h3>Notifications</h3>
          <p>
            You may receive occasional notifications about new features or changes. These
            notifications are infrequent and aim to enhance your experience with our application.
          </p>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default PrivacyModal;
