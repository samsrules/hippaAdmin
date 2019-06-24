/**
 * App Actions
 * 
 */

import { NotificationManager } from 'react-notifications';
import {
    PATIENT_REFEREL
} from 'Actions/types';

import api from './../api/index';

export const patienRefferel = () => (dispatch) => {
     
    
    console.log('patient_refferl');
    dispatch({type:PATIENT_REFEREL, payload:'Refferel'})
    // api.post('user/signin', user)
    //  .then((res)=>{
    //     if(res.data.status==1){
    //         var userInfo = res.data.data;
    //         localStorage.setItem("user_id", userInfo._id);
    //         localStorage.setItem("firstName", userInfo.firstName);
    //         history.push('/');
    //         NotificationManager.success(res.data.message);
    //         dispatch({
    //             type:LOGIN_USER_SUCCESS,
    //             payload: res.data.data
    //         })
    //     } else {
    //         NotificationManager.success(res.data.message);
    //     }
        
    // })
    // .catch((err)=>{
    //     dispatch({ type: LOGIN_USER_FAILURE });
    //     NotificationManager.error(err.message);
    // })
        
}

