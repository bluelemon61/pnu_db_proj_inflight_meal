import { NextResponse } from "next/server";
import { Client } from "pg"; // Client를 pg에서 가져옵니다.

/**
 * 업체 제공 가능 기내식 목록에 기내식을 추가한다.
 * 
 * 권한: 음식 제공 업체(provider)
 * 
 * @param {*} request 
 * @returns 
 */
export async function POST(request){
  const {category, name } = await request.json();


  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  await client.connect();

  const query = `
    INSERT INTO food (category, name ,provider,like_count, hate_count)
    VALUES ($1, $2, 2, 0, 0)
    returning id, category, name 
  `;
  const result = await client.query(query, [category, name]);

  await client.end();

  return new NextResponse(
    JSON.stringify({ success: true, message: "Food added successfully", data: result.rows[0] }),
    { status: 200 }
  );

}


/**
 * 본인의 업체 제공 가능 기내식 목록을 불러온다.
 * 
 * 권한: 음식 제공 업체(provider)
 * 
 * @param {*} request 
 * @returns 
 */
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  // user_id<number>: 음식 제공 업체 유저 id
  const user_id = parseInt(searchParams.get("user_id"));

  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  await client.connect();

  // 제공 가능 기내식 목록 조회
  const query = `
    SELECT id, category, name, like_count, hate_count
    FROM food
    WHERE provider = $1
  `;
  const result = await client.query(query, [user_id]);

  await client.end();

  if (result.rows.length === 0) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "No food items found for this provider",
      }),
      { status: 404 }
    );
  }

  return new NextResponse(
    JSON.stringify({
      success: true,
      data: result.rows,
    }),
    { status: 200 }
  ); 
}

/**
 * 본인의 업체 제공 가능 기내식 목록에 있는
 * 기내식 재고를 수정한다.
 * 
 * 권한: 음식 제공 업체(provider)
 * 
 * @param {*} request 
 * @returns 
 */
export async function PUT(request){
  // user_id<number>: 음식 제공 업체 유저 id
  // food_id<number>: 음식 id
  // count<number>: 재고 개수
  const {user_id, food_id, count} = await request.json();

  const data = null;

  return new NextResponse(data, {
    status: 200,
  });
}

/**
 * 본인의 업체 제공 가능 기내식 목록에 있는
 * 기내식을 삭제한다.
 * 
 * 권한: 음식 제공 업체(provider)
 * 
 * @param {*} request 
 * @returns 
 */
export async function DELETE(request) {
  // user_id<number>: 음식 제공 업체 유저 id
  // food_id<number>: 음식 id
  const {user_id, food_id } = await request.json();

  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  await client.connect();

  // 음식 제공 업체가 자신이 등록한 음식만 삭제 가능하도록 조건 설정
  const query = `
    DELETE FROM food
    WHERE id = $1 AND provider = $2
  `;
  const result = await client.query(query, [food_id, user_id]);

  await client.end();

  if (result.rowCount === 0) {
    // 삭제된 행이 없으면 잘못된 `food_id`나 권한 부족일 가능성
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Food not found or insufficient permissions",
      }),
      { status: 404 }
    );
  }

  return new NextResponse(
    JSON.stringify({ success: true, message: "Food deleted successfully" }),
    { status: 200 }
  ); 
}