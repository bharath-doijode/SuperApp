import {Federated} from '@callstack/repack/client';
import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Placeholder from '../components/Placeholder';

const Farmer = React.lazy(() => Federated.importModule('farmer', './App'));

const FarmerScreen = () => {
  return (
    <ErrorBoundary name="FarmerScreen">
      <React.Suspense fallback={<Placeholder label="Farmer" icon="cart" />}>
        <Farmer />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default FarmerScreen;
