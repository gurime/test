import { connect } from 'mongoose';

const uri = 'mongodb+srv://ztron500:test@cluster0.6cbtr0i.mongodb.net/test';
const connectDB = () => {
return connect(uri, {
useNewUrlParser: true,
useUnifiedTopology: true,
});
};
  
export default connectDB;