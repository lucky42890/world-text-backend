import * as sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db: any;
const connect = async () => {
  try {
    // Create/Open the database
    db = await open({
      filename  : './src/db/database.db',
      mode      : sqlite3.OPEN_READWRITE,
      driver    : sqlite3.Database,
    });

    console.log('✅️ DB successfully connected!');

  } catch (err) {
    // Print error occured in db initialization
    console.log(err);
  }
};

export {
  db,
  connect,
};
