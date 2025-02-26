export default class DbPrepareDataForInsertOrUpdate
{
    _columnNames: Array<string> = [];
    _columnNamesBase64: string = null;
    _placeholdersForInsert: Array<string> = [];
    _placeholdersForUpdate: string = null;
    _values: Array<any> = [];
    _rowsCount: number = 0;
    
    /**
     * prida zaznam k INSERT nebo UPDATE
     * @param {Object} data - objekt s {nazevSloupce: hodnota}
     */
    addRow(data: object)
    {
        var k;
        var columnNames = [];
        var placeholders = [];
        var placeholdersForUpdate = [];
        var values = [];
        
        if (Object.keys(data).length === 0) {
            throw new Error('row cant be empty');
        }
        
        for (k in data) {
            columnNames.push(k);
            placeholders.push('?');
            placeholdersForUpdate.push(k + " = ?");
            values.push(data[k]);
        }
        
        this._checkColumnsNameConsistency(columnNames);
        this._columnNames = columnNames;
        this._placeholdersForInsert.push("(" + placeholders.join(', ') + ")");
        this._placeholdersForUpdate = placeholdersForUpdate.join(', ');
        this._values = this._values.concat(values);
        
        this._rowsCount++;
        return this;
    }

    insertMultipleRows(dataArray: Array<object>)
    {
        var toto = this;
        dataArray.forEach((row) => {
            toto.addRow(row);
        });
        
        return this;
    }
    
    getColumnsNames(): Array<string>
    {
        return this._columnNames;
    }
    
    getSqlColumnsForInsert(): string
    {
        this._checkRowsCountForInsert();
        return "(" + this._columnNames.join(', ') + ")";
    }
    
    getSqlValuesForInsert(): string
    {
        this._checkRowsCountForInsert();
        return this._placeholdersForInsert.join(', ');
    }
    
    getSqlColumnsForUpdate(): string
    {
        this._checkRowsCountForUpdate();
        return this._placeholdersForUpdate;
    }
    
    getValuesParamaters(): Array<any>
    {
        return this._values;
    }
    
    _checkColumnsNameConsistency(columnNames: Array<string>)
    {
        var currentColumnNamesBase64 = btoa(JSON.stringify(columnNames));
        if (this._columnNamesBase64 === null) {
            this._columnNamesBase64 = currentColumnNamesBase64;
        } else if (currentColumnNamesBase64 !== this._columnNamesBase64) {
            throw new Error('Non consistent data for multiple insert. Columns count or order mismatch');
        }
    }
    
    _checkRowsCountForInsert()
    {
        if (this._rowsCount === 0) {
            throw new Error('Rows count must be > 0');
        }
    }
    
    _checkRowsCountForUpdate()
    {
        if (this._rowsCount !== 1) {
            throw new Error('Rows count must 1');
        }
    }
}
