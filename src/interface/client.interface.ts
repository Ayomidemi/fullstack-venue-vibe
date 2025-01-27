/* eslint-disable @typescript-eslint/no-explicit-any */
export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface PrefixType {
  [name: string]: any;
}

export interface RequestOptions {
  method: RequestMethod;
  headers: PrefixType;
  body?: string;
}

export interface Token {
  token: string;
  expiresIn: string;
}

export interface ClientRequestOptions {
  overrideDefaultBaseUrl?: boolean;
  headers?: PrefixType;
  token?: Token;
  redirectIfUnauthorized?: boolean;
}

export type ClientResponse<T = any, E = any> =
  | {
      data: T;
      status: number;
      headers?: Headers;
    }
  | {
      error: E;
      status: number;
      headers?: Headers;
    };

export interface IRequestOptions {
  url?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  body?: Record<string, string>;
  headers?: Record<string, string>;
}
