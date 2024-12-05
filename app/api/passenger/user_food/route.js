import { NextResponse } from "next/server";
import { Client } from "pg";

/**
 * user가 자신이 먹은 음식의 이름을 표시. 
 * 
 * 권한: 승객(passenger)
 * 
 * @param {*} request 
 * @returns 
 */
export async function POST(request) {
  const { user_id, flight_number } = await request.json();

  if (!user_id || !flight_number) {
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
      SELECT f.name AS food_name
      FROM flight_user fu
      JOIN flight_food ff ON fu.food_order = ff.food_id
      JOIN food f ON ff.food_id = f.id
      WHERE fu.user_id = $1 AND fu.flight_number = $2
    `;
    const result = await client.query(query, [user_id, flight_number]);

    await client.end();

    return new NextResponse(
      JSON.stringify({ success: true, food_name: result.rows[0].food_name }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user food:", error);
    return new NextResponse(
      JSON.stringify({ success: false, message: "Failed to fetch food" }),
      { status: 500 }
    );
  }
}
