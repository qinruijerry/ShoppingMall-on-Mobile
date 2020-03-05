import axios from "axios"

export function request1(config) {
  const instance = axios.create({
    baseURL: "####" , //url from provate webserver 
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


