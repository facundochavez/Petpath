import styles from './TermsModal.module.scss';
import { useModalsContext } from 'pages/context/modals.context';
import { ConfigProvider, theme } from 'antd';
import { Modal, Tabs } from 'antd';
import CloseButton from 'components/CloseButton/CloseButton';

const TermsModal = () => {
  const { termsModalOpen, setTermsModalOpen, isSigningUp, setIsSigningUp, setLoginModalOpen } =
    useModalsContext();

  ////COMPONENT
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm
      }}>
      <Modal
        width={500}
        title='Terms and Conditions'
        centered
        open={termsModalOpen}
        onCancel={() => {
          setTermsModalOpen(false);
          if (isSigningUp) {
            setIsSigningUp(false);
            setLoginModalOpen(true);
          }
        }}
        closeIcon={<CloseButton />}
        footer={null}>
        <div className={styles.terms_modal}>
          <p>Last updated: August 30, 2023</p>
          <h3>Welcome to Petpath! </h3>
          <p>
            By using our application, you agree to these Terms and Conditions. Please read them
            carefully.
          </p>
          <h3>User Registration </h3>
          <p>
            When you register with Petpath, you agree to provide accurate and complete information.
            You are responsible for maintaining the confidentiality of your account.
          </p>
          <h3>Use of Information</h3>
          <p>
            Your email address and password are collected for the sole purpose of providing you
            access to our application and notifying you about new features and policy changes. We do
            not share or use your information for any other purpose.
          </p>
          <h3>Notifications</h3>
          <p>
            You may receive occasional notifications from us about updates and changes to the
            application. These notifications are infrequent and informative.
          </p>
          <h3>Donations</h3>
          <p>
            We offer a donation option through PayPal. Donations are voluntary and will be used to
            support the maintenance and enhancement of this and other free applications.
          </p>
          <h3>Changes to Terms</h3>
          <p>
            We reserve the right to update or modify these Terms and Conditions at any time. By
            continuing to use the application after such changes, you agree to the modified terms.
          </p>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default TermsModal;
