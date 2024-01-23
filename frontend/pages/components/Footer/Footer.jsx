import { useModalsContext } from 'context/modals.context';
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
          <a href='https://nextjs.org/' target='_blank'>
            Next.js
          </a>
          ,{' '}
          <a href='https://thecatapi.com/' target='_blank'>
            The Cap API
          </a>
          ,{' '}
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
          © 2024 Petpath - All rights reserved
          <br />
          Developed by {' '}
          <a href='https://www.facundochavez.com/' target='_blank'>Facundo Chavez</a>
        </h2>
      </div>
    </div>
  );
};

export default Footer;
