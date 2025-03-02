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
    currency: string, 
    name: string, 
    price: number
}

interface User
{
    id: number, 
    user_name: string, 
    roles: Array<string>, 
    password: string, 
    fullname: string, 
    email: string
}

export {Dial, DialNameOnly, ItemInOrder, Item, User}
