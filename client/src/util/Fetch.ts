interface RequestInitOptions {
  body?: BodyInit | null;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  headers?: HeadersInit;
  integrity?: string;
  keepalive?: boolean;
  mode?: RequestMode;
  redirect?: RequestRedirect;
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
  signal?: AbortSignal | null;
  window?: any;
}

const defs = {
  baseUrl: '',
  headers: {
    'Content-Type': 'application/json',
  }
}

class Fetch {

  constructor(private url: string = '', private options: RequestInit) {
  }

}

export function request(defaults?: ) {


  return {
    get: (url: string, options: RequestInitOptions) => new Fetch(url, { ...options, method: 'GET' }),
    post: (url: string, options: RequestInitOptions) => new Fetch(url, { ...options, method: 'POST' })
  }
}


