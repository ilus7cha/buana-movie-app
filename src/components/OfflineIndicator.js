import React from 'react';

const OfflineIndicator = ({ isOffline }) => {
  return isOffline ? <div>Offline</div> : null;
};

export default OfflineIndicator;