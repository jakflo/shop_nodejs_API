import BaseModel from '../utilities/BaseModel';
import {OrderModel} from '../order/OrderModel';
import NothingChanged from '../error/NothingChanged';
import CurrencyModel from '../currency/CurrencyModel';
import DateTools from '../utilities/DateTools';

export default class EditOrderModel extends BaseModel
{
    constructor()
    {
        super();        
    }
    
    async edit(id: number, name: string, userId: number, price: number, currency: string)
    {
        var dateTools = new DateTools();
        
        var currencyModel = new CurrencyModel();
        var currencyObj = await currencyModel.getCurrency(currency);
        if (currencyObj === false) {
            throw new Error('Currency not found');
        }
        
        await this._db.updateRow(
                'order', 
                {
                    name: name, 
                    user_id: userId, 
                    price: price, 
                    last_changed: dateTools.getCurrentEnDateTime(), 
                    currency_id: currencyObj.id
                }, 
                "id = ?", 
                [id]
        );

        return true;
    }
    
    async checkIfOrderChanged(id: number, name: string, userId: number, price: number, currency: string)
    {
        var orderModel = new OrderModel();
        var origOrder = await orderModel.getOrderData(id);
        if (!origOrder) {
            throw new Error('Order not found');
        }
        
        if (name === origOrder.name && userId == origOrder.user_id && price == origOrder.price && currency === origOrder.currency_name)
        {
            throw new NothingChanged('No change detected');
        }
    }
    
}
