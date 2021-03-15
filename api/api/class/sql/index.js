module.exports = class SQL {
  constructor(host, username, password, database){
    this.host = host;
    this.username = username;
    this.password = password;
    this.database = database;

    this.fields = [];
    this.table = '';
    this.whereCondition = '';
  }  

  get fieldjoin(){
    return this.fields.join(', ')
  }

  clear(){
    this.fields = [];
    this.table = '';
    this.whereCondition = '';
  }

}