import styles from './LoginForm.module.scss';
import { Button, ConfigProvider, theme } from 'antd';
import { Input, Form } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { message } from 'antd';
import { auth } from '../../../firebase';

import { useModalsContext } from 'pages/context/modals.context';
import { useAuthContext } from 'pages/context/auth.context';
import { useSwiperContext } from 'pages/context/swiper.context';

const LoginForm = () => {
  const [form] = Form.useForm();
  const { dispatch } = useAuthContext();
  const { setLoginModalOpen, setResetPasswordForm } = useModalsContext();
  const [loading, setLoading] = useState(false);
  const [validateEmailTrigger, setValidateEmailTrigger] = useState('onBlur');
  const { setActiveSwiperIndex } = useSwiperContext();

  //// ON FINISH AND ON FINISH FAILED
  const onFinish = (values) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        setActiveSwiperIndex(0);
        dispatch({ type: 'LOGIN', payload: user });
        successAntMessage();
        setLoading(false);
        setLoginModalOpen(false);
        form.resetFields();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        if (errorCode === 'auth/user-not-found') {
          errorAntMessage('User not found.');
        } else if (errorCode === 'auth/wrong-password') {
          errorAntMessage('Wrong password.');
        } else {
          errorAntMessage(`Oops! We're experiencing some issues. Please try again later.`);
        }
        setLoading(false);
      });
  };
  const onFinishFailed = () => {
    setValidateEmailTrigger('onChange');
  };

  //// ANT MESSAGES
  const [messageApi, contextHolder] = message.useMessage();
  function successAntMessage() {
    messageApi.open({
      type: 'success',
      content: 'You are logged in!',
      style: {
        marginTop: 85
      }
    });
  }
  function errorAntMessage(errorMessage) {
    messageApi.open({
      type: 'error',
      content: errorMessage,
      style: {
        marginTop: 85
      }
    });
  }

  //// COMPONENT
  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm
        }}>
        {contextHolder}
      </ConfigProvider>
      <Form
        form={form}
        name='login'
        className={styles.login_form}
        layout='vertical'
        requiredMark='optional'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='on'>
        <Form.Item
          label='E-mail:'
          name='email'
          validateTrigger={validateEmailTrigger}
          rules={[
            {
              required: true,
              message: 'Please input your E-mail.'
            },
            {
              type: 'email',
              message: 'Please input a valid E-mail.'
            }
          ]}>
          <Input
            placeholder='Enter your E-mail'
            size='large'
            onBlur={() => setValidateEmailTrigger('onChange')}
          />
        </Form.Item>

        <Form.Item
          label='Password:'
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password.'
            }
          ]}>
          <Input.Password placeholder='Enter your password' size='large' />
        </Form.Item>

        <div className={styles.login_form__forgot_password}>
          <span onClick={() => setResetPasswordForm(true)}>Forgot password?</span>
        </div>

        <Button type='primary' htmlType='submit' size='large' loading={loading}>
          Log in
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
