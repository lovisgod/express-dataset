const DataStore = require('nedb');
const date = require('date-and-time');
const idGenerator = require('./idGenerator');
const { remove_id  } = require('./../utils/response');
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
                 const result = remove_id(data);
                 resolve(result);
             }
           })})
    },

    // get all events recorded by an actor using the actor id
    getEventsByActorId(id) {
        return new Promise ( (resolve, reject) => {db.find({ "actor.id": Number.parseInt(id) }).sort({id: 1}).exec((err, data) => {
          if (err) { 
              reject(err) 
          } else {
             const result = remove_id(data);
              resolve(result);
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


    // get all actors
    getAllActors() {
        return new Promise ( (resolve, reject) => {db.find({}).sort({created_at: -1, "actor.login": -1}).exec((err, data) => {
          if (err) { 
              reject(err) 
          } else {
              const actors = data.map(x => x.actor);
              const newActors = [];
              actors.forEach(actor=>{
                  const actorData = actors.filter(x => x.id === actor.id); // find all actors with same id from x data
                  const actorevents = actorData.length; // determine logins by number of occurrences
                  const notExists = newActors.every(actor => actor.id !== actorData[0].id);
                  if (notExists) { // check if actor data does not exists in new array
                     // add if it doesn't exist
                      newActors.push({
                        ...actorData[0],
                        events: actorevents
                      });
                }  

              })
              const result  = newActors.sort((a,b) => b.events - a.events).map((x) => { return { id: x.id, login: x.login, avatar_url: x.avatar_url}});
              resolve(result);
          }
        })})
 },

  // get all actors streak
  getAllActorsStreak() {
    return new Promise ( (resolve, reject) => {db.find({}).sort({created_at: -1, "actor.login": -1}).exec((err, data) => {
      if (err) { 
          reject(err) 
      } else {
          const actors = data.map((x) => ({ actor:x.actor, created_at: x.created_at }));
          actors.forEach(actor=>{
            const actorData = actors.filter(x => x.id === actor.id); 
            // calculate streak for each actor
            
          });
          resolve(actors);
      }
    })})
},

};

module.exports = helper;