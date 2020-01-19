import React, { FC } from 'react';
import { useNavigationContext } from '../contexts/NavigationContext';
import { last } from 'lodash';
import { ContainerDetails } from './ContainerDetails';
import { ImageDetails } from './ImageDetails';

export const DetailsPanel: FC = () => {
  const [stack] = useNavigationContext();
  if (!stack) return null;

  const currentView = last(stack);
  if (!currentView || !currentView.viewData) return null;

  switch(currentView.viewData.viewType) {
    case 'container-details': return <ContainerDetails contianerId={currentView.viewData.containerId} />;
    case 'image-details': return <ImageDetails imageId={currentView.viewData.imageId} />;
    default: return null;
  }
}
