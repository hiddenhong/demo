const API = {
  WORDPRESS: 'http://139.224.44.73:8000',
  // WIKI: (process.env.NODE_ENV !== 'production' ? 'http://toyhouse.cc/wiki' : 'http://139.224.44.73:8001' ),
  WIKI: (process.env.NODE_ENV !== 'production' ? 'http://139.224.44.73:8001' : 'http://139.224.44.73:8001' ),
  // GITLAB: (process.env.NODE_ENV !== 'production' ? 'http://cn.bing.com' : 'http://139.224.44.73:10080' ),
  GITLAB: (process.env.NODE_ENV !== 'production' ? 'http://139.224.44.73:10080' : 'http://139.224.44.73:10080' ),
  QODLAB: 'http://qodlab.com',
  PROQOD: 'http://proqod.com',

  ROOT_URL: (process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1' : 'http://139.224.44.73'),

  REGISTER: '/v1/auth/register/',
  LOGIN:  '/v1/auth/login/',

  AUTH_SET_PASSWORD:  '/v1/auth/password/',
  ME:  '/v1/auth/me/',
  VERIFY: '/v1/auth/api-token-verify/',

  LOGOUT:  '/v1/auth/logout/'
}

export default API;