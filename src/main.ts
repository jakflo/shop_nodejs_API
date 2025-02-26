import express, { Request, Response } from "express";
import bodyParser from 'body-parser';
import cors from 'cors';

import OrderController from './order/OrderController';
import NewOrderController from './newOrder/NewOrderController';
import CurrencyController from './currency/CurrencyController';
import OrderStatesController from './orderStates/OrderStatesController';
import EditOrderController from './editOrder/EditOrderController';

var app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


app.get('/order/:id', (req, resp) => {
    var orderController = new OrderController();
    orderController.render(req, resp);
});

app.get('/order_states/', (req, resp) => {
    var orderStatesController = new OrderStatesController();
    orderStatesController.render(req, resp);
});

app.get('/currencies/', (req, resp) => {
    var currencyController = new CurrencyController();
    currencyController.render(req, resp);
});

app.post('/new_order/', (req, resp) => {
    var newOrderController = new NewOrderController();
    newOrderController.render(req, resp);
});

app.put('/edit_order/', (req, resp) => {
    var editOrderController = new EditOrderController();
    editOrderController.render(req, resp);
});

// Start the Express server
app.listen(3030);

