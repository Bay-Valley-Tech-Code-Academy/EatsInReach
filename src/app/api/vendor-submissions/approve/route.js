export async function POST(request) {
    try {
        const data = await request.json();
        const { name, location, price_range, food_type_id, hours_of_operation, description, phone_number, email, image_url } = data;

        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO restaurants (name, location, price_range, food_type_id, hours_of_operation, description, phone_number, email, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [name, location, price_range, food_type_id, hours_of_operation, description, phone_number, email, image_url]
        );
        client.release();

        return new Response(JSON.stringify(result.rows[0]), { status: 201 });
    } catch (error) {
        console.error('Error approving vendor:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
