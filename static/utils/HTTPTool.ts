/* eslint-disable no-unused-vars */
enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type TOptions = {
  method?: METHODS;
  mode?: string;
  headers?: Record<string, string>;
  timeout?: number;
  data?: unknown;
};

function queryStringify(data: Record<string, unknown>) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${
      index < keys.length - 1 ? '&' : ''
    }`;
  }, '?');
}

export default class HTTPTool {
  get = (url: string, options: TOptions = {}) => {
    return this.request(
      url,
      {
        ...options,
        method: METHODS.GET,
        mode: 'cors',
      },
      options.timeout,
    );
  };

  post = (url: string, options: TOptions = {}) => {
    return this.request(
      url,
      {
        ...options,
        method: METHODS.POST,
        mode: 'cors',
      },
      options.timeout,
    );
  };

  put = (url: string, options: TOptions = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout,
    );
  };

  delete = (url: string, options: TOptions = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout,
    );
  };

  request = (
    url: string,
    options: TOptions = {},
    timeout: number = 5000,
  ) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr: XMLHttpRequest = new XMLHttpRequest();
      const isGet: boolean = method === METHODS.GET;

      xhr.open(
        method,
        isGet && Boolean(data)
          ? `${url}${queryStringify(data)}`
          : url,
      );

      xhr.withCredentials = true;

      Object.keys(headers).forEach((key: string) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        const { status } = xhr;
        if (status === 200 && xhr.readyState === 4) {
          resolve(xhr);
        }

        reject(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
