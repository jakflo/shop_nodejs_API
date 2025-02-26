import BaseModel from '../utilities/BaseModel';
import CurrencyModel from '../currency/CurrencyModel';
import OrderStatesModel from '../orderStates/OrderStatesModel';
import DateTools from '../utilities/DateTools';
import DbPrepareDataForInsertOrUpdate from '../utilities/DbPrepareDataForInsertOrUpdate';
import {ItemInOrder} from '../utilities/Types';

export default class NewOrderModel extends BaseModel
{
    constructor()
    {
        super();        
    }
    
    async addNewOrder(name: string, userId: number, price: number, currency: string, items: Array<ItemInOrder>): Promise<number>
    {
        var currencyModel = new CurrencyModel();
        var currencyRow = await currencyModel.getCurrency(currency);
        if (!currencyRow) {
            throw new Error('Currency not found');
        }
        
        var orderStatesModel = new OrderStatesModel();
        var orderStateId = await orderStatesModel.getState('new');
        if (orderStateId === false) {
            throw new Error('Order state for new not found');
        }
        
        var dateTools = new DateTools();
        var dateCreated = dateTools.getCurrentEnDateTime();
        
        var newOrderId = await this._db.insertRow(
            'order', 
            {
                user_id: userId, 
                date_created: dateCreated, 
                name: name, 
                price: price, 
                currency_id: currencyRow.id, 
                order_state_id: orderStateId.id
            }
        );
        
        await this.addItemsToOrder(newOrderId, items);
        
        return newOrderId;
    }
    
    async addItemsToOrder(orderId: number, items: Array<ItemInOrder>)
    {
        var preparedData = new DbPrepareDataForInsertOrUpdate(); 
        items.forEach((item) => {
            preparedData.addRow({
                order_id: orderId, 
                item_id: item.id, 
                item_amount: item.item_amount
            });
        });
        
        await this._db.insertMultipleRows('order_has_item', preparedData);
        
        return true;
    }
}
