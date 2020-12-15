
import Oidc from 'oidc-client';
import { saveUrl, getSavedUrl } from '@helpers/storage';

function createAuthConfig() {
  const oidcConfig = {
    authority: 'https://iam.ebrains.eu/auth/realms/hbp',
    client_id: 'ebrains-wizard',
    scope: 'email profile openid collab.drive',
    
    redirect_uri: window.location.origin + '/callback.html',
    post_logout_redirect_uri: window.location.origin + '/index.html',
    silent_redirect_uri: window.location.origin + '/silent-renew.html',

    userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),
    response_type: 'id_token token',
    automaticSilentRenew: true,
    loadUserInfo: true,
    accessTokenExpiringNotificationTime: 10,
    filterProtocolClaims: true,
  };
  return oidcConfig;
}

async function login(authMgr: Oidc.UserManager): Promise<any> {
  saveUrl(window.location.href);
  return authMgr.signinRedirect();
}

async function loginSilent() {
  const authMgr = createAuthManager();
  await authMgr.signinSilent().then((user) => {
    console.debug('user refreshed', user);
  });
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
  loginSilent,
};
