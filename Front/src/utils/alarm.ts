import API from "./axios";

const URL = '/notify';

export const getAlarmList = () => {
  return API.get(URL)
    .then(res => res.data)
    .catch(err => console.error(err))
};

export const checkAlarm = (notifyCode: number) => {
  return API.patch(URL + `/${notifyCode}`)
    .then(res => res)
    .catch(err => console.error(err))
};

export const deleteAlarm = (notifyCode: number) => {
  return API.delete(URL + `/${notifyCode}`)
    .then(res => res)
    .catch(err => console.error(err))
};