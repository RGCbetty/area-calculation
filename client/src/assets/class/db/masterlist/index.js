import Base from "../base";

export default class MasterList extends Base{
  constructor(){
    super() 
  }

  validateLogin(user){
    return new Promise ( (resolve, reject) => {
      this.axios.post(`${this.apidb}/masterlist/auth/login`, user)
      .then(res => {
        const {accessToken, ...userDetails} = res.data
        localStorage.setItem('user',JSON.stringify(userDetails))
        localStorage.setItem('token',JSON.stringify(accessToken))
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
    })
  }

}