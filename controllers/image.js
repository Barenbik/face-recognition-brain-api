import Clarifai from 'clarifai'

const app = new Clarifai.App({
  apiKey: '7ac92ca01b3e4c2a83b698faa1473171',
})

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => res.status(400).json('Unable to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => {
      res.json(entries[0].entries)
    })
    .catch((err) => {
      res.status(400).json('unable to get entries')
    })
}

export default { handleImage, handleApiCall }
