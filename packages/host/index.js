/**
 * @format
 */

import { ScriptManager, Script, Federated } from '@callstack/repack/client';
import { AppRegistry, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import App from './src/App';
import getContainersURL from '../catalog-server/utils/getContainersURL';
import { name as appName } from './app.json';
import { version as appVersion } from './package.json';
import { getNetworkStatus } from './src/networkUtils';


ScriptManager.shared.setStorage(AsyncStorage);
ScriptManager.shared.addResolver(async (scriptId, caller) => {

  const containersURL = getContainersURL({
    hostname: "https://catalog-server-opa.vercel.app/",//"http://localhost:3000",//"https://catalog-server-opa.vercel.app/",//process.env.SAS_CATALOG_SERVER_URL,
    version: appVersion,
    platform: Platform.OS,
    appName,
  });

  const network = await getNetworkStatus();

  let url;

  if (network.isConnected) {

    const containersResponse = await fetch(containersURL);

    const containers = await containersResponse.json();

    await AsyncStorage.setItem('cachedContainers', JSON.stringify(containers)); 

    const resolveURL = Federated.createURLResolver({
      containers,
    });



    if (__DEV__ && caller === 'main') {
      url = Script.getDevServerURL(scriptId);
    } else {
      url = resolveURL(scriptId, caller);
      
    }

    if (!url) {
      return undefined;
    }

    // let returnObject = JSON.stringify({
    //   url,
    //   cache: true,
    //   query: {
    //     platform: Platform.OS, 
    //   },
    //   verifyScriptSignature: 'off'
    // });

    //await AsyncStorage.setItem('cachedData', returnObject); 
  
    return {
      url,
      cache: true,//!__DEV__,
      query: {
        platform: Platform.OS, // only needed in development
      },
      verifyScriptSignature: 'off',//__DEV__ ? 'off' : 'strict',
    };



  }
  else{
   

    let containersData = await AsyncStorage.getItem('cachedContainers'); 
    let containers = JSON.parse(containersData);

    const resolveURL = Federated.createURLResolver({
      containers,
    });



    if (__DEV__ && caller === 'main') {
      url = Script.getDevServerURL(scriptId);
    } else {
      url = resolveURL(scriptId, caller);
      
    }

    if (!url) {
      return undefined;
    }

    

    return {
      url,
      cache: true,//!__DEV__,
      query: {
        platform: Platform.OS, // only needed in development
      },
      verifyScriptSignature: 'off',//__DEV__ ? 'off' : 'strict',
    };


  }

  
});

AppRegistry.registerComponent(appName, () => App);
