import styles from './ExtraLevelButtons.module.scss';
import ExtraLevelButton from './ExtraLevelButton/ExtraLevelButton';


const ExtraLevelButtons = ({extraLevels}) => {
  ////COMPONENT
  return (
    <div
      className={styles.extra_level_buttons}
    >
      {Object.keys(extraLevels).map((extraLevel, index) => {
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
