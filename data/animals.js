const mongoCollections = require('../mongoCollections');
const animals = mongoCollections.animals;
const { ObjectId } = require('mongodb');
module.exports = {
    async create(name, animalType){
        if (!name) throw 'You must provide name';
        if(typeof name !== 'string') throw 'Name must be a string' ;
        if (!animalType) throw 'You must provide animal type';
        if(typeof animalType !== 'string') throw 'animalType must be a string' ;
    
        const animalCollection = await animals();
    
        let newAnimal = {
            name: name,
            animalType: animalType,
        };
    
        const insertInfo = await animalCollection.insertOne(newAnimal);
        if (insertInfo.insertedCount === 0) throw 'Could not add animal';
    
        const newId = insertInfo.insertedId;
        const animal = await this.get(newId);
        return animal;
    },
    async get(id) {
        if (!id) throw 'You must provide an id to search for';
        if(typeof id !== 'string' && typeof id !== 'object') throw 'id must be a string or object';

        if(typeof id === 'string'){
         id = ObjectId.createFromHexString(id);
        }
        const animalCollection = await animals();
        const animal = await animalCollection.findOne({ _id: id });
        if (animal === null) throw 'No animal with that id';
    
        return animal;
    },
    async remove(id) {
        if (!id) throw 'You must provide an id to search for';
    
        const animalCollection = await animals();
        const animalDeleted = await this.get(id); 
        if(typeof id !== 'string' && typeof id !== 'object') throw 'id must be a string or object';

        if(typeof id === 'string'){
         id = ObjectId.createFromHexString(id);
        }
        const deletionInfo = await animalCollection.deleteOne({ _id: id });
        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete animal with id of ${id}`;
        }
        return animalDeleted;
    },
    async getAll() {
        const animalCollection = await animals();
        const animalList = await animalCollection.find({}).toArray();
        return animalList;
    },
    async rename(id, newName){
        if (!id) throw 'You must provide an id to search for';
    
        if (!newName) throw 'You must provide a name';
        if(typeof newName !== 'string') throw 'new name provided must be a string' ;
        if(typeof id !== 'string' && typeof id !== 'object') throw 'id must be a string or object';
        const animalCollection = await animals();

        if(typeof id === 'string'){
            id = ObjectId.createFromHexString(id);
        }
    
        const updatedAnimal = await this.get(id); 
        let newAnimal = {
            name: newName,
            animalType: updatedAnimal.animalType,
        };
        const updatedInfo = await animalCollection.updateOne({ _id: id }, { $set: newAnimal });
    if (updatedInfo.modifiedCount === 0) {
        throw 'could not update band successfully';
    }

    return await this.get(id);
    }
};