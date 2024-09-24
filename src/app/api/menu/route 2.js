import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Ensure you have DATABASE_URL in your .env file
});

export async function GET() {
    try {
        const client = await pool.connect();

        const result = await client.query(`
            SELECT
                mi.item_id,
                mi.menu_id,
                mi.name,
                mi.description AS item_desc,
                mi.price,
                mi.is_vegetarian, 
                mi.is_vegan, 
                mi.is_gluten_free,
                m.name AS time,
                m.description AS menu_desc,
                m.restaurant_id
            FROM Menu_Items mi
            JOIN Menus m ON mi.menu_id = m.menu_id
        `);

        client.release();

        // Grouping items by menu_id (or menu_name)
        const groupedMenus = result.rows.reduce((acc, row) => {
            const menuId = row.menu_id;
            if (!acc[menuId]) {
                acc[menuId] = {
                    menu_id: row.menu_id,
                    menu_name: row.time,
                    menu_desc: row.menu_desc,
                    restaurant_id: row.restaurant_id,
                    items: [],
                };
            }

            // Add menu item to the respective menu
            acc[menuId].items.push({
                item_id: row.item_id,
                name: row.name,
                description: row.item_desc,
                price: row.price,
                is_vegetarian: row.is_vegetarian,
                is_vegan: row.is_vegan,
                is_gluten_free: row.is_gluten_free,
            });

            return acc;
        }, {});

        const response = Object.values(groupedMenus);

        return NextResponse.json(response); // Return the fetched data
    } catch (error) {
        console.error('Error fetching vendor submissions:', error);
        return NextResponse.json({ error: 'Failed to fetch vendor submissions' }, { status: 500 });
    }
}