import React, { FC } from 'react';
import { useNavigationContext } from '../contexts/NavigationContext';
import { last } from 'lodash';
import { ContainerDetails } from './ContainerDetails';

export const DetailsPanel: FC = () => {
  const [stack] = useNavigationContext();
  if (!stack) return null;

  console.log(last(stack));

  const currentView = last(stack);
  if (!currentView || !currentView.viewData) return null;

  switch(currentView.viewData.viewType) {
    case 'container-details': return <ContainerDetails contianerId={currentView.viewData.containerId} />;
    default: return null;
  }
}
