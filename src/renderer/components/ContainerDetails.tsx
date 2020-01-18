import React, { FC } from 'react';
import { useDockerContainer } from '../hooks/useDockerContainer';

export interface ContainerDetailsProps {
  contianerId: string
}

export const ContainerDetails: FC<ContainerDetailsProps> = (props) => {
  const container = useDockerContainer(props.contianerId);

  return (
    <div>
      <pre>
        {!!container && JSON.stringify(container.raw, null, 2)}
      </pre>
    </div>
  );
}
