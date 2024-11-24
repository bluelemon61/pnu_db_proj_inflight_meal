import { NextResponse } from "next/server";

/**
 * 운항중인 비행기의 운항 상태를 업데이트한다.
 * 
 * 권한: 기장(captain)
 * 
 * @param {*} request 
 * @returns 
 */
export async function POST(request){
  // flight_number<number>: 항공기 id
  // flight_state<string>: 적용할 항공기 상태
  const {flight_number, flight_state} = await request.json();

  const data = null;

  return new NextResponse(data, {
    status: 200,
  });
}