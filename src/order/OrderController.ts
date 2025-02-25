import { Request, Response } from "express";
import BaseController from '../utilities/BaseController';
import IntGreaterThanZero from '../validator/IntGreaterThanZero';
import {OrderModel} from './OrderModel';
import OutputJson from './OutputJson';

export default class OrderController extends BaseController
{
    _model: OrderModel;
    
    constructor()
    {
        super();
        this._model = new OrderModel();
    }
    
    render(req: Request, resp: Response) 
    {
        var toto = this;
        var id = req.params.id;
        var outputJson = new OutputJson();
        
        try
        {
            var intGreaterThanZero = new IntGreaterThanZero();
            intGreaterThanZero.validate(id);
        } catch (err) {
            if (err.name === 'ValidationError') {
                toto.sendValidationError(resp, err);
                return;
            } else {
                throw err;
            }
        }
        
        var orderPromise = this._model.getOrder(parseInt(id))
                .then((order) => {
                    resp.send(outputJson.formatData(order.orderData, order.orderItems));
                });
        this._catchErrorsAndCloseDbConnection(resp, orderPromise);
    }
}
