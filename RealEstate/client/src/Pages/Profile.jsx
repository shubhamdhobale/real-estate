import { useEffect, useRef, useState } from "react";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

const Profile = () => {

  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null)
  const [file , setFile] = useState(undefined);
  const [fileperc , setFileperc ] = useState(0);
  const [ fileUploadError , setfileUploadError] = useState(false);
  const [ formData , setformData] = useState({});
  
  // allow read;
  // allow write: if 
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage , fileName);
    const uploadTask = uploadBytesResumable(storageRef , file);

    uploadTask.on(
      'state_changed' , 
      (snapshot) =>{
          const progress = (snapshot.bytesTransferred /
                snapshot.totalBytes) * 100;
          setFileperc(Math.round(progress));
    },
    (error)=>{
      setfileUploadError(true);
      console.log(error);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
        setformData({...formData , avatar: downloadURL});
      });
    });
  };

  return (
    <div className="p-3 mx-auto max-w-lg">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form action="" className=" flex flex-col gap-4">
         <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*"/>
          <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" />
          <p className="text-sm self-center">
            {
              fileUploadError ? (
                <span className="text-red-700">Error image upload(image must be less than 2MB)</span>
              ) : fileperc > 0 && fileperc < 100 ? (
                <span className="text-slate-700">{`Uploading ${fileperc}%`}</span>
              ) : fileperc === 100 ? (
                <span className="text-green-700">Image Successfully Uploaded!</span>
              ) : (
                ''
              )
            }
          </p>
          <input type="text" id="username" placeholder="username.." className="border p-3 rounded-lg"/>
          <input type="text" id="email" placeholder="email.." className="border p-3 rounded-lg"/>
          <input type="text" id="password" placeholder="password.." className="border p-3 rounded-lg"/>
          <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">Update</button>
      </form>
      <div className="flex justify-between mt-5 ">
          <span className="text-red-700 cursor-pointer">Delete account</span>
          <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  )
}

export default Profile