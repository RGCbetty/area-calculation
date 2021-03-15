const PdfPrinter = require('pdfmake')
const fs = require('fs')
const myTableLayouts = {
  exampleLayout: {
    hLineWidth: function (i, node) {
      return i === 0 || i === node.table.body.length ? 1 : 1
    },
    vLineWidth: function (i, node) {
      return i === 0 || i === node.table.widths.length ? 1 : 1
    },
    hLineColor: function (i, node) {
      return i === 0 || i === node.table.body.length ? 'black' : 'gray'
    },
    vLineColor: function (i, node) {
      return i === 0 || i === node.table.widths.length ? 'black' : 'gray'
    },
    paddingLeft: function () {
      return 0
    },
    paddingRight: function () {
      return 0
    },
    paddingTop: function () {
      return 0
    },
    paddingBottom: function () {
      return 0
    },
  },
}
const fonts = {
  yourFontName: {
    normal: 'node_modules/pdfmake/build/MS Gothic.ttf',
    bold: 'node_modules/pdfmake/build/MS Gothic.ttf',
    italics: 'node_modules/pdfmake/build/MS Gothic.ttf',
    bolditalics: 'node_modules/pdfmake/build/MS Gothic.ttf',
  },
}
const printer = new PdfPrinter(fonts)

exports.save = async (req, res) => {
  try {
    let dir = req.body.dir.split('/')
    let filename = dir.pop()
    let newDir = dir.join('/')
    if (!fs.existsSync(req.body.dir)) {
      await fs.mkdir(req.body.dir, { recursive: true }, (err) => {
        if (err) {
          console.error(err)
        } else {
          let pdfDoc = printer.createPdfKitDocument(req.body.pdfJSON, {
            tableLayouts: myTableLayouts,
          })
          pdfDoc.pipe(fs.createWriteStream(`${req.body.dir}/${filename}.pdf`))
          pdfDoc.end()
          res.status('201').send({ message: 'success' })
        }
      })
    } else {
      console.log(filename)
      console.log(newDir)
      await fs.readdir(newDir, (err, files) => {
        if (err) {
          throw err
        } else {
          let existing = files.filter((file) => file.includes(filename))
          fs.rename(
            `${newDir}/${filename}`,
            `${newDir}/${filename}(${existing.length})`,
            async (err) => {
              if (err) {
                throw err
              } else {
                await fs.mkdir(req.body.dir, { recursive: true }, (err) => {
                  if (err) {
                    console.error(err)
                  } else {
                    let pdfDoc = printer.createPdfKitDocument(
                      req.body.pdfJSON,
                      { tableLayouts: myTableLayouts },
                    )
                    pdfDoc.pipe(
                      fs.createWriteStream(`${req.body.dir}/${filename}.pdf`),
                    )
                    pdfDoc.end()
                    res.status('201').send({ message: 'success' })
                  }
                })
              }
            },
          )
        }
      })
    }
  } catch (err) {
    res.send(err)
  }
}
