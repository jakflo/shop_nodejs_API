import express, { Request, Response } from "express";
import bodyParser from 'body-parser';
import cors from 'cors';

import OrderController from './order/OrderController';

var app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


app.get('/order/:id', (req, resp) => {
    var orderController = new OrderController();
    orderController.render(req, resp);
});

// Start the Express server
app.listen(3030);

