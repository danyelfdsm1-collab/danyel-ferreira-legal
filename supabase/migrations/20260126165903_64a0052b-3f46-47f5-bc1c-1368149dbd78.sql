-- Add DELETE policy for appointments table
-- Users can only cancel/delete their own PENDING appointments
-- Confirmed or completed appointments are preserved for historical records

CREATE POLICY "Users can delete their own pending appointments" 
ON public.appointments 
FOR DELETE 
USING (auth.uid() = user_id AND status = 'pendente');