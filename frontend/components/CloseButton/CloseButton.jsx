import Image from 'next/image';
import styles from './CloseButton.module.scss';

const CloseButton = ({ onClick }) => {
  ////COMPONENT
  return (
    <div className={styles.close_button} onClick={onClick}>
      <Image height={15} width={15} src={'/icons/close-icon.svg'} alt='X' />
    </div>
  );
};

export default CloseButton;
