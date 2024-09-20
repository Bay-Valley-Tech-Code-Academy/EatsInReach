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

        const picture_results = await pool.query('SELECT * FROM Vendor_Restaurant_Pictures WHERE vendor_id = $1', [submissionId]);
        const picture_submission = picture_results.rows[0];

        if (!submission) {
            return new Response(JSON.stringify({ message: 'Submission not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Check if price_range_id and food_type_id are valid
        const [priceRangeResult, foodTypeResult] = await Promise.all([
            pool.query('SELECT 1 FROM Price_Ranges WHERE price_range_id = $1', [submission.price_range_id]),
            pool.query('SELECT 1 FROM Food_Types WHERE food_type_id = $1', [submission.food_type_id])
        ]);

        if (priceRangeResult.rowCount === 0 || foodTypeResult.rowCount === 0) {
            return new Response(JSON.stringify({ message: 'Invalid price range or food type ID' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Insert into Restaurants
        await pool.query(
            `INSERT INTO Restaurants (name, location, hours_of_operation, description, website, phone_number, email, price_range_id, food_type_id) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [
                submission.name,
                submission.location,
                submission.hours_of_operation,
                submission.description,
                submission.website,
                submission.phone_number,
                submission.email,
                submission.price_range_id,
                submission.food_type_id,
            ]
        );

        await pool.query(
            `INSERT INTO Restaurant_Pictures (restaurant_id, photo_type_id, image_url, alt_text) 
            VALUES ($1, $2, $3, $4)`,
            [
                picture_submission.vendor_id,
                picture_submission.photo_type_id,
                picture_submission.alt_text, // change back to image_url eventually
                picture_submission.alt_text
            ]
        );

        // Delete from Vendor_Submissions and Vendor_Restaurant_Pictures
        await pool.query('DELETE FROM Vendor_Restaurant_Pictures WHERE vendor_id = $1', [submissionId]);
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
