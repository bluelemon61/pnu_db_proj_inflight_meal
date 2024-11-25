import { NextResponse } from "next/server";

/**
 * 기내식을 주문한다.
 * 
 * 권한: 승객(passenger)
 * 
 * @param {*} request 
 * @returns 
 */
export async function POST(request){
  // flight_number<number>: 항공기 id
  // food_id<id>: 음식 id (food table)
  // user_id<string>: 승객의 id
  const {flight_number, food_id, user_id} = await request.json();

  const data = null;

  return new NextResponse(data, {
    status: 200,
  });
}

/**
 * 주문한 기내식 정보를 불러온다. (승객용)
 * 
 * 권한: 승객(passenger)
 * 
 * @param {*} request 
 * @returns 
 */
export async function GET(request){
  // flight_number<number>: 항공기 id
  // user_id<number>: 승객의 id
  const {flight_number} = await request.json();

  const data = null;

  return new NextResponse(data, {
    status: 200,
  });
}