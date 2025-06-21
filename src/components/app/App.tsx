import { animateScroll } from 'react-scroll';

import { useState, useEffect } from 'react';

import fetchPhotosByName from '../../unsplash-api';
import SearchBar from '../searchBar/SearchBar';
import ImageGallery from '../imageGallery/ImageGallery';
import Loader from '../loader/Loader';
import LoadMoreBtn from '../loadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../errorMessage/ErrorMessage';
import ImageModal from '../imageModal/ImageModal';
import { Photo } from '../../types';
import './App.css';

function App() {
  const [query, setQuery] = useState<string>('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showBtn, setShowBtn] = useState<boolean>(false);

  const handleSearch = (userData: string) => {
    closeModal();
    setPhotos([]);
    setQuery(userData);
    setPage(1);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }
    async function fetchData(searchData: string, page: number): Promise<void> {
      try {
        setError(false);
        setLoading(true);
        const { results, total_pages } = await fetchPhotosByName(
          searchData,
          page
        );
        setShowBtn(total_pages !== 0 && total_pages !== page);
        if (searchData === query) {
          setPhotos(prevPhotos => [...prevPhotos, ...results]);
        } else {
          setPhotos(results);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData(query, page);
  }, [query, page]);

  function handleClick() {
    setPage(page + 1);
    animateScroll.scrollToBottom({
      duration: 800, // тривалість анімації в мілісекундах
      smooth: 'easeInOutQuint', // згладжування анімації
    });
  }

  const openModal = (image: string) => {
    if (!isOpen) {
      setSelectedImage(image);
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onClickModal = (image: string) => openModal(image);

  return (
    <>
      <SearchBar onSubmit={handleSearch}></SearchBar>
      {photos.length > 0 && (
        <ImageGallery items={photos} onClickModal={onClickModal}></ImageGallery>
      )}
      {loading && <Loader></Loader>}
      {error && <ErrorMessage />}
      {showBtn && <LoadMoreBtn handleClick={handleClick}></LoadMoreBtn>}
      <ImageModal
        isOpen={isOpen}
        imageUrl={selectedImage}
        onClose={closeModal}
      ></ImageModal>
    </>
  );
}

export default App;
