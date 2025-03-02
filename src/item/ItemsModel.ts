import BaseModel from '../utilities/BaseModel';
import {Item} from '../utilities/Types';

export default class ItemsModel extends BaseModel
{
    constructor()
    {
        super();        
    }

    async getAllItems(): Promise<Array<Item>>
    {
        var foundItems = await this._db.queryAll(
        "SELECT i.id, i.name, i.price, c.name AS currency "+
        "FROM item i "+
        "JOIN currency c ON i.currency_id = c.id"
        );
        if (foundItems === false) {
            return [];
        }
        return foundItems;
    }

    async findItemsByIds(ids: Array<number>): Promise<Array<Item>|false>
    {
        var foundItems = await this._db.queryAll(
                "SELECT * FROM item WHERE id IN(?)", 
                [ids]
                );
        return foundItems;
    }
}
