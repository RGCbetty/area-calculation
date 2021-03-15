const HRDSQL = require('../index')

module.exports = class HRDInformationService extends (
  HRDSQL
) {
  constructor() {
    super({ database: 'HrdInformationService' })
  }
  async getBasicSpecificationDetails(constructionCode) {
    this.fields.push('BasicSpecificationName', 'SpecificationDetailName')
    this.table = 'dbo.BasicSpecificationDetails'
    this.whereCondition = `ConstructionCode = '${constructionCode}'`
    return await this.select()
  }
  async CadPlanDetails(constructionCode, revNum) {
    try {
      let pool = new this.mssql.ConnectionPool(this.config)
      let connectedPool = await pool.connect()
      await connectedPool
      let request = pool.request()
      let result = await request.query(
        `SELECT A.Floor ,A.SettingValue AS Value ,B.ClassNameEnglish As Name, B.ClassNameJapanese As JName , C.SettingCategoryNameEnglish AS Unit
          FROM CadPlanDetails A
          LEFT JOIN CadPlanClasses  B
          ON A.ClassCode=B.ClassCode
          LEFT JOIN CadPlanSettingCategorys C
          ON A.ClassCode = C.ClassCode 
            AND A.SettingCategoryCode = C.SettingCategoryCode
          
          WHERE A.CadPlanNo = '${revNum}' AND  A.ConstructionCode = '${constructionCode}'
          AND (
          A.ClassCode ='0000010' AND A.SettingCategoryCode='000010'
          OR  A.ClassCode ='0000020' AND A.SettingCategoryCode='000010'
          OR 	A.ClassCode ='0000030' AND A.SettingCategoryCode='000010'
          OR	A.ClassCode ='0000040' AND A.SettingCategoryCode='000010'
          )
          `,
      )
      await pool.close()
      return result
    } catch (err) {
      console.log(err)
    }

    this.mssql.on('error', (err) => {
      console.log(err)
    })
  }
}
