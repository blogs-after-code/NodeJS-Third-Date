import { ApiResponse } from '../utils/api-Response.js';
import { asyncHandler } from '../utils/async-handler.js';

/*
NOTE: src/utils/async-handlers.js is a utility function that wraps async functions and handles errors.
This is useful for avoiding repetitive try-catch.

const healthCheck = async (req, res, next) => { 
    try {
        const user = await getUserFromDB()
        res
            .status(200)
            .json( new ApiResponse(200, {message: "Server is up and running!"}) );
    } catch (error) {
        next(error);

    }
} ;

*/


const healthCheck = asyncHandler(async (req, res, next) => {
    res
        .status(200)
        .json(new ApiResponse(200, { message: "Server is still up and running well!" }));
});

export { healthCheck };