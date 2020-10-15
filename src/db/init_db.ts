import * as sqlite3 from 'sqlite3';
import * as data from './init_db.json';
import { open } from 'sqlite';

(async () => {
  try {
    // Create/Open the database
    const db = await open({
      filename  : './src/db/database.db',
      mode      : sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      driver    : sqlite3.Database,
    });

    // Create wtf database table. If it exists, remove all data
    await db.exec('CREATE TABLE IF NOT EXISTS wtf (id INTEGER PRIMARY KEY AUTOINCREMENT, acronym STRING, definition STRING)');
    await db.run('DELETE from wtf');

    // Insert new data to db from json file
    for (const item of data) {
      const acronym     = Object.keys(item)[0];
      const definition  = item[acronym];
      await db.run('INSERT INTO wtf (acronym, definition) VALUES (?, ?)', acronym, definition);
      console.log(`✅️ Added ${acronym}!`);
    }

    db.close();
    console.log('✅️ DB successfully created!');

  } catch (err) {
    // Print error occured in db initialization
    console.log(err);
  }

})();
