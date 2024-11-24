"use client"

export default function Provider() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="font-black text-2xl">기내식 구성</h1>
        <div className="flex flex-col bg-gray-300 p-8">
          <h2 className="font-bold text-lg">업체 제공 가능 기내식 목록</h2>
          <div className="flex flex-col">
            <div className="flex gap-4 justify-between py-2 border-b-2 border-black">
              <div className="w-1/5 text-center">음식 명</div>
              <div className="w-1/5 text-center">분류</div>
              <div className="w-1/5 text-center">재고</div>
              <div className="w-1/5 text-center">👍</div>
              <div className="w-1/5 text-center">👎</div>
            </div>
            <div className="flex gap-4 justify-between py-2 border-b-1 border-black">
              <div className="w-1/5 text-center">함박 스테이크</div>
              <div className="w-1/5 text-center">양식</div>
              <div className="w-1/5 text-center">10</div>
              <div className="w-1/5 text-center">10</div>
              <div className="w-1/5 text-center">2</div>
            </div>
            <div className="flex gap-4 justify-between py-2 border-b-1 border-black">
              <div className="w-1/5 text-center">닭다리살 포케</div>
              <div className="w-1/5 text-center">포케</div>
              <div className="w-1/5 text-center">10</div>
              <div className="w-1/5 text-center">5</div>
              <div className="w-1/5 text-center">3</div>
            </div>
            <div className="flex gap-4 justify-between py-2 border-b-1 border-black">
              <div className="w-1/5 text-center">
                <input />
              </div>
              <div className="w-1/5 text-center">
                <input />
              </div>
              <div className="w-1/5 text-center">
                <input type="number"/>
              </div>
              <div className="w-1/5 text-center">
                <button className="bg-red-300 py-1 px-4">초기화</button>
              </div>
              <div className="w-1/5 text-center">
                <button className="bg-green-300 py-1 px-4">추가</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col bg-gray-300 p-8">
          <h2 className="font-bold text-lg">비행기 제공</h2>
          <h2 className="font-bold text-normal">부산대항공-000</h2>
          <div className="flex flex-col">
            <div className="flex gap-4 justify-between py-2 border-b-2 border-black">
              <div className="w-1/4 text-center">음식 명</div>
              <div className="w-1/4 text-center">분류</div>
              <div className="w-1/4 text-center">재고</div>
              <div className="w-1/4 text-center">재고 변경</div>
            </div>
            <div className="flex gap-4 justify-between py-2 border-b-1 border-black">
              <div className="w-1/4 text-center">닭다리살 포케</div>
              <div className="w-1/4 text-center">포케</div>
              <div className="w-1/4 text-center">10</div>
              <div className="w-1/4 text-center flex justify-center gap-2">
                <input type="number" className="w-20 text-right"/>
                <button className="bg-blue-300 py-1 px-4">반영</button>
              </div>
            </div>
            <div className="flex gap-4 justify-between py-2 border-b-1 border-black">
              <div className="w-1/4 text-center">
                <input />
              </div>
              <div className="w-1/4 text-center">
                <input />
              </div>
              <div className="w-1/4 text-center">
                <input type="number"/>
              </div>
              <div className="w-1/4 text-center flex justify-center gap-2">
                <button className="bg-red-300 py-1 px-4">초기화</button>
                <button className="bg-green-300 py-1 px-4">추가</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}