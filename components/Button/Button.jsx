import styles from './Button.module.scss';

const Button = ({ ...props }) => {
  ////COMPONENT
  return (
    <button className={styles.button} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
