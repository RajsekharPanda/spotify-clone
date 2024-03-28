import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "inspector";
import { cookies } from "next/headers";

const getSongsByUserId = async (): Promise<Song[]> => {
   const supabase = createServerComponentClient({
      cookies: cookies,
   });

   const {
      data:sessionDate,
      error:sessionError
   }= await supabase.auth.getSession()

   if (sessionError) {
      console.log(sessionError.message)
      return [];
   }

   const {data, error} = await supabase.from('songs').select('*').eq('user_id', sessionDate.session?.user.id).order('created_at', {ascending: false});
   if (error) {
      console.log(error.message)
   }

   return (data as any) || [];
}

export default getSongsByUserId;