import { NextResponse } from "next/server";
import { Client } from "pg";

/**
 * 식사한 음식에 대한 리뷰를 작성한다.
 * 
 * 권한: 승객(passenger)
 * 
 * @param {*} request 
 * @returns 
 */
export async function POST(request) {
  // flight_number<number>: 항공기 id
  // user_id<number>: 승객의 id
  // food_order<number>: 주문한 음식 id(flight_food)
  // is_like<boolean>: 좋아요 여부, True or False
  const { flight_number, user_id, food_order, is_like } = await request.json();

  if (!flight_number || !user_id || !food_order || is_like === undefined) {
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

    // 좋아요/싫어요 카운트를 업데이트
    const column = is_like ? "like_count" : "hate_count";
    const query = `
      UPDATE food
      SET ${column} = ${column} + 1
      WHERE id = $1
    `;
    const result = await client.query(query, [food_order]);

    await client.end();

    return new NextResponse(
      JSON.stringify({ success: true, message: "Review updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating review:", error);
    return new NextResponse(
      JSON.stringify({ success: false, message: "Failed to update review" }),
      { status: 500 }
    );
  }
}

/**
 * 기내식의 리뷰를 불러온다. (승객용)
 * 
 * 권한: 승객(passenger)
 * 
 * @param {*} request 
 * @returns 
 */
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  // flight_number<number>: 항공기 id
  // user_id<number>: 승객의 id
  // food_id<number>: 음식 id(food)
  const flight_number = parseInt(searchParams.get("flight_number"));
  const user_id = parseInt(searchParams.get("user_id"));
  const food_id = parseInt(searchParams.get("food_id"));

  if (!flight_number || !user_id || !food_id) {
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

    // 특정 음식에 대한 리뷰 정보를 조회
    const query = `
      SELECT
        f.name AS food_name,
        f.category AS food_category,
        f.like_count,
        f.hate_count
      FROM food f
      WHERE f.id = $1
    `;
    const result = await client.query(query, [food_id]);

    await client.end();


    return new NextResponse(
      JSON.stringify({
        success: true,
        data: result.rows[0],
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching review data:", error);
    return new NextResponse(
      JSON.stringify({ success: false, message: "Failed to fetch review data" }),
      { status: 500 }
    );
  }
}
