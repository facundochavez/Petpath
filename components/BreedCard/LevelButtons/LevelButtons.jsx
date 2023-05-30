import styles from './LevelButtons.module.scss';
import LevelButton from './LevelButton/LevelButton';
import { motion } from 'framer-motion';

const LevelButtons = ({
  levels,
  selectedLevel,
  isActive,
  addNewBreed,
  cardIndex,
  ref2,
  ref3,
  ref4,
}) => {
  ////COMPONENT
  return (
    <div
      className={styles.level_buttons}
      style={!isActive ? { filter: 'grayscale() brightness(0.9)' } : null}
      ref={ref2}
    >
      {selectedLevel && (
        <motion.div
          className={styles.level_buttons__down_line}
          initial={{ height: 0 }}
          animate={{
            height: `${200 + 42 * (selectedLevel - 1)}px`,
          }}
          transition={{ duration: 0.5 }}
          style={{
            bottom: `${228 - 42 * (selectedLevel - 1)}px`,
          }}
        />
      )}
      {Object.keys(levels).map((level, index) => {
        return (
          <LevelButton
            key={index}
            levelIndex={index}
            level={levels[level] ? level : null}
            levelInfo={levels[level]}
            addNewBreed={addNewBreed}
            cardIndex={cardIndex}
            ref3={ref3}
            ref4={ref4}
          />
        );
      })}
    </div>
  );
};

export default LevelButtons;
