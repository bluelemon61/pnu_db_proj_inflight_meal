import { NextResponse } from "next/server";

/**
 * 식사한 음식에 대한 리뷰를 작성한다.
 * 
 * 권한: 승객(passenger)
 * 
 * @param {*} request 
 * @returns 
 */
export async function POST(request){
  // flight_number<number>: 항공기 id
  // user_id<number>: 승객의 id
  // food_order<number>: 주문한 음식 id(flight_food)
  // is_like<boolean>: 좋아요 여부, True or False
  const {flight_number, food_id, food_order, is_like} = await request.json();

  const data = null;

  return new NextResponse(data, {
    status: 200,
  });
}

/**
 * 기내식의 리뷰를 불러온다. (승객용)
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
  // food_id<number>: 음식 id(food)
  const flight_number = parseInt(searchParams.get('flight_number'));
  const user_id = parseInt(searchParams.get('user_id'));
  const food_id = parseInt(searchParams.get('food_id'));


  const data = null;

  return new NextResponse(data, {
    status: 200,
  });
}