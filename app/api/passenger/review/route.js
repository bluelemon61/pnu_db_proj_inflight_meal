import { NextResponse } from "next/server";
import { Client, Pool } from "pg";

/**
 * 식사한 음식에 대한 리뷰를 작성한다.
 * 
 * 권한: 승객(passenger)
 * 
 * @param {*} request 
 * @returns 
 */
export async function POST(request) {
  // 요청 데이터 추출
  const { flight_number, seat_number, food_order, is_like } = await request.json();

  // 필수 데이터 검증
  if (!flight_number || !seat_number || !food_order || is_like === undefined) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "Invalid input data" }),
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
    // 트랜잭션 시작
    await client.query('BEGIN');

    // `flight_user`의 `is_reviewed` 상태 확인
    const checkQuery = `
      SELECT *
      FROM flight_user
      WHERE flight_number = $1
        AND seat_number = $2
        AND food_order = $3
        AND is_reviewed = FALSE;
    `;
    const checkResult = await client.query(checkQuery, [flight_number, seat_number, food_order]);

    if (checkResult.rows.length === 0) {
      // 조건 만족하지 않을 경우 롤백
      await client.query('ROLLBACK');
      client.release();
      return new NextResponse(
        JSON.stringify({ success: false, message: "Review already submitted or invalid data." }),
        { status: 400 }
      );
    }

    // 좋아요/싫어요 카운트 업데이트
    const column = is_like ? "like_count" : "hate_count";
    const updateQuery = `
      UPDATE food
      SET ${column} = ${column} + 1
      WHERE id = (
        SELECT food_id
        FROM flight_food
        WHERE id = $1
      );
`;
await client.query(updateQuery, [food_order]);


    // `is_reviewed`를 TRUE로 업데이트
    const reviewUpdateQuery = `
      UPDATE flight_user
      SET is_reviewed = TRUE
      WHERE flight_number = $1
        AND seat_number = $2
        AND food_order = $3;
    `;
    await client.query(reviewUpdateQuery, [flight_number, seat_number, food_order]);

    // 트랜잭션 커밋
    await client.query('COMMIT');
    client.release();

    // 성공 응답
    return new NextResponse(
      JSON.stringify({ success: true, message: "Review submitted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    // 에러 발생 시 롤백
    await client.query('ROLLBACK');
    client.release();
    console.error("Error processing review:", error);

    return new NextResponse(
      JSON.stringify({ success: false, message: "Failed to submit review" }),
      { status: 500 }
    );
  }
}

/**
 * 기내식의 리뷰를 불러온다. (승객용)
 * 
 * 권한: 승객(passenger)
 * 
 * @param {*} request 
 * @returns 
 */
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  // flight_number<number>: 항공기 id
  // user_id<number>: 승객의 id
  // food_id<number>: 음식 id(food)
  const flight_number = parseInt(searchParams.get("flight_number"));
  const user_id = parseInt(searchParams.get("user_id"));
  const food_id = parseInt(searchParams.get("food_id"));

  if (!flight_number || !user_id || !food_id) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "Invalid query parameters" }),
      { status: 400 }
    );
  }

  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  try {
    await client.connect();

    // 특정 음식에 대한 리뷰 정보를 조회
    const query = `
      SELECT
        f.name AS food_name,
        f.category AS food_category,
        f.like_count,
        f.hate_count
      FROM food f
      WHERE f.id = $1
    `;
    const result = await client.query(query, [food_id]);

    await client.end();


    return new NextResponse(
      JSON.stringify({
        success: true,
        data: result.rows[0],
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching review data:", error);
    return new NextResponse(
      JSON.stringify({ success: false, message: "Failed to fetch review data" }),
      { status: 500 }
    );
  }
}
