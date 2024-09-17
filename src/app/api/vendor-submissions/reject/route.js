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
        // Delete from Vendor_Submissions
        await pool.query('DELETE FROM Vendor_Submissions WHERE submission_id = $1', [submissionId]);

        return new Response(JSON.stringify({ message: 'Submission rejected' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error handling reject request:', error);
        return new Response(JSON.stringify({ message: 'Failed to reject submission' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
