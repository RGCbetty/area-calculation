const SQL = require('..')

module.exports = class MSSQL extends (
  SQL
) {
  constructor(host, username, password, database) {
    super(host, username, password, database)
    this.mssql = require('mssql')
    this.config = {
      user: this.username,
      password: this.password,
      server: this.host,
      database: this.database,
      options: {
        enableArithAbort: true,
        encrypt: false,
      },
      pool: {
        idleTimeoutMillis: 300000,
        max: 100,
      },
    }
  }

  async select() {
    try {
      let pool = new this.mssql.ConnectionPool(this.config)
      let connectedPool = await pool.connect()
      await connectedPool
      let request = pool.request()
      let result = await request.query(
        `SELECT ${this.fieldjoin} FROM ${this.table} where ${this.whereCondition}`,
      )
      await pool.close()
      return result
    } catch (err) {
      console.log(err)
    }

    this.mssql.on('error', async (err) => {
      await this.mssql.close()
    })
  }
}
