/**
 * 비행기 상태를 불러온다. (승객용)
 * 
 * 권한: 승객(passenger)
 * 
 * @param {number} flight_number 항공기 id
 * @returns 
 */
export async function getAirplainStatus(flight_number) {
  const queryParameters = new URLSearchParams({
    flight_number
  }).toString();

  const res = await fetch(`/api/passenger/flight_status?${queryParameters}`, {
    method: 'GET',
  });

  const data = await res.json();

  return data;
}