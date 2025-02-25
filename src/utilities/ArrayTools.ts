export default class ArrayTools
{
    arrayColumn(input: Array<Object>, columnName: string): Array<any>
    {
        var output = [];
        var k;
        
        for (k in input) {
            let row = input[k];
            output.push(row[columnName]);
        }
        
        return output;
    }
    
    arrayUnique(input: Array<any>): Array<any>
    {
        var s = new Set(input);
        var output = [...s];
        return output;
    }
}
