import { NextResponse } from "next/server";

/**
 * 해당 메뉴의 제공 대상(승객용, 직원용)을 변경한다.
 * 
 * 권한: 기장(captain)
 * 
 * @param {*} request 
 * @returns 
 */
export async function POST(request){
  // flight_number<number>: 항공기 id
  // food_id<number>: 음식 id (flight_food table)
  // food_target<string>: 제공할 대상 (승객, 직원) 
  const {flight_number, food_id, food_target} = await request.json();

  const data = null;

  return new NextResponse(data, {
    status: 200,
  });
}

/**
 * 기내식 목록을 불러온다. (기장용)
 * 
 * 권한: 기장(captain)
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