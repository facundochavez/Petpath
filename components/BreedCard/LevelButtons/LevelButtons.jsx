import styles from './LevelButtons.module.scss';
import LevelButton from './LevelButton/LevelButton';
import { motion } from 'framer-motion';

const LevelButtons = ({
  levels,
  selectedLevel,
  handleSelectedLevel,
  isActive,
  addNewBreed,
}) => {
  ////COMPONENT
  return (
    <div
      className={styles.level_buttons}
      style={!isActive ? { filter: 'grayscale() brightness(0.9)' } : null}
    >
      {selectedLevel ? (
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
      ) : null}
      {Object.keys(levels).map((level, index) => {
        return (
          <LevelButton
            key={index}
            levelIndex={index}
            level={levels[level] ? level : null}
            levelInfo={levels[level]}
            handleSelectedLevel={handleSelectedLevel}
            addNewBreed={addNewBreed}
          />
        );
      })}
    </div>
  );
};

export default LevelButtons;
