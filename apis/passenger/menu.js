/**
 * 기내식 목록을 불러온다. (승객용)
 * 
 * 권한: 승객(passenger)
 * 
 * @param {number} flight_number 항공기 id
 * @returns 
 */
export async function getAirplainMenuPassenger(flight_number) {
  const queryParameters = new URLSearchParams({
    flight_number
  }).toString();

  const res = await fetch(`/api/passenger/menu?${queryParameters}`, {
    method: 'GET',
  });

  const data = await res.json();

  return data;
}