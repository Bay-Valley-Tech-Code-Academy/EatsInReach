import { NextResponse } from 'next/server';
import { pool } from '@/data/db';

export async function POST(req) {
    try {
        const body = await req.json();
        const { id, item_name, item_description, item_price, image_path, alt_text } = body;
        const uid = req.headers.get('uid'); // Get the uid from the request headers

        // Validate input
        if (!id || !item_name || !item_description || !item_price) {
            return NextResponse.json({ error: 'Validation failed: All required fields must be provided' }, { status: 400 });
        }

        // Check if the item belongs to a restaurant that the user owns
        const restaurantQuery = `
            SELECT r.restaurant_id
            FROM Restaurants r
            JOIN Menus m ON r.restaurant_id = m.restaurant_id
            JOIN Menu_Items mi ON m.menu_id = mi.menu_id
            WHERE r.uid = $1 AND mi.item_id = $2
            LIMIT 1;
        `;
        const restaurantResult = await pool.query(restaurantQuery, [uid, id]);

        if (restaurantResult.rows.length === 0) {
            return NextResponse.json({ error: 'Unauthorized: Item does not belong to your restaurant' }, { status: 403 });
        }

        // Proceed with the update
        const query = `
            UPDATE Menu_Items
            SET item_name = $1,
                item_description = $2,
                item_price = $3,
                image_path = $4,
                alt_text = $5
            WHERE item_id = $6
            RETURNING *;
        `;
        const values = [item_name, item_description, item_price, image_path || null, alt_text || null, id];

        // Execute the query
        const result = await pool.query(query, values);

        // Check if an item was updated
        if (result.rowCount === 0) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }

        // Return the updated item
        return NextResponse.json(result.rows[0], { status: 200 });

    } catch (error) {
        console.error('Error updating menu item:', error);
        return NextResponse.json({ error: 'Failed to update menu item' }, { status: 500 });
    }
}
