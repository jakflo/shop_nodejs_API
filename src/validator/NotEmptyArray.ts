import BaseValidator from './BaseValidator';

export default class NotEmptyArray extends BaseValidator
{
    _defaultMessage = 'Must be not empty array';
    
    validate(value)
    {
        if (!Array.isArray(value)) {
            this._throwError();
        }
        if (value.length === 0) {
            this._throwError();
        }
    }
}
