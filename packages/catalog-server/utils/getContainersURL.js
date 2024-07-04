const getContainersURL = ({
  hostname = 'http://localhost:3000',//"https://catalog-server-opa.vercel.app/",//process.env.SAS_CATALOG_SERVER_URL,
  appName,
  version,
  platform,
}) => {
  return `${hostname}/${appName}?platform=${platform}&appVersion=${version}`;
};

export default getContainersURL;
