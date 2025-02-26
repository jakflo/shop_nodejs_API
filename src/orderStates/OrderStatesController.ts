import { Request, Response } from "express";
import BaseController from '../utilities/BaseController';
import OrderStatesModel from './OrderStatesModel';
import DialJsonOutput from '../jsonOutput/DialJsonOutput';

export default class OrderStatesController extends BaseController
{
    _model: OrderStatesModel;
    
    constructor()
    {
        super();
        this._model = new OrderStatesModel();
    }
    
    render(req: Request, resp: Response) 
    {
        var toto = this;
        var dialJsonOutput = new DialJsonOutput();
        
        var promise = this._model.getStates()
            .then((states) => {
                resp.send(dialJsonOutput.formatData(states, true));
            });
            
        this._catchErrorsAndCloseDbConnection(resp, promise);
    }
}
