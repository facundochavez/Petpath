import styles from './ExtraLevelButtons.module.scss';
import ExtraLevelButton from './ExtraLevelButton/ExtraLevelButton';

const EXTRA_LEVELS = ['stranger_friendly','child_friendly','dog_friendly','grooming','health_issues','shedding_level']

const ExtraLevelButtons = ({extraLevels}) => {
  ////COMPONENT
  return (
    <div
      className={styles.extra_level_buttons}
    >
      {EXTRA_LEVELS.map((extraLevel, index) => {
        return (
          <ExtraLevelButton
            key={index}
            extraLevel={extraLevels[extraLevel] ? extraLevel : null}
            extraLevelInfo={extraLevels[extraLevel]}
          />
        );
      })}
    </div>
  );
};

export default ExtraLevelButtons;
