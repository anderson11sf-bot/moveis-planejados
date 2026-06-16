import React, { useState } from 'react';

interface ImageLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
}

export const ImageLoader: React.FC<ImageLoaderProps> = ({ src, alt, className, wrapperClassName, ...props }) => {
  const [error, setError] = useState(false);

  return (
    <div className={wrapperClassName || className} style={wrapperClassName ? {} : { position: 'relative', overflow: 'hidden', width: '100%', height: '100%' }}>
      {!error ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={className}
          onError={() => setError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          {...props}
        />
      ) : (
        <div style={{
          width: '100%', height: '100%', backgroundColor: '#0a0a0a', 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#C5A880', fontFamily: 'var(--font-serif)', fontSize: '1.2rem',
          border: '1px solid #222'
        }}>
          Projeto Exclusivo
        </div>
      )}
    </div>
  );
};
