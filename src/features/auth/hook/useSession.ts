import type {Session} from "@supabase/supabase-js";
import {useEffect, useState} from "react";
import {supabase} from "../../../shared/services/api/supabase-client.ts";

// Function to know if the user is logged in or not, and to get the session data
export function useSession(){
    //we create a session that initially is empty, but it will be filled with the session data when the user logs in or not
    const [session, setSession] = useState<Session|null> (null)
    // to know if there is a session or not in the localstorage
    const [isCheckingSession, setIsCheckingSession] = useState(true)

    useEffect(() => {
        //we get the session data from supabase
        supabase.auth.getSession().then(({data}) =>{
            setSession(data.session)
            setIsCheckingSession(false)
        })

        // listener to know when the user logs in or out, and to update the session data accordingly
        const {data: listener} = supabase.auth.onAuthStateChange((_event, newSession) =>{
            setSession(newSession) //update the session with the new session data when the user logs in or out
        })
        // to unsubscribe the listener when the component unmounts
        return () => listener.subscription.unsubscribe()

    }, [])

    return {session, isCheckingSession}
}