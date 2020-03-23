const DataStore = require('nedb');
const idGenerator = require('./idGenerator');
const { sendErrorResponse, sendSuccessResponse } = require('./../utils/response');
const db = new DataStore({ filename: './../datafile', autoload: true, timestampData: true });
// db.loadDatabase()

const helper  = {
     createEvents(object) {
       object._id = idGenerator();  
       db.insert(object);
    },

     eraseEvents() {
         db.remove({});
    },

    getAllEvents() {
           return new Promise ( (resolve, reject) => {db.find({}).sort({_id: 1}).exec((err, data) => {
             if (err) { 
                 reject(err) 
             } else {
                 resolve(data);
             }
           })})
    },

    // get all events recorded by an actor using the actor id
    getEventsByActorId(id) {
        return new Promise ( (resolve, reject) => {db.find({ "actor.id": id }).sort({_id: 1}).exec((err, data) => {
          if (err) { 
              reject(err) 
          } else {
              resolve(data);
          }
        })})
 },
}

module.exports = helper;