import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination from location state, or default to home page
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://firestationswebaplication-production.up.railway.app/api/v1/users/sendotp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Something went wrong");
      }

      setOtpSent(true);
      toast.success("OTP sent to your email!");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://firestationswebaplication-production.up.railway.app/api/v1/users/verifyotp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: form.email, otp }),
        }
      );

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Invalid OTP");
      }

      const data = await response.json();
      localStorage.setItem("isAuthenticated", "true");
      toast.success("Successfully logged in!");
      
      console.log(data)
      // Navigate to the intended destination
      navigate("/", { replace: true });
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg  shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {error && (
          <div className="mb-4 p-3 rounded bg-destructive/15 text-destructive text-sm text-center">
            {error}
          </div>
        )}
        {!otpSent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="mt-1"
                autoFocus
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <Label htmlFor="otp">OTP Code</Label>
              <Input
                id="otp"
                name="otp"
                type="text"
                required
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter the OTP code"
                className="mt-1"
                autoFocus
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </form>
        )}
        {!otpSent && (
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary underline">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
