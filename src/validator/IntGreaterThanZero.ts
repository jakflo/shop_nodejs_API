import BaseValidator from './BaseValidator';
import Validator from 'validator';

export default class IntGreaterThanZero extends BaseValidator
{
    _defaultMessage = 'Id must be integer greater then zero';
    
    validate(value)
    {
        if (typeof value !== 'string' && !(value instanceof String)) {
            value = String(value);
        }
        if (!Validator.isInt(value, {allow_leading_zeroes: false, gt: 0})) {
            this._throwError();
        }
    }
}
