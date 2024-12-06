"use client"

import Link from "next/link";

export default function Home() {

  async function sqltest() {
    const res = await fetch('/api/sql_test');
    const data = await res.json();
    console.log(data);
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="p-8 text-center border-2">접속할 역할을 선택해주세요.</div>
      <div className="flex justify-stretch gap-12">
        <Link href={'/captain'} className="flex w-full justify-center py-24 bg-gray-300">
          기장
        </Link>
        <Link href={'/crew'} className="flex w-full justify-center py-24 bg-gray-300">
          승무원
        </Link>
        <Link href={'/passenger'} className="flex w-full justify-center py-24 bg-gray-300">
          승객
        </Link>
        <Link href={'/provider'} className="flex w-full justify-center py-24 bg-gray-300">
          음식 공급 업체
        </Link>
      </div>
    </div>
  )
}
