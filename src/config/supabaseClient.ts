import { createClient } from '@supabase/supabase-js'
// import { Database } from './supabase'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey= process.env.REACT_APP_SUPABASE_ANON_KEY
// const supabaseAnonKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlbmRlbnV5cHlpaGNjeHNjd2lhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMzM0NjM0OCwiZXhwIjoyMDI4OTIyMzQ4fQ.OKN1gbe19HzhlqdXtNVcIER1os_dcMk1ZVZ58wDaeAQ" //process.env.REACT_APP_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl!,supabaseAnonKey!)
// const supabase = createClient<>(supabaseUrl!, supabaseAnonKey!)

export default supabase
