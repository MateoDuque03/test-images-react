import { useEffect, useState } from "react";
import { useImagesContext } from "../context/useImageContext";

export function useElementOnScreen(){
  const { getListImages, setPage } = useImagesContext();
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    setTimeout(async() => {
      await getListImages()
      setLoading(false);
    }, 2000)
    
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