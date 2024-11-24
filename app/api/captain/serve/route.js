import { NextResponse } from "next/server";

/**
 * 기내식 제공 가능 여부를 업데이트한다.
 * 
 * 권한: 기장(captain)
 * 
 * @param {*} request 
 * @returns 
 */
export async function POST(request){
  // flight_number<number>: 항공기 id
  // serve<boolean>: 기내식 제공 가능 true or false
  const {flight_number, serve} = await request.json();

  const data = null;

  return new NextResponse(data, {
    status: 200,
  });
}