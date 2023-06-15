import styles from './PathCard.module.scss';
import Image from 'next/image';
import { Skeleton } from 'antd';
import { HeartFilled, QuestionOutlined } from '@ant-design/icons';
import { useSwiperContext } from '../../pages/context/swiper.context';
import { useModalsContext } from 'pages/context/modals.context';

const PathCard = ({ breed, index, width, lineDirection }) => {
  ////COMPONENT
  return (
    <div
      key={index}
      className={styles.path_card}
      style={{ width: `${width}px`, height: `${width}px` }}>
      {breed.boxType === 'empty_box' ? null : breed.boxType === 'question_box' ? (
        <QuestionBox />
      ) : (
        <PhotoBox breed={breed} index={index} />
      )}
      <div className={styles.path_card__line} directiondata={lineDirection} />
      {breed.fav && (
        <>
          <HeartFilled
            className={styles.path_card__hearth}
            style={{ fontSize: width === 100 ? '18px' : '22px' }}
          />
        </>
      )}
    </div>
  );
};

const PhotoBox = ({ breed, index, onCancel }) => {
  const { swiper } = useSwiperContext();
  const { setPathModalOpen } = useModalsContext();

  ////COMPONENT
  return (
    <div
      className={styles.photo_box}
      onClick={() => {
        setPathModalOpen(false);
        swiper.slideTo(index);
      }}>
      {breed.images && (
        <Image
          key={index}
          src={breed.images[0] ? breed.images[0].url : 'images/icon-for-images.svg'}
          alt='breed_image'
          fill
          placeholder='empty'
        />
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
