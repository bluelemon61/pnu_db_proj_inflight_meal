/**
 * 기내식 제공 가능 여부를 업데이트한다.
 * 
 * 권한: 기장(captain)
 * 
 * @param {number} flight_number 항공기 id
 * @param {boolean} serve 기내식 제공 가능 (true or false)
 * @returns 
 */
export async function postAirplainServe(flight_number, serve) {
  const res = await fetch(`/api/captain/serve`, {
    method: 'POST',
    body: JSON.stringify({
      flight_number,
      serve,
    }),
  });

  if (res.status < 300) return true;
  return false;
}