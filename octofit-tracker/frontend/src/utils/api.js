const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const getApiBaseUrl = () => {
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

export const getApiUrl = (resource) => {
  const normalizedResource = resource.replace(/^\//, '').replace(/\/$/, '');
  return `${getApiBaseUrl()}/api/${normalizedResource}/`;
};
