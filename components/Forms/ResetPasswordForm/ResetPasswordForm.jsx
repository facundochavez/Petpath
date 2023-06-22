import styles from './ResetPasswordForm.module.scss';
import { Button, ConfigProvider, theme } from 'antd';
import { Input, Form } from 'antd';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { message } from 'antd';
import { auth } from '../../../firebase';
import { useModalsContext } from 'pages/context/modals.context';

const ResetPasswordForm = () => {
  const [form] = Form.useForm();
  const { setLoginModalOpen, setResetPasswordForm } = useModalsContext();
  const [loading, setLoading] = useState(false);
  const [validateEmailTrigger, setValidateEmailTrigger] = useState('onBlur');

  //// ON FINISH AND ON FINISH FAILED
  const onFinish = (values) => {
    setLoading(true);
    sendPasswordResetEmail(auth, values.email)
      .then(() => {
        successAntMessage();
        setLoading(false);
        setLoginModalOpen(false);
        setResetPasswordForm(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        if (errorCode === 'auth/user-not-found') {
          errorAntMessage(`User not found!`);
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
      content: 'We send you an E-mail to reset your password!',
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
        name='reset-password'
        className={styles.reset_password_form}
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

        <div className={styles.reset_password_form__back_to_login}>
          <span onClick={() => setResetPasswordForm(false)}>{'< Back to Login'}</span>
        </div>

        <Button type='primary' htmlType='submit' size='large' loading={loading}>
          Reset password
        </Button>
      </Form>
    </>
  );
};

export default ResetPasswordForm;
