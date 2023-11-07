import React from 'react';
import { GoogleLogin } from '@leecheuk/react-google-login';
import { useNavigate } from 'react-router-dom';

const clientId = '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';


const GoogleBtn = () => {
  const navigate = useNavigate();

  const onSuccess = async (response:any) => {
    console.log('login success currentUser:', response.profileObj, JSON.stringify(response.profileObj, null, 2));
   
    
    try {
      const { email, name, googleId } =  response.profileObj;;
   
      const res = await fetch('http://localhost:8000/api/v1/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          googleId
        }),
      });

      console.log('Request payload:', JSON.stringify({
        email,
        name,
        googleId
      }));

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('accessToken', data.access_token);
        console.log(data)
        alert('Register successful!');
        navigate('/homepage');
      } else {
        const data = await res.json();
        alert(data.error);
        console.log(data)
      }
    } catch (error) {
      console.log('Error while logging in:', error);
      alert('An error occurred while logging in');
    }
  };

  const onFailure = async (response : any) => {
    console.log('login failed', response);
  };

  return (
    <div >
      <GoogleLogin
        clientId={clientId}
        buttonText='Register with Google'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
};

export default GoogleBtn;