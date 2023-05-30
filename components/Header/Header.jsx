import NavButton from 'components/Subcomponents/NavButton/NavButton';
import styles from './Header.module.scss';
import Image from 'next/image';

const Header = ({ref4}) => {
  ////COMPONENT
  return (
    <div className={styles.header}>
      <div className={styles.header__max_width_container}>
        <div className={styles.header__max_width_container__content}>
          <Image
            src={'images/paw-explorer-logo.svg'}
            width={180}
            height={63}
            alt='PawMatch logo'
          />
          <nav ref={ref4}>
            <NavButton>
              <Image
                src={'icons/path-icon.svg'}
                width={50}
                height={50}
                alt='Path icon'
              />
            </NavButton>
            <NavButton>
              <Image
                src={'icons/burger-icon.svg'}
                width={50}
                height={50}
                alt='Burger icon'
              />
            </NavButton>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
