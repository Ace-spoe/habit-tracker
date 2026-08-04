// eslint-disable-next-line no-unused-vars
function errorHandler (error, req, res , next){
  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'Malformed ID' })

  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  res.status(500).json({
    error: error.message
  })

}

module.exports = errorHandler