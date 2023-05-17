import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    firstName: { type: Schema.Types.String, required:true },
    lastName: { type: Schema.Types.String},
    email: { type: Schema.Types.String, unique: true, required: true },
    age: { type: Schema.Types.Number},
    password: { type: Schema.Types.String}
})

userSchema.plugin(mongoosePaginate);

export default mongoose.model(userCollection, userSchema);
