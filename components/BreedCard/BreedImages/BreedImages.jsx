import styles from './BreedImages.module.scss';
/* import Image from 'next/image'; */
import { Image /*  as AntImage */ } from 'antd';
import { Skeleton } from 'antd';
import { useState, useRef, useEffect } from 'react';

const BreedImages = ({ images }) => {
  const cardRef = useRef();

  useEffect(() => {
    const card = cardRef.current;

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { left, top, width, height } = card.getBoundingClientRect();
      const offsetX = clientX - left;
      const offsetY = clientY - top;
      const yRotation = ((offsetX - width / 2) / width) * -10;
      const xRotation = ((offsetY - height / 2) / height) * 10;

      card.style.transform = `
        perspective(750px)
        scale(1.01)
        rotateX(${xRotation}deg)
        rotateY(${yRotation}deg)`;
    };

    const handleMouseOut = () => {
      card.style.transform = `
        perspective(750px)
        scale(1)
        rotateX(0)
        rotateY(0)`;
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseout', handleMouseOut);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  ////COMPONENT
  return (
    <div className={styles.breed_images} ref={cardRef}>
      <Image.PreviewGroup preview={true}>
        <div className={styles.breed_images__first_image}>
          {!images ? (
            <Skeleton.Image active />
          ) : (
            <Image
              key={0}
              src={images[0] ? images[0].url : 'images/icon-for-images.svg'}
              alt='first-image-of-breed'
              height='100%'
              placeholder={<Skeleton.Image active/>}
            />
          )}
        </div>
        <div className={styles.breed_images__second_image}>
          {!images ? (
            <Skeleton.Image active />
          ) : (
            <Image
              key={1}
              src={images[1] ? images[1].url : 'images/icon-for-images.svg'}
              alt='second-image-of-breed'
              height='100%'
              placeholder={<Skeleton.Image active/>}
            />
          )}
        </div>
        <div className={styles.breed_images__third_image}>
          {!images ? (
            <Skeleton.Image active />
          ) : (
            <Image
              key={2}
              src={images[2] ? images[2].url : 'images/icon-for-images.svg'}
              alt='second-image-of-breed'
              height='100%'
              placeholder={<Skeleton.Image active/>}
            />
          )}
        </div>

        {/* MORE IMAGES */}
        <div style={{display: 'none'}}>
          {images &&
            images[3] &&
            images.slice(3).map((image, index) => {
              return (
                <Image
                  key={index + 3}
                  src={image.url}
                  alt={`Image of breed number ${index + 3}`}
                />
              );
            })}
        </div>
        
      </Image.PreviewGroup>
    </div>
  );
};

export default BreedImages;
