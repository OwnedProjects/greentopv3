import { constants } from '../config/settings';

export async function fetchWrapper<T>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<T> {
  let message;

  try {
    const resp = await fetch(constants.API_GATEWAY_URL + input, {
      ...init,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    try {
      message = await resp.json();
    } catch (e) {
      console.error('Error parsing JSON response:', e);
    }

    if (!resp.ok) {
      return Promise.reject({
        ...message,
        statusText: resp.statusText,
      });
    } else {
      return Promise.resolve(message as T);
    }
  } catch (e) {
    console.log('Fetch error:', e);

    if (e instanceof TypeError && e.message === 'Failed to fetch') {
      return Promise.reject({
        status: 503,
        statusText: 'Server is Currently Unavailable',
        message:
          'The server is currently unreachable. Please check your server configurations.',
      });
    }

    return Promise.reject({
      status: 500,
      statusText: 'Something went wrong',
      message: 'Something went wrong',
    });
  }
}
