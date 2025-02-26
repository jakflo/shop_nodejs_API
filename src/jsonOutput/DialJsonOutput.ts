import {Dial, DialNameOnly} from '../utilities/Types';

export default class DialJsonOutput
{
    formatData(dial: Array<Dial>|false, showId: boolean): Array<Dial|DialNameOnly>
    {
        if (dial === false) {
            return [];
        }
            
        var k;
        var rows = [];
        
        for (k in dial) {
            let row = dial[k];            
            
            if (showId) {
                var parsedRow: Dial = {
                    id: row.id, 
                    name: row.name
                };
            } else {
                var parsedRow: DialNameOnly = {                    
                    name: row.name
                };
            }
            
            rows.push(parsedRow);
        }
        
        return rows;
    }
}
