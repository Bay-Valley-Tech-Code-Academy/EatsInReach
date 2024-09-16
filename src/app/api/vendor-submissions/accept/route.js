import { pool } from '@/data/db'; // Adjust import path based on your project structure

export async function POST(request) {
    const { submissionId } = await request.json();

    if (!submissionId) {
        return new Response(JSON.stringify({ message: 'Submission ID is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        // Fetch the submission data
        const result = await pool.query('SELECT * FROM Vendor_Submissions WHERE submission_id = $1', [submissionId]);
        const submission = result.rows[0];

        if (!submission) {
            return new Response(JSON.stringify({ message: 'Submission not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Insert into Restaurants
        await pool.query(
            'INSERT INTO Restaurants (name, location, price_range_id, food_type_id, hours_of_operation, description, phone_number, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [
                submission.name,
                submission.location,
                submission.price_range_id,
                submission.food_type_id,
                submission.hours_of_operation,
                submission.description,
                submission.phone_number,
                submission.email
            ]
        );

        // Delete from Vendor_Submissions
        await pool.query('DELETE FROM Vendor_Submissions WHERE submission_id = $1', [submissionId]);

        return new Response(JSON.stringify({ message: 'Submission accepted and added to Restaurants' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error handling accept request:', error);
        return new Response(JSON.stringify({ message: 'Failed to accept submission' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
