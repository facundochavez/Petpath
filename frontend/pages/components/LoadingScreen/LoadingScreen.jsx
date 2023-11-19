import { useGlobalContext } from "context/global.context";
import styles from "./LoadingScreen.module.scss";
import { Spin } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { useTourContext } from "context/tour.context";
import Button from "components/Button/Button";

const LoadingScreen = () => {
  const { showLoadingScreen } = useGlobalContext();
  const { startTour } = useTourContext();

  //// COMPONENT
  return (
    <AnimatePresence>
      {showLoadingScreen !== "none" && (
        <motion.div
          className={styles.loading_screen}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.loading_screen__box}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Spin
              tip={
                showLoadingScreen === "randomBreed"
                  ? "Loading random breed..."
                  : "Loading your path..."
              }
              size="large"
            >
              <div className={styles.loading_screen__box} />
            </Spin>
            {showLoadingScreen === "randomBreed" && (
              <>
                <p>
                  Our servers are in Beta, so first call may take up to 15
                  seconds.
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
