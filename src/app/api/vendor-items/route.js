import { Client } from 'pg';

export async function GET() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();
        const result = await client.query(`SELECT
            mi.item_id,
            mi.menu_id,
            mi.name AS item_name,
            mi.description AS item_desc,
            mi.price AS item_price,
            m.restaurant_id
        FROM Menu_Items mi
        JOIN Menus m ON mi.menu_id = m.menu_id`);
        return new Response(JSON.stringify(result.rows), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching vendor items:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch menu items' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    } finally {
        await client.end();
    }
}
