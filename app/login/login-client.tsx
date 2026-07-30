"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Login, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginClient() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn("email", { email, redirect: false });
      if (res?.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-outline-variant bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Login className="text-white text-[24px]" />
            </div>
            <div>
              <h1 className="text-headline-md text-headline-md font-bold text-on-surface">Welcome back</h1>
              <p className="text-sm text-on-surface-variant">Sign in to Precision Fintech</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="founder@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending magic link..." : "Sign in with Email"}
            </Button>
          </form>

          <p className="mt-6 text-xs text-on-surface-variant text-center">
            We&apos;ll send you a magic link to sign in.
          </p>
        </div>
      </div>
    </div>
  );
}
