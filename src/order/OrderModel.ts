import BaseModel from '../utilities/BaseModel';
import NotFoundError from '../error/NotFoundError';

interface OrderData
{
    id: number, 
    date_created: Date, 
    last_changed: Date|null, 
    name: string, 
    user_id: number, 
    user_name: string, 
    fullname: string, 
    email: string,
    price: number, 
    currency_name: string, 
    order_state_name: string
}

interface OrderItem
{
    item_id: number, 
    item_amount: number, 
    name: string, 
    price: number, 
    currency_name: string
}

interface Order
{
    orderData: OrderData|false, 
    orderItems: Array<OrderItem>|false
}
    
class OrderModel extends BaseModel
{
    constructor()
    {
        super();        
    }
    
    async getOrder(id: number): Promise<Order>
    {
        var orderData = await this.getOrderData(id);
        if (!orderData) {
            throw new NotFoundError('Order not found');
        }
        
        var orderItems = await this.getOrderItems(id);
        var order: Order = {
            orderData: orderData, 
            orderItems: orderItems
        };
        return order;
    }
    
    async getOrderData(id: number): Promise<OrderData|false>
    {
        var order = await this._db.queryRow(
                "SELECT o.*, c.name AS currency_name, os.name AS order_state_name, u.id AS user_id, u.user_name, u.fullname, u.email "+
                "FROM `order` o "+
                "JOIN user u ON o.user_id = u.id "+
                "JOIN currency c ON o.currency_id = c.id "+
                "JOIN order_state os ON o.order_state_id = os.id "+
                "WHERE o.id = ?", 
                [id]
                );
        return order;
    }
    
    async getOrderItems(id: number): Promise<Array<OrderItem>|false>
    {
        var items = await this._db.queryAll(
                "SELECT ohi.*, i.name, i.price, c.name AS currency_name "+
                "FROM order_has_item ohi "+
                "JOIN item i ON ohi.item_id = i.id "+
                "JOIN currency c ON i.currency_id = c.id "+
                "WHERE ohi.order_id = ?", 
                [id]
                );
        return items;
    }
}

export {OrderData, OrderItem, Order, OrderModel};
