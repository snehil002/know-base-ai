/**
 * MongoDB connection helper using mongoose
 * Reads connection string from process.env.MONGODB_URI
 */

const mongoose = require('mongoose');
const { MONGODB_URI } = require('./env');

/**
 * Connect to MongoDB using mongoose.
 * Throws if `MONGODB_URI` is missing or connection fails.
 * @returns {Promise<mongoose.Connection>}
 */
async function connectDB() {
	const uri = MONGODB_URI;
	if (!uri) {
		const err = new Error('MONGODB_URI environment variable is not set');
		console.error(err.message);
		throw err;
	}

	try {
		await mongoose.connect(uri);
		console.log(`MongoDB connected: ${mongoose.connection.db.databaseName}`);

		mongoose.connection.on('error', (connectionErr) => {
			console.error('MongoDB connection error:', connectionErr);
		});

		mongoose.connection.on('disconnected', () => {
			console.warn('MongoDB disconnected');
		});

		return mongoose.connection;
	} catch (connectErr) {
		console.error('Failed to connect to MongoDB:', connectErr);
		throw connectErr;
	}
}

// Graceful shutdown helpers
function setupGracefulShutdown() {
	const shutdown = async (signal) => {
		try {
			console.log(`Received ${signal}. Closing MongoDB connection...`);
			await mongoose.connection.close(false);
			console.log('MongoDB connection closed');
			process.exit(0);
		} catch (err) {
			console.error('Error during MongoDB shutdown', err);
			process.exit(1);
		}
	};

	process.on('SIGINT', () => shutdown('SIGINT'));
	process.on('SIGTERM', () => shutdown('SIGTERM'));
	process.on('uncaughtException', (err) => {
		console.error('Uncaught exception, shutting down', err);
		shutdown('uncaughtException');
	});
	process.on('unhandledRejection', (reason) => {
		console.error('Unhandled Rejection at:', reason);
		shutdown('unhandledRejection');
	});
}

module.exports = {
	connectDB,
	setupGracefulShutdown,
	mongoose,
};

