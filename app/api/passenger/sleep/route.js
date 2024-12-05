import { NextResponse } from "next/server";
import { Client } from "pg";

/**
 * 수면 상태를 설정한다.
 * 
 * 권한: 승객(passenger)
 * 
 * @param {*} request 
 * @returns 
 */
export async function POST(request){
  // flight_number<number>: 항공기 id
  // seat_number<number>: 승객의 좌석번호
  // sleep_state<string>: NORMAL, DONOTTOUCH (수면 중, 깨우지 마세요), AWAKEME (수면 중, 깨워주세요)
  const {flight_number, seat_number, sleep_state} = await request.json();

  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  await client.connect();
    const query = `
      UPDATE 
        flight_user
      SET
        sleep_state = $3
      WHERE
        flight_number = $1 AND seat_number = $2;
    `;
  const result = await client.query(query, [flight_number, seat_number, sleep_state]);
  await client.end();

  return new NextResponse(null, {
    status: 200,
  });
}

/**
 * 본인의 수면 상태를 불러온다. (승객용)
 * 
 * 권한: 승객(passenger)
 * 
 * @param {*} request 
 * @returns 
 */
export async function GET(request){
  const searchParams = request.nextUrl.searchParams;
  
  // flight_number<number>: 항공기 id
  // seat_number<number>: 승객의 좌석번호
  const flight_number = parseInt(searchParams.get('flight_number'));
  const seat_number = parseInt(searchParams.get('seat_number'));

  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  await client.connect();
    const query = `
      SELECT 
        fu.user_id,
        fu.sleep_state
      FROM flight_user fu
      WHERE fu.flight_number = $1 AND fu.seat_number = $2;
    `;
  const result = await client.query(query, [flight_number, seat_number]);
  await client.end();

  return new NextResponse(JSON.stringify(result.rows), {
    status: 200,
  });
}