import * as dotenv from "dotenv";
dotenv.config({ path: "../.env"});
import { app } from "./app";
import { db } from "./db";
import { getLoggerError, getLoggerInfo } from "./utils/helpers";
import { appLogger } from "./logger";
import { config } from "./config";
import { appRouter } from "./routes";

const PORT = config.get("APP_PORT");

const start = async () => {
	try {
		await db.connect(() =>
			appLogger.info.log(getLoggerInfo("Connected to database"))
		);
		await db.initUser();
		app.listen(PORT, () =>
			appLogger.info.log(getLoggerInfo(`Server running on port ${PORT}`))
		);
	} catch (err) {
		appLogger.error.log(
			getLoggerError({ message: `Error on application startup: ${err}` })
		);
	}
};

start();

export type TAppRouter = typeof appRouter;
