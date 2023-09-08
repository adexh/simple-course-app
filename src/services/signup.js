const env = import.meta.env;

export const singupService = async(userCredentials) => {
  // Can't use Axios here because of bug https://github.com/axios/axios/issues/2149
  const request = await fetch(`${env.VITE_API}/user/userRegister`,{
    method: 'POST',
    mode:'cors',
    credentials: 'include', // Don't forget to specify this if you need cookies
    headers : {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userCredentials),
  })
  if(request.status != 201){
    const data = await request.json();
    throw new Error(data.message?data.message:"Error in Signup")
  }
  return request.json()
}