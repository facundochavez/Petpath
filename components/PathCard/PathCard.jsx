import styles from './PathCard.module.scss';
import { Image } from 'antd';
import { Skeleton } from 'antd';
import { QuestionOutlined } from '@ant-design/icons';

const PathCard = ({breed}) => {
  ////COMPONENT
  return (
    <div className={styles.path_card}>
      <EmptyContainer />
      <div className={styles.path_card__line} />
    </div>
  );
};

const PhotoContainer = () => {
  ////COMPONENT
  return (
    <div className={styles.photo_container}>
      <Image
        key={0}
        src={'images/icon-for-images.svg'}
        alt='first-image-of-breed'
        height='100%'
        placeholder={<Skeleton.Image active />}
      />
    </div>
  );
};

const EmptyContainer = () => {
  ////COMPONENT
  return (
    <div className={styles.empty_container}>
      <QuestionOutlined />
    </div>
  );
};

export default PathCard;
