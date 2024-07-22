import { apiIP } from '../../config';

// 실험실 데이터 수정 POST API
export default async function updateProbexptData(
  data, // 실험실 데이터
  i, // 실험실 seqno
  meatId, // 이력번호
  createdDate, // 생성 날짜
  userId, // 로그인한 사용자 id
  elapsedHour // 경과 시간
) {
  const dataset = {
    ['L']: parseFloat(data.L),
    ['a']: parseFloat(data.a),
    ['b']: parseFloat(data.b),
    ['DL']: parseFloat(data.DL),
    ['CL']: parseFloat(data.CL),
    ['RW']: parseFloat(data.RW),
    ['ph']: parseFloat(data.ph),
    ['WBSF']: parseFloat(data.WBSF),
    ['cardepsin_activity']: parseFloat(data.cardepsin_activity),
    ['MFI']: parseFloat(data.MFI),
    ['Collagen']: parseFloat(data.Collagen),
    ['sourness']: parseFloat(data.sourness),
    ['bitterness']: parseFloat(data.bitterness),
    ['umami']: parseFloat(data.umami),
    ['richness']: parseFloat(data.richness),
  };
  //request body에 보낼 데이터 전처리
  let req = {
    probexptData: dataset,
  };
  req = {
    ...req,
    ['meatId']: meatId,
    ['seqno']: i,
    ['isHeated']: false,
  };
  console.log("req : ", req)
  // /meat/add/probexpt-data로 실험 수정 데이터 전송
  try {
    const response = await fetch(`http://${apiIP}/meat/add/probexpt-data`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    });
    if (!response.ok) {
      throw new Error(
        'probexpt_data 서버에서 응답 코드가 성공(2xx)이 아닙니다.'
      );
    }
    // 서버에서 받은 JSON 응답 데이터를 해석
    const responseData = await response.json();
    return responseData;
  } catch (err) {
    console.log('error');
    console.error(err);
  }
}
