import { NextResponse } from "next/server";

/**
 * 승객들의 수면 상태를 확인한다.
 * 
 * 권한: 승무원(crew)
 * 
 * @param {*} request 
 * @returns 
 */
export async function GET(request){
  const searchParams = request.nextUrl.searchParams;
  
  // flight_number<number>: 항공기 id
  const flight_number = parseInt(searchParams.get('flight_number'));

  const data = null;

  return new NextResponse(data, {
    status: 200,
  });
}