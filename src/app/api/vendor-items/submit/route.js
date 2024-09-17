import { NextResponse } from 'next/server';
import { pool } from '@/data/db'; // Ensure that pool is correctly exported from '@/data/db'

export async function POST(req) {
    try {
        const body = await req.json(); // Parse JSON body
        const { restaurant_id, item_name, item_desc, item_price, image_path, alt_text } = body;

        // Validate input
        if (!restaurant_id || !item_name || !item_desc || !item_price) {
            return NextResponse.json({ error: 'Validation failed: All required fields must be provided' }, { status: 400 });
        }

        // Construct the query and values
        const query = `
            INSERT INTO Vendor_Items (restaurant_id, item_name, item_desc, item_price, image_path, alt_text)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
        `;
        const values = [restaurant_id, item_name, item_desc, item_price, image_path || null, alt_text || null];

        // Execute the query
        const result = await pool.query(query, values);

        // Return the newly added item
        return NextResponse.json(result.rows[0], { status: 201 });

    } catch (error) {
        console.error('Error inserting vendor item:', error);
        return NextResponse.json({ error: 'Failed to add vendor item' }, { status: 500 });
    }
}
