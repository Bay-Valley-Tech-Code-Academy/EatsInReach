import { Pool } from 'pg';

export async function GET(req) {
    const { user_id } = req.query;

    const query = `
        SELECT Restaurants.*
        FROM Favorites
        JOIN Restaurants ON Favorites.restaurants_id = Restaurants.restaurants_id
        WHERE Favorites.user_id = $1;
    `;

    try {
        const { rows } = await pool.query(query, [user_id]);
        return new Response(JSON.stringify(rows), { status: 200 });
    } catch (error) {
        console.error('Error fetching favorites.', error);
        return new Response('Error', { status: 500 });
    }
}

export async function POST(req) {
    const { user_id, restaurant_id } = await req.json();

    const query = `
        INSERT INTO Favorites(user_id, restaurant_id)
        VALUES ($1,$2)
        ON CONFLICT DO NOTHING;
    `;
    
    try {
        await pool.query(query, [user_id, restaurant_id]);
        return new Response('Favorited', { status: 200 });
    } catch (error) {
        console.error('Error favoriting restaurant', error);
        return new Response('Error', { status: 500 });
    }
}

export async function DELETE(req) {
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