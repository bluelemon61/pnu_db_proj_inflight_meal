import { NextResponse } from "next/server";
import { Client } from "pg";

export async function POST(request) {
  // flight_number<number>: 항공기 id
  // user_id<number>: 승객의 id
  // sleep_state<string>: NORMAL, DONOTTOUCH, AWAKEME, EATING
  const { flight_number, user_id, sleep_state } = await request.json();

  if (!flight_number || !user_id || !sleep_state) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "Invalid input data" }),
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
      UPDATE passenger_states
      SET sleep_state = $3
      WHERE flight_number = $1 AND user_id = $2
    `;
    const result = await client.query(query, [
      flight_number,
      user_id,
      sleep_state,
    ]);

    await client.end();

    if (result.rowCount === 0) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "No matching record found to update",
        }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({ success: true, message: "State updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating state:", error);
    return new NextResponse(
      JSON.stringify({ success: false, message: "Failed to update state" }),
      { status: 500 }
    );
  }
}
