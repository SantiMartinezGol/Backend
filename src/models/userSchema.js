import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    firstName: { type: Schema.Types.String, required:true },
    lastName: { type: Schema.Types.String},
    email: { type: Schema.Types.String, unique: true, required: true },
    age: { type: Schema.Types.Number},
    password: { type: Schema.Types.String},
    isAdmin:{ type: Schema.Types.Boolean, default: false},
    role: { type: Schema.Types.ObjectId, index: true, ref: 'roles' }
})

userSchema.plugin(mongoosePaginate);

userSchema.pre('find', function () {
    this.populate(['role']);
  });
  
userSchema.pre('findOne', function () {
    this.populate(['role']);
  });
export default mongoose.model(userCollection, userSchema);
