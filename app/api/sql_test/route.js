import { NextResponse } from "next/server";
import { Client } from "pg";

export async function GET(reqeust){
  const DB_HOST = process.env.DB_HOST;
  const DB_PORT = process.env.DB_PORT;
  const DB_USER = process.env.DB_USER;
  const DB_PASSWORD = process.env.DB_PASSWORD;
  const DB_NAME = process.env.DB_NAME;
  
  const client = new Client({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    DB_PORT: DB_PORT,
  });

  client.connect();

  const data = await client.query(
    `
      SELECT
        fu.user_id,
        fu.food_order,
        ff.food_id,
        f.name AS food_name,
        f.category AS food_category,
        fu.eat_count
      FROM flight_user fu
      LEFT JOIN flight_food ff ON fu.food_order = ff.id
      LEFT JOIN food f ON ff.food_id = f.id
      WHERE fu.flight_number = 100 AND fu.user_id = 5;
    `
    )

  console.log(data.rows);

  return new NextResponse(null, {
      status: 200,
  });
}