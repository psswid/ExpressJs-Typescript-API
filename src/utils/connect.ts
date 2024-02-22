import mongoose from "mongoose";
import config from "config";
import logger from './logger';

function connect(){
    const dbUri = config.get<string>("dbUri");

    try {
        mongoose.connect(dbUri)
        logger.info('db connected');
    } catch(err) {
        logger.error('cant connect do db');
        process.exit(1)
    }
}


export default connect;