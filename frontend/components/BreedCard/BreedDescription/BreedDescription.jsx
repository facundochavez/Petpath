import styles from './BreedDescription.module.scss';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Skeleton } from 'antd';

const BreedDescription = ({ isActive, description }) => {
  ////COMPONENT
  return (
    <div
      className={styles.breed_description}
      style={{
        opacity: !isActive ? 0 : null,
        borderColor: !description ? 'var(--color-gray-active)' : 'unset',
      }}
    >
      {!description ? (
        <>
          <div className={styles.skeleton_description}>
            <Skeleton.Button active />
          </div>
          <div className={styles.skeleton_description}>
            <Skeleton.Button active />
          </div>
          <div className={styles.skeleton_description}>
            <Skeleton.Button active />
          </div>
          <div className={styles.skeleton_description}>
            <Skeleton.Button active />
          </div>
        </>
      ) : (
        <p>
          <strong>
            <InfoCircleOutlined style={{ marginRight: '4px' }} />
            Fun fact:{' '}
          </strong>
          {description}
        </p>
      )}
    </div>
  );
};

export default BreedDescription;
