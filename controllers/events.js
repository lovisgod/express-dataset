const dbHelper = require('./../utils/dbHelper')
const { sendErrorResponse, sendSuccessResponse } = require('./../utils/response');


const getAllEvents = async (req, res) => {
try {
	const events = await dbHelper.getAllEvents();
	return sendSuccessResponse(res, 200, {data: events});
} catch (error) {
	console.log(error)
	return sendErrorResponse(res, 500, { message:'An error occurred while fetching data please try again later', error })
}
};

const addEvent = (req, res) => {
	try {
	 console.log(req.body)
	 dbHelper.createEvents(req.body);
	 return sendSuccessResponse(res, 201, 'Event successfully created');
	} catch (error) {
	   console.log(error);
	   return sendErrorResponse(res, 500, { message:'An error occurred while creating event', error })
	}
 
};


const getByActor = (req, res) => {
 try {
	 const { id } = req.params
	 const events = dbHelper.getEventsByActorId(id);
	 
 } catch (error) {
	 console.log(error);
	 return sendErrorResponse(res, 500, { message:'An error occurred while fetching data please try again later', error })
 }
};


const eraseEvents = () => {

};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















