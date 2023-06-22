import { useGlobalContext } from 'pages/context/global.context';
import styles from './LoadingScreen.module.scss';
import { Spin } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { useExploredBreedsContext } from 'pages/context/exploredBreeds.context';

const LoadingScreen = () => {
  const { showLoadingScreen } = useGlobalContext();

  //// COMPONENT
  return (
    <AnimatePresence>
      {showLoadingScreen !== 'none' && (
        <motion.div
          className={styles.loading_screen}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <Spin
            tip={
              showLoadingScreen === 'randomBreed'
                ? 'Loading random breed...'
                : 'Loading your path...'
            }
            size='large'>
            <div className={styles.loading_screen__box} />
          </Spin>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
