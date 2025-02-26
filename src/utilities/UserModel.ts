import BaseModel from './BaseModel';
import IntGreaterThanZero from '../validator/IntGreaterThanZero';

export default class UserModel extends BaseModel
{
    constructor()
    {
        super();        
    }
    
    async checkUserExists(userId: number): Promise<boolean>
    {
        var intGreaterThanZero = new IntGreaterThanZero('user_id must be integer greater then zero');
        intGreaterThanZero.validate(userId);
        
        var userFound = await this._db.queryValue(
            "SELECT COUNT(*) AS n FROM `user` WHERE id = ?", 
            [userId], 
            'n'
        );
        
        return userFound > 0;
    }
}
