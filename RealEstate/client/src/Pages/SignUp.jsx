import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";

const SignUp = () => {
const [formData , setformData] = useState({});
const [error , setError] = useState(null);
const [loading , setloading ] = useState(false);
const navigate = useNavigate();
  const changeHandler = (e) =>{
    setformData({
      ...formData,
     [e.target.id] : e.target.value,
});
};

const submitHandler = async (e) =>{
  e.preventDefault();

try {
  
  setloading(true);
  
    const res = await fetch('/server/auth/signup' , 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }
    );
    const data = await res.json();
    console.log(data);
    if(data.sucess === false){
      setError(data.message),
    setloading(false);
    return;
    }
    setloading(false)
    setError(null);
   navigate('/signin');
} catch (error) {
  setloading(false);
  setError(error.message);
}

}


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form action="" className="flex flex-col gap-4" onSubmit={submitHandler} >
        <input type="text" placeholder="username" className="border p-3 rounded-lg" id="username" onChange={changeHandler} />
        <input type="email" placeholder="email" className="border p-3 rounded-lg" id="email" onChange={changeHandler} />
        <input type="password" placeholder="password" className="border p-3 rounded-lg" id="password" onChange={changeHandler} />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 "> 
        { loading ? 'loading...' : 'Sign up' }
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/signin"}>
          <span className="text-blue-700 hover:underline">SignIn</span>
        </Link>
      </div>
      { error && <p className="text-red-500 ">{error}</p> }

    </div>
    
  )
}

export default SignUp