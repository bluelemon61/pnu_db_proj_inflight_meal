import { NextResponse } from "next/server";
import { Client } from "pg";

/**
 * 승객들의 식사 상태를 확인한다.
 * 
 * 권한: 승무원(crew)
 * 
 * @param {*} request 
 * @returns 
 */
export async function GET(request){
  const searchParams = request.nextUrl.searchParams;
  
  // flight_number<number>: 항공기 id
  const flight_number = parseInt(searchParams.get('flight_number'));

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
        fu.id,
        fu.user_id,
        fu.eat_count,
        fu.seat_number,
        fu.food_order
      FROM flight_user fu
      WHERE fu.seat_number > 0 AND fu.flight_number = $1
    `;
  const result = await client.query(query, [flight_number]);
  await client.end();

  return new NextResponse(JSON.stringify(result.rows), {
    status: 200,
  });
}