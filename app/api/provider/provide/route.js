import { NextResponse } from "next/server";
import { Client } from "pg";

/**
 * 항공기 기내식 목록에 기내식을 추가한다.
 * 
 * 권한: 음식 제공 업체(provider)
 * 
 * @param {*} request 
 * @returns 
 */
export async function POST(request) {
  // 요청 데이터에서 user_id, flight_number, food_id, count 추출
  const { user_id, flight_number, id, food_count } = await request.json();

  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });


  await client.connect();

  // flight_food에 데이터를 삽입하는 쿼리
  const query = `
    INSERT INTO flight_food (flight_number, food_id, food_count, food_target)
    SELECT $1, id, $3, '기장'
    FROM food
    WHERE food.id = $2
    RETURNING food_id, food_count, food_target;
  `;
  const result = await client.query(query, [flight_number, id, food_count]);

  await client.end();

  // 삽입 성공 시 응답
  if (result.rowCount > 0) {
    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Food added to flight_food successfully",
        data: result.rows[0],
      }),
      { status: 200 }
    );
  } else {
    // 삽입 실패 시 응답
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Failed to add food to flight_food. Check permissions or food_id.",
      }),
      { status: 400 }
    );
  } 
}

/**
 * 항공기 기내식 목록을 불러온다.
 * 
 * 권한: 음식 제공 업체(provider)
 * 
 * @param {*} request 
 * @returns 
 */
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  // user_id<number>: 음식 제공 업체 유저 id
  // flight_number<number>: 항공편 id
  const user_id = parseInt(searchParams.get("user_id"));
  const flight_number = parseInt(searchParams.get("flight_number"));


  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  await client.connect();

  // flight_food 목록 조회
  const query = `
    SELECT 
      ff.id,
      ff.flight_number,
      ff.food_count,
      ff.food_target,
      ff.food_id,
      f.category,
      f.name,
      f.provider
    FROM flight_food ff
    JOIN food f ON ff.food_id = f.id
    WHERE ff.flight_number = $1 AND f.provider = $2;
  `;
  const result = await client.query(query, [flight_number, user_id]);

  await client.end();

  return new NextResponse(
    JSON.stringify({
      success: true,
      data: result.rows,
    }),
    { status: 200 }
  );
} 

/**
 * 항공기 기내식 목록의 기내식 재고를 수정한다.
 * 
 * 권한: 음식 제공 업체(provider)
 * 
 * @param {*} request 
 * @returns 
 */
export async function PUT(request) {
  // user_id<number>: 음식 제공 업체 유저 id
  // flight_number<number>: 항공편 id
  // food_id<number>: 음식 id
  // count<number>: 재고 개수
  const { user_id, flight_number, food_id, count } = await request.json();

  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  
  await client.connect();

  // 기내식 재고 수정 쿼리
  const query = `
    UPDATE flight_food
    SET food_count = $1 
    WHERE flight_number = $2 AND food_id = $3 AND EXISTS (
      SELECT 1
      FROM food
    WHERE id = $3 AND provider = $4
    )
    RETURNING id, flight_number, food_id, food_count;
  `;

  const result = await client.query(query, [count, flight_number, food_id, user_id]);

  await client.end();

  return new NextResponse(
    JSON.stringify({
      success: true,
      message: "Food count updated successfully",
      data: result.rows[0],
    }),
    { status: 200 }
  );
} 


/**
 * 항공기 기내식 항목 삭제
 *
 * 권한: 음식 제공 업체(provider)
 *
 * @param {*} request
 * @returns
 */
export async function DELETE(request) {
  // Request body에서 필요한 데이터 추출
  const { user_id, flight_number, food_id } = await request.json();

  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  await client.connect();

  // 삭제 쿼리 실행
  const query = `
    DELETE FROM flight_food
    WHERE flight_number = $1 AND food_id = $2 AND EXISTS (
      SELECT 1
      FROM food
      WHERE id = $2 AND provider = $3
    )
    RETURNING id, flight_number, food_id;
  `;
  const result = await client.query(query, [flight_number, food_id, user_id]);

  await client.end();

  // 성공 응답 반환
  return new NextResponse(
    JSON.stringify({
      success: true,
      message: "Food item deleted successfully",
      data: result.rows[0],
    }),
    { status: 200 }
  );
}
