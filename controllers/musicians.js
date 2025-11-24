const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllMusicians = async (req, res) => {
  // #swagger.tags = ['musicians']
  try {
    const result = await mongodb.getDb().db().collection('musicians').find();
    const musicians = await result.toArray();

    if (!musicians || musicians.length === 0) {
      return res.status(404).json({ message: 'No musicians found or collection may not exist' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(musicians);

  } catch (err) {
    console.error('Error fetching musicians: ', err);
    res.status(500).json({ message: 'Failed to retrieve musicians' });
  }
};

const getMusicianById = async (req, res) => {
  // #swagger.tags = ['musicians']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid musician id to find them.');
  }
  const musicianId = new ObjectId(req.params.id);
  try {
    const result = await mongodb.getDb().db().collection('musicians').find({_id: musicianId});
    const musicians = await result.toArray();

    if (!musicians || musicians.length === 0) {
      return res.status(404).json({ message: 'No musician found or collection may not exist' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(musicians[0]);

  } catch (err) {
    console.error('Error fetching musician:', err);
    res.status(500).json({ message: 'Failed to retrieve musician' });
  }
};

const createMusician = async (req, res) => {
  // #swagger.tags = ['musicians']
  try { 
    const musician = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        instrument: req.body.instrument,
        experienceLevel: req.body.experienceLevel,
    };
    const response = await mongodb.getDb().db().collection('musicians').insertOne(musician);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the musician record.');
    }
  } catch (err) {
    console.error('Error creating musician:', err);
    res.status(500).json({ message: 'Failed to create musician' });
  }
};

const updateMusician = async (req, res) => {
  // #swagger.tags = ['musicians']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid musician id to update a musician record.');
  }
  const musicianId = new ObjectId(req.params.id);
  try {
    const musician = {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      instrument: req.body.instrument,
      experienceLevel: req.body.experienceLevel,
    };
    const response = await mongodb.getDb().db().collection('musicians').replaceOne({_id: musicianId}, musician);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the musician record.');
    }
  } catch (err) {
    console.error('Error updating musician:', err);
    res.status(500).json({ message: 'Failed to update musician' });
  }
};

const deleteMusician = async (req, res) => {
  // #swagger.tags = ['musicians']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid musician id to delete a musician record.');
  }
  const musicianId = new ObjectId(req.params.id);
  try {
    const response = await mongodb.getDb().db().collection('musicians').deleteOne({_id: musicianId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the musician.');
    }
  } catch (err) {
    console.error('Error deleting musician:', err);
    res.status(500).json({ message: 'Failed to delete musician' });
  }
};

module.exports = {
    getAllMusicians,
    getMusicianById,
    createMusician,
    updateMusician,
    deleteMusician
};