import React, { FC } from 'react';
import { NavigationPanel } from './NavigationPanel';
import { Toolbar } from './Toolbar';
import SplitPane from 'react-split-pane';
import { DetailsPanel } from './DetailsPanel';
import { NavigationProvider } from '../contexts/NavigationContext';

export const App: FC = () => {
  return (
    <div>
      <NavigationProvider>
        <Toolbar />
        <SplitPane primary="first" defaultSize="25%" minSize="50">
          <div>
            <NavigationPanel />
          </div>
          <div>
            <DetailsPanel />
          </div>
        </SplitPane>
      </NavigationProvider>
    </div>
  );
}
