import { NextResponse } from "next/server";

/**
 * 업체 제공 가능 기내식 목록에 기내식을 추가한다.
 * 
 * 권한: 음식 제공 업체(provider)
 * 
 * @param {*} request 
 * @returns 
 */
export async function POST(request){
  // user_id<string>: 음식 제공 업체 유저 id
  // category<string>: 분류
  // name<string>: 음식명
  // count<number>: 재고 개수
  const {user_id, category, name, count} = await request.json();

  const data = null;

  return new NextResponse(data, {
    status: 200,
  });
}

/**
 * 본인의 업체 제공 가능 기내식 목록을 불러온다.
 * 
 * 권한: 음식 제공 업체(provider)
 * 
 * @param {*} request 
 * @returns 
 */
export async function GET(request){
  // user_id<string>: 음식 제공 업체 유저 id
  const {user_id} = await request.json();

  const data = null;

  return new NextResponse(data, {
    status: 200,
  });
}

/**
 * 본인의 업체 제공 가능 기내식 목록에 있는
 * 기내식 재고를 수정한다.
 * 
 * 권한: 음식 제공 업체(provider)
 * 
 * @param {*} request 
 * @returns 
 */
export async function PUT(request){
  // user_id<string>: 음식 제공 업체 유저 id
  // food_id<number>: 음식 id
  // count<number>: 재고 개수
  const {user_id, food_id, count} = await request.json();

  const data = null;

  return new NextResponse(data, {
    status: 200,
  });
}

/**
 * 본인의 업체 제공 가능 기내식 목록에 있는
 * 기내식을 삭제한다.
 * 
 * 권한: 음식 제공 업체(provider)
 * 
 * @param {*} request 
 * @returns 
 */
export async function DELETE(request){
  // user_id<string>: 음식 제공 업체 유저 id
  // food_id<number>: 음식 id
  const {user_id, food_id} = await request.json();

  const data = null;

  return new NextResponse(data, {
    status: 200,
  });
}