import { Pool } from "pg";
import { NextResponse } from "next/server";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure you have DATABASE_URL in your .env file
});

export async function GET() {
  try {
    const client = await pool.connect();

    const result = await client.query(`
            SELECT
                vs.submission_id,
                vs.name,
                vs.location,
                pr.range AS price_range,            -- Join Price_Ranges table to get the price range name
                ft.type_name AS food_type,          -- Join Food_Types table to get the food type name
                vs.hours_of_operation,
                vs.description,
                vs.phone_number,
                vs.email,
                json_object_agg(pt.type_name, vsi.image_url) AS images
            FROM Vendor_Submissions vs
            JOIN Price_Ranges pr ON vs.price_range_id = pr.price_range_id -- Join to get price range
            JOIN Food_Types ft ON vs.food_type_id = ft.food_type_id       -- Join to get food type
            LEFT JOIN Vendor_Submission_Images vsi ON vs.submission_id = vsi.submission_id
            LEFT JOIN Photo_Types pt ON vsi.photo_type_id = pt.photo_type_id
            GROUP BY vs.submission_id, pr.range, ft.type_name
        `);

    console.log("Query executed successfully");
    client.release();
    return NextResponse.json(result.rows); // Return the fetched data
  } catch (error) {
    console.error("Error fetching vendor submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch vendor submissions" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const {
      name,
      location,
      price_range_id,
      food_type_id,
      hours_of_operation,
      description,
      phone_number,
      email,
      images,
    } = data;

    const client = await pool.connect();

    // Start a transaction
    await client.query("BEGIN");

    // Insert into vendor_submissions
    const submissionResult = await client.query(
      "INSERT INTO vendor_submissions (name, location, price_range_id, food_type_id, hours_of_operation, description, phone_number, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING submission_id",
      [
        name,
        location,
        price_range_id,
        food_type_id,
        hours_of_operation,
        description,
        phone_number,
        email,
      ]
    );

    const submissionId = submissionResult.rows[0].submission_id;

    // Insert images
    if (images) {
      const photoTypes = { display: 4, menu: 1, food: 2 };
      for (const [type, url] of Object.entries(images)) {
        if (url) {
          await client.query(
            "INSERT INTO Vendor_Submission_Images (submission_id, photo_type_id, image_url) VALUES ($1, $2, $3)",
            [submissionId, photoTypes[type], url]
          );
        }
      }
    }

    // Commit the transaction
    await client.query("COMMIT");

    client.release();

    return new NextResponse(
      JSON.stringify({ message: "Submission successful" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting vendor:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
