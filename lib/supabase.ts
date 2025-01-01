import { createClient } from '@supabase/supabase-js'
const NEXT_PUBLIC_SUPABASE_URL="https://pdamjftrwejhaneejnqo.supabase.co"
const SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkYW1qZnRyd2VqaGFuZWVqbnFvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzM5MTQyMywiZXhwIjoyMDQ4OTY3NDIzfQ.nBKBIyrykbCX2KbG0dzrtrL-ZJy-3kkc1-VWDvPkIJM"

const supabaseUrl = NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = SUPABASE_SERVICE_ROLE_KEY! //process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
