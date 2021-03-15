import Base from "../assets/class/db/base/index";

class AuthService extends Base{
  constructor(){
    super() 
  }
  async login(user){
    try{
      let res =  await this.axios.post(`${this.apidb}/masterlist/id2/${userID}`, {password: pass})
      if(res.data.accessToken){
        localStorage.setItem("user", JSON.stringify(res.data))
      }
      return res.data
    }catch (err){
      console.error(err)
    }
  }
  logout(){
    localStorage.removeItem("user")
  }


  validateLogin(userID, pass){
    return new Promise ( (resolve, reject) => {
      this.axios.post(`${this.apidb}/masterlist/id2/${userID}`, {password: pass})
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
    })
  }

}

export default new AuthService();