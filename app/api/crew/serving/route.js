import { NextResponse } from "next/server";
import { Client } from "pg";

export async function POST(request) {
  const { food_id, flight_number } = await request.json();

  if (!food_id || !flight_number) {
    return new NextResponse(JSON.stringify({ success: false, message: "Invalid data" }), { status: 400 });
  }

  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  try {
    await client.connect();
    const query = `
      UPDATE flight_food
      SET food_count = food_count - 1
      WHERE food_id = $1 AND flight_number = $2 AND food_count > 0
    `;
    const result = await client.query(query, [food_id, flight_number]);

    if (result.rowCount === 0) {
      return new NextResponse(JSON.stringify({ success: false, message: "No stock left" }), { status: 400 });
    }

    await client.end();
    return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error updating food count:", error);
    return new NextResponse(JSON.stringify({ success: false, message: "Failed to update stock" }), { status: 500 });
  }
}
