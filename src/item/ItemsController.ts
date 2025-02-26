import { Request, Response } from "express";
import BaseController from '../utilities/BaseController';
import ItemsModel from './ItemsModel';

export default class ItemsController extends BaseController
{
    _model: ItemsModel;
    
    constructor()
    {
        super();
        this._model = new ItemsModel();
    }
    
    render(req: Request, resp: Response)
    {
        var toto = this;        
        var promise = toto._model.getAllItems()
            .then((items) => {
                resp.send(items);
            });
            
        this._catchErrorsAndCloseDbConnection(resp, promise);                
    }
}
