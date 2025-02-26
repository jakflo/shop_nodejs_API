import BaseValidator from './BaseValidator';
import UserModel from '../user/UserModel';

export default class UserExists extends BaseValidator
{
    _defaultMessage = 'User not found';
    
    async asyncValidate(value)
    {
        var userModel = new UserModel();
        var userExists = await userModel.checkUserExists(value);
        if (!userExists) {
            this._throwError();
        }
    }
}
