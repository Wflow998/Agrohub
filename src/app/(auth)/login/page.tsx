import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  // Note: This is a server component, so we can't use the hook directly
  // In a real app, we would use a server-side translation solution
  // For demo purposes, we'll use the client component for translations
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">AgroHub</h1>
          <p className="text-muted-foreground">
            Agricultural Social Network for Africa
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
