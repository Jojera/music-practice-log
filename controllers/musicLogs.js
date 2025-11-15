const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllMusicLogs = (req, res) => {
  // #swagger.tags = ['musicLogs']  
  mongodb
    .getDb()
    .db()
    .collection('musicLogs')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getMusicLogById = (req, res) => {
  // #swagger.tags = ['musicLogs']
  const musicLogId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('musicLogs')
    .find({ _id: musicLogId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createMusicLog = async (req, res) => {
  // #swagger.tags = ['musicLogs']
  const musicLog = {
      instrument: req.body.instrument,
      duration: req.body.duration,
      focusArea: req.body.focusArea,
      date: req.body.date,
  };
  const response = await mongodb.getDb().db().collection('musicLogs').insertOne(musicLog);
  if (response.acknowledged) {
      res.status(204).send();
  } else {
      res.status(500).json(response.error || 'Some error occurred while creating the music log.');
  }
};

const updateMusicLog = async (req, res) => {
  // #swagger.tags = ['musicLogs']
  const musicLogId = new ObjectId(req.params.id);
  const musicLog = {
      instrument: req.body.instrument,
      duration: req.body.duration,
      focusArea: req.body.focusArea,
      date: req.body.date,
  };
  const response = await mongodb.getDb().db().collection('musicLogs').replaceOne({_id: musicLogId}, musicLog);
  if (response.modifiedCount > 0) {
      res.status(204).send();
  } else {
      res.status(500).json(response.error || 'Some error occurred while updating the music log.');
  }
};

const deleteMusicLog = async (req, res) => {
  // #swagger.tags = ['musicLogs']
  const musicLogId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('musicLogs').deleteOne({_id: musicLogId});
  if (response.deletedCount > 0) {
      res.status(204).send();
  } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the music log.');
  }
};

module.exports = {
    getAllMusicLogs,
    getMusicLogById,
    createMusicLog,
    updateMusicLog,
    deleteMusicLog
};