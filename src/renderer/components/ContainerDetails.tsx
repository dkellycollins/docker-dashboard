import React, { FC } from 'react';
import SplitPane from 'react-split-pane';

export interface ContainerDetailsProps {
  contianerId: string
}

export const ContainerDetails: FC<ContainerDetailsProps> = (props) => {
  console.log('ContainerDetails');
  return (
    <SplitPane primary="first" split="horizontal" defaultSize="75%">
      <div>Details {props.contianerId}</div>
      <div>Logs</div>
    </SplitPane>
  );
}
