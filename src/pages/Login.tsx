import React from "react";

import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../config/supabaseClient";

export default function Login() {
  const navagte = useNavigate();
  supabase.auth.onAuthStateChange(async (event: any) => {
    if (event !== "SIGNED_OUT") {
    } else {
      navagte("/");
    }
  });

  return (
    <div>
    
      <div className="flex p-4 flex-row justify-center items-stretch m-4 rounded-lg  border-2">
        Login  <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="light"
          providers={["github", "google"]}
        />
       
              </div>
    </div>
  );
}
