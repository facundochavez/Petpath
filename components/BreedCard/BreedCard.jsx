import styles from './BreedCard.module.scss';
import BreedImages from './BreedImages/BreedImages';
import ExtraLevelButton from './ExtraLevelButtons/ExtraLevelButton/ExtraLevelButton';
import { InfoCircleOutlined } from '@ant-design/icons';
import extra_levels_descriptions from '../../data/extra-levels-descriptions.json';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from 'antd';
import LevelButtons from './LevelButtons/LevelButtons';
import ExtraLevelButtons from './ExtraLevelButtons/ExtraLevelButtons';
import BreedDescription from './BreedDescription/BreedDescription';

const BreedCard = ({
  isFirst,
  isLast,
  isActive,
  isPrev,
  breed,
  addNewBreed,
}) => {
  const [selectedLevel, setSelectedLevel] = useState();
  const [requestSimbol, setRequestSimbol] = useState();
  function handleSelectedLevel({ level, simbol }) {
    setRequestSimbol(simbol);
    setSelectedLevel(level);
  }

  const a = [];
  ////COMPONENT
  return (
    <motion.div
      className={styles.breed_card}
      initial={{
        opacity: 0,
        scale: 0.75,
        originX: !isFirst ? 0 : 'unset',
        originY: !isFirst ? 0 : 'unset',
      }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: isFirst ? 0 : 0.65, duration: 0.1 }}
    >
      <div className={styles.breed_card__side_container} />

      <div
        className={styles.breed_card__middle_container}
        style={
          !isActive
            ? {
                marginTop: '20px',
                opacity: 0.5,
                pointerEvents: 'none',
              }
            : null
        }
      >
        <BreedImages images={breed.images} />
        <LevelButtons
          levels={breed.levels}
          selectedLevel={selectedLevel}
          handleSelectedLevel={handleSelectedLevel}
          isActive={isActive}
          addNewBreed={addNewBreed}
        />
        <ExtraLevelButtons extraLevels={breed.extra_levels} />
        <BreedDescription description={breed.description} isActive={isActive} />
      </div>

      <div
        className={styles.breed_card__side_container}
        style={{ opacity: isLast ? 0 : 1 }}
      >
        {selectedLevel && (
          <div className={styles.breed_card__side_container__subcontainer}>
            <motion.div
              className={
                styles.breed_card__side_container__subcontainer__up_line
              }
              style={{ opacity: isPrev ? 1 : 0.5 }}
              animate={{
                height: [0, 70, 70],
                width: [0, 0, 25],
                display: ['none', 'unset', 'unset'],
              }}
              transition={{ duration: 0.3, delay: 0.5 }}
            />
            <motion.div
              className={
                styles.breed_card__side_container__subcontainer__option
              }
              style={{ opacity: isPrev ? 1 : 0.5 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              {requestSimbol}
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BreedCard;
