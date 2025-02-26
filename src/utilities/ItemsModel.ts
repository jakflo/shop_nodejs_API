import BaseModel from './BaseModel';
import {Item} from '../utilities/Types';

export default class ItemsModel extends BaseModel
{
    async findItemsByIds(ids: Array<number>): Promise<Array<Item>|false>
    {
        var foundItems = await this._db.queryAll(
                "SELECT * FROM item WHERE id IN(?)", 
                [ids]
                );
        return foundItems;
    }
}
