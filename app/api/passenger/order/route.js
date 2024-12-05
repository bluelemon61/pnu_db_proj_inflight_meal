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
  // seat_number<number>: 승객의 id (flight_user table)
  const { flight_number, food_id, seat_number } = await request.json();

  if (!flight_number || !food_id || !seat_number) {
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

    // 승객의 food_order 업데이트 및 eat_count 증가
    const query = `
      UPDATE flight_user
      SET food_order = $1
      WHERE flight_number = $2 AND seat_number = $3;
    `;
    const result = await client.query(query, [food_id, flight_number, seat_number]);

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

/**
 * 주문한 기내식 정보를 불러온다. (승객용)
 * 
 * 권한: 승객(passenger)
 * 
 * @param {*} request 
 * @returns 
 */
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  // flight_number<number>: 항공기 id
  // seat_number<number>: 승객의 id
  const flight_number = parseInt(searchParams.get("flight_number"));
  const seat_number = parseInt(searchParams.get("seat_number"));

  if (!flight_number || !seat_number) {
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

    // 주문한 기내식 정보 조회
    const query = `
      SELECT
        ff.id,
        fu.user_id,
        fu.food_order,
        ff.food_id,
        f.name,
        f.category,
        fu.eat_count
      FROM flight_user fu
      LEFT JOIN flight_food ff ON fu.food_order = ff.id
      LEFT JOIN food f ON ff.food_id = f.id
      WHERE fu.flight_number = $1 AND fu.seat_number = $2;
    `;
    const result = await client.query(query, [flight_number, seat_number]);

    await client.end();

    if (result.rows.length === 0) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "No food order found for this user.",
        }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        success: true,
        data: result.rows[0],
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching food order:", error);
    return new NextResponse(
      JSON.stringify({ success: false, message: "Failed to fetch food order" }),
      { status: 500 }
    );
  }
}
