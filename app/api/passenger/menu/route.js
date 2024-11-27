import { NextResponse } from "next/server";

/**
 * 기내식 목록을 불러온다. (승객용)
 * 
 * 권한: 승객(passenger)
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