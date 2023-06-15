import { useModalsContext } from 'pages/context/modals.context';
import { Button, ConfigProvider, theme } from 'antd';
import styles from './LoginModal.module.scss';
import { Modal, Tabs, Input, Form } from 'antd';
import CloseButton from 'components/CloseButton/CloseButton';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import LoginForm from 'components/Forms/LoginForm/LoginForm';
import SignUpForm from 'components/Forms/SignUpForm/SignUpForm';

const LoginModal = () => {
  const { loginModalOpen, setLoginModalOpen } = useModalsContext();
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
            onChange={() => setLogin(!login)}
          />
        }
        centered
        open={loginModalOpen}
        onCancel={() => setLoginModalOpen(false)}
        closeIcon={<CloseButton />}
        footer={null}>
        {login ? <LoginForm /> : <SignUpForm />}
      </Modal>
    </ConfigProvider>
  );
};

export default LoginModal;
