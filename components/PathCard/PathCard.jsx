import styles from './PathCard.module.scss';
import Image from 'next/image';
import { Skeleton } from 'antd';
import { HeartFilled, QuestionOutlined } from '@ant-design/icons';
import { useSwiperContext } from '../../pages/context/swiper.context';
import { useExploredBreedsContext } from 'pages/context/exploredBreeds.context';
import { useState } from 'react';
import { motion } from 'framer-motion';

const PathCard = ({ breed, index, onCancel, width, lineDirection }) => {

  ////COMPONENT
  return (
    <div
      key={index}
      className={styles.path_card}
      style={{ width: `${width}px`, height: `${width}px` }}>
      {breed.boxType === 'empty_box' ? null : breed.boxType === 'question_box' ? (
        <QuestionBox />
      ) : (
        <PhotoBox breed={breed} index={index} onCancel={onCancel} />
      )}
      <div className={styles.path_card__line} directiondata={lineDirection} />
      {breed.fav && (
        <>
          <HeartFilled className={styles.path_card__hearth} style={{fontSize: width === 100 ? '18px': '22px'}}/>
        </>
      )}
    </div>
  );
};

const PhotoBox = ({ breed, index, onCancel }) => {
  const { swiper } = useSwiperContext();

  ////COMPONENT
  return (
    <div
      className={styles.photo_box}
      onClick={() => {
        swiper.slideTo(index);
        onCancel();
      }}>
      {breed.images && (
        <Image key={index} src={breed.images[0].url} alt='breed_image' fill placeholder='empty' />
      )}
      <Skeleton.Image active />
    </div>
  );
};

const QuestionBox = () => {
  ////COMPONENT
  return (
    <div className={styles.empty_box}>
      <QuestionOutlined />
    </div>
  );
};

export default PathCard;
