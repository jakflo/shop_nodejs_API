import { Request, Response } from "express";
import BaseController from '../utilities/BaseController';
import NewOrderModel from './NewOrderModel';
import NewOrderValidator from './NewOrderValidator';

export default class NewOrderController extends BaseController
{
    _model: NewOrderModel;
    
    constructor()
    {
        super();
        this._model = new NewOrderModel();
    }
    
    render(req: Request, resp: Response)
    {
        var toto = this;
        var params = req.body;
        var newOrderValidator = new NewOrderValidator();
        
        var promise = newOrderValidator.asyncValidate(params.name, params.user_id, params.price, params.currency, params.items)
            .then((x) => {
                return toto._model.addNewOrder(params.name, params.user_id, params.price, params.currency, params.items);
            })
            .then((newId) => {
                resp.send({
                    'message': 'New order inserted', 
                    'order_id': newId
                });
            });
            this._catchErrorsAndCloseDbConnection(resp, promise);
    }
    
}
