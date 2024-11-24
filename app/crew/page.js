"use client"

import { Fragment, useState } from "react";

export default function Crew() {
  const [rows, setRows] = useState(6);
  const [cols, setCols] = useState(4);

  return (
    <div className="flex flex-col gap-8 w-crew">
      <div className="flex flex-col gap-4">
        <h1 className="font-black text-2xl">대시보드</h1>
        <div className="relative flex flex-col items-center">
          <div className="absolute left-0">
            <p>비행기 상태 - 이륙 중</p>
            <p>기내식 - 제공 불가</p>
          </div>
          <div className="px-8 py-24 bg-gray-200"/>
          <div className="flex gap-12 bg-gray-200 px-36 py-16 rounded-airplain">
            {
              (Array.from({length: rows})).map((itemr, r) => {
                return (
                  <Fragment key={r}>
                    {
                      r == rows / 2
                      ? <div className="px-8"/>
                      : <div key={r} className="flex flex-col gap-4">
                          {
                            (Array.from({length: cols})).map((itemc, c) => {
                              return (
                                <Fragment key={`col${c}`}>
                                  {
                                    c == cols / 2
                                    ? <div className="py-4"/>
                                    : undefined
                                  }
                                  <button className="p-6 bg-green-500"/>
                                </Fragment>
                              );
                            })
                          }
                        </div>
                    }
                  </Fragment>
                )
              })
            }
            
            <div className="flex flex-col gap-4">
              <button className="p-6 bg-green-500"/>
              <button className="p-6 bg-blue-500"/>
              <div className="py-4"/>
              <button className="p-6 bg-red-500"/>
              <button className="p-6 bg-pink-500"/>
            </div>
          </div>
          <div className="px-8 py-24 bg-gray-200"/>
          <div className="absolute w-full flex left-0 bottom-0 gap-4">
            <button className="w-1/6 py-8 bg-sky-400 text-white">
              기내식 제공하기
            </button>
            <button className="px-2 py-8 bg-white border-1 border-black">
              &lt;
            </button>
            <div className="w-full flex gap-2">
              <button className="px-6 bg-white border-1 border-black">
                <p>함박스테이크 - 2명</p>
                <p>재고 3개</p>
              </button>
              <button className="px-6 bg-white border-1 border-black">
                <p>비빔밥 - 1명</p>
                <p>재고 5개</p>
              </button>
              <button className="px-6 bg-white border-1 border-black">
                <p>샌드위치 - 6명</p>
                <p>재고 2개</p>
              </button>
            </div>
            <button className="px-2 bg-white border-1 border-black">
              &gt;
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="font-black text-2xl">기내식</h1>
        <div className="flex flex-col bg-gray-300 p-8">
          <h2 className="font-bold text-lg">승무원 기내식 선택</h2>
          <div className="flex flex-col">
            <div className="flex gap-4 justify-between py-2 border-b-2 border-black">
              <div className="w-1/5 text-center">음식 명</div>
              <div className="w-1/5 text-center">분류</div>
              <div className="w-1/6 text-center">재고</div>
              <div className="w-1/5 text-center">👍</div>
              <div className="w-1/5 text-center">👎</div>
              <div className="w-1/5 text-center">제공 대상</div>
            </div>
            <div className="flex gap-4 justify-between py-2 border-b-1 border-black">
              <div className="w-1/5 text-center">닭다리살 포케</div>
              <div className="w-1/5 text-center">포케</div>
              <div className="w-1/6 text-center">10</div>
              <div className="w-1/5 text-center">5</div>
              <div className="w-1/5 text-center">3</div>
              <div className="w-1/5 text-center">직원</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-gray-300 p-8">
          <h2 className="font-bold text-lg">재고 확인</h2>
          <div className="flex flex-col">
            <div className="flex gap-4 justify-between py-2 border-b-2 border-black">
              <div className="w-1/5 text-center">음식 명</div>
              <div className="w-1/5 text-center">분류</div>
              <div className="w-1/6 text-center">재고</div>
              <div className="w-1/5 text-center">👍</div>
              <div className="w-1/5 text-center">👎</div>
              <div className="w-1/5 text-center">제공 대상</div>
            </div>
            <div className="flex gap-4 justify-between py-2 border-b-1 border-black">
              <div className="w-1/5 text-center">닭다리살 포케</div>
              <div className="w-1/5 text-center">포케</div>
              <div className="w-1/6 text-center">10</div>
              <div className="w-1/5 text-center">5</div>
              <div className="w-1/5 text-center">3</div>
              <div className="w-1/5 text-center">직원</div>
            </div>
            <div className="flex gap-4 justify-between py-2 border-b-1 border-black">
              <div className="w-1/5 text-center">함박스테이크</div>
              <div className="w-1/5 text-center">양식</div>
              <div className="w-1/6 text-center">3</div>
              <div className="w-1/5 text-center">5</div>
              <div className="w-1/5 text-center">3</div>
              <div className="w-1/5 text-center">승객</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}