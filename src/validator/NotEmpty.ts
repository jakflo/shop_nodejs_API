import BaseValidator from './BaseValidator';
import Validator from 'validator';

export default class NotEmpty extends BaseValidator
{
    _defaultMessage = 'Cant be empty';
    
    validate(value)
    {
        if (Validator.isEmpty(value, {ignore_whitespace: true})) {
            this._throwError();
        }
    }
}
