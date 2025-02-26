import DateTools from '../utilities/DateTools';
import {OrderData, OrderItem} from './OrderModel';

export default class OutputJson
{
    formatData(orderData: OrderData|false, orderItems: Array<OrderItem>|false)
    {
        if (orderData === false) {
            return [];
        }
        
        var dateTools = new DateTools();
        return {
            id: orderData.id, 
            date_created: dateTools.formatToEnDateTime(orderData.date_created), 
            last_changed: orderData.last_changed !== null? orderData.last_changed: '-', 
            name: orderData.name, 
            user: this.#formatUserData(orderData), 
            price: orderData.price, 
            currency: orderData.currency_name, 
            order_state: orderData.order_state_name, 
            items: this.#formatOrderItems(orderItems)
        };
    }
    
    #formatUserData(orderData: OrderData)
    {
        return {
            id: orderData.user_id, 
            user_name: orderData.user_name, 
            fullname: orderData.fullname, 
            email: orderData.email
        };
    }
    
    #formatOrderItems(orderItems: Array<OrderItem>|false)
    {
        if (orderItems === false) {
            return [];
        }
        
        var k;
        var items = [];
        
        for (k in orderItems) {
            let item = orderItems[k];
            items.push({
                id: item.item_id, 
                item_amount: item.item_amount, 
                name: item.name, 
                price: item.price, 
                currency: item.currency_name
            });
        }
        
        return items;
    }
}
