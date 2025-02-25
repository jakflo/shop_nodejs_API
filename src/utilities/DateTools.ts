export default class DateTools
{
    formatToEnDateTime(dateObject: Date): string
    {
        return dateObject.getFullYear().toString() + '-' + this._addZero(dateObject.getMonth() + 1) + '-' + this._addZero(dateObject.getDate()) + ' ' 
                + this._addZero(dateObject.getHours()) + ':' + this._addZero(dateObject.getMinutes()) + ':' + this._addZero(dateObject.getSeconds());
    }
    
    getCurrentEnDateTime(): string
    {
        var now = new Date();
        return this.formatToEnDateTime(now);
    }
    
    _addZero(dateNumber: number): string
    {
        var dateString = dateNumber.toString();
        if (dateString.length === 1) {
            return '0' + dateString;
        } else {
            return dateString;
        }
    }
}
