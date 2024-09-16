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
                vs.submission_id,
                vs.name,
                vs.location,
                pr.range AS price_range,            -- Join Price_Ranges table to get the price range name
                ft.type_name AS food_type,          -- Join Food_Types table to get the food type name
                vs.hours_of_operation,
                vs.description,
                vs.phone_number,
                vs.email,
                vs.image_url
            FROM Vendor_Submissions vs
            JOIN Price_Ranges pr ON vs.price_range_id = pr.price_range_id -- Join to get price range
            JOIN Food_Types ft ON vs.food_type_id = ft.food_type_id       -- Join to get food type
        `);

        client.release();
        return NextResponse.json(result.rows); // Return the fetched data
    } catch (error) {
        console.error('Error fetching vendor submissions:', error);
        return NextResponse.json({ error: 'Failed to fetch vendor submissions' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        const { name, location, price_range_id, food_type_id, hours_of_operation, description, phone_number, email, image_url } = data;

        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO vendor_submissions (name, location, price_range_id, food_type_id, hours_of_operation, description, phone_number, email, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [name, location, price_range_id, food_type_id, hours_of_operation, description, phone_number, email, image_url]
        );
        client.release();

        return new Response(JSON.stringify(result.rows[0]), { status: 201 }); // 201 Created
    } catch (error) {
        console.error('Error submitting vendor:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}