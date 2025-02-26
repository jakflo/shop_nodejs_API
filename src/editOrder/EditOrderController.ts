import { Request, Response } from "express";
import BaseController from '../utilities/BaseController';
import EditOrderModel from './EditOrderModel';
import EditOrderValidator from './EditOrderValidator';

export default class EditOrderController extends BaseController
{
    _model: EditOrderModel;
    
    constructor()
    {
        super();
        this._model = new EditOrderModel();
    }
    
    render(req: Request, resp: Response)
    {
        var toto = this;
        var params = req.body;
        var editOrderValidator = new EditOrderValidator();
        var promise = editOrderValidator.asyncValidate(params.id, params.name, params.user_id, params.price, params.currency)
            .then((x) => {
                return toto._model.checkIfOrderChanged(params.id, params.name, params.user_id, params.price, params.currency);
            })
            .then((x) => {
                return toto._model.edit(params.id, params.name, params.user_id, params.price, params.currency);
            })
            .then((x) => {
                resp.send({
                    'message': 'Order data changed'
                });
            });
            
        this._catchErrorsAndCloseDbConnection(resp, promise);                
    }
}
