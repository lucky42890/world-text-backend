import { NextFunction, Request, Response } from 'express';
import { WTF } from '../interfaces/wtf.interface';
import WTFService from '../services/wtf.service';
import { db } from '../db/database';

class WTFController {
  public wtfService = new WTFService();

  /**
   * Return acronym and its definition matching with (:acronym)
   * @param req
   * @param res
   * @param next
   */
  public getAcronym = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const acronym = req.params.acronym;
      const result = await this.wtfService.getAcronym(acronym);

      if (!result) {
        res.status(200).json({ message: 'Not found acronym!' });
      }
      res.status(200).json(result);

    } catch (error) {
      next(error);
    }
  }

  /**
   * Search acronyms with pagination and fuzzy match features
   * @param req
   * @param res
   * @param next
   */
  public searchAcronym = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { from = '0', limit = '10', search = '' } = (req.query as any);

      if (!search) {
        res.status(400).json({ message: 'The search parameter is not correct!' });
      }

      const result = await this.wtfService.searchAcronym(parseInt(from, 10), parseInt(limit, 10), search);
      res.status(200).json(result);

    } catch (error) {
      next(error);
    }
  }

  /**
   * Return random acronyms of given number (:count)
   * It should not be adjacent from database
   * @param req
   * @param res
   * @param next
   */
  public getRandomNumberOfAcronyms = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const count = parseInt(req.params.count, 10);
      const result = await this.wtfService.getRandomNumberOfAcronyms(count);
      res.status(200).json(result);

    } catch (error) {
      next(error);
    }
  }

  /**
   * Add new acronym and its definition to database
   * @param req
   * @param res
   * @param next
   */
  public addNewAcronym = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: WTF = req.body;

      if (!data.acronym || !data.definition) {
        res.status(400).json({ message: 'The requested data is not correct!' });
      }
      const result = await this.wtfService.addNewAcronym(data);
      res.status(201).json(result);

    } catch (error) {
      next(error);
    }
  }

  /**
   * Update definition of given acronym (:acronym)
   * @param req
   * @param res
   * @param next
   */
  public updateAcronym = async (req: Request, res: Response, next: NextFunction) => {
    try {

      if (!req.body || !req.body.definition) {
        res.status(400).json({ message: 'The requested data is not correct!' });
      }

      const data: WTF = { acronym: '', definition: '' };
      data.acronym = req.params.acronym;
      data.definition = req.body.definition;

      const result = await this.wtfService.updateAcronym(data);
      res.status(201).json(result);

    } catch (error) {
      next(error);
    }
  }

  /**
   * Remove acronym from database (:acronym)
   * @param req
   * @param res
   * @param next
   */
  public deleteAcronym = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const acronym = req.params.acronym;
      const result = await this.wtfService.deleteAcronym(acronym);
      res.status(200).json(result);

    } catch (error) {
      next(error);
    }
  }
}

export default WTFController;
