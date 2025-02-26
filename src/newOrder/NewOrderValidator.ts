import BaseValidator from '../validator/BaseValidator';
import ValidationError from '../error/ValidationError';
import IntGreaterThanZero from '../validator/IntGreaterThanZero';
import NotEmpty from '../validator/NotEmpty';
import FloatGreaterThanZero from '../validator/FloatGreaterThanZero';
import NotEmptyArray from '../validator/NotEmptyArray';
import UserExists from '../validator/UserExists';
import CurrencyModel from '../currency/CurrencyModel';
import ArrayTools from '../utilities/ArrayTools';
import ItemsModel from '../item/ItemsModel';
import {ItemInOrder} from '../utilities/Types';

export default class NewOrderValidator extends BaseValidator
{
    async asyncValidate(name: string, userId: number, price: number, currency: string, items: Array<ItemInOrder>)
    {
        await this.validateOrderData(name, userId, price, currency);
        await this._checkItems(items);
        
        return true;
    }
    
    async validateOrderData(name: string, userId: number, price: number, currency: string)
    {
        var nameCheck = new NotEmpty('Name cant be empty');
        nameCheck.validate(name);
        
        var priceCheck = new FloatGreaterThanZero('Price must be float greater then zero');
        priceCheck.validate(price);
        
        var userExists = new UserExists();
        await userExists.asyncValidate(userId);
        
        await this._checkCurrency(currency);
        
        return true;
    }
    
    async _checkCurrency(currency: string)
    {
        var currencyNameCheck = new NotEmpty('Currency name cant be empty');
        currencyNameCheck.validate(currency);
        var currencyModel = new CurrencyModel();
        var currencyExists = await currencyModel.currencyExists(currency);
        if (!currencyExists) {
            throw new ValidationError('Currency not found');
        }
    }
    
    async _checkItems(items: Array<ItemInOrder>)
    {
        var arrayTools = new ArrayTools();
        var notEmptyArray = new NotEmptyArray('Items list cant be empty');
        notEmptyArray.validate(items);
        
        var itemAmountCheck = new IntGreaterThanZero('item_amount must be integer greater then zero');
        var itemIdCheck = new IntGreaterThanZero('item_id must be integer greater then zero');
        var k;
        for (k in items) {
            itemIdCheck.validate(items[k].id);
            itemAmountCheck.validate(items[k].item_amount);
        }
        
        var itemsId = arrayTools.arrayColumn(items, 'id');
        itemsId = arrayTools.arrayUnique(itemsId);
        var itemsModel = new ItemsModel();
        
        var foundIds = await itemsModel.findItemsByIds(itemsId);
        if (foundIds === false || foundIds.length < itemsId.length) {
            throw new ValidationError('Item not found');
        }
    }
}
