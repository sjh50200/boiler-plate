import axios from 'axios';
import{
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
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

export function registerUser(dataTosubmit) {
    const request =axios.post('/api/users/register', dataTosubmit) //백 index.js로 접근 미들웨어 통해서 포트 5000
        .then(response => response.data) // 가져오는 모든 데이터 출력

    // reducer를 통해 nextState 생성 플로우차트 참고
    return {
        // reducer에 넘겨주는 작업
        type: REGISTER_USER,
        payload: request //response 부분임
    }
}

export function auth() {
    const request =axios.get('/api/users/auth') //백 index.js로 접근 미들웨어 통해서 포트 5000
        .then(response => response.data) // 가져오는 모든 데이터 출력

    // reducer를 통해 nextState 생성 플로우차트 참고
    return {
        // reducer에 넘겨주는 작업
        type: AUTH_USER,
        payload: request //response 부분임
    }
}