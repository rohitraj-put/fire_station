import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFireStation } from "@/context/FireStationContext";
import { toast } from "sonner";

const vehicleSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  type: z.string().min(2, "Type is required"),
  callSign: z.string().min(2, "Call sign is required"),
  status: z.enum(["available", "responding", "returning", "maintenance", "out-of-service"]),
  location: z.object({
    address: z.string().optional(),
  }).optional(),
  fuelLevel: z.number().min(0).max(100),
});

type VehicleFormValues = z.infer<typeof vehicleSchema>;

interface VehicleFormProps {
  onSuccess: () => void;
}

export function VehicleForm({ onSuccess }: VehicleFormProps) {
  const { addVehicle } = useFireStation();

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      name: "",
      type: "",
      callSign: "",
      status: "available",
      fuelLevel: 100,
    },
  });

  const onSubmit = (data: VehicleFormValues) => {
    try {
      addVehicle(data);
      toast.success("Vehicle added successfully");
      form.reset();
      onSuccess();
    } catch (error) {
      toast.error("Failed to add vehicle");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Engine 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input placeholder="Fire Engine" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="callSign"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Call Sign</FormLabel>
                <FormControl>
                  <Input placeholder="E1" {...field} />
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
                  <SelectItem value="responding">Responding</SelectItem>
                  <SelectItem value="returning">Returning</SelectItem>
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
          name="fuelLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fuel Level (%)</FormLabel>
              <FormControl>
                <Input type="number" min="0" max="100" {...field} onChange={e => field.onChange(+e.target.value)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="outline" onClick={() => onSuccess()}>
            Cancel
          </Button>
          <Button variant="outline" type="button" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit">Add Vehicle</Button>
        </div>
      </form>
    </Form>
  );
}
