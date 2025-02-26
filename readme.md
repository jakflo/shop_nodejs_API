Shop node.js
=================

JSON REST API ke zprávě obejdávek

Instalace
------------

- po naistalování závislostí pomocí shop.sql vytvořte DB
- přístupové údaje k DB nastavte v config.ts


Podporovaná volání:
----------------------

GET: /order/$id
zobrazí data k objednávce $id
-----

GET: /order_states
zobrazí přípustné hodnoty stavů objednávek
-----

GET: /currencies
zobrazí přípustné hodnoty měn
-----

GET: /items
Zobrazí položky k objednání
-----

GET: /users
Zobrazí uživatele
-----

POST: /new_order
JSON body:
{
    "name": "název_objednávky", 
    "user_id": id_uživatele, 
    "price": celková cena,
    "currency": "Měna", 
    "items": [
        {
            "id": id_položky,
            "item_amount": množství_položky
        }, 
        {
            "id": id_položky,
            "item_amount": množství_položky
        }
    ]
}
Přidá objednávku
-----

PUT: /edit_order
JSON body:
{
    "id": id_objednávky, 
    "name": "název_objednávky", 
    "user_id": id_uživatele, 
    "price": celková cena,
    "currency": "Měna"
}
Edituje objednávku. Lze změnit pouze objednávku se stavem New
-----
