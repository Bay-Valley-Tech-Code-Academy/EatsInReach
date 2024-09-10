import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function POST(req, { params }) {
    const submissionId = params.submissionId;

    try {
        const client = await pool.connect();
        const { rows } = await client.query('SELECT * FROM Vendor_Submissions WHERE submission_id = $1', [submissionId]);

        if (rows.length > 0) {
            const submission = rows[0];

            // Insert into Restaurants table
            await client.query(
                `INSERT INTO Restaurants (name, location, price_range, food_type, hours_of_operation, description, image_url)
                VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [submission.name, submission.location, submission.price_range, submission.food_type, submission.hours_of_operation, submission.description, submission.image_url]
            );

            // Delete from Vendor_Submissions table
            await client.query('DELETE FROM Vendor_Submissions WHERE submission_id = $1', [submissionId]);
        }

        client.release();
        return NextResponse.json({ message: 'Approved successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error approving submission:', error);
        return NextResponse.json({ error: 'Failed to approve submission' }, { status: 500 });
    }
}
