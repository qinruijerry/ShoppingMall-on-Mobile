import axios from "axios"

export function request1(config) {
  const instance = axios.create({
    baseURL: "http://123.207.32.32:8000/api/hy",
  })

  instance.interceptors.request.use(req => {
    return req
  }, err => {
    console.log(err)})

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)})

  return instance(config)

}


