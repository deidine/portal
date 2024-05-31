 
import React, { useEffect, useState } from 'react'
import supabase from '../config/supabaseClient';

export default 
 function RenderImage  ({ path }:{path:any})  {
  const [publicUrl, setPublicUrl] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = supabase.storage
        .from("imgs")
        .getPublicUrl(path);

      if (data) {
        setPublicUrl(data.publicUrl);
      }
    })();
  }, [path]);

  return <> <img src={publicUrl} alt="Uploaded" style={{ width: '100px', height: 'auto' }}  /></> ;
};
