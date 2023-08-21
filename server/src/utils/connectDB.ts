import mongoose from 'mongoose';
mongoose.set('strictQuery', false);
var config = require('config');

const dbUrl = `mongodb+srv://webflowdb:wvWoEvkHUHgcSKGP@web-flow-dsml-cluster.cmisbke.mongodb.net/?retryWrites=true&w=majority`;

// mongodb+srv://webflowdb:wvWoEvkHUHgcSKGP@web-flow-dsml-cluster.cmisbke.mongodb.net/?retryWrites=true&w=majority


const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log('Database connected...');
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
