import { useImagesContext } from '../context/useImageContext';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { Image } from '../models/Image'

export function Images() {
  const { listImages, setNewLike } = useImagesContext();
  const { loading } = useInfiniteScroll()

  if (!listImages || listImages.length === 0) {
    return (<p>No images found for your search</p>);
  }

  return (
    <div>
      <div className="images">
        {listImages.map((image: Image) => (
          <div className='container-images' key={image.id}>
            <div className="image">
              <img
                className='img-desktop'
                src={image.main_attachment.big}
                alt={image.main_attachment.big}
              />
              <img
                className='img-mobile'
                src={image.main_attachment.small}
                alt={image.main_attachment.small}
              />
              <p className='title-image'>{image.title.toUpperCase()}</p>
              <p>
                <span>by </span>
                {image.author}
              </p>
            </div>
            <div className='image-footer'>
              <div className='image-footer-like'>
                <span>{image.likes_count}</span>
                <i role="like" className="fab fa-gratipay" onClick={() => setNewLike(image.id)}></i>
              </div>
              <div className='image-footer-reset'>
                <i className="fas fa-redo"></i>
                <span>000</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      { loading ? 
        <div
          className='more-images'
          style={{ textAlign: 'center', height: '20px', marginBottom: '20px'}}
        >
          Loading more images...
        </div> : 
        null
      }
    </div>
  );
}
