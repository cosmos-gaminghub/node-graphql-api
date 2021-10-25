const fs = require('fs')
const stringify = require('csv-stringify/lib/sync')

const toCSV = (data) => {
  const csvData = stringify(data, { header: true })
  fs.writeFileSync(`./${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}.csv`, csvData)
}

module.exports = toCSV
