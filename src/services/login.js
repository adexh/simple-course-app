const env = import.meta.env;

export const loginService = async(userCredentials) => {
  // Can't use Axios here because of bug https://github.com/axios/axios/issues/2149
  const request = await fetch(`${env.VITE_API}/user/userLogin`,{
    method: 'GET',
    mode:'cors',
    credentials: 'include', // Don't forget to specify this if you need cookies
    headers : {
      'username' : userCredentials.email,
      'password' : userCredentials.password
    }
  })
  return request.json();
}