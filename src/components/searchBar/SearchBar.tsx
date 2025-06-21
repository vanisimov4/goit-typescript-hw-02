import React from 'react';
import { FormEvent } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (userData: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const formData = new FormData(form);
    const textSearch = formData.get('textSearch') as string;
    const textSearchTrim = textSearch.trim();

    // const form = evt.target;
    // const textSearch: string = form.elements.textSearch.value.trim();
    if (textSearchTrim === '') {
      return toast.error('text must be entered to search for images');
    }
    onSubmit(textSearchTrim);
    form.reset();
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit}>
        <input
          name="textSearch"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
        <Toaster position="top-left" reverseOrder={false} />
      </form>
    </header>
  );
};

export default SearchBar;
