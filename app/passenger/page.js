"use client"

import { Fragment, useState } from "react"

export default function Passenger() {
  const [samples, setSamples] = useState([
    '함박스테이크',
    '닭가슴살 샐러드',
    '연어 포케',
    '김치 볶음밥',
    '제육 볶음',
    '영양 불고기',
  ]);
  
  const [categories, setCategories] = useState([
    '양식', '샌드위치', '덮밥', '포케',
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="font-black text-2xl">기내식</h1>
        <div className="flex flex-col bg-gray-300 p-8 gap-8">
          <h2 className="font-bold text-lg">주문</h2>
          <div className="flex flex-col gap-2 h-[520px] overflow-y-scroll">
            {
              categories.map((category, idx) => {
                return (
                  <Fragment key={`${category}-${idx}`}>           
                    <h2 className="font-bold">{category}</h2>
                    <div className="grid grid-cols-4 gap-4">
                      {
                        samples.map((food, i) => {
                          return (
                            <button key={`${food}-${i}`} className="py-4 bg-white border-1 border-black">
                              <p>{food}</p>
                              <p>👍+5 👎-2</p>
                            </button>
                          )
                        })
                      }
                    </div>
                  </Fragment>
                )
              }) 
            }
          </div>
          <div className="flex justify-between items-end">
            <div className="flex gap-4">
              <p>식사 전</p>
              <p>비행기 상태 - 이륙 중</p>
              <p>기내식 이용 불가</p>
            </div>
            <div className="flex justify-end gap-4">
              <button className="bg-white w-40 py-2 border-1 border-black">
                깨우지 마세요
              </button>
              <button className="bg-white w-40 py-2 border-1 border-black">
                기내식 때<br/>깨워주세요
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-gray-300 p-8 gap-8">
          <h2 className="font-bold text-lg">식사 메뉴 리뷰</h2>
          <div className="flex flex-col gap-4">
            <button className="w-full bg-white py-16 border-1 border-black">
              양식 <br/>
              함박 스테이크
            </button>
            <div className="flex justify-between gap-4">
              <button className="w-full bg-white py-2 border-1 border-black">
                좋아요 👍
              </button>
              <button className="w-full bg-white py-2 border-1 border-black">
                싫어요 👎
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}