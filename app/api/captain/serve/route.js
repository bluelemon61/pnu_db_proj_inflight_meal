import { NextResponse } from "next/server";
import { Client } from "pg";

/**
 * 기내식 제공 가능 여부를 업데이트한다.
 * 
 * 권한: 기장(captain)
 * 
 * @param {*} request 
 * @returns 
 */
export async function POST(request) {
  const { flight_number, serve } = await request.json();

  if (typeof serve !== "boolean" || !flight_number) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "Invalid input" }),
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
      UPDATE flight
      SET serve = $1
      WHERE flight_number = $2
    `;
    await client.query(query, [serve, flight_number]);
    await client.end();

    return new NextResponse(
      JSON.stringify({ success: true, message: "Serve status updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating serve status:", error);
    return new NextResponse(
      JSON.stringify({ success: false, message: "Failed to update serve status" }),
      { status: 500 }
    );
  }
}
