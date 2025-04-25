import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const districts = [
  "Central Delhi",
  "East Delhi",
  "New Delhi",
  "North Delhi",
  "North East Delhi",
  "North West Delhi",
  "Shahdara",
  "South Delhi",
  "South East Delhi",
  "South West Delhi",
  "West Delhi",
];

const roles = ["Admin", "User"];

const fields = [
  { name: "fullName", type: "text", placeholder: "Full Name" },
  { name: "fireStation", type: "text", placeholder: "Fire Station" },
  { name: "mobile", type: "text", placeholder: "Mobile" },
  { name: "email", type: "email", placeholder: "Email" },
  { name: "designation", type: "text", placeholder: "Designation" },
  { name: "pisNo", type: "text", placeholder: "PIS No" },
  { name: "password", type: "password", placeholder: "Password" },
  { name: "confirmPassword", type: "password", placeholder: "Confirm Password" },
];

export default function Signup() {
  const [form, setForm] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {
      district: "",
      role: "",
      avatar: null, // State for the profile image
    })
  );
console.log(form);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDistrictChange = (value: string) => {
    setForm({ ...form, district: value });
  };

  const handleRoleChange = (value: string) => {
    setForm({ ...form, role: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, avatar: file });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (form.password !== form.confirmPassword) {
    //   alert("Passwords do not match!");
    //   return;
    // }

    const formData = new FormData();
    for (const key in form) {
      if (key === "avatar" && form.avatar) {
        formData.append("avatar", form.avatar);
      } else {
        formData.append(key, form[key]);
      }
    }

    try {
      const response = await fetch("https://firestationswebaplication-production.up.railway.app/api/v1/users/register", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("User registered successfully");
        setForm(fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), { district: "", role: "", avatar: null }));
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while registering the user");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mt-1 max-md:mt-0">
        <div className="w-full max-w-xl rounded-lg border-[1px] px-8 py-4">
          <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.name} className="col-span-2 sm:col-span-1">
                <Label htmlFor={field.name}>{field.placeholder}</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                />
              </div>
            ))}
            <div className="col-span-2 sm:col-span-1">
              <Label htmlFor="district">District</Label>
              <Select onValueChange={handleDistrictChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Label htmlFor="role">Role</Label>
              <Select onValueChange={handleRoleChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Label htmlFor="avatar">Profile Image</Label>
              <Input
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div className="col-span-2">
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </div>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}