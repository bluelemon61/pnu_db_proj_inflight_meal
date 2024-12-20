import { NextResponse } from "next/server";
import { Pool } from "pg";

/**
 * 운항중인 비행기의 운항 상태를 업데이트한다.
 * 
 * 권한: 기장(captain)
 * 
 * @returns 
 */
export async function POST(request) {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  const client = await pool.connect();
  try {
    // * @param {number} flight_number 항공기 id
    // * @param {string} flight_state 항공기 상태 (이륙, 순항, 난기류, ...)
    const { flight_number, flight_state } = await request.json();

    if (!flight_number || !flight_state) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Invalid input data" }),
        { status: 400 }
      );
    }

    await client.query('BEGIN');
    const result = await client.query(
      'UPDATE flight SET flight_state = $1 WHERE flight_number = $2 RETURNING *;',
      [flight_state, flight_number]
    );

    if (flight_state === '착륙') {
      const initQuery1 = `
        UPDATE flight_user
        SET
          sleep_state = 'NORMAL',
          eat_count = 0,
          food_order = NULL,
          is_reviewed = FALSE
        WHERE flight_number = $1
        RETURNING *;
      `
      const initResult1 = await client.query(initQuery1, [flight_number]);
      console.log('승객 데이터 초기화 실행');
    }

    if (flight_state !== '정상운행') {
      const initQuery2 = `
        UPDATE flight
        SET
          serve = FALSE
        WHERE flight_number = $1
        RETURNING *;
      `
      const initResult2 = await client.query(initQuery2, [flight_number]);
      console.log('비행기 기내식 제공 OFF로 초기화');

    }

    client.query('COMMIT');

    return new NextResponse(
      JSON.stringify({ success: true, data: result.rows[0] || null }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating flight state:", error);
    await client.query('ROLLBACK');
    return new NextResponse(
      JSON.stringify({ success: false, message: "Internal server error" }),
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
