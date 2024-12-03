import { NextResponse } from "next/server";
import { Client } from "pg";

export async function POST(request) {
  const DB_HOST = process.env.DB_HOST;
  const DB_PORT = process.env.DB_PORT;
  const DB_USER = process.env.DB_USER;
  const DB_PASSWORD = process.env.DB_PASSWORD;
  const DB_NAME = process.env.DB_NAME;

  const client = new Client({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
  });

  try {
    await client.connect();

    const { flight_number, flight_state } = await request.json();

    if (!flight_number || !flight_state) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Invalid input data" }),
        { status: 400 }
      );
    }

    const result = await client.query(
      'UPDATE flight SET flight_state = $1 WHERE flight_number = $2 RETURNING *',
      [flight_state, flight_number]
    );

    if (result.rows.length > 0) {
      return new NextResponse(
        JSON.stringify({ success: true, data: result.rows[0] }),
        { status: 200 }
      );
    } else {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Flight not found" }),
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error updating flight state:", error);
    return new NextResponse(
      JSON.stringify({ success: false, message: "Internal server error" }),
      { status: 500 }
    );
  } finally {
    await client.end();
  }
}
