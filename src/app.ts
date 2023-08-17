import * as dotenv from 'dotenv'
dotenv.config();
import app from './server'
import config from './configs/config';
import { winstonLogger } from './configs/loggers';



app.listen(config.port, () => {
  winstonLogger.info(`running on http://localhost:${config.port}`)
  winstonLogger.info(`environment: ${config.env}`)
})