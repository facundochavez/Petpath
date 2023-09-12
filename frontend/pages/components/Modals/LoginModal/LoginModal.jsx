import { useModalsContext } from 'context/modals.context';
import { ConfigProvider, theme } from 'antd';
import styles from './LoginModal.module.scss';
import { Modal, Tabs } from 'antd';
import CloseButton from 'components/CloseButton/CloseButton';
import { useState } from 'react';
import LoginForm from 'components/Forms/LoginForm/LoginForm';
import SignUpForm from 'components/Forms/SignUpForm/SignUpForm';
import ResetPasswordForm from 'components/Forms/ResetPasswordForm/ResetPasswordForm';

const LoginModal = () => {
  const {
    activeKey,
    setActiveKey,
    loginModalOpen,
    setLoginModalOpen,
    resetPasswordForm,
    setResetPasswordForm
  } = useModalsContext();

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
            activeKey={activeKey}
            items={[
              {
                key: '1',
                label: `Login`,
                children: resetPasswordForm ? <ResetPasswordForm /> : <LoginForm />
              },
              {
                key: '2',
                label: `Sign up`,
                children: <SignUpForm />
              }
            ]}
            className={styles.tabs}
            onChange={() => {
              setResetPasswordForm(false);
              setActiveKey(activeKey === '1' ? '2' : '1');
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
        footer={null}
      />
    </ConfigProvider>
  );
};

export default LoginModal;
