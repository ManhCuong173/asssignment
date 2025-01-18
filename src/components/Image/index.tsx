import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;  
  fallback?: string; 
}

const Image: React.FC<ImageProps> = ({ 
  src, 
  alt, 
  fallback, 
  onError,
  ...props 
}) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (fallback) {
      (e.target as HTMLImageElement).src = fallback;
    }
    onError?.(e);
  };

  return (
    <img
      src={src}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
};

export default Image;