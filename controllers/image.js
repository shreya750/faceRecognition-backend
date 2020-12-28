import { json } from 'body-parser';
import { App, FACE_DETECT_MODEL } from 'clarifai';

const app = new App({
    apiKey: 'c5b1472c37714a84861d590aa32eb6c1'
   });

const handleApiCall = (req,res) => {
    app.models
    .predict(FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API')
}

const handleImage=(req,res,db) => {
    const { id } =req.body;
  db('smart_brain_users').where('id', '=', id)
  .increment('entries',1)
  .returning('entries')
  .then(entries => {
      res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

export default{
    handleImage,
    handleApiCall
}