import {
    LOGIN_USER
} from '../_actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
                return { ...state, loginSuccess: action.payload } //복사 어쩌구였던거 같은데..찾아보기
            break;
    
        default:
            return state;
    }
}