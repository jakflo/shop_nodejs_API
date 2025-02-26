import { Request, Response } from "express";
import BaseController from '../utilities/BaseController';
import UserModel from './UserModel';

export default class UserController extends BaseController
{
    _model: UserModel;
    
    constructor()
    {
        super();
        this._model = new UserModel();
    }
    
    render(req: Request, resp: Response)
    {
        var toto = this;        
        var promise = this._model.getAllUsers()
                .then((users) => {
                    resp.send(users);
                });
        this._catchErrorsAndCloseDbConnection(resp, promise);
    }
}
