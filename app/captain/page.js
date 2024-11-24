"use client"

export default function Captain() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="font-black text-2xl">비행기 상태</h1>
        <div className="flex gap-8">
          <button className="w-full py-12 bg-gray-300">
            이륙
          </button>
          <button className="w-full py-12 bg-gray-300">
            정상 운행
          </button>
          <button className="w-full py-12 bg-gray-300">
            난기류
          </button>
          <button className="w-full py-12 bg-gray-300">
            비상 상황
          </button>
          <button className="w-full py-12 bg-gray-300">
            착륙
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="font-black text-2xl">기내식</h1>
        <div className="flex flex-col bg-gray-300 p-8">
          <h2 className="font-bold text-lg">기내식 제공 시간</h2>
          <div className="flex gap-8">
            <button className="w-full py-12 bg-gray-100">
              ON
            </button>
            <button className="w-full py-12 bg-gray-100">
              OFF
            </button>
          </div>
        </div>
        <div className="flex flex-col bg-gray-300 p-8">
          <h2 className="font-bold text-lg">기내식 구성</h2>
          <div className="flex flex-col">
            <div className="flex gap-4 justify-between py-2 border-b-2 border-black">
              <div className="w-1/6 text-center">음식 명</div>
              <div className="w-1/6 text-center">분류</div>
              <div className="w-1/6 text-center">재고</div>
              <div className="w-1/6 text-center">👍</div>
              <div className="w-1/6 text-center">👎</div>
              <div className="w-1/6 text-center">제공 대상</div>
            </div>
            <div className="flex gap-4 justify-between py-2 border-b-1 border-black">
              <div className="w-1/6 text-center">함박 스테이크</div>
              <div className="w-1/6 text-center">양식</div>
              <div className="w-1/6 text-center">10</div>
              <div className="w-1/6 text-center">10</div>
              <div className="w-1/6 text-center">2</div>
              <div className="w-1/6 text-center">승객</div>
            </div>
            <div className="flex gap-4 justify-between py-2 border-b-1 border-black">
              <div className="w-1/6 text-center">닭다리살 포케</div>
              <div className="w-1/6 text-center">포케</div>
              <div className="w-1/6 text-center">10</div>
              <div className="w-1/6 text-center">5</div>
              <div className="w-1/6 text-center">3</div>
              <div className="w-1/6 text-center">직원</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col bg-gray-300 p-8">
          <h2 className="font-bold text-lg">기장 기내식 선택</h2>
          <div className="flex flex-col">
            <div className="flex gap-4 justify-between py-2 border-b-2 border-black">
              <div className="w-1/6 text-center">음식 명</div>
              <div className="w-1/6 text-center">분류</div>
              <div className="w-1/6 text-center">재고</div>
              <div className="w-1/6 text-center">👍</div>
              <div className="w-1/6 text-center">👎</div>
              <div className="w-1/6 text-center">제공 대상</div>
            </div>
            <div className="flex gap-4 justify-between py-2 border-b-1 border-black">
              <div className="w-1/6 text-center">닭다리살 포케</div>
              <div className="w-1/6 text-center">포케</div>
              <div className="w-1/6 text-center">10</div>
              <div className="w-1/6 text-center">5</div>
              <div className="w-1/6 text-center">3</div>
              <div className="w-1/6 text-center">직원</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}