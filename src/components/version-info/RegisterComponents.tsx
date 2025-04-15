
import { Button } from "@/components/ui/button";
import { registerAllComponents } from "@/lib/componentRegistry";
import { useState } from "react";
import { toast } from "sonner";

export const RegisterComponents = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = async () => {
    setIsRegistering(true);
    try {
      await registerAllComponents();
      toast.success('Components registered successfully');
    } catch (error) {
      console.error('Failed to register components:', error);
      toast.error('Failed to register components');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <Button 
      onClick={handleRegister} 
      disabled={isRegistering}
      className="mb-4"
    >
      {isRegistering ? 'Registering Components...' : 'Register All Components'}
    </Button>
  );
};
