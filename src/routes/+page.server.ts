import { supabase } from "$lib/supabaseClient";
//import type { Tables } from '$lib/types/supabase';


export async function load() {
    const { data } = await supabase.from("exhibitions").select("*").order("year", { ascending: false });;
   



    return {
      exhibitions: data ?? [],
     
    };
  }


