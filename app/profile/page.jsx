"use client";
import {useState,useEffect}from "react";
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import Profile from "@components/Profile";

const MyProfile =()=>{
    const router=useRouter();

    const{data:session}=useSession();

    const [myposts,setMyPosts]= useState([]);

    useEffect(()=>{
        const fetchPosts = async()=>{
            const respone =await fetch(`api/users/${session?.user.id}/posts`);
            const data = await respone.json();

            setMyPosts(data);
        }
        if(session?.user.id) fetchPosts();
    },[]);

    const handleEdit =(post)=>{
         router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete= async(post)=>{
          const hasConfirmed =confirm('Are u sure you want to delete this prompt ?');
          if(hasConfirmed){
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: "DELETE",
                  });
          
                  const filteredPosts = myposts.filter((item) => item._id !== post._id);
          
                  setMyPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
          }
    }
    return(
       <Profile
       name="My"
       desc="Welcome to your persionalized profile page"
       data={myposts}
       handleEdit={handleEdit}
       handleDelete={handleDelete}
       />
    )
}
export default MyProfile;