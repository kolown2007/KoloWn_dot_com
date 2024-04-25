
import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.SUPABASE_URL || "";
// const supabaseKey = process.env.SUPABASE_KEY || "";

const SUPABASE_URL= "https://erzhwuvwyvkkexcuersr.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyemh3dXZ3eXZra2V4Y3VlcnNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1MDg4MDEsImV4cCI6MjAyOTA4NDgwMX0.6OpwSHP1VCDMLJ-R-yhJmV4z5DHT8ZKgwrMEXdTOmWA"
        

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        