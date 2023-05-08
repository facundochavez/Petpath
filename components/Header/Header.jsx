import styles from "./Header.module.scss";
import Image from "next/image";

const Header = () => {
  ////COMPONENT
  return (
    <div className={styles.header}>
      <Image src={'images/logo.svg'} width={180} height={50} alt="PawMatch logo"/>
    </div>
  );
};

export default Header;
