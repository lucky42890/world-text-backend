import { db } from '../db/database';
import { WTF } from '../interfaces/wtf.interface';

class WTFService {

  public async getAcronym(acronym: string): Promise<WTF> {
    const result = await db.get('SELECT acronym, definition FROM wtf WHERE acronym=:value', {
      ':value': acronym,
    });
    return result;
  }

  public async getRandomNumberOfAcronyms(count: number): Promise<WTF[]> {
    const randomRows = await db.all(`SELECT id FROM wtf ORDER BY RANDOM() LIMIT ${count}`);
    const numList = randomRows.reduce(
      (pv: any, cv: any) => {
        pv.push(cv.id);
        return pv;
      },
      [],
    );
    return await db.all(`SELECT acronym, definition FROM wtf WHERE id IN (${numList.toString()})`);
  }

  public async addNewAcronym(data: WTF): Promise<WTF> {
    const result = await db.run('INSERT INTO wtf(acronym, definition) VALUES (:acr, :def)', {
      ':acr': data.acronym,
      ':def': data.definition,
    });
    return result;
  }

  public async updateAcronym(data: WTF): Promise<WTF> {
    const result = await db.run('UPDATE wtf SET definition=:def WHERE acronym=:acr', {
      ':acr': data.acronym,
      ':def': data.definition,
    });
    return result;
  }

  public async deleteAcronym(acronym: string): Promise<WTF> {
    const result = await db.run('DELETE FROM wtf WHERE acronym=:acr', {
      ':acr': acronym,
    });
    return result;
  }

  public async searchAcronym(from: number, limit: number, search: string): Promise<any> {
    const numberRows = await db.get(`SELECT count(1) FROM wtf WHERE acronym LIKE '%${search}%'`);

    let list;
    if (!search) {
      list = await db.all(`SELECT acronym, definition FROM wtf WHERE LIMIT ${limit} OFFSET ${from}`);
    } else {
      list = await db.all(`SELECT acronym, definition FROM wtf WHERE acronym LIKE '%${search}%' LIMIT ${limit} OFFSET ${from}`);
    }

    const more = numberRows[Object.keys(numberRows)[0]] > (from + limit) ? true : false;
    return {
      list,
      more,
    };
  }
}

export default WTFService;
