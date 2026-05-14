const mongoose = require('mongoose');
const { MONGODB_URI } = require('./env');

async function connectDB() {

	if (!MONGODB_URI) {
		throw new Error('MONGODB_URI environment variable is not set');
	}
	
	await mongoose.connect(MONGODB_URI);
	console.log(`MongoDB connected: ${mongoose.connection.db.databaseName}`);

	mongoose.connection.on('connected', () => {
		console.log('MongoDB connected');
	});

	mongoose.connection.on('disconnected', () => {
		console.log('MongoDB disconnected');
	});

	mongoose.connection.on('error', (connectionErr) => {
		console.error('MongoDB connection error:', connectionErr);
	});

}

module.exports = connectDB;
