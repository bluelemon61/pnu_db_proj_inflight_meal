import { NextResponse } from "next/server";

/**
 * 기내식을 제공한다. 승무원 본인이 기내식을 먹는 경우도 이용된다.
 * 
 * 권한: 승무원(crew)
 * 
 * @param {*} request 
 * @returns 
 */
export async function POST(request){
  // flight_number<number>: 항공기 id
  // food_id<number>: 음식 id (flight_food table)
  // user_id<string>: 승객(승무원)의 id
  const {flight_number, food_id, user_id} = await request.json();

  const data = null;

  return new NextResponse(data, {
    status: 200,
  });
}

/**
 * 기내식 목록을 불러온다. (승무원용)
 * 
 * 권한: 승무원(crew)
 * 
 * @param {*} request 
 * @returns 
 */
export async function GET(request){
  const searchParams = request.nextUrl.searchParams;
  
  // flight_number<number>: 항공기 id
  // food_target<string>: 제공할 대상 (승객, 직원, null)
  const flight_number = parseInt(searchParams.get('flight_number'));
  const food_target = searchParams.get('food_target');

  const data = null;

  return new NextResponse(data, {
    status: 200,
  });
}