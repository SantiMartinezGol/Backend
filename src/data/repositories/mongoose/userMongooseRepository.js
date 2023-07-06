import User from '../../../domain/entities/user.js'
import userSchema from "../../models/mongoose/userSchema.js";

class UserMongooseRepository
{
  async paginate(criteria)
  {
    const { limit, page } = criteria;
    const usersDocument = await userSchema.paginate({}, { limit, page });
    const { docs, ...pagination } = usersDocument;

    const users = docs.map(document => new User({
      id: document._id,
      firstName: document.firstName,
      lastName: document.lastName,
      email: document.email,
      age: document.age,
      isAdmin:document.isAdmin,
      role: document.role,
      cart: document.cart
    })); 

    return {
      users,
      pagination
    }
  }

  async getOne(id)
  {
    const userDocument = await userSchema.findOne({ _id: id });
    
    return new User ({
        id: userDocument?._id,
        firstName: userDocument?.firstName,
        lastName: userDocument?.lastName,
        email: userDocument?.email,
        age: userDocument?.age,
        password: userDocument?.password,
        isAdmin: userDocument?.isAdmin,
        role: userDocument?.role
    })
  }

  async getOneByEmail(email) {
    
    const userDocument=await userSchema.findOne({ email });
    
    return new User ({
      id: userDocument?._id,
      firstName: userDocument?.firstName,
      lastName: userDocument?.lastName,
      email: userDocument?.email,
      age: userDocument?.age,
      password: userDocument?.password,
      isAdmin: userDocument?.isAdmin,
      role: userDocument?.role
  })
  }

  async create(data)
  {
    const userDocument = await userSchema.create(data);

    return new User ({
      id: userDocument?._id,
      firstName: userDocument?.firstName,
      lastName: userDocument?.lastName,
      email: userDocument?.email,
      age: userDocument?.age,
      isAdmin: userDocument?.isAdmin,
      role: userDocument?.role
  })
  }

  async updateOne(id, data)
   {
    const userDocument = await userSchema.findOneAndUpdate({ _id: id }, data, { new: true});

    return new User ({
      id: userDocument?._id,
      firstName: userDocument?.firstName,
      lastName: userDocument?.lastName,
      email: userDocument?.email,
      age: userDocument?.age,
      isAdmin: userDocument?.isAdmin,
      role: userDocument?.role
  })
  }

  async deleteOne(id)
  {
    return userSchema.deleteOne({ _id: id });
  }
}

export default UserMongooseRepository;