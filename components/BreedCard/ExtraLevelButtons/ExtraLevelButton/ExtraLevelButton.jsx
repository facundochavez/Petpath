import styles from './ExtraLevelButton.module.scss';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import extraLevelsDescriptions from '../../../../data/extraLevelsDescriptionsData';
import { Skeleton } from 'antd';
import { motion } from 'framer-motion';

const ExtraLevelButton = ({ extraLevel, extraLevelInfo }) => {
  ////COMPONENT
  return (
    <>
      {!extraLevel ? (
        <div className={styles.skeleton_extra_level_button}>
          <Skeleton.Button active />
        </div>
      ) : (
        <div className={styles.extra_level_button}>
          <Tooltip
            
            title={extraLevelsDescriptions[extraLevel].description}
            overlayInnerStyle={{ fontSize: '11px', color: 'black' }}
            overlayStyle={{ maxWidth: '230px', margin: '-20px 0 0 -20px' }}
            color='white'
          >
            <QuestionCircleOutlined style={{ paddingRight: '2px' }}/>
          </Tooltip>
          <motion.div
            className={styles.extra_level_button__level_bar}
            initial={{width: 0}}
            animate={{ width: `${extraLevelInfo.points * 20}%` }}
            transition={{ duration: 0.8 }}
          />
          <p>{extraLevelsDescriptions[extraLevel].title}</p>
        </div>
      )}
    </>
  );
};

export default ExtraLevelButton;
