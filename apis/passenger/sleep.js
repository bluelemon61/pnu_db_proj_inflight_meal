/**
 * 수면 상태를 설정한다.
 * 
 * 권한: 승객(passenger)
 * 
 * @param {number} flight_number 항공기 id
 * @param {number} seat_number 승객의 좌석번호
 * @param {string} sleep_state NORMAL, DONOTTOUCH (수면 중, 깨우지 마세요), AWAKEME (수면 중, 깨워주세요)
 * @returns 
 */
export async function postSleep(flight_number, seat_number, sleep_state) {
  const res = await fetch(`/api/passenger/sleep`, {
    method: 'POST',
    body: JSON.stringify({
      flight_number,
      seat_number,
      sleep_state,
    }),
  });

  if (res.status < 300) return true;
  return false;
}

/**
 * 본인의 수면 상태를 불러온다. (승객용)
 * 
 * 권한: 승객(passenger)
 * 
 * @param {number} flight_number 항공기 id
 * @param {number} seat_number 승객의 좌석번호
 * @returns 
 */
export async function getSleep(flight_number, seat_number) {
  const queryParameters = new URLSearchParams({
    flight_number, seat_number
  }).toString();

  const res = await fetch(`/api/passenger/sleep?${queryParameters}`, {
    method: 'GET',
  });

  const data = await res.json();

  return data;
}