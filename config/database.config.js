function checkConnection (mongoose) {
    mongoose.connection.on('error', function() {
        console.log('Could not connect to database. Exiting now...');
        process.exit();
    });
    
    mongoose.connection.once('open', function() {
        console.log('Successfully connected to the database.');
    });
}

module.exports = {
    url: 'mongodb://localhost:27017/batam',
    checkConnection
}