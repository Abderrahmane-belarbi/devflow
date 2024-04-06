import mongoose from 'mongoose';

let isConnected: boolean = false;

export async function connectToDataBase(){
  mongoose.set('strictQuery', true); // to prevent uknown field query

  if(!process.env.MONGODB_URL){
    return console.log('MISSING MONGOODB URL')
  }

  if (isConnected){
    return console.log('MongoDB is already connected')
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'DevFlow'
    })
    isConnected = true;
    console.info('MongoDB connected')
  } catch (error){
    console.error('MongoDB connection failed. ', error)
  }
}