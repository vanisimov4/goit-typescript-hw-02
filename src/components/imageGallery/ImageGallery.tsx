import React from 'react';
import ImageCard from '../imageCard/ImageCard';
import { Photo } from '../../types';
import css from './ImageGallery.module.css';

interface ImageGalleryProps {
  items: Photo[];
  onClickModal: (image: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ items, onClickModal }) => {
  return (
    <ul className={css.gallery}>
      {items.map(item => (
        <li key={item.id}>
          <ImageCard onClickModal={onClickModal} photo={item} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
