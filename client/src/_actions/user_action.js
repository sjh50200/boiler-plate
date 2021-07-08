import axios from 'axios';
import{
    LOGIN_USER
}from './types';

export function loginUser(dataTosubmit) {
    const request =axios.post('/api/users/login', dataTosubmit) //백 index.js로 접근 미들웨어 통해서 포트 5000
        .then(response => response.data) // 가져오는 모든 데이터 출력

    // reducer를 통해 nextState 생성 플로우차트 참고
    return {
        // reducer에 넘겨주는 작업
        type: LOGIN_USER,
        payload: request //response 부분임
    }
}