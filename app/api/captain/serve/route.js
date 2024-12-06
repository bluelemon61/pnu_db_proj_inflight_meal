import { NextResponse } from "next/server";
import { Pool } from "pg";

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
      WHERE flight_number = $1 AND flight_state = '정상운행';
    `
    const checkResult = await client.query(checkquery, [flight_number]);
    if (checkResult.rows.length == 0) {
      await client.query('ROLLBACK');
      return new NextResponse(
        JSON.stringify({ success: false, message: "비행기가 정상 운행 상태가 아님" }),
        { status: 400 }
      );
    }

    const query = `
      UPDATE flight
      SET serve = $1
      WHERE flight_number = $2
    `;
    await client.query(query, [serve, flight_number]);

    await client.query('COMMIT');

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
  } finally {
    client.release();
  }
}
