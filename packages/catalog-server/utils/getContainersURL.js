const getContainersURL = ({
  hostname = process.env.SAS_CATALOG_SERVER_URL,
  appName,
  version,
  platform,
}) => {
  return `${hostname}/${appName}?platform=${platform}&appVersion=${version}`;
};

export default getContainersURL;
