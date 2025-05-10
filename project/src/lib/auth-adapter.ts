import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./mongodb";

const adapter = MongoDBAdapter(clientPromise);

// Override the createUser method to ensure username is not null
const customAdapter = {
  ...adapter,
  async createUser(data: any) {
    // Ensure username is not null
    if (!data.name) {
      data.name = data.email?.split('@')[0] || 'user';
    }
    if (adapter.createUser) {
      return adapter.createUser(data);
    }
    throw new Error("createUser method not found in adapter");
  },
};

export default customAdapter; 