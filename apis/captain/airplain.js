/**
 * 운항중인 비행기의 운항 상태를 업데이트한다.
 * 
 * 권한: 기장(captain)
 * 
 * @param {number} flight_number 항공기 id
 * @param {string} flight_state 항공기 상태 (이륙, 순항, 난기류, ...)
 * @returns 
 */
export async function postAirplainStatus(flight_number, flight_state) {
  const res = await fetch(`/api/captain/airplain`, {
    method: 'POST',
    body: JSON.stringify({
      flight_number,
      flight_state,
    }),
  });

  const data = await res.json();

  return data;
}