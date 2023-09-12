import { useExploredBreedsContext } from 'pages/context/exploredBreeds.context';
import styles from './PathModal.module.scss';
import { Modal } from 'antd';
import CloseButton from 'components/CloseButton/CloseButton';
import PathCard from 'components/PathCard/PathCard';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useModalsContext } from 'pages/context/modals.context';
import { useBackendContext } from 'pages/context/backend.context';

const PathModal = () => {
  const { pathModalOpen, setPathModalOpen } = useModalsContext();
  const { exploredCats } = useExploredBreedsContext();
  const { allCatsLength } = useBackendContext();
  const ref = useRef();
  const [columns, setColumns] = useState(1);
  const rows = Math.ceil(allCatsLength / columns);
  const [cardsWidth, setCardsWidth] = useState(165);

  const questionBoxLength = Math.max(allCatsLength - exploredCats.length, 0);
  const questionBoxes = questionBoxLength > 0 ? Array(questionBoxLength).fill({ boxType: 'question_box' }) : [];
  
  const emptyBoxLength = Math.max(columns * rows - allCatsLength, 0);
  const emptyBoxes = emptyBoxLength > 0 ? Array(emptyBoxLength).fill({ boxType: 'empty_box' }) : [];
  
  const pathCards = [
    ...exploredCats,
    ...questionBoxes,
    ...emptyBoxes
  ];

  const cardAnimation = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        easy: 'easyOut'
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const available_width = ref.current.offsetWidth;
        const newCardsWidth = window.innerWidth < 570 ? 100 : 165;
        setCardsWidth(newCardsWidth);
        const newColumns = Math.max(1, Math.floor(available_width / newCardsWidth));
        setColumns(newColumns);
      }
    };
    setTimeout(() => {
      handleResize();
    }, 100);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [pathModalOpen]);

  ////COMPONENT
  return (
    <Modal
      title={`My cat-path: ${exploredCats.length}/${allCatsLength}`}
      centered
      open={pathModalOpen}
      onCancel={() => setPathModalOpen(false)}
      closeIcon={<CloseButton />}
      footer={null}
      destroyOnClose={true}
      width={880}>
      <div ref={ref} className={styles.full_width_container}>
        <motion.div
          transition={{
            staggerChildren: 0.035
          }}
          initial='hidden'
          animate='show'
          className={styles.full_width_container__path_cards_container}
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {pathCards.map((breed, index) => {
            const inOddRow = Math.ceil((index + 1) / columns) % 2 !== 0;
            const lastInRow = (index + 1) % columns === 0;
            const lineDisplay = index + 1 < allCatsLength;
            return (
              <motion.div
                key={index}
                variants={cardAnimation}
                style={{
                  order: `${
                    inOddRow
                      ? index + 1
                      : Math.floor(index / columns) * columns + columns - (index % columns)
                  }`
                }}>
                <PathCard
                  key={index}
                  index={index}
                  breed={breed}
                  width={cardsWidth}
                  lineDirection={
                    !lineDisplay ? 'none' : lastInRow ? 'bottom' : inOddRow ? 'rigth' : 'left'
                  }
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </Modal>
  );
};

export default PathModal;