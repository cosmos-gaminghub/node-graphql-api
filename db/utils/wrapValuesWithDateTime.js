function wrapValuesWithDatetime (valuesList) {
  return valuesList.map(values => {
    return {
      ...values,
      created_at: new Date(),
      updated_at: new Date()
    }
  })
}

module.exports = wrapValuesWithDatetime
