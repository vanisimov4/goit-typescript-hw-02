import { Photo } from '../../types';

interface ImageCardProps {
  photo: Photo;
  onClickModal: (image: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ photo, onClickModal }) => {
  return (
    <div>
      <img
        src={photo.urls.small}
        alt={photo.alt_description}
        onClick={() => onClickModal(photo.urls.regular)}
      />
    </div>
  );
};

export default ImageCard;
