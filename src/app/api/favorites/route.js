import { Pool } from 'pg';


export async function POST(request) {
    const { user_id, restaurant_id } = await req.json();
}

export async function DELETE() {
    const { user_id, restaurant_id } = await req.json();

    const query = `
        DELETE FROM Favorites
        WHERE user_id = $1 AND restaurant_id = $2;
    `;

    try {
        await pool.query(query, [user_id, restaurant_id]);
        return new Response('Unfavorited', { status: 200 });
    } catch (error) {
        console.error("Error removing favorite", error);
        return new Response('Error', { status: 500 });
    }
}