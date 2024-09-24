import { NextResponse } from 'next/server';
import { pool } from '@/data/db';

export async function POST(req) {
    try {
        const body = await req.json();
        const { id, restaurant_id, item_name, item_desc, item_price, image_path, alt_text } = body;

        // Validate input
        if (!id || !restaurant_id || !item_name || !item_desc || !item_price) {
            return NextResponse.json({ error: 'Validation failed: All required fields must be provided' }, { status: 400 });
        }

        // Construct the query and values
        const query = `
            UPDATE Vendor_Items
            SET restaurant_id = $1,
                item_name = $2,
                item_desc = $3,
                item_price = $4,
                image_path = $5,
                alt_text = $6
            WHERE item_id = $7
            RETURNING *;
        `;
        const values = [restaurant_id, item_name, item_desc, item_price, image_path || null, alt_text || null, id];

        // Execute the query
        const result = await pool.query(query, values);

        // Return the updated item
        return NextResponse.json(result.rows[0], { status: 200 });

    } catch (error) {
        console.error('Error updating vendor item:', error);
        return NextResponse.json({ error: 'Failed to update vendor item' }, { status: 500 });
    }
}
