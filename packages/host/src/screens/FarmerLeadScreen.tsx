import {Federated} from '@callstack/repack/client';
import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Placeholder from '../components/Placeholder';

const FarmerLead = React.lazy(() => Federated.importModule('farmerLead', './App'));

const FarmerLeadScreen = () => {
  return (
    <ErrorBoundary name="FarmerLead">
      <React.Suspense
        fallback={<Placeholder label="Farmer Lead" icon="calendar" />}>
        <FarmerLead />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default FarmerLeadScreen;
