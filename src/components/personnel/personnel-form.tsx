import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFireStation } from "@/context/FireStationContext";
import { useToast } from "@/hooks/use-toast";
import { PersonnelStatus } from "@/types";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    position: z.string().min(2, "Position must be at least 2 characters"),
    badge: z.string().min(2, "Badge number is required"),
    status: z.enum(["on-duty", "off-duty", "on-leave", "training"] as const),
    team: z.string().min(1, "Team is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number is required"),
});

interface PersonnelFormProps {
    onSuccess: () => void;
}

export function PersonnelForm({ onSuccess }: PersonnelFormProps) {
    const { addPersonnel } = useFireStation();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: "off-duty",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            addPersonnel({
                name: values.name,
                position: values.position,
                badge: values.badge,
                status: values.status as PersonnelStatus,
                shift: "A", // Default shift
                team: values.team,
                contact: {
                    email: values.email,
                    phone: values.phone,
                },
                certification: [],
                startDate: new Date().toISOString(),
            });

            toast({
                title: "Success",
                description: "Personnel added successfully",
            });

            onSuccess();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to add personnel",
                variant: "destructive",
            });
        }
    }

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
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="position"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Position</FormLabel>
                                <FormControl>
                                    <Input placeholder="Firefighter" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="badge"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Badge Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="FF-123" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                                        <SelectItem value="on-duty">On Duty</SelectItem>
                                        <SelectItem value="off-duty">Off Duty</SelectItem>
                                        <SelectItem value="on-leave">On Leave</SelectItem>
                                        <SelectItem value="training">Training</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="team"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Team</FormLabel>
                                <FormControl>
                                    <Input placeholder="Engine 1" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="john@firerescue.org" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input placeholder="555-0123" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => onSuccess()}>
                        Cancel
                    </Button>
                    <Button variant="outline" type="button" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button type="submit">Add Personnel</Button>
                </div>
            </form>
        </Form>
    );
}