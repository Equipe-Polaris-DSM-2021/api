import mongoose from 'mongoose';


mongoose.connect(`${process.env.MONGODB_CLUSTER}`);
mongoose.Promise = global.Promise;

export default mongoose;