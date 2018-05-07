import mongoose from 'mongoose';
import config from '../config/default';
import { generateRandomUserData } from '../../data-mocks/data-mocks.json';


export class DbConnector {
  constructor(url = config.db.url, name = config.db.name) {
    this.url = url;
    this.name = name;
  }

  connect() {
    return mongoose.connect(`${this.url}/${this.name}`);
  }

  getCollectionByName(collectionName) {
    return this.db.collection(collectionName);
  }
}