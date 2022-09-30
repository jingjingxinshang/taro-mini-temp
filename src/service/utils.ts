import Taro from '@tarojs/taro';
import querystring from 'querystring';
import env from '../env/index';

/**
 * @description 获取当前页url
 */
export const getCurrentPageUrl = () => {
  const pages = Taro.getCurrentPages();
  const currentPage = pages[pages.length - 1];
  return currentPage.route!;
};

export const pageToLogin = () => {
  const path = getCurrentPageUrl();
  if (!path.includes('login')) {
    Taro.navigateTo({
      url: '/pages/login/login',
    });
  }
};

export const StorageKey_MpUserInfo = '__MP_USER_INFO__'; // 微信个人信息

export class Utils {
  static formatUrl(url: string): string {
    if (/^(\/zuul)?\/api/.test(url)) {
      return env.BASE_URL + url;
    } if (/^\/oss/.test(url)) {
      return (env.OSS_URL + url).replace('/oss', '');
    }
    return '';
  }

  static day(date: string) {
    const datelist = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    return datelist[new Date(date.replace(/-/g, '/')).getDay()];
  }

  static getStorage(key: string) {
    return Taro.getStorageSync<string>(key);
  }

  static setStorage(key: string, value: string) {
    Taro.setStorageSync(key, value);
  }

  static setTimerForWait(
    predicate: (time?: number) => boolean | Promise<boolean>,
    timeout = 30000,
    interval = 500,
  ) {
    let time = 0;
    return new Promise((resolve, reject) => {
      time += interval;
      // eslint-disable-next-line no-underscore-dangle
      const _timer = window.setInterval(() => {
        if (time >= timeout) {
          clearInterval(_timer);
          reject(new EvalError(`timeout over ${timeout}ms`));
        }
        const ret = predicate();
        if (ret instanceof Promise) {
          ret.then((bool) => {
            if (bool) {
              clearInterval(_timer);
              resolve(1);
            }
          });
        } else if (ret) {
          clearInterval(_timer);
          resolve(1);
        }
      }, interval);
    });
  }

  static requestPayment = Taro.requestPayment;

  static showToast = Taro.showToast;

  static hideToast = Taro.hideToast;

  static showModal = Taro.showModal;

  static navigateTo = Taro.navigateTo;

  static queryStringify = querystring.stringify;

  static compare(name: string, minor?) {
    return function (o, p) {
      let a; let
        b;
      if (o && p && typeof o === 'object' && typeof p === 'object') {
        a = o[name];
        b = p[name];
        if (a === b) {
          return typeof minor === 'function' ? minor(o, p) : 0;
        }
        if (typeof a === typeof b) {
          return a < b ? -1 : 1;
        }
        return typeof a < typeof b ? -1 : 1;
      }
      // eslint-disable-next-line no-throw-literal
      throw 'error';
    };
  }
}
