import styles from './SignUpForm.module.scss';
import { Button, Checkbox, ConfigProvider, theme } from 'antd';
import { Input, Form } from 'antd';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { message } from 'antd';
import { auth } from '../../../firebase';
import { useModalsContext } from 'context/modals.context';
import { useAuthContext } from 'context/auth.context';
import { useExploredBreedsContext } from 'context/exploredBreeds.context';
import { useBackendContext } from 'context/backend.context';

const SignUpForm = () => {
  const [form] = Form.useForm();
  const { exploredCats } = useExploredBreedsContext();
  const { dispatch } = useAuthContext();
  const { setLoginModalOpen, setTermsModalOpen, setIsSigningUp } = useModalsContext();
  const { updateDataBaseBreeds } = useBackendContext();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [validateEmailTrigger, setValidateEmailTrigger] = useState('onBlur');
  const [validatePasswordTrigger, setValidatePasswordTrigger] = useState('onBlur');
  const [validateConfirmPasswordTrigger, setValidateConfirmPasswordTrigger] = useState('onBlur');

  //// ON FINISH AND ON FINISH FAILED
  const onFinish = (values) => {
    setLoading(true);

    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        updateDataBaseBreeds(user.uid, exploredCats);
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
        if (errorCode === 'auth/email-already-in-use') {
          errorAntMessage('The E-mail is already in use!');
        } else if (errorCode === 'auth/weak-password') {
          errorAntMessage('The password is too weak!');
        } else {
          errorAntMessage(`Oops! We're experiencing some issues. Please try again later.`);
        }
        setLoading(false);
      });
  };

  const onFinishFailed = () => {
    setValidateEmailTrigger('onChange');
    setValidatePasswordTrigger('onChange');
    setValidateConfirmPasswordTrigger('onChange');
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
        name='signup'
        className={styles.sign_up_form}
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
              message: 'Please input your E-mail'
            },
            {
              type: 'email',
              message: 'Please input a valid E-mail'
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
          hasFeedback={validatePasswordTrigger === 'onChange'}
          validateTrigger={validatePasswordTrigger}
          rules={[
            {
              required: true,
              message: 'Please input a password.'
            },
            { min: 6, message: 'At least 6 characters.' },
            { max: 20, message: 'Up to 20 characters.' },
            {
              validator: (_, value) =>
                value && /[a-zA-Z]/.test(value) && /\d/.test(value)
                  ? Promise.resolve()
                  : Promise.reject('At least one letter and one number.')
            }
          ]}>
          <Input.Password
            placeholder='Create your password'
            size='large'
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setValidatePasswordTrigger('onChange')}
          />
        </Form.Item>

        <Form.Item
          label='Confirm password:'
          name='confirmpassword'
          hasFeedback={validateConfirmPasswordTrigger === 'onChange'}
          validateTrigger={validateConfirmPasswordTrigger}
          rules={[
            {
              required: true,
              message: 'Please confirm your password.'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match.'));
              }
            })
          ]}>
          <Input.Password
            placeholder='Confirm your password'
            size='large'
            onChange={(e) => {
              e.target.value.length === password.length &&
                setValidateConfirmPasswordTrigger('onChange');
            }}
            onBlur={() => setValidateConfirmPasswordTrigger('onChange')}
          />
        </Form.Item>
        <Form.Item
          name='agreement'
          valuePropName='checked'
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('You have to agree with our Terms and Conditions.'))
            }
          ]}>
          <Checkbox size='large'>
            I agree with the{' '}
            <span
              className={styles.terms_and_conditions}
              onClick={(e) => {
                e.preventDefault();
                setIsSigningUp(true);
                setLoginModalOpen(false);
                setTermsModalOpen(true);
              }}>
              Terms and Conditions.
            </span>
          </Checkbox>
        </Form.Item>
        <Button type='primary' htmlType='submit' size='large' loading={loading}>
          Sign up
        </Button>
      </Form>
    </>
  );
};

export default SignUpForm;
