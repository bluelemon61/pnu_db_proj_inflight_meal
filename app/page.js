"use client"

export default function Home() {

  async function sqltest() {
    const res = await fetch('/api/sql_test');
    const data = await res.json();
    console.log(data);
  }

  return (
    <div>
      <button className="p-5 bg-red" onClick={(e) => {
        sqltest();
      }}>SQL TEST</button>
    </div>
  )
}
