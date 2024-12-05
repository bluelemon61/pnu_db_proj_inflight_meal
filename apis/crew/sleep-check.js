/**
 * 승객들의 수면 상태를 확인한다.
 * 
 * 권한: 승무원(crew)
 * 
 * @param {number} flight_number 항공기 id
 * @returns 
 */
export async function getSleepStatus(flight_number) {
  const queryParameters = new URLSearchParams({
    flight_number
  }).toString();

  const res = await fetch(`/api/crew/sleep-check?${queryParameters}`, {
    method: 'GET',
  });

  const data = await res.json();

  return data;
}