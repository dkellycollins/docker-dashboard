import React, { FC } from 'react';
import { NavigationPanel } from './NavigationPanel';
import { Toolbar } from './Toolbar';
import SplitPane from 'react-split-pane';
import { DetailsPanel } from './DetailsPanel';
import { NavigationProvider } from '../contexts/NavigationContext';

export const App: FC = () => {
  return (
    <NavigationProvider>
      <Toolbar />
      <div style={{ marginTop: '-50px', paddingTop: '50px', height: '100%' }}>
        <SplitPane>
          <div>
            <NavigationPanel />
          </div>
          <div>
            <DetailsPanel />
          </div>
        </SplitPane>
      </div>
    </NavigationProvider>
  );
}
