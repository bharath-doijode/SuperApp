import {Federated} from '@callstack/repack/client';
import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Placeholder from '../components/Placeholder';

const Commodities = React.lazy(() =>
  Federated.importModule('farmerLead', './CommoditiesScreen'),
);

const CommoditiesScreen = () => {
  return (
    <ErrorBoundary name="CommoditiesScreen">
      <React.Suspense
        fallback={<Placeholder label="Commodities" icon="calendar" />}>
        <Commodities />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default CommoditiesScreen;
