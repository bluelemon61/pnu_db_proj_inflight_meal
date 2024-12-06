import { NextResponse } from "next/server";
import { Client, Pool } from "pg";

/**
 * 기내식 목록을 불러온다.
 * 
 * 권한: 기장(captain)
 * 
 * @param {*} request 
 * @returns 
 */
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

/**
 * 기내식 제공 대상을 변경한다.
 * 
 * 권한: 기장(captain)
 * 
 * @param {*} request 
 * @returns 
 */
export async function PUT(request) {
  const { flight_number, food_id, food_target } = await request.json();

  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const checkquery = `
      SELECT *
      FROM flight
      WHERE flight_number = $1 AND flight_state = '착륙';
    `
    const checkResult = await client.query(checkquery, [flight_number]);
    if (checkResult.rows.length == 0) {
      await client.query('ROLLBACK');
      return new NextResponse(
        JSON.stringify({ success: false, message: "비행기가 착륙 상태가 아님" }),
        { status: 400 }
      );
    }

    const query = `
      UPDATE
        flight_food
      SET
        food_target = $3
      WHERE flight_number = $1 AND food_id = $2
    `;
    const result = await client.query(query, [flight_number, food_id, food_target]);
  
    await client.query('COMMIT');

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Error fetching menu:", error);
    return new NextResponse(
      JSON.stringify({ success: false, message: "Failed to fetch menu" }),
      { status: 500 }
    );
  } finally {
    client.release();
  }
}