import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import { TitleInput } from '@components/TitleInput';
import { Counter } from '@components/Counter';
import { Combined } from '@components/Combined';
import { MainView } from '@components/MainView/MainView';

export const AppContent: React.FC = () => {
  return (
    <HashRouter>
      <div>
        <Route path="/" exact component={MainView} />
        <Route path="/firstPage" component={Counter} />
        <Route path="/secondPage" component={TitleInput} />
        <Route path="/thirdPage" component={Combined} />
      </div>
    </HashRouter>
  );
};
