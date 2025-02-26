import ArrayTools from './ArrayTools';
import DbPrepareDataForInsertOrUpdate from '../utilities/DbPrepareDataForInsertOrUpdate';
import mysql, {Connection} from 'mysql';

interface dbConnect
{
    host: string,
    user: string,
    password: string,
    database: string
};

export default class DbWrap 
{
    #connection: Connection;
    #connectionClosedByError: boolean = false;
    #connectionClosedByCommand: boolean = false;
    #dbConnect: dbConnect;
    #lastError: string;
        
    constructor(dbConnect: dbConnect)
    {        
        this.#dbConnect = dbConnect;        
        this.#connect();
        this.#addConnectionLostHandler();
    }
    
    #connect() 
    {
        this.#connection = mysql.createConnection(this.#dbConnect);
        this.#connectionClosedByError = false;
        this.#connectionClosedByCommand = false;
    }
    
    #addConnectionLostHandler()
    {
        this.#connection.on('error', (err) => {
          if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DB disconnected');
          }
        });
    }    

    queryAll(sql: string, args: Array<any> = []): Promise<Array<object>|false>
    {
        return new Promise((resolve, reject)=> {
            if (this.#connectionClosedByError){
                return reject({
                    message: 'db allready closed by previous error', 
                    lastError: this.#lastError
                });                
            }
            if (this.#connectionClosedByCommand) {
                this.#connect();
            }
            
            this.#connection.query(sql, args, (err, rows )=> {
                if (err ){
                    this.#connectionClosedByError = true;
                    this.#lastError = err;
                    
                    if (this.#connection.state === 'disconnected') {
                        return reject({message: 'Database connection error'});
                    }
                    this.close();
                    
                    return reject(err);
                }
                
                type rows = Array<object>|false;
                resolve(rows);
            });
        });
    }

    async queryRow(sql: string, args: Array<any> = []): Promise<object|false>
    {
        var rows = await this.queryAll(sql, args);
        if (rows !== false) {
            var row = rows[0];
        } else {
            var row = false;
        }
        return row;
    }    

    async queryColumn(sql: string, args: Array<any> = [], columnName: string): Promise<Array<any>|false>
    {
        var rows = await this.queryAll(sql, args);
        var result = [];
        var k;
        if (rows !== false) {
            for (k in rows) {
                if (rows[k][columnName] === undefined) {
                    throw new Error('unknown column name');
                }
                result.push(rows[k][columnName]);
            }
        }
        return result;
    }

    async queryValue(sql: string, args: Array<any> = [], columnName: string): Promise<any>
    {
        var rows = await this.queryColumn(sql, args, columnName);
        if (rows !== false) {
            return rows[0];
        } else {
            return null;
        }
    }

    async insertRow(tableName: string, row: object): Promise<number>
    {
        var preparedData = new DbPrepareDataForInsertOrUpdate();
        preparedData.addRow(row);
        
        await this.insertMultipleRows(tableName, preparedData);
        var newRowId = await this.getLastInsertID();
        return newRowId;
    }

    async insertMultipleRows(tableName: string, preparedRows: DbPrepareDataForInsertOrUpdate)
    {
        await this.checkColumnsExists(tableName, preparedRows.getColumnsNames());
        
        await this.queryAll(
                "INSERT INTO `" + tableName + "` " + preparedRows.getSqlColumnsForInsert() + " VALUES " + preparedRows.getSqlValuesForInsert(), 
                preparedRows.getValuesParamaters()
                );
        return true;
    }

    async updateRow(tableName: string, row: object, whereSql: string, whereParams: Array<any>)
    {
        var preparedData = new DbPrepareDataForInsertOrUpdate();
        preparedData.addRow(row);
        
        await this.checkColumnsExists(tableName, preparedData.getColumnsNames());
        var params = preparedData.getValuesParamaters().concat(whereParams);
        
        await this.queryAll(
                "UPDATE `" + tableName + "` SET " + preparedData.getSqlColumnsForUpdate() + "  WHERE " + whereSql, 
                params
                );
        return true;
    }
    
    async getLastInsertID() 
    {
        return await this.queryValue('SELECT LAST_INSERT_ID() as id', [], 'id');
    }
    
    async checkColumnsExists(tableName: string, columnNames: Array<string>)
    {
        await this.checkTableExists(tableName);
        var foundColumns = await this.queryColumn(
                "SHOW COLUMNS FROM `" + tableName + "` WHERE Field IN(?)", 
                [columnNames], 
                'Field'
                );
        if (foundColumns !== false && foundColumns.length < columnNames.length) {
            throw new Error('Column not found');
        }
    }
    
    async checkTableExists(tableName: string)
    {
        var foundTablesRaw = await this.queryAll("SHOW TABLES");
        
        if (foundTablesRaw !== false) {
            var keyname = Object.keys(foundTablesRaw[0])[0];
            var arrayTools = new ArrayTools();
            var foundTables = arrayTools.arrayColumn(foundTablesRaw, keyname);
        } else {
            var foundTables = [];
        }
        
        if (!foundTables.includes(tableName)) {
            throw new Error('Table not found');
        }
    }
    
    close()
    {
        this.#connectionClosedByCommand = true;
        return new Promise((resolve, reject )=> {
            if (this.#connection.state === 'disconnected') {
                return reject({message: 'Database allready disconnected'});
            }
            this.#connection.end(err => {
                if (err )
                    return reject(err );
                resolve(true);
            });
        });
    }
}
