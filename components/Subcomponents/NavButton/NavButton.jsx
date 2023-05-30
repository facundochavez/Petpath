import styles from './NavButton.module.scss';

const NavButton = ({ children, onClick }) => {
  ////COMPONENT
  return (
    <div className={styles.nav_button} /* onClick={() => onClick()} */>
      {children}
    </div>
  );
};

export default NavButton;
