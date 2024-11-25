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

  const data = await client.query("SELECT * FROM users;");

  console.log(data.rows);

  return new NextResponse(null, {
      status: 200,
  });
}