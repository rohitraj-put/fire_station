import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFireStation } from "@/context/FireStationContext";
import { useToast } from "@/hooks/use-toast";
import { EquipmentStatus } from "@/types";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  type: z.string().min(2, "Type must be at least 2 characters"),
  status: z.enum(["available", "in-use", "maintenance", "out-of-service"] as const),
  location: z.string().min(2, "Location must be at least 2 characters"),
  assignedTo: z.string().optional(),
  notes: z.string().optional(),
});

interface EquipmentFormProps {
  onSuccess: () => void;
}

export function EquipmentForm({ onSuccess }: EquipmentFormProps) {
  const { addEquipment } = useFireStation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      status: "available" as EquipmentStatus,
      location: "",
      assignedTo: "",
      notes: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const currentDate = new Date().toISOString();
      const nextMaintenanceDate = new Date();
      nextMaintenanceDate.setMonth(nextMaintenanceDate.getMonth() + 3);

      addEquipment({
        ...data,
        lastMaintenance: currentDate,
        nextMaintenance: nextMaintenanceDate.toISOString(),
      });

      toast({
        title: "Success",
        description: "Equipment added successfully",
      });
      
      onSuccess();
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add equipment",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter equipment name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter equipment type" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="in-use">In Use</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="out-of-service">Out of Service</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter equipment location" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="assignedTo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assigned To (Optional)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter assigned personnel" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter any additional notes" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="submit">Add Equipment</Button>
        </div>
      </form>
    </Form>
  );
}
