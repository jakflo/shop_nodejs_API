import { Request, Response } from "express";
import BaseController from '../utilities/BaseController';
import CurrencyModel from './CurrencyModel';
import DialJsonOutput from '../jsonOutput/DialJsonOutput';

export default class CurrencyController extends BaseController
{
    _model: CurrencyModel;
    
    constructor()
    {
        super();
        this._model = new CurrencyModel();
    }
    
    render(req: Request, resp: Response) 
    {
        var toto = this;
        var dialJsonOutput = new DialJsonOutput();
        
        var promiseCurrencies = this._model.getCurrencies()
            .then((currencies) => {
                resp.send(dialJsonOutput.formatData(currencies, true));
            });
        this._catchErrorsAndCloseDbConnection(resp, promiseCurrencies);
    }
}
