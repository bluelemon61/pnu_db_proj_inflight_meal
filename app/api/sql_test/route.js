import { NextResponse } from "next/server";

export async function GET(reqeust){

  console.log('hi');
  
  return new NextResponse(null, {
      status: 200,
  });
}