import { Router } from 'express';
import WTFController from '../controllers/wtf.controller';
import Route from '../interfaces/route.interface';
import authMiddleware from '../middlewares/auth.middleware';

class WTFRoute implements Route {
  public path = '';   // As to project requirement
  // public path = '/wtf';
  public router = Router();
  public wtfController = new WTFController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/acronym`, this.wtfController.searchAcronym);
    this.router.get(`${this.path}/acronym/:acronym`, this.wtfController.getAcronym);
    this.router.get(`${this.path}/random/:count(\\d+)`, this.wtfController.getRandomNumberOfAcronyms);
    this.router.post(`${this.path}/acronym`, this.wtfController.addNewAcronym);
    this.router.put(`${this.path}/acronym/:acronym`, authMiddleware, this.wtfController.updateAcronym);
    this.router.delete(`${this.path}/acronym/:acronym`, authMiddleware, this.wtfController.deleteAcronym);
  }
}

export default WTFRoute;
