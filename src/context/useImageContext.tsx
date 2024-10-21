import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Image } from '../models/Image';
import { getImages, getImagesByName } from "../services/images";

type AuthContextType = {
  listImages: Image[] | null;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  getListImages: () => void;
  getByName: (search: string) => void;
}

const ImageContext = createContext<AuthContextType | undefined>(undefined);

type ImageProviderProps = {
  children: ReactNode;
}

export function useImagesContext() {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error("useImagesContext must be used within an ImageContextProvider");
  }

  return context;
}

export const ImageContextProvider = ({ children }: ImageProviderProps) => {
  const [listImages, setListImages] = useState<Image[] | null>([]);
  const [page, setPage] = useState(1)

  const getListImages = async () => {
    try {
			const listImages = await getImages(page)
      const newImages = listImages.map((image: Image, index: number) => ({
        ...image,
        id: `${Date.now()}-${image.id}-${page}-${index}` // Crea un ID único basado en la página
      }));

      console.log({newImages})

      setListImages((prevImages: any) => [...prevImages, ...newImages])
			// setListImages(listImages)
		} catch (error) {
			console.error(error)
		}
  };

  const getByName = async (search: string) => {
    try {
			const listImages = await getImagesByName(search)
			setListImages(listImages)
		} catch (error) {
			console.error(error)
		}
  };

  useEffect(() => {
    getListImages();
  }, []);

  return (
    <ImageContext.Provider value={{ listImages, page, setPage, getListImages, getByName }}>
      {children}
    </ImageContext.Provider>
  );
};
