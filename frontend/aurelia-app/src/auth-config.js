export const config = {
  logoutOnInvalidtoken: true,
  expiredReload: 1,
  baseUrl: 'api',
  loginUrl: '/public/v1/auth',
  loginRedirect: '#/product-detail',
  logoutRedirect: '#/login',
  providers: {
    linkedin: {
      clientId: "224712101506955",
      state: "" + Math.floor(Math.random() * 9999999999) + "",
      url: '/public/v1/auth/linkedin',
      scope: ['r_fullprofile'],
      scopeDelimiter: ' ',
      type: '2.0',
      popupOptions: { width: 527, height: 582 }
    },
    facebook: {
      clientId: '224712101506955',
      name: 'facebook',
      url: '/auth/facebook',
      authorizationEndpoint: 'https://www.facebook.com/v2.3/dialog/oauth',
      redirectUri: window.location.origin + '/' || window.location.protocol + '//' + window.location.host + '/',
      scope: ['email'],
      scopeDelimiter: ',',
      nonce: function () {
        return Math.random();
      },
      requiredUrlParams: ['nonce', 'display', 'scope', 'clientId'],
      display: 'popup',
      type: '2.0',
      popupOptions: { width: 580, height: 400 }
    }
  }
}; 