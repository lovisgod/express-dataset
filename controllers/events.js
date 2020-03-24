const dbHelper = require('./../utils/dbHelper')
const { sendErrorResponse, sendSuccessResponse } = require('./../utils/response');


const getAllEvents = async (req, res) => {
try {
	const events = await dbHelper.getAllEvents();
	return sendSuccessResponse(res, 200, events);
} catch (error) {
	console.log(error)
	return sendErrorResponse(res, 500, { message:'An error occurred while fetching data please try again later', error })
}
};

const addEvent = async (req, res) => {
	try {
	 await dbHelper.createEvents(req.body);
	 return sendSuccessResponse(res, 201, {});
	} catch (error) {
	   if (error.errorType == 'uniqueViolated'){
		return sendErrorResponse(res, 400, { message:'An error occurred while creating event', error:error.errorType })
	   } else{
		return sendErrorResponse(res, 500, { message:'An error occurred while creating event', error })
	   }
	  
	}
 
};


const getByActor = async (req, res) => {
 try {
	 const { id } = req.params
	 const events = await dbHelper.getEventsByActorId(id);
	 if (!events) return sendErrorResponse(res, 404, 'actor with the inputted id does not exist');
	 return sendSuccessResponse(res, 200, events);
 } catch (error) {
	 console.log(error);
	 return sendErrorResponse(res, 500, { message:'An error occurred while fetching data please try again later', error })
 }
};


const eraseEvents = (req, res) => {
	try {
		dbHelper.eraseEvents();
		return sendSuccessResponse(res, 200, 'Events successfully erased');
	   } catch (error) {
		  console.log(error);
		  return sendErrorResponse(res, 500, { message:'An error occurred while creating event', error })
	   }
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















