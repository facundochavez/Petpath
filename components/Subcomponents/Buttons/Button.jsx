import styles from './Button.module.scss';

const Button = ({ children, type, onClick }) => {
  ////COMPONENT
  return (
    <div className={styles.button} typeData={type} onClick={() => onClick()}>
      {children}
    </div>
  );
};

export default Button;
