'use client';

import { useCallback } from 'react';
import { ClientRequestOptions, RequestMethod, RequestOptions, Token } from '@/interface';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/navigation';
import { sessionAtom } from '@/state';

export const useClient = () => {
  const baseApiUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const session = useRecoilValue(sessionAtom);
  const router = useRouter();

  const generateAuthHeader = useCallback((auth?: Token) => {
    const token = auth && auth;
    const isLoggedIn = !!token;

    if (isLoggedIn) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return {};
    }
  }, []);

  async function handleResponse<R = any, E = any>(
    response: globalThis.Response,
    redirectIfUnauthorized = true,
  ) {
    const contentType = response.headers?.get('content-type');

    if (
      contentType?.includes('application/pdf') ||
      contentType?.includes('application/octet-stream')
    ) {
      // HANDLE BINARY RESPONSE (DOWNLOADS)
      const blobData = await response.blob();
      return {
        data: blobData,
        status: response.status,
        error: undefined,
      };
    }

    // HANDLE JSON RESPONSE
    return response
      .json()
      .then((data) => {
        if (!response.ok) {
          if (response.status === 401 && redirectIfUnauthorized) {
            router.push('/login');
          }

          const error: E = (data && data.message) || response.statusText;
          return {
            error,
            status: response.status,
            data: undefined,
          };
        }

        if (data?.data && data?.pagination) {
          return {
            data: {
              data: data.data,
              pagination: data.pagination,
            },
            status: response.status,
            error: undefined,
          };
        }

        const responseData: R = data.data || data.message || data;
        return {
          data: responseData,
          status: response.status,
          error: undefined,
        };
      })
      .catch((error) => {
        return {
          data: undefined,
          status: response.status || 500,
          error: error.message || 'Something went wrong, please try again later.',
        };
      });
  }

  const request = useCallback((method: RequestMethod) => {
    /**
     * @description This method makes an API Call using the provided
     * @param url The url to make the request to. The base URL of
     * @param body The body of the request.
     * @param options Extra options to modify the behaviour of the request.
     */
    return async function requestHandler<Response = any, Body = any, Error = any>(
      url: string,
      body?: Body,
      options?: ClientRequestOptions,
    ) {
      const requestOptions: RequestOptions = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'en-US',
          ...generateAuthHeader(session?.token || options?.token),
          ...options?.headers,
        },
      };

      if (body) {
        requestOptions.headers['Content-Type'] = 'application/json';
        requestOptions.body = JSON.stringify(body);
      }

      const hideSlash = url.startsWith('/');
      const baseUrl = options?.overrideDefaultBaseUrl ? '' : baseApiUrl + (hideSlash ? '' : '/');
      const requestUrl = `${baseUrl}${url}`;

      return fetch(requestUrl, requestOptions)
        .then((response) => {
          return handleResponse<Response, Error>(response, options?.redirectIfUnauthorized);
        })
        .catch((error: Error) => {
          return { error, status: 500, data: undefined };
        });
    };
  }, []);

  return {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE'),
    patch: request('PATCH'),
  };
};
