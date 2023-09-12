import Image from 'next/image';
import styles from './MoveButton.module.scss';
import { motion } from 'framer-motion';

const MoveButton = ({ type = 'next', onClick }) => {
  ////COMPONENT
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={styles.move_button}
      onClick={onClick}
      style={type == 'previous' ? { transform: 'rotate(180deg)' } : null}
    >
      <Image height={15} width={15} src={'/icons/arrow-icon.svg'} alt='Arrow' />
    </motion.div>
  );
};

export default MoveButton;
