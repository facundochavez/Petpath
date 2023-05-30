import styles from './Button.module.scss';

const Button = ({ children, type, ...props }) => {
  ////COMPONENT
  return (
    <div className={styles.button} typedata={type} onClick={(e) => props.onClick(e)}>
      {children}
    </div>
  );
};

export default Button;
