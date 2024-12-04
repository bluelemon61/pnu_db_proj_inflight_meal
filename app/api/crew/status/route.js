import { NextResponse } from "next/server";
import { Client } from "pg";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const flightNumber = searchParams.get("flight_number");

  if (!flightNumber) {
    return NextResponse.json(
      { success: false, message: "Invalid flight number" },
      { status: 400 }
    );
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
      SELECT flight_state, serve
      FROM flight
      WHERE flight_number = $1
    `;
    const result = await client.query(query, [flightNumber]);
    await client.end();

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Flight not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      flight_state: result.rows[0].flight_state,
      serve: result.rows[0].serve,
    });
  } catch (error) {
    console.error("Error fetching flight data:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch flight data" },
      { status: 500 }
    );
  }
}
