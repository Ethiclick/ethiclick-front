/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { FetchResponse } from '../@types/fetch';
import { API_URL } from './constantes';

export async function fetchData<T>(alias: string, token:string|null): Promise<T> {
  try {
    // const token = await getBearerToken();
    // eslint-disable-next-line no-param-reassign
    if (alias.startsWith('/')) alias = alias.substring(1);
    const ENDPOINT = `${API_URL}/${alias}`;
    const response = await fetch(ENDPOINT , {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = (await response.json()) as T;
    return data;
  } catch (error: any) {
    return error;
  }
}

export async function postData(alias: string, body: object, token?: string | null): Promise<FetchResponse> {
  try {
    const ENDPOINT = `${API_URL}/${alias}`;
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = (await response.json()) as FetchResponse;
    return data;
  } catch (error: any) {
    return error;
  }
}

export async function getData(alias: string, token: string): Promise<FetchResponse> {
  try {
    const ENDPOINT = `${API_URL}/${alias}`;
    const response = await fetch(ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // Vous pouvez ajouter d'autres en-têtes si nécessaire
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur ${response.status} lors de la requête.`);
    }

    const data = (await response.json()) as FetchResponse;

    return data;
  } catch (error: any) {
    return error;
  }
}
