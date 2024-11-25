import { NextResponse } from "next/server";

/**
 * 항공기 기내식 목록에 기내식을 추가한다.
 * 
 * 권한: 음식 제공 업체(provider)
 * 
 * @param {*} request 
 * @returns 
 */
export async function POST(request){
  // user_id<string>: 음식 제공 업체 유저 id
  // flight_number<number>: 항공편 id
  // food_id<number>: 음식 id
  // count<number>: 재고 개수
  const {user_id, flight_number, food_id, count} = await request.json();

  const data = null;

  return new NextResponse(data, {
    status: 200,
  });
}

/**
 * 항공기 기내식 목록을 불러온다.
 * 
 * 권한: 음식 제공 업체(provider)
 * 
 * @param {*} request 
 * @returns 
 */
export async function GET(request){
  // user_id<string>: 음식 제공 업체 유저 id
  // flight_number<number>: 항공편 id
  const {user_id, flight_number} = await request.json();

  const data = null;

  return new NextResponse(data, {
    status: 200,
  });
}

/**
 * 항공기 기내식 목록의 기내식 재고를 수정한다.
 * 
 * 권한: 음식 제공 업체(provider)
 * 
 * @param {*} request 
 * @returns 
 */
export async function PUT(request){
  // user_id<string>: 음식 제공 업체 유저 id
  // flight_number<number>: 항공편 id
  // food_id<number>: 음식 id
  // count<number>: 재고 개수
  const {user_id, flight_number, food_id, count} = await request.json();

  const data = null;

  return new NextResponse(data, {
    status: 200,
  });
}

/**
 * 항공기 기내식 목록의 기내식 재고를 삭제한다.
 * 
 * 권한: 음식 제공 업체(provider)
 * 
 * @param {*} request 
 * @returns 
 */
export async function DELETE(request){
  // user_id<string>: 음식 제공 업체 유저 id
  // flight_number<number>: 항공편 id
  // food_id<number>: 음식 id
  const {user_id, flight_number, food_id} = await request.json();

  const data = null;

  return new NextResponse(data, {
    status: 200,
  });
}