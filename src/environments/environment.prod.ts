const ORIGIN = new URL(window.location.href).origin;

export const environment = {
  production: true,
  envName: 'prod',
  loadApiPath: new URL('loadboard-rest', ORIGIN).href,
};
