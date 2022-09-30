import development from './development.env';
import production from './production.env';

export interface ENV {
  BASE_URL: string,
  BASE_XH_URL: string,
  OSS_URL: string
  BASE_APPID: string,
}

const { NODE_ENV } = process.env;

const env: ENV = NODE_ENV === 'development' ? development : production;

export default env;
