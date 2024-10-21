import { useImagesContext } from '../context/useImageContext';
import { useElementOnScreen } from '../hooks/useElementOnScreen';
import { Image } from '../models/Image'

export function Images() {
  const { listImages } = useImagesContext();
  const { loading } = useElementOnScreen()

  if (!listImages || listImages.length === 0) {
    return (<p>No images found for your search</p>);
  }

  return (
    <div className='container-images'>
      <div className="images">
        {listImages.map((image: Image) => (
          <div className="image" key={image.id}>
            <div>
              <img
                className='img-desktop'
                src={image.main_attachment.big}
                alt={image.title}
              />
              <img
                className='img-mobile'
                src={image.main_attachment.small}
                alt={image.title}
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
                <i className="fab fa-gratipay"></i>
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
          style={{ textAlign: 'center', height: '20px', paddingBottom: '15px'}}
        >
          Loading more images...
        </div> : 
        null
      }
    </div>
  );
}
