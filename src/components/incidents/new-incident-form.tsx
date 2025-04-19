import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useFireStation } from "@/context/FireStationContext";
import { EmergencyType } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { MapPin } from "lucide-react";

const emergencyTypes: { value: EmergencyType; label: string }[] = [
    { value: "fire", label: "Fire" },
    { value: "medical", label: "Medical" },
    { value: "rescue", label: "Rescue" },
    { value: "hazmat", label: "Hazmat" },
    { value: "natural-disaster", label: "Natural Disaster" },
    { value: "other", label: "Other" },
];

interface NewIncidentFormProps {
    onSuccess?: () => void;
}

interface FormValues {
    type: EmergencyType;
    priority: string;
    description: string;
    location: string;
    reporterName?: string;
    reporterPhone?: string;
}

export function NewIncidentForm({ onSuccess }: NewIncidentFormProps) {
    const { addIncident } = useFireStation();
    const { toast } = useToast();
    const form = useForm<FormValues>({
        defaultValues: {
            type: "fire",
            priority: "1",
            description: "",
            location: "",
        },
    });

    const onSubmit = (data: FormValues) => {
        try {
            addIncident({
                type: data.type,
                priority: parseInt(data.priority),
                status: "active",
                location: {
                    address: data.location,
                },
                description: data.description,
                reportedAt: new Date().toISOString(),
                assignedUnits: {
                    personnel: [],
                    vehicles: [],
                    equipment: [],
                },
                reporter: data.reporterName
                    ? {
                        name: data.reporterName,
                        phone: data.reporterPhone || "",
                    }
                    : undefined,
            });

            toast({
                title: "Success",
                description: "New incident has been created",
            });

            onSuccess?.();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to create incident",
                variant: "destructive",
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Emergency Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select emergency type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            {emergencyTypes.map((type) => (
                                                <SelectItem key={type.value} value={type.value}>
                                                    {type.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Priority Level (1-5)</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select priority level" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            {[1, 2, 3, 4, 5].map((level) => (
                                                <SelectItem key={level} value={level.toString()}>
                                                    {level}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>


                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Describe the emergency situation..."
                                    className="min-h-[50px]"
                                    {...field}
                                />
                            </FormControl>
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
                                <div className="relative">
                                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input className="pl-8" placeholder="Enter address..." {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="space-y-4">
                    <h4 className="text-sm font-medium">Reporter Information (Optional)</h4>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="reporterName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Reporter's name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="reporterPhone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Phone number" type="tel" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => onSuccess()}>
                        Cancel
                    </Button>
                    <Button variant="outline" type="button" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button type="submit">Create Incident</Button>
                </div>
            </form>
        </Form>
    );
}
