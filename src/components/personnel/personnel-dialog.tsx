import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PersonnelForm } from "./personnel-form";

interface PersonnelDialogProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PersonnelDialog({ children, open, onOpenChange }: PersonnelDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Personnel</DialogTitle>
        </DialogHeader>
        <PersonnelForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
