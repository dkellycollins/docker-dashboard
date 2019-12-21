import React, { FC } from 'react';
import { useDockerContainers } from '../hooks/useDockerContainers';
import { ITreeNode, Tree } from '@blueprintjs/core';

export const App: FC = () => {
  const containers = useDockerContainers();

  const contents: Array<ITreeNode> = [
    { 
      id: 'containers', 
      label: 'Containers', 
      isExpanded: true, 
      childNodes: containers.map(container => ({
        id: container.id,
        label: container.names.join(', '),
        secondaryLabel: container.image
      })) 
    }
  ];

  return (
    <Tree
      contents={contents}
    />
  );
}
