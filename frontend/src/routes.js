const apiPath = '/api/v1';

const apiPaths = {
  homePath: () => [apiPath],
  loginPath: () => [apiPath, 'login'].join('/'),
  channelPath: () => [apiPath, 'channels'].join('/'),
  messagePath: () => [apiPath, 'message'].join('/'),
};

export default apiPaths;
