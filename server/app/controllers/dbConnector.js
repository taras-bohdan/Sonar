import MongoClient from 'mongodb';
import config from '../config/default';
import { generateRandomUserData } from '../../data-mocks/data-mocks.json';


export class DbConnector {
  constructor(url = config.db.url, name = config.db.name) {
    this.url = url;
    this.name = name;
  }

  connect() {
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.url, (err, client) => {
        if (err) {
          reject(err);
        }
        this.client = client;
        console.log('Connected successfully to server');
        this.db = client.db(this.name);
        resolve(this);
      });
    });
  }

  getCollectionByName(collectionName) {
    return this.db.collection(collectionName);
  }

  closeConnection() {
    this.client.close();
  }
}