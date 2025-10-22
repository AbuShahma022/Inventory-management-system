class SessionHelper{
    setToken(token){
        localStorage.setItem("token",token)
    }
    getToken(){
        return localStorage.getItem("token")
    }
    setUserDetailsLocal(UserDetails){
        localStorage.setItem("UserDetails",JSON.stringify(UserDetails))
    }
    getUserDetailsLocal(){
        return JSON.parse(localStorage.getItem("UserDetails"))
    }
    setEmail(Email){
        localStorage.setItem("Email",Email)
    }
    getEmail(){
        return localStorage.getItem("Email")
    }
    setOTP(OTP){
        localStorage.setItem("OTP",OTP)
    }
    getOTP(){
        return localStorage.getItem("OTP")
    }
    removeSessions=()=>{
        localStorage.clear();
        window.location.href="/login"
    }
}
export const {setEmail,getEmail,setOTP,getOTP,setToken,getToken,setUserDetailsLocal,getUserDetailsLocal,removeSessions}=new SessionHelper();