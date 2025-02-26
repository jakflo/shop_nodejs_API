import BaseValidator from './BaseValidator';
import Validator from 'validator';

export default class FloatGreaterThanZero extends BaseValidator
{
    _defaultMessage = 'Id must be float greater then zero';
    
    validate(value)
    {
        if (typeof value !== 'string' && !(value instanceof String)) {
            value = String(value);
        }
        if (!Validator.isFloat(value, {gt: 0, locale: 'en-GB'})) {
            this._throwError();
        }
    }
}
