/**
 * @format
 */

import {ScriptManager, Script, Federated} from '@callstack/repack/client';
import {AppRegistry, Platform} from 'react-native';
import App from './src/App';
import getContainersURL from '../catalog-server/utils/getContainersURL';
import {name as appName} from './app.json';
import {version as appVersion} from './package.json';

ScriptManager.shared.addResolver(async (scriptId, caller) => {
  
  const containersURL = getContainersURL({
    hostname: "https://catalog-server-opa.vercel.app/",//process.env.SAS_CATALOG_SERVER_URL,
    version: appVersion,
    platform: Platform.OS,
    appName,
  });


  const containersResponse = await fetch(containersURL);

  const containers = await containersResponse.json();

  const resolveURL = Federated.createURLResolver({
    containers,
  });


  let url;
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
});

AppRegistry.registerComponent(appName, () => App);
