
import Oidc from 'oidc-client';
import { saveUrl, getSavedUrl } from './storage';

function createAuthConfig() {
  const redirect = window.location.origin
    // + process.env.BASE_URL
    + (window.location.pathname === '/' ? '' : window.location.pathname)
    + '/#login';

  const oidcConfig = {
    authority: 'https://iam.ebrains.eu/auth/realms/hbp',
    client_id: 'ebrains-wizard',
    scope: 'email profile openid collab.drive',
    redirect_uri: redirect,
    response_type: 'id_token token',
    automaticSilentRenew: true,
    loadUserInfo: true,
  };
  return oidcConfig;
}

async function login(authMgr: Oidc.UserManager): Promise<any> {
  saveUrl(window.location.href);
  return authMgr.signinRedirect();
}

function createAuthManager() {
  const oidcConfig = createAuthConfig();
  const authMgr = new Oidc.UserManager(oidcConfig);
  return authMgr;
}

function init(): Promise<any> {
  const authMgr = createAuthManager();
  return login(authMgr);
}

async function authCallback() {
  const authMgr = createAuthManager();
  const user = await authMgr.signinRedirectCallback().then(() => {
    const savedUrl = getSavedUrl();
    window.location.href = savedUrl;
    }, error => console.error(error)
  );
  return user;
}

async function getUserInfo() {
  const authMgr = createAuthManager();
  const user = await authMgr.getUser();
  return user;
}

export default init;

export {
  init,
  authCallback,
  getUserInfo,
};
