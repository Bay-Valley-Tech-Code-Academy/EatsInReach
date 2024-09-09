// src/app/api/restaurants/route.js

import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Ensure you have DATABASE_URL in your .env file
});

export async function GET() {
    try {
        const client = await pool.connect();
        const result = await client.query(`
            SELECT r.restaurant_id, r.name, r.location, r.price_range, f.type_name AS food_type, rp.image_url
            FROM Restaurants r
            JOIN Restaurant_Food_Types rft ON r.restaurant_id = rft.restaurant_id
            JOIN Food_Types f ON rft.food_type_id = f.food_type_id
            JOIN Restaurant_Pictures rp ON r.restaurant_id = rp.restaurant_id
            WHERE rp.photo_type_id = 2  -- Only fetching food pictures
        `);
        client.release();

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        return NextResponse.json({ error: 'Failed to fetch restaurants' }, { status: 500 });
    }
}
