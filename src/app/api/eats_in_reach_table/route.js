import { NextResponse } from 'next/server';
import { pool } from '@/data/db';


// Handle GET request
export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM eats_in_reach_table');
    client.release();
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error('Error fetching eats_in_reach_table:', err);
    return NextResponse.error(new Error('Failed to fetch eats_in_reach_table'));
  }
}


export async function POST(req) {
  const { description, category } = await req.json(); // Get data from request body


  try {
    // Insert item into the database and get the inserted row
    const { rows } = await pool.query(
      'INSERT INTO eats_in_reach_table (description, category) VALUES ($1, $2) RETURNING *',
      [description, category]
    );
    return NextResponse.json(rows[0]); // Return the new item as JSON
  } catch (err) {
    console.error(err); // Log any errors
    return NextResponse.error(); // Return a generic error response
  }
}


// Handle DELETE request
export async function DELETE(req) {
  const { id } = await req.json(); // Extract item ID from request body


  try {
    await pool.query('DELETE FROM eats_in_reach_table WHERE id = $1', [id]); // Delete item from database
    return NextResponse.json({ message: 'Item deleted' }); // Respond with success message
  } catch {
    return NextResponse.error(); // Respond with error if something goes wrong
  }
}
