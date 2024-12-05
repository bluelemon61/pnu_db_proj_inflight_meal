/**
 * 본인의 식사 상태를 불러온다. (승객용)
 * 
 * 권한: 승객(passenger)
 * 
 * @param {number} flight_number 항공기 id
 * @param {number} seat_number 승객의 좌석 번호
 * @returns 
 */
export async function getEaten(flight_number, seat_number) {
  const queryParameters = new URLSearchParams({
    flight_number, seat_number
  }).toString();

  const res = await fetch(`/api/passenger/eaten?${queryParameters}`, {
    method: 'GET',
  });

  const data = await res.json();

  return data;
}