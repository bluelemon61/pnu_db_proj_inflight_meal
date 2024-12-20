import { NextResponse } from "next/server";
import { Client } from "pg";

/**
 * 기내식 목록을 불러온다. (승객용)
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
        ff.id,
        ff.food_id,
        f.category,
        f.name,
        f.like_count,
        f.hate_count
      FROM flight_food ff JOIN food f ON ff.food_id = f.id
      WHERE ff.food_target = '승객' AND ff.flight_number = $1;
    `;
  const result = await client.query(query, [flight_number]);
  await client.end();

  return new NextResponse(JSON.stringify(result.rows), {
    status: 200,
  });
}