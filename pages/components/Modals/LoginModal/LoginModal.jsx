import { useModalsContext } from 'pages/context/modals.context';
import { ConfigProvider, theme } from 'antd';
import styles from './LoginModal.module.scss';
import { Modal, Tabs } from 'antd';
import CloseButton from 'components/CloseButton/CloseButton';
import { useState } from 'react';
import LoginForm from 'components/Forms/LoginForm/LoginForm';
import SignUpForm from 'components/Forms/SignUpForm/SignUpForm';
import ResetPasswordForm from 'components/Forms/ResetPasswordForm/ResetPasswordForm';

const LoginModal = () => {
  const { loginModalOpen, setLoginModalOpen, resetPasswordForm, setResetPasswordForm } =
    useModalsContext();
  const [login, setLogin] = useState(true);

  ////COMPONENT
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm
      }}>
      <Modal
        width={500}
        title={
          <Tabs
            defaultActiveKey='1'
            items={[
              {
                key: '1',
                label: `Login`
              },
              {
                key: '2',
                label: `Sign up`
              }
            ]}
            className={styles.tabs}
            onChange={() => {
              setLogin(!login);
              setResetPasswordForm(false);
            }}
          />
        }
        centered
        open={loginModalOpen}
        onCancel={() => {
          setLoginModalOpen(false);
          setResetPasswordForm(false);
        }}
        closeIcon={<CloseButton />}
        footer={null}>
        {login && resetPasswordForm ? (
          <ResetPasswordForm />
        ) : login ? (
          <LoginForm />
        ) : (
          <SignUpForm />
        )}
      </Modal>
    </ConfigProvider>
  );
};

export default LoginModal;
