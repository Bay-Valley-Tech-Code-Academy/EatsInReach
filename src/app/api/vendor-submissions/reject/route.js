// src/app/api/vendor-submissions/reject/route.js
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

    return new Response(JSON.stringify({ message: "Submission rejected" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error handling reject request:", error);

    // Rollback the transaction in case of error
    await pool.query("ROLLBACK");

    return new Response(
      JSON.stringify({ message: "Failed to reject submission" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
