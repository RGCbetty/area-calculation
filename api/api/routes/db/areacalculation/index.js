const express = require('express')
const router = express.Router()

const { area_calculation } = require('../../../utils/dbconfig')

router.get('/', (req, res) => {
  res.send({
    method: {
      post: ['save'],

      get: ['search?customerCode=@value'],
    },
  })
})

router.post('/computed', async (req, res) => {
  let obj = Object.assign({}, req.body)
  try {
    res.send(await area_calculation.insert(obj))
  } catch (err) {
    res.send(err)
  }
})

router.get('/computedItems', async (req, res) => {
  try {
    let body = await area_calculation.view('Computed', 'computedItems', {
      key: 'items',
    })
    // let toSend = body.rows.map(body => {
    //   return body.value
    // })

    res.send(body.rows)
  } catch (err) {
    return err
  }
})

router.get('/getDataByDateRange', async (req, res) => {
  try {
    let body = await area_calculation.view('computed', 'byDateRange', {
      include_docs: true,
      startkey: [2010, 1, 1, 0, 0, 0],
      endkey: [2020, 5, 23, 0, 0, 0],
    })

    let toSend = body.rows.map(body => {
      return body.doc
    })

    res.send(toSend)
  } catch (err) {
    res.send(err)
  }
})

router.get('/items', async (req, res) => {
  try {
    let body = await area_calculation.view('Computed', `${req.query.title}`, {
      key: req.query.docID,
    })

    body.rows.map(body => {
      res.send(body.value)
    })
  } catch (err) {
    res.send(err)
  }
})

router.get('/ComputedItemsByDocID', async (req, res) => {
  try {
    let body = await area_calculation.view(
      'Computed',
      'getComputedItemsByDocID',
      {
        // include_docs: true,
        key: req.query.docID,
      },
    )

    body.rows.map(body => {
      res.send(body.value)
    })

    // res.send
  } catch (err) {
    res.send(err)
  }
})

router.get('/PlanInfoByPlanCode', async (req, res) => {
  try {
    let body = await area_calculation.view(
      'Computed',
      'getPlanInfoByPlanCode',
      {
        key: req.query.planCode,
      },
    )

    let toSend = body.rows.map(body => {
      return {
        doc_id: body.id,
        doc_value: body.value,
      }
    })
    // let toSend = body.rows.map(body => {
    //   return body.value
    // })
    res.send(toSend)
  } catch (err) {
    return err
  }
})

router.delete('/document', async (req, res) => {
  try {
    let doc = await area_calculation.get(req.query.docID)
    let result = await area_calculation.destroy(req.query.docID, doc._rev)
    res.send(result)
  } catch (err) {}
})

router.post('/checkdate', async (req, res) => {
  try {
    let doc = await area_calculation.get(req.query.docID)
    doc.planInfo = req.body

    let result = await area_calculation.insert(doc)
    res.send(result)
    // let toSend = body.rows.map(body => {
    //   return {
    //     doc_id: body.id,
    //     doc_value: body.value,
    //   }
    // })
    // let toSend = body.rows.map(body => {
    //   return body.value
    // })
    res.send(toSend)
  } catch (err) {
    return err
  }
})

router.post('/areadata/:title', async (req, res) => {
  try {
    let doc = await area_calculation.get(req.body.docID, { revs_info: true })
    doc.items = req.body.items
    doc[`${req.params.title}`] = req.body[`${req.params.title}`]
    if (req.params.title == 'bankin') {
      doc.balcony = req.body.balcony
    }
    if (req.params.title == 'nokiten') {
      doc.nokitenD = req.body.dehairi
    }
    // let doc = await area_calculation.head(req.body.docID)
    // console.log(doc)

    let result = await area_calculation.insert(doc)
    res.send(result)

    //GET ID Document
    //Update specific property

    // let body = await area_calculation.view(
    //   'Computed',
    //   'getPlanInfoByPlanCode',
    //   {
    //     key: req.query.planCode,
    //   },
    // )
    // let toSend = body.rows.map(body => {
    //   return {
    //     doc_id: body.id,
    //     doc_value: body.value,
    //   }
    // })
    // let toSend = body.rows.map(body => {
    //   return body.value
    // })
    // res.send(toSend)
  } catch (err) {
    console.log(err)
    res.status(401).json({
      message: 'Error to save',
    })
  }
})

module.exports = router
