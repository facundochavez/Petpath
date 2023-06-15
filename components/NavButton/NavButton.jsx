import styles from './NavButton.module.scss';
import { motion } from 'framer-motion';

const NavButton = ({ children, ...props }) => {
  ////COMPONENT
  return (
    <motion.div
      className={styles.nav_button}
      onClick={props.onClick}
      initial={{ y: -50, opacity: 0 }}
      animate={{y: 0, opacity: 1}}>
      {children}
    </motion.div>
  );
};

export default NavButton;
