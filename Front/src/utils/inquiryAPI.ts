import API from "./axios";

const URL = '/request'

export interface RequestData {
  title: string;
  content: string;
};

export const getFAQ = () => {
  return API.get(URL + '/faq')
    .then(res => res.data)
    .catch(err => console.error(err))
};

export const getRequests = (page: number) => {
  return API.get(URL, {
    params: {
      page,
      typeCode: 0
    }
  })
    .then(res => res.data)
    .catch(err => console.error(err))
};

export const getRequestDetail = (boardCode: string) => {
  return API.get(URL + `/${boardCode}`)
    .then(res => res.data)
    .catch(err => console.error(err))
};

export const createRequest = (data: RequestData) => {
  return API.post(URL, data)
    .then(res => res)
    .catch(err => console.error(err))
};

export const editRequest = (boardCode: string, data: RequestData) => {
  return API.put(URL + `/${boardCode}`, data)
    .then(res => res)
    .catch(err => console.error(err))
};

export const deleteRequest = (boardCode: string) => {
  return API.delete(URL + `/${boardCode}`)
    .then(res => res)
    .catch(err => console.error(err))
};