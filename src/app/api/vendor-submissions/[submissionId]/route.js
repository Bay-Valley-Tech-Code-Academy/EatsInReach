import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function GET() {
    try {
        const client = await pool.connect();
        const { rows } = await client.query('SELECT * FROM Vendor_Submissions WHERE status = $1', ['pending']);
        client.release();

        return NextResponse.json(rows, { status: 200 });
    } catch (error) {
        console.error('Error fetching submissions:', error);
        return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
    }
}
