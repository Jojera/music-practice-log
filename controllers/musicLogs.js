const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllMusicLogs = async (req, res) => {
  // #swagger.tags = ['musicLogs']
  try {
    const result = await mongodb.getDb().db().collection('musicLogs').find();
    const musicLogs = await result.toArray();

    if (!musicLogs || musicLogs.length === 0) {
      return res.status(404).json({ message: 'No music logs found or collection may not exist' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(musicLogs);

  } catch (err) {
    console.error('Error fetching music logs:', err);
    res.status(500).json({ message: 'Failed to retrieve music logs' });
  }
};

const getMusicLogById = async (req, res) => {
  // #swagger.tags = ['musicLogs']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid musicLog id to find a music log.');
  }
  const musicLogId = new ObjectId(req.params.id);
  try {
    const result = await mongodb.getDb().db().collection('musicLogs').find({_id: musicLogId});
    const musicLogs = await result.toArray();

    if (!musicLogs || musicLogs.length === 0) {
      return res.status(404).json({ message: 'No music logs found or collection may not exist' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(musicLogs[0]);

  } catch (err) {
    console.error('Error fetching music logs:', err);
    res.status(500).json({ message: 'Failed to retrieve music logs' });
  }
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
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid musicLog id to update a music log.');
  }
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
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid musicLog id to delete a music log.');
  }
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