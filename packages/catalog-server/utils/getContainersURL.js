const getContainersURL = ({
  hostname = "https://super-app-with-catelog-server.vercel.app/",//'http://localhost:3000',
  appName,
  version,
  platform,
}) => {
  return `${hostname}/${appName}?platform=${platform}&appVersion=${version}`;
};

export default getContainersURL;
