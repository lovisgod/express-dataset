const dbHelper = require('../utils/dbHelper')
const { sendErrorResponse, sendSuccessResponse } = require('./../utils/response');


const getAllActors = async (req, res) => {
	try {
		const data = await dbHelper.getAllActors();
		if (!data) return sendErrorResponse(res, 400, 'actors not found');
		return sendSuccessResponse(res, 200, data);
	} catch (error) {
		console.log(error);
		return sendErrorResponse(res, 500, { message:'An error occurred while fetching data please try again later', error })
	}
};

const updateActor = async (req, res) => {
	try {
		const data = await dbHelper.updateActorAvatar(req.body);
		if (data == 0) return sendErrorResponse(res, 404, 'actor with the inputted id does not exist');
		return res.status(200).send({});
	} catch (error) {
		console.log(error);
		return sendErrorResponse(res, 500, { message:'An error occurred while fetching data please try again later', error })
	}
};

const getStreak = async (req, res) => {
	try {
		const data = await dbHelper.getAllActorsStreak();
		if (data == 0) return sendErrorResponse(res, 404, 'actors not found');
		return res.status(200).send(data);
	} catch (error) {
		console.log(error);
		return sendErrorResponse(res, 500, { message:'An error occurred while fetching data please try again later', error })
	}
};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};

















