import { NextResponse } from "next/server";
import { Client, Pool } from "pg";

/**
 * 기내식 목록을 불러온다. (승무원용)
 * 
 * 권한: 승무원(crew)
 * 
 * @param {*} request 
 * @returns 
 */
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
        ff.id,
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

/**
 * 기내식을 제공한다. 승무원 본인이 기내식을 먹는 경우도 이용된다.
 * 
 * 권한: 승무원(crew)
 * 
 * @param {*} request 
 * @returns 
 */
export async function POST(request){
  // flight_number<number>: 항공기 id
  // food_id<number>: 음식 id (flight_food table)
  // user_id<string>: 승객(승무원)의 id
  const {flight_number, food_id, user_id} = await request.json();

  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  const client = await pool.connect();

  await client.query('BEGIN');
  const query1 = `
    UPDATE flight_food
    SET food_count = food_count - 1
    WHERE food_id = $1 AND flight_number = $2 AND food_count > 0
  `;
  const result1 = await client.query(query1, [food_id, flight_number]);

  if (result1.rowCount === 0) {
    await client.query('ROLLBACK');
    await client.end();
    return new NextResponse(JSON.stringify({ success: false, message: "flight_food 오류" }), { status: 400 });
  }

  const query2 = `
    UPDATE flight_user
    SET eat_count = eat_count + 1
    WHERE user_id = $1 AND flight_number = $2 AND eat_count = 0;
  `;
  const result2 = await client.query(query2, [user_id, flight_number]);

  if (result2.rowCount === 0) {
    await client.query('ROLLBACK');
    await client.end();
    return new NextResponse(JSON.stringify({ success: false, message: "flight_user 오류" }), { status: 400 });
  }

  client.query('COMMIT');

  client.release();
  
  return new NextResponse(null, { status: 200 });
}