import NetInfo from '@react-native-community/netinfo';

/**
 * Checks the current network connection status.
 * @returns {Promise<object>} A promise that resolves to an object with properties:
 *   - isConnected: boolean (true if connected, false otherwise)
 *   - isInternetReachable: boolean (true if internet is reachable, false otherwise)
 */
export const getNetworkStatus = async () => {
  const state = await NetInfo.fetch();
  return {
    isConnected: state.isConnected,
    isInternetReachable: state.isInternetReachable,
  };
};