-- ============================================================
-- MIGRATION: Add Logistics Subsystem Support
-- ============================================================
-- IMPORTANT: Run ONLY this file in Supabase SQL Editor
-- Do NOT run supabase_setup.sql if your database is already set up
-- ============================================================

-- Step 1: Drop the existing check constraint
ALTER TABLE public.project_logs 
DROP CONSTRAINT IF EXISTS project_logs_subsystem_id_check;

-- Step 2: Add the new check constraint with 'logistics' included
ALTER TABLE public.project_logs 
ADD CONSTRAINT project_logs_subsystem_id_check 
CHECK (subsystem_id IN ('mechanical', 'electrical', 'software', 'logistics'));
