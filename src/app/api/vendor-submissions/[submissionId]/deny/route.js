import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function POST(req, { params }) {
    const submissionId = params.submissionId;

    try {
        const client = await pool.connect();
        await client.query('DELETE FROM Vendor_Submissions WHERE submission_id = $1', [submissionId]);
        client.release();

        return NextResponse.json({ message: 'Denied successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error denying submission:', error);
        return NextResponse.json({ error: 'Failed to deny submission' }, { status: 500 });
    }
}
