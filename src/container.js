import dotenv from 'dotenv';
dotenv.config();

import { createContainer, asClass, Lifetime } from "awilix";

import UserMongooseRepository from "./data/repositories/mongoose/userMongooseRepository.js";
import RoleMongooseRepository from "./data/repositories/mongoose/roleMongooseRepository.js";
import CartMongooseRepository from './data/repositories/mongoose/CartMongooseRepository.js';
import ProductMongooseRepository from "./data/repositories/mongoose/productMongooseRepository.js";
import TicketMongooseRepository from './data/repositories/mongoose/ticketMongooseRepository.js';

import UserFileSystemRepository from "./data/repositories/fileSystem/userFileSystemRepository.js";
import RoleFileSystemRepository from "./data/repositories/fileSystem/roleFileSystemRepository.js";
import CartFileSystemRepository from "./data/repositories/fileSystem/cartFileSystemRepository.js";
import ProductFileSystemRepository from "./data/repositories/fileSystem/productFileSystemRepository.js";
import TicketFileSystemRepository from './data/repositories/fileSystem/ticketFileSystemRepository.js';

const container = createContainer();

if(process.env.DB === 'MongooseAdapter')
{
  container.register('UserRepository', asClass(UserMongooseRepository), { lifetime: Lifetime.SINGLETON });
  container.register('RoleRepository', asClass(RoleMongooseRepository), { lifetime: Lifetime.SINGLETON });
  container.register('CartRepository', asClass(CartMongooseRepository), { lifetime: Lifetime.SINGLETON });
  container.register('ProductRepository', asClass(ProductMongooseRepository), { lifetime: Lifetime.SINGLETON });
  container.register('TicketRepository', asClass(TicketMongooseRepository), { lifetime: Lifetime.SINGLETON });
}
else if(process.env.DB === 'FileAdapter')
{
  container.register('UserRepository', asClass(UserFileSystemRepository), { lifetime: Lifetime.SINGLETON });
  container.register('RoleRepository', asClass(RoleFileSystemRepository), { lifetime: Lifetime.SINGLETON });
  container.register('CartRepository', asClass(CartFileSystemRepository), { lifetime: Lifetime.SINGLETON });
  container.register('ProductRepository', asClass(ProductFileSystemRepository), { lifetime: Lifetime.SINGLETON });
  container.register('TicketRepository', asClass(TicketFileSystemRepository), { lifetime: Lifetime.SINGLETON });
}

export default container;
