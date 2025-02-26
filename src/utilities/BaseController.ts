import {Response} from "express";
import BaseModel from "./BaseModel";

export default class BaseController
{
    _model: BaseModel;
    
    constructor()
    {
        
    }
    
    sendValidationError(resp: Response, err: Error)
    {
        resp.status(400).send({error: err.message});
    }
    
    sendNotFoundError(resp: Response, err: Error)
    {
        resp.status(404).send({error: err.message});
    }
    
    sendServerError(resp: Response, err: Error)
    {
//        console.log(err);
        resp.status(500).send({error: err.message});
    }
    
    _catchErrorsAndCloseDbConnection(resp: Response, promise: Promise<any>)
    {
        var toto = this;
        
        promise.catch((err: Error) => {
            if (err.name === 'NotFound') {
                toto.sendNotFoundError(resp, err);
            } else if (err.name === 'ValidationError') {
                toto.sendValidationError(resp, err);
            } else {
                toto.sendServerError(resp, err);
            }
        })
        .finally(() => {
            toto._model.disconnectDb();
        })
        ;
    }
}
