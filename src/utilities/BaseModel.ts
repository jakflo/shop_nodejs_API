import DbWrap from './DbWrap';
import {dbConnect} from '../config';

export default class BaseModel 
{
    _db: DbWrap;
    
    constructor()
    {
        this._db = new DbWrap(dbConnect);
    }
    
    disconnectDb()
    {
        this._db.close()
                .then((value) => {
                    
                })
                .catch((err) => {
//                    console.log(err);
                })
        ;
    }
}
