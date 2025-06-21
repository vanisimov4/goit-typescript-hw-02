import React from 'react';
import Modal from 'react-modal';

import css from './ImageModal.module.css';

interface ImageModalProps {
  imageUrl: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  imageUrl,
  onClose,
}) => {
  return (
    <div>
      {isOpen && <div className={css.overlay} onClick={onClose}></div>}
      <Modal
        className={css.modal}
        isOpen={isOpen}
        onRequestClose={onClose}
        shouldCloseOnEsc={true} // Закривається при натисканні на ESC
        shouldCloseOnOverlayClick={false} // Закривається при кліку за межами
      >
        {imageUrl && <img src={imageUrl} alt="Selected" />}
      </Modal>
    </div>
  );
};

export default ImageModal;
