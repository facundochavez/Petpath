import { useModalsContext } from 'pages/context/modals.context';
import styles from './Footer.module.scss';

const Footer = () => {
  const { setPrivacyModalOpen, setTermsModalOpen } = useModalsContext();

  //// COMPONENT
  return (
    <div className={styles.footer}>
      <div className={styles.footer__max_width_container}>
        <h3>
          Powered by:
          <br />
          <a href='https://thecatapi.com/' target='_blank'>
            The Cap API
          </a>
          ,{' '}
          <a href='https://chat.openai.com/' target='_blank'>
            {' '}
            Chat GPT
          </a>{' '}
          and{' '}
          <a href='https://ant.design/' target='_blank'>
            Ant Design
          </a>
        </h3>
        <h4>
          <span onClick={() => setPrivacyModalOpen(true)}>Privacy Policy</span> -{' '}
          <span onClick={() => setTermsModalOpen(true)}>Terms and Conditions</span>
        </h4>
        <h2>
          © 2023 Petpath - All rights reserved
          <br />
          Developed by {' '}
          <a href='https://www.linkedin.com/in/facundo-chavez-a46b55b5/' target='_blank'>Facundo Chavez</a>
        </h2>
      </div>
    </div>
  );
};

export default Footer;
