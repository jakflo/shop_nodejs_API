import BaseValidator from '../validator/BaseValidator';
import NewOrderValidator from '../newOrder/NewOrderValidator';
import {OrderModel} from '../order/OrderModel';
import IntGreaterThanZero from '../validator/IntGreaterThanZero';

export default class EditOrderValidator extends BaseValidator
{
    async asyncValidate(id: number, name: string, userId: number, price: number, currency: string)
    {
        var intGreaterThanZero = new IntGreaterThanZero();
        intGreaterThanZero.validate(id);
        var orderModel = new OrderModel();
        var origOrder = await orderModel.getOrderData(id);
        if (!origOrder) {
            this._setCustomMessage('Order not found')._throwError();
        }
        
        if (origOrder.order_state_name !== 'new') {
            this._setCustomMessage('Cannot change order, that isnt new')._throwError();
        }
        
        var newOrderValidator = new NewOrderValidator();
        await newOrderValidator.validateOrderData(name, userId, price, currency);
        
        return true;
    }
}
