import styles from './NavButton.module.scss';

const NavButton = ({ children, ...props }) => {
  ////COMPONENT
  return (
    <div className={styles.nav_button} onClick={(e) => props.onClick(e)}>
      {children}
    </div>
  );
};

export default NavButton;
