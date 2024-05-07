"use client"

import { useStore } from "@/stores/store"
import { redirect, useRouter } from "next/navigation"


const CreteGroupPage = () => {
  const userAuthenticated= useStore(state=>state.userAuthenticated)
  if(!userAuthenticated){
    redirect("/auth/login")
  }
  return (
    <div>CreteGroupPage</div>
  )
}

export default CreteGroupPage