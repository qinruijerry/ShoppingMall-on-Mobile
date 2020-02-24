import {request1} from "./request";

export function getMultidata (){
  // console.log(request1({
  // //   url: '/home/multidata',
  // //   method: "get"
  // // }))
  return  request1({
    url: '/home/multidata',
    // method: "get"
  })
}
