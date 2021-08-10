import base64 from 'base-64';

export const ENCODE_DATA = base64.encode(`${'web'}:${'123456789'}`);
// export const googleClient
export const GOOGLE_CLIENT_ID =
	'819744979674-dastdmj1j5k8coluu2vofclsi3kvo90h.apps.googleusercontent.com';
export const GOOGLE_CLIENT_SECRET = 'LEVTqM7nBsyLPuSEbT-mPffx';

export const GRANT_TYPE_CLIENT = 'client_credentials';
export const GRANT_TYPE_PASSWORD = 'password';
export const GRANT_TYPE_REFRESH = 'refresh_token';
export const GRANT_TYPE_AUTH_CODE = 'authorization_code';
