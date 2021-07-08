import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom'

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) =>{
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); //없으면 할 때마다 페이지가 refresh 됨 꼭 필요함

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body)) //dispatch 후 Action으로 넘어가게됨 redux 플로우차트 참고하기
        .then(response => {
            if(response.payload.loginSuccess){
                props.history.push('/') //react 페이지 이동에 history를 사용함
            } else {
                alert('Error')
            }
        })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>

            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <br />
                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    )
}

export default withRouter(LoginPage)
