import styles from './LoadingPaws.module.scss';
import Image from 'next/image';

const LoadingPaws = () => {
  const paws = [
    { y_translation: 5, rotation: 70 },
    { y_translation: -5, rotation: 50 },
    { y_translation: 5, rotation: 100 },
    { y_translation: -5, rotation: 60 },
    { y_translation: 5, rotation: 90 },
    { y_translation: -5, rotation: 50 },
    { y_translation: 5, rotation: 70 },
    { y_translation: -5, rotation: 60 },
    { y_translation: 5, rotation: 70 },
  ];
  ////COMPONENT
  return (
    <div className={styles.loading_paws}>
      {paws.map((paw, index) => {
        return (
          <div className={styles.loading_paws__paw} style={{animationDelay: `${1 + index * 0.15}s`}} key={index}>
            <Image
              src={'icons/paw-icon.svg'}
              alt='Paw icon'
              fill
              style={{
                filter: 'grayscale() brightness(10)',
                transform: `translateY(${paw.y_translation}px) rotate(${paw.rotation}deg)`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default LoadingPaws;
