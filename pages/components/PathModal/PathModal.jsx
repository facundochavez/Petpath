import { useExploredBreedsContext } from 'pages/context/exploredBreeds.context';
import { useSwiperContext } from 'pages/context/swiper.context';
import styles from './PathModal.module.scss';
import { Modal } from 'antd';
import CloseButton from 'components/CloseButton/CloseButton';
import PathCard from 'components/PathCard/PathCard';

const PathModal = ({ open, onCancel }) => {
  const { exploredBreeds, pathBreeds } = useExploredBreedsContext();
  const { setActiveSwiperIndex } = useSwiperContext();

  ////COMPONENT
  return (
    <Modal
      title={`My path (${exploredBreeds.length}/${pathBreeds.length})`}
      centered
      open={open}
      onCancel={onCancel}
      closeIcon={<CloseButton />}
      footer={null}
    >
      <div className={styles.modal_body}>
        <div className={styles.modal_body__path_cards_container}>
          {pathBreeds.map((breed, index) => {
            return <PathCard key={index} breed={breed} />;
          })}
        </div>
      </div>
    </Modal>
  );
};

export default PathModal;
