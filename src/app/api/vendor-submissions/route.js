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
                vs.hours_of_operation,
                vs.description,
                vs.website,
                vs.phone_number,
                vs.email,
                pr.range AS price_range,
                ft.type_name AS food_type
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
        const {
            name, location, hours_of_operation, description, website,
            phone_number, email, price_range_id, food_type_id,
            photo_types, images
        } = data;

        const client = await pool.connect();

        await client.query('BEGIN');

        // Insert vendor submission
        const result = await client.query(
            `INSERT INTO Vendor_Submissions (
                name, location, hours_of_operation, description, website,
                phone_number, email, price_range_id, food_type_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING submission_id`,
            [name, location, hours_of_operation, description, website, phone_number, email, price_range_id, food_type_id]
        );

        const vendorId = result.rows[0].submission_id;

        // Insert images and photo types
        if (images && images.length > 0) {
            const insertPromises = images.map((image, index) => {
                const imageUrl = image.base64; // Assuming base64 or URL format
                const photoType = photo_types[index]?.photo_type_id || null; // Handle photo type id
                const altText = photo_types[index]?.alt_text || ''; // Default to empty string if no alt text provided
                
                return client.query(
                    `INSERT INTO Vendor_Restaurant_Pictures (vendor_id, image_url, photo_type_id, alt_text) 
                    VALUES ($1, $2, $3, $4)`,
                    [vendorId, imageUrl, photoType, altText]
                );
            });

            await Promise.all(insertPromises);
        }

        await client.query('COMMIT');
        client.release();

        return NextResponse.json({ message: 'Submission successful!' });
    } catch (error) {
        console.error('Error handling submission:', error);
        return NextResponse.json({ message: 'Error handling submission', error: error.message }, { status: 500 });
    }
}
