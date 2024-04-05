/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { FetchResponse } from '../@types/fetch';
import { API_URL } from './constantes';

export async function fetchData(alias: string): Promise<FetchResponse> {
  try {
    const ENDPOINT = `${API_URL}/${alias}`;
    const response = await fetch(ENDPOINT);
    const data = (await response.json()) as FetchResponse;
    return data;
  } catch (error: any) {
    return error;
  }
}

export async function postData(alias: string, body: object): Promise<FetchResponse> {
  try {
    const ENDPOINT = `${API_URL}/${alias}`;
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = (await response.json()) as FetchResponse;
    return data;
  } catch (error: any) {
    return error;
  }
}
