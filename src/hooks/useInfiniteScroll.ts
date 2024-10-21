import { useEffect, useState } from "react";
import { useImagesContext } from "../context/useImageContext";

export function useInfiniteScroll(){
  const { getListImages, setPage } = useImagesContext();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchImages = async () => {
    setLoading(true);
    // Add this setTimeout to simulate response API
    setTimeout(async() => {
      await getListImages()
      setLoading(false);
    }, 1500)
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
        return;
      }
      setPage(prevPage => prevPage + 1);
      fetchImages()
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return { loading }

}