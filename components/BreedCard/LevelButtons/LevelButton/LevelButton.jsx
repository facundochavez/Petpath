import styles from './LevelButton.module.scss';
import { Skeleton, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import levels_descriptions from '../../../../data/levels-descriptions';
import { message } from 'antd';
import { motion } from 'framer-motion';

const LevelButton = ({
  levelIndex,
  handleSelectedLevel,
  level,
  levelInfo,
  addNewBreed,
}) => {
  const options = [
    {
      simbol: '+',
      label: 'plus',
      ability: levelInfo && levelInfo.plus_ability,
      z_index: 0,
      initial_position: 32,
    },
    {
      simbol: '=',
      label: 'equal',
      ability: levelInfo && levelInfo.equal_ability,
      z_index: 10,
      initial_position: 0,
    },
    {
      simbol: '-',
      label: 'less',
      ability: levelInfo && levelInfo.less_ability,
      z_index: 0,
      initial_position: -32,
    },
  ];

  const [messageApi, contextHolder] = message.useMessage();
  function warning() {
    messageApi.open({
      type: 'warning',
      content: 'Oops! No options in that way...',
    });
  }
  const [showOptions, setShowOptions] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setShowOptions(false));

  return (
    <>
      {contextHolder}
      {!level ? (
        <div className={styles.skeleton_level_button}>
          <Skeleton.Button active />
        </div>
      ) : (
        <div
          className={styles.level_button}
          onClick={() => setShowOptions(!showOptions)}
        >
          <div className={styles.level_button__level_bar}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${levelInfo.score * 20}%` }}
              transition={{ duration: 0.8 }}
              style={{
                backgroundColor: showOptions && 'var(--color-primary)',
              }}
            ></motion.div>
          </div>

          <div
            className={styles.level_button__content}
            style={{ borderColor: showOptions ? 'white' : null }}
          >
            <Tooltip
              title={levels_descriptions[level].description}
              overlayInnerStyle={{ fontSize: '11px', color: 'black' }}
              overlayStyle={{ maxWidth: '230px', margin: '-20px 0 0 -20px' }}
              color='white'
            >
              <QuestionCircleOutlined />
            </Tooltip>
            <p>{levels_descriptions[level].title}</p>
            <motion.div
              className={styles.level_button__content__image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Image
                height={10}
                width={10}
                src={'/icons/fat-arrow.svg'}
                alt='Arrow'
                style={{
                  filter: showOptions
                    ? 'var(--filter-white)'
                    : levelInfo.score === 5
                    ? 'var(--filter-background)'
                    : null,
                }}
              />
            </motion.div>
          </div>

          {showOptions && (
            <div
              className={styles.level_button__options}
              ref={ref}
              onClick={(e) => {
                e.stopPropagation();
                setShowOptions(!showOptions);
              }}
            >
              {options.map((option, optionIndex) => {
                return (
                  <motion.div
                    key={optionIndex}
                    className={styles.level_button__options__circle}
                    data-is-disabled={!option.ability}
                    style={{ zIndex: option.z_index }}
                    initial={{ y: option.initial_position }}
                    animate={{ y: 0 }}
                    onClick={
                      option.ability
                        ? () => {
                            handleSelectedLevel({level: levelIndex + 1, simbol: option.simbol});
                            addNewBreed();
                          }
                        : warning
                    }
                  >
                    {option.simbol}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LevelButton;
