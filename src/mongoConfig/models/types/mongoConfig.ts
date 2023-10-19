export type MongoConfig = {
  uri: string;
  dbName: string;
  schemas: {
    credentials: any;
    user: any;
  };
};
