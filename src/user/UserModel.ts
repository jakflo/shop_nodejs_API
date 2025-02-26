import BaseModel from '../utilities/BaseModel';
import IntGreaterThanZero from '../validator/IntGreaterThanZero';
import {User} from '../utilities/Types';

interface UserRaw
{
    id: number, 
    user_name: string, 
    roles: string, 
    password: string, 
    fullname: string, 
    email: string
}

export default class UserModel extends BaseModel
{
    constructor()
    {
        super();        
    }

    async getAllUsers(): Promise<Array<User>>
    {
        var usersRaw = await this._db.queryAll("SELECT * FROM `user`");
        if (usersRaw === false) {
            return [];
        }

        var users = this._parseUsersListRoles(usersRaw);
        users = this._maskPasswordsInUsersList(users);

        return users;
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

    _parseUserRoles(user: UserRaw): User
    {
        user.roles = JSON.parse(user.roles);
        return user;
    }

    _parseUsersListRoles(users: Array<UserRaw>): Array<User>
    {
        users.forEach((user) => {
            user = this._parseUserRoles(user);
        });
        return users;
    }

    _maskPasswordsInUsersList(users: Array<UserRaw|User>): Array<UserRaw|User>
    {
        users.forEach((user) => {
            user.password = '***';
        });

        return users;
    }

}
