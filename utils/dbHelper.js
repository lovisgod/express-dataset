const DataStore = require('nedb');
const date = require('date-and-time');
const idGenerator = require('./idGenerator');
const { sendErrorResponse, sendSuccessResponse } = require('./../utils/response');
const db = new DataStore({ filename: './../datafile', autoload: true, timestampData: false });
db.ensureIndex({ fieldName: 'id', unique: true }, function (err) {
});

const helper  = {
     createEvents(object) {
       if (!object.id) {
        object.id = idGenerator(); 
       }
       object.created_at = object.created_at  || date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
       
       return new Promise ((resolve, reject) => { 
           db.insert(object, (err, data) => { 
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
       });
    },

    // erase all events

     eraseEvents() {
         db.remove({}, { multi: true }, (err, numRemoved) => {
            console.log(numRemoved);
         });
    },

    // get all events

    getAllEvents() {
           return new Promise ( (resolve, reject) => {db.find({}).sort({id: 1}).exec((err, data) => {
             if (err) { 
                 reject(err) 
             } else {
                 resolve(data);
             }
           })})
    },

    // get all events recorded by an actor using the actor id
    getEventsByActorId(id) {
        return new Promise ( (resolve, reject) => {db.find({ "actor.id": Number.parseInt(id) }).sort({id: 1}).exec((err, data) => {
          if (err) { 
              reject(err) 
          } else {
              resolve(data);
          }
        })})
    },

 // update an actor avatar
    updateActorAvatar(object) {
       return new Promise((resolve, reject) => {
            db.update({ 
                'actor.id':  object.id}, 
                { $set: { 'actor.avatar': object.url } }, 
                { multi: true },  (err, numUpdated) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(numUpdated)
                }
            });
        })
       
    },


};

module.exports = helper;