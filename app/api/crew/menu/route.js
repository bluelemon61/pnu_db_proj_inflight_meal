import { NextResponse } from "next/server";
import { Client } from "pg";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const flight_number = parseInt(searchParams.get("flight_number"));
  const food_target = searchParams.get("food_target"); // food_target 쿼리 매개변수 추가

  if (!flight_number || !food_target) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "Invalid query parameters" }),
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
      SELECT 
        ff.food_id,
        f.name AS food_name,
        f.category,
        ff.food_count,
        f.like_count,
        f.hate_count,
        ff.food_target
      FROM flight_food ff
      JOIN food f ON ff.food_id = f.id
      WHERE ff.flight_number = $1 AND ff.food_target = $2
    `;
    const result = await client.query(query, [flight_number, food_target]);
    await client.end();

    return new NextResponse(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    console.error("Error fetching crew food:", error);
    return new NextResponse(
      JSON.stringify({ success: false, message: "Failed to fetch crew food" }),
      { status: 500 }
    );
  }
}
