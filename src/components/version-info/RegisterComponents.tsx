
import { Button } from "@/components/ui/button";
import { registerAllComponents } from "@/lib/componentRegistry";
import { useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const RegisterComponents = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const queryClient = useQueryClient();

  const handleRegister = async () => {
    setIsRegistering(true);
    try {
      const result = await registerAllComponents();
      const successCount = result.filter(item => item.status === 'success').length;
      toast.success(`Components registered successfully: ${successCount} components`);
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['versions'] });
      
      // Add a small delay to ensure the database has time to update
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['versions'] });
      }, 1000);
    } catch (error) {
      console.error('Failed to register components:', error);
      toast.error('Failed to register components');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="mb-4">
      <Button 
        onClick={handleRegister} 
        disabled={isRegistering}
        className="w-full md:w-auto"
      >
        {isRegistering ? 'Registering Components...' : 'Register All Components'}
      </Button>
      <p className="text-xs text-gray-500 mt-1">
        Click to register or update all components in the database
      </p>
    </div>
  );
};
