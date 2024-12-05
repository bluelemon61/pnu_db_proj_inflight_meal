import { NextResponse } from "next/server";
import { Client } from "pg";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const flight_number = parseInt(searchParams.get("flight_number"));
  const food_target = searchParams.get("food_target");

  if (!flight_number) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "Invalid flight number" }),
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
    
    let result = {};

    if (food_target !== 'null') {
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
      result = await client.query(query, [flight_number, food_target]);
    } else {
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
        WHERE ff.flight_number = $1
      `;
      result = await client.query(query, [flight_number]);
    }
    await client.end();

    return new NextResponse(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    console.error("Error fetching menu:", error);
    return new NextResponse(
      JSON.stringify({ success: false, message: "Failed to fetch menu" }),
      { status: 500 }
    );
  }
}
