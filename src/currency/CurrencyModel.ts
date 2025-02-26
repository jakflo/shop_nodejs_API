import BaseModel from '../utilities/BaseModel';
import ArrayTools from '../utilities/ArrayTools';
import {Dial} from '../utilities/Types';

export default class CurrencyModel extends BaseModel
{
    constructor()
    {
        super();        
    }
    
    async getCurrency(name: string): Promise<Dial|false>
    {
        var currency = await this._db.queryRow(
                "SELECT * FROM currency WHERE name = ?", 
                [name]
        );

        return currency;
    }
    
    async getCurrencies(): Promise<Array<Dial>|false>
    {
        var currencies = await this._db.queryAll(
                "SELECT * FROM currency ORDER BY id", 
                []
                );
        return currencies;
    }
    
    async getCurrenciesList(): Promise<Array<Dial>>
    {
        var currencies = await this.getCurrencies();
        if (!currencies) {
            return [];            
        }
            
        var arrayTools = new ArrayTools();
        return arrayTools.arrayColumn(currencies, 'name');
    }
    
    async currencyExists(currencyName): Promise<boolean>
    {
        var currencyExists = await this._db.queryValue(
                "SELECT COUNT(*) AS n FROM currency WHERE name = ?", 
                [currencyName], 
                'n'
                );
        return currencyExists > 0;
    }
}
