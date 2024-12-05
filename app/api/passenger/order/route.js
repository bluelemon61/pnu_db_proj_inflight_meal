import { NextResponse } from "next/server";
import { Client } from "pg";

/**
 * 기내식을 주문한다.
 * 
 * 권한: 승객(passenger)
 * 
 * @param {*} request 
 * @returns 
 */
export async function POST(request) {
  // flight_number<number>: 항공기 id
  // food_id<number>: 음식 id (flight_food table)
  // user_id<number>: 승객의 id (flight_user table)
  const { flight_number, food_id, user_id } = await request.json();

  if (!flight_number || !food_id || !user_id) {
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

    // 승객이 시킨 음식 그에 해당하는 user의 food_order를 set함 flight_food의 id를 $1으로 선정
    const query = `
      UPDATE flight_user
      SET food_order = $1 ,eat_count = eat_count +1
      WHERE flight_number = $2 AND user_id = $3;
    `;
    const result = await client.query(query, [food_id, flight_number, user_id]);

    await client.end();

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Food order updated successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating food order:", error);
    return new NextResponse(
      JSON.stringify({ success: false, message: "Failed to update food order" }),
      { status: 500 }
    );
  }
}