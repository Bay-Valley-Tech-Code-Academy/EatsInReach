import { pool } from '@/data/db';

export async function POST(req) {
  const { item_name, item_description, item_price, image_path, alt_text } = await req.json();
  const uid = req.headers.get('uid'); // Get the uid from the request headers

  try {
    // Fetch the restaurant_id and menu_id for the user
    const restaurantQuery = `
      SELECT r.restaurant_id, m.menu_id 
      FROM Restaurants r
      JOIN Menus m ON r.restaurant_id = m.restaurant_id
      WHERE r.uid = $1
      LIMIT 1;  
    `;
    
    const restaurantResult = await pool.query(restaurantQuery, [uid]);
    
    if (restaurantResult.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'No restaurant found for the user' }), { status: 404 });
    }
    
    const { menu_id } = restaurantResult.rows[0]; // Get the first restaurant's menu_id

    // Insert the new menu item with the retrieved menu_id
    const query = `
      INSERT INTO menu_items (menu_id, item_name, item_description, item_price, image_path, alt_text)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING item_id;
    `;
    
    const values = [menu_id, item_name, item_description, item_price, image_path, alt_text];
    const { rows } = await pool.query(query, values);

    const newItemId = rows[0].item_id;

    const newItem = {
      item_id: newItemId,
      menu_id,
      item_name,
      item_description,
      item_price,
      image_path,
      alt_text,
    };

    return new Response(JSON.stringify(newItem), { status: 201 });
  } catch (error) {
    console.error("Error adding menu item:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
