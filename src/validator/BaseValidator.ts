import ValidationError from '../error/ValidationError';

export default class BaseValidator
{
    _defaultMessage = 'Validation failed';
    _customMessage = '';
    
    constructor(customMessage = '')
    {
        this._customMessage = customMessage;
    }
    
    _getErrorMessage()
    {
        return this._customMessage.length > 0 ? this._customMessage : this._defaultMessage;
    }
    
    _throwError()
    {
        throw new ValidationError(this._getErrorMessage());
    }
    
    _setCustomMessage(customMessage)
    {
        this._customMessage = customMessage;
        return this;
    }
}
