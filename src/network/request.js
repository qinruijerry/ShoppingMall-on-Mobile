import axios from "axios"

export function request1(config) {
  const instance = axios.create({
    baseURL: "http://106.54.54.237:8000/api/wh" ,
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


