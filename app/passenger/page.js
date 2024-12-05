"use client";

import Link from "next/link";
import { Fragment, useState } from "react";

export default function SeatSelect() {
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(4);

  return (
    <div className="flex flex-col gap-8 w-crew">
      <div className="flex flex-col gap-4">
        <h1 className="font-black text-2xl">좌석선택</h1>
        <div className="relative flex flex-col items-center">
          <div className="px-8 py-24 bg-gray-200" />
          <div className="flex gap-12 bg-gray-200 px-36 py-16 rounded-airplain">
            {Array.from({ length: rows }).map((_, r) => (
              <Fragment key={r}>
                {r === Math.ceil(rows / 2) ? <div className="px-8" /> : null}
                <div className="flex flex-col gap-4">
                  {Array.from({ length: cols }).map((_, c) => (
                    <Fragment key={`col${c}`}>
                      {c === cols / 2? <div className="py-4" /> : null}
                      <Link
                        className={`p-6 bg-gray-400 hover:bg-gray-100`}
                        href={`/passenger/${r*cols + c + 1}`}
                      >
                        {r*cols + c + 1}
                      </Link>                        
                    </Fragment>
                  ))}
                </div>
              </Fragment>
            ))}
          </div>
          <div className="px-8 py-24 bg-gray-200" />
          <div className="absolute w-full flex justify-center bg-white/50 border-2 p-8 left-0 bottom-0 gap-4 text-lg">
            착석할 좌석을 선택해 주세요
          </div>
        </div>
      </div>
    </div>
  );
}
