import styles from './LevelButtons.module.scss';
import LevelButton from './LevelButton/LevelButton';
import { motion } from 'framer-motion';
import { useTourContext } from 'pages/context/tour.context';
import { useGlobalContext } from 'pages/context/global.context';

const LevelButtons = ({ levels, selectedLevel, isActive, cardIndex }) => {
  const { globalContext } = useGlobalContext();
  const { ref2 } = useTourContext();
  ////COMPONENT
  return (
    <div
      className={styles.level_buttons}
      style={!isActive ? { filter: 'grayscale() brightness(0.9)' } : null}
      ref={globalContext === 'tour' ? ref2 : null}>
      {selectedLevel && (
        <motion.div
          className={styles.level_buttons__down_line}
          initial={{ height: 0 }}
          animate={{
            height: `${200 + 42 * (selectedLevel - 1)}px`
          }}
          transition={{ duration: 0.5 }}
          style={{
            bottom: `${228 - 42 * (selectedLevel - 1)}px`
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
            cardIndex={cardIndex}
          />
        );
      })}
    </div>
  );
};

export default LevelButtons;
