const getContainersURL = ({
  hostname = "https://opa-super-app.vercel.app",//'http://localhost:3000',
  appName,
  version,
  platform,
}) => {
  return `${hostname}/${appName}?platform=${platform}&appVersion=${version}`;
};

export default getContainersURL;
