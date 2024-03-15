import axios from "axios";

async function getData(url: string, token: string | null = null) {
  try {
    const CancelToken = axios.CancelToken;
    let cancel;
    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cancelToken: new CancelToken((cancelFunction) => {
            cancel = cancelFunction;
          }),
        }
      : {};
    const response = await axios.get(url, config);
    return { data: response.data, cancel };
  } catch (error: any) {
    return { error: error.response.data.error };
  }
}

async function postData(
  url: string,
  data: any,
  token: string | null = null,
  moreHeaders: Record<string, string> | null = null
) {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    if (moreHeaders) {
      Object.assign(headers, moreHeaders);
    }

    const response = await axios.post(url, data, { headers });
    return { data: response.data };
  } catch (error: any) {
    return { error: error.response.data.error };
  }
}

async function putData(url: string, data: any, token: string | null = null) {
  try {
    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};
    const response = await axios.put(url, data, config);
    return { data: response.data };
  } catch (error: any) {
    return { error: error.response.data.error };
  }
}

async function deleteData(url: string, token: string | null = null) {
  try {
    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};
    const response = await axios.delete(url, config);
    return { data: response.data };
  } catch (error: any) {
    return { error: error.response.data.error };
  }
}

export { getData, postData, putData, deleteData };
