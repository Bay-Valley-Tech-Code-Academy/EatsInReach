import { pool } from '@/data/db';

export async function POST(req) {
  const { item_name, item_description, item_price, image_path, alt_text } = await req.json();

  try {
    const query = `
      INSERT INTO menu_items (item_name, item_description, item_price, image_path, alt_text)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING item_id;
    `;

    const values = [item_name, item_description, item_price, image_path, alt_text];
    const { rows } = await pool.query(query, values);

    const newItemId = rows[0].item_id;

    const newItem = {
      item_id: newItemId,
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
