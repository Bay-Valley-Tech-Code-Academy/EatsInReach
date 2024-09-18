// src/app/api/vendor-submissions/accept/route.js
import { pool } from "@/data/db"; // Adjust import path based on your project structure

export async function POST(request) {
  const { submissionId } = await request.json();

  if (!submissionId) {
    return new Response(
      JSON.stringify({ message: "Submission ID is required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    // Start a transaction
    await pool.query("BEGIN");

    // Fetch the submission data
    const result = await pool.query(
      "SELECT * FROM Vendor_Submissions WHERE submission_id = $1",
      [submissionId]
    );
    const submission = result.rows[0];

    if (!submission) {
      await pool.query("ROLLBACK");
      return new Response(JSON.stringify({ message: "Submission not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Insert into Restaurants and get the new restaurant_id
    const insertRestaurantResult = await pool.query(
      "INSERT INTO Restaurants (name, location, price_range_id, hours_of_operation, description, phone_number, email) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING restaurant_id",
      [
        submission.name,
        submission.location,
        submission.price_range_id,
        submission.hours_of_operation,
        submission.description,
        submission.phone_number,
        submission.email,
      ]
    );

    const restaurantId = insertRestaurantResult.rows[0].restaurant_id;

    // Insert into Restaurant_Food_Types
    await pool.query(
      "INSERT INTO Restaurant_Food_Types (restaurant_id, food_type_id) VALUES ($1, $2)",
      [restaurantId, submission.food_type_id]
    );

    // Fetch images associated with the submission
    const imagesResult = await pool.query(
      "SELECT * FROM Vendor_Submission_Images WHERE submission_id = $1",
      [submissionId]
    );

    const images = imagesResult.rows;

    // Transfer images to Restaurant_Pictures
    for (const image of images) {
      await pool.query(
        "INSERT INTO Restaurant_Pictures (restaurant_id, photo_type_id, image_url) VALUES ($1, $2, $3)",
        [restaurantId, image.photo_type_id, image.image_url]
      );
    }

    // Delete images from Vendor_Submission_Images
    await pool.query(
      "DELETE FROM Vendor_Submission_Images WHERE submission_id = $1",
      [submissionId]
    );

    // Delete from Vendor_Submissions
    await pool.query(
      "DELETE FROM Vendor_Submissions WHERE submission_id = $1",
      [submissionId]
    );

    // Commit the transaction
    await pool.query("COMMIT");

    return new Response(
      JSON.stringify({
        message: "Submission accepted and added to Restaurants",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error handling accept request:", error);

    // Rollback the transaction in case of error
    await pool.query("ROLLBACK");

    return new Response(
      JSON.stringify({ message: "Failed to accept submission" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
