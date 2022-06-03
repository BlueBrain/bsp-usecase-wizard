
import Oidc from 'oidc-client';
import { saveUrl } from '@/helpers/storage';
import { iam } from '@/constants';

// comes from rollup.config.js
declare var processEnvs: any;

function createAuthConfig() {
  const redirectBase = `${window.location.origin}/${processEnvs.baseUrl}`;
  const oidcConfig = {
    authority: iam.LOGIN_URL,
    client_id: 'ebrains-wizard-2',
    scope: 'email profile openid collab.drive',
    
    redirect_uri: `${redirectBase}/callback.html`,
    post_logout_redirect_uri: `${redirectBase}/index.html`,
    silent_redirect_uri: `${redirectBase}/silent-renew.html`,

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
  await authMgr.signinSilent();
}

function createAuthManager() {
  const oidcConfig = createAuthConfig();
  const authMgr = new Oidc.UserManager(oidcConfig);
  authMgr.events.addSilentRenewError(() => {
    return login(authMgr);
  });
  return authMgr;
}

function init(): Promise<any> {
  const authMgr = createAuthManager();
  return login(authMgr);
}

async function getUserInfo() {
  const authMgr = createAuthManager();
  const user = await authMgr.getUser();
  return user;
}

export default init;

export {
  init,
  getUserInfo,
  loginSilent,
};
