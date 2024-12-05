import { NextResponse } from "next/server";
import { Client } from "pg";

/**
 * 비행기 상태를 불러온다. (승객용)
 * 
 * 권한: 승객(passenger)
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
        f.flight_state,
        f.serve
      FROM flight f
      WHERE f.flight_number = $1;
    `;
  const result = await client.query(query, [flight_number]);
  await client.end();

  return new NextResponse(JSON.stringify(result.rows), {
    status: 200,
  });
}