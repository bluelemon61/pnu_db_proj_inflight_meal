/**
 * 수면 상태를 설정한다.
 * 
 * 권한: 승객(passenger)
 * 
 * @param {number} flight_number 항공기 id
 * @param {number} user_id 승객의 id
 * @param {string} sleep_state NORMAL, DONOTTOUCH (수면 중, 깨우지 마세요), AWAKEME (수면 중, 깨워주세요)
 * @returns 
 */
export async function postSleep(flight_number, user_id, sleep_state) {
  const res = await fetch(`/api/passenger/sleep`, {
    method: 'POST',
    body: JSON.stringify({
      flight_number,
      user_id,
      sleep_state,
    }),
  });

  const data = await res.json();

  return data;
}

/**
 * 본인의 수면 상태를 불러온다. (승객용)
 * 
 * 권한: 승객(passenger)
 * 
 * @param {number} flight_number 항공기 id
 * @param {number} user_id 승객의 id
 * @returns 
 */
export async function getSleep(flight_number, user_id) {
  const queryParameters = new URLSearchParams({
    flight_number, user_id
  }).toString();

  const res = await fetch(`/api/passenger/sleep?${queryParameters}`, {
    method: 'GET',
  });

  const data = await res.json();

  if (!data) {
    return {
      user_id: 2,
      sleep_state: 'NORMAL',
    };
  }

  return data;
}