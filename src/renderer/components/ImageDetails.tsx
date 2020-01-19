import React, { FC } from 'react';
import { useDockerImage } from '../hooks/useDockerImage';

export interface ImageDetailsProps {
  imageId: string
}

export const ImageDetails: FC<ImageDetailsProps> = (props) => {
  const container = useDockerImage(props.imageId);

  return (
    <pre>
      {!!container && JSON.stringify(container.raw, null, 2)}
    </pre>
  );
}
