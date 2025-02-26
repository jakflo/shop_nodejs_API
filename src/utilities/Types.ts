interface Dial
{
    id: number, 
    name: string
}

interface DialNameOnly
{
    name: string
}

interface ItemInOrder
{
    orderId: number, 
    id: number, 
    item_amount: number
}

interface Item
{
    id: number, 
    currency_id: number, 
    name: string, 
    price: number
}

export {Dial, DialNameOnly, ItemInOrder, Item}
