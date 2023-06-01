import styles from './NavButton.module.scss';

const NavButton = ({ children, ...props }) => {
  ////COMPONENT
  return (
    <div className={styles.nav_button} onClick={props.onClick}>
      {children}
    </div>
  );
};

export default NavButton;
