import { NextResponse } from "next/server";

/**
 * 수면 상태를 설정한다.
 * 
 * 권한: 승객(passenger)
 * 
 * @param {*} request 
 * @returns 
 */
export async function POST(request){
  // flight_number<number>: 항공기 id
  // user_id<number>: 승객의 id
  // sleep_state<string>: NORMAL, DONOTTOUCH (수면 중, 깨우지 마세요), AWAKEME (수면 중, 깨워주세요)
  const {flight_number, user_id, sleep_state} = await request.json();

  const data = null;

  return new NextResponse(data, {
    status: 200,
  });
}

/**
 * 본인의 수면 상태를 불러온다. (승객용)
 * 
 * 권한: 승객(passenger)
 * 
 * @param {*} request 
 * @returns 
 */
export async function GET(request){
  const searchParams = request.nextUrl.searchParams;
  
  // flight_number<number>: 항공기 id
  // user_id<number>: 승객의 id
  const flight_number = parseInt(searchParams.get('flight_number'));
  const user_id = parseInt(searchParams.get('user_id'));

  const data = null;

  return new NextResponse(data, {
    status: 200,
  });
}