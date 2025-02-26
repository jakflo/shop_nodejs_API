import BaseModel from '../utilities/BaseModel';
import ArrayTools from '../utilities/ArrayTools';
import {Dial} from '../utilities/Types';

export default class OrderStatesModel extends BaseModel
{
    constructor()
    {
        super();        
    }
    
    async getState(name: string): Promise<Dial|false>
    {
        var state = await this._db.queryRow(
                "SELECT * FROM order_state WHERE name = ?", 
                [name]
        );

        return state;
    }
    
    async getStates(): Promise<Array<Dial>|false>
    {
        var states = await this._db.queryAll(
                "SELECT * FROM order_state ORDER BY id", 
                []
                );
        return states;
    }
    
    async getStatesList(): Promise<Array<string>>
    {
        var states = await this.getStates();
        if (!states) {
            return [];
        }
        
        var arrayTools = new ArrayTools();
        return arrayTools.arrayColumn(states, 'name');
    }
}
