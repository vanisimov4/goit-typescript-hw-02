export interface Photo {
  id: string;
  alt_description: string;
  urls: Urls;
}

interface Urls {
  small: string;
  regular: string;
}
