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
                pr.range AS price_range,
                ft.type_name AS food_type,
                vs.hours_of_operation,
                vs.description,
                vs.phone_number,
                vs.email,
                vs.image_url
            FROM Vendor_Submissions vs
            JOIN Price_Ranges pr ON vs.price_range_id = pr.price_range_id
            JOIN Food_Types ft ON vs.food_type_id = ft.food_type_id
        `);

        client.release();
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error fetching vendor submissions:', error);
        return NextResponse.json({ error: 'Failed to fetch vendor submissions' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        const { name, location, price_range_id, food_type_id, hours_of_operation, description, phone_number, email, image_url, photo_types } = data;

        const client = await pool.connect();

        await client.query('BEGIN');

        const result = await client.query(
            'INSERT INTO Vendor_Submissions (name, location, price_range_id, food_type_id, hours_of_operation, description, phone_number, email, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING submission_id',
            [name, location, price_range_id, food_type_id, hours_of_operation, description, phone_number, email, image_url]
        );

        const submissionId = result.rows[0].submission_id;

        const photoTypePromises = photo_types.map(photoType => {
            return client.query(
                'INSERT INTO Vendor_Restaurant_Pictures (vendor_id, photo_type_id, image_url, alt_text) VALUES ($1, $2, $3, $4)',
                [submissionId, photoType.photo_type_id, photoType.image_url, photoType.alt_text]
            );
        });

        await Promise.all(photoTypePromises);

        await client.query('COMMIT');
        client.release();

        return NextResponse.json({ message: 'Submission successful!' });
    } catch (error) {
        console.error('Error handling submission:', error);
        return NextResponse.json({ message: 'Error handling submission', error: error.message }, { status: 500 });
    }
}
