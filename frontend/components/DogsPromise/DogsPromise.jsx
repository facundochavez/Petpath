import { useModalsContext } from 'pages/context/modals.context';
import styles from './DogsPromise.module.scss';

const DogsPromise = () => {
  const { setLoginModalOpen, setActiveKey } = useModalsContext();
  //// COMPONENT
  return (
    <div className={styles.dogs_promise}>
      <p>
        Dogs are on their way...
        <br />
        <span
          onClick={() => {
            setLoginModalOpen(true);
            setActiveKey('2');
          }}>
          Sign up
        </span>{' '}
        to get notified <br /> when they arrive! 🐶
      </p>
    </div>
  );
};

export default DogsPromise;
