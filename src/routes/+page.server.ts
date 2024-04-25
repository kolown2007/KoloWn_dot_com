import { supabase } from "$lib/supabaseClient";

import { createClient } from "@supabase/supabase-js";


export async function load() {
    const { data } = await supabase.from("exhibitions").select("*").order("year", { ascending: false });;
    console.log(data);
    return {
      exhibitions: data ?? [],
    };
  }


