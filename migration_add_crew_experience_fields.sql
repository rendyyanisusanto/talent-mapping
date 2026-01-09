-- Add new crew experience fields to talent_crews table
-- Run this migration in your Supabase SQL Editor

ALTER TABLE talent_crews
ADD COLUMN IF NOT EXISTS pernah_terlibat BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS judul_film TEXT,
ADD COLUMN IF NOT EXISTS peran_di_film TEXT,
ADD COLUMN IF NOT EXISTS genre_film TEXT,
ADD COLUMN IF NOT EXISTS minat_kontribusi TEXT;

-- Add comments for documentation
COMMENT ON COLUMN talent_crews.pernah_terlibat IS 'Whether the crew member has been involved in film production before';
COMMENT ON COLUMN talent_crews.judul_film IS 'Title of the film they worked on (if pernah_terlibat is true)';
COMMENT ON COLUMN talent_crews.peran_di_film IS 'Their role in the film (if pernah_terlibat is true)';
COMMENT ON COLUMN talent_crews.genre_film IS 'Film genre preference';
COMMENT ON COLUMN talent_crews.minat_kontribusi IS 'Area of future contribution interest (comma-separated if multiple)';
