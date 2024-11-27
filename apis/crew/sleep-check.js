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

  if (!data) {
    return [
      {
        user_id: 1,
        eat_count: 0,
        sleep_state: 'NORMAL',
      },
      {
        user_id: 2,
        eat_count: 1,
        sleep_state: 'DONOTTOUCH',
      },
      {
        user_id: 3,
        eat_count: 1,
        sleep_state: 'DONOTTOUCH',
      },
      {
        user_id: 4,
        eat_count: 0,
        sleep_state: 'AWAKEME',
      },
    ]
  }

  return data;
}