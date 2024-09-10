import { pool } from '@/data/db';

export async function GET(request) {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM vendor_submissions');
        client.release();
        return new Response(JSON.stringify(result.rows), { status: 200 });
    } catch (error) {
        console.error('Error fetching submissions:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        const { name, location, price_range, food_type, hours_of_operation, description, image_url } = data;

        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO vendor_submissions (name, location, price_range, food_type, hours_of_operation, description, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [name, location, price_range, food_type, hours_of_operation, description, image_url]
        );
        client.release();

        return new Response(JSON.stringify(result.rows[0]), { status: 201 }); // 201 Created
    } catch (error) {
        console.error('Error submitting vendor:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}