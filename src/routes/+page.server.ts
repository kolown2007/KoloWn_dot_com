import { supabase } from "$lib/supabaseClient";
 
export async function load() {
  console.log('Fetching data from exhibitions table...');
  
  const { data, error } = await supabase.from("homepage").select("*").order("id", { ascending: false });
  
  if (error) {
    console.error('Error fetching exhibitions:', error);
    return {
      files: [] // Changed from exhibitions to files to match frontend
    };
  }
  
  // Transform exhibitions data to match frontend structure
  const transformedData = data?.map(item => ({
    title: item.title,
    featuredImage: item.img,
    url: item.link
  })) || [];

  console.log('Transformed data:', transformedData);

  return {
    files: transformedData
  };
}