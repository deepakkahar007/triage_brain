"use client";

import { signIn, signUp } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ArrowRight, Key, Lock, Mail, User } from "lucide-react";
import { redirect } from "next/navigation";

const UserFormSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  displayName: z.string(),
});

type UserFormSchemaType = z.infer<typeof UserFormSchema>;

const SignInPage = () => {
  const form = useForm<UserFormSchemaType>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      displayName: "",
    },
  });

  async function onSubmit(data: UserFormSchemaType) {
    const { data: authData } = await signUp.email({
      name: data.username,
      email: data.email,
      password: data.password,
    });

    setTimeout(() => {
      redirect("/");
    }, 1000);
  }

  const handleSocialGoogleSignIn = async () => {
    const { data: authData } = await signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50/50 p-4">
      <Card className="w-full max-w-[400px] shadow-lg border-slate-200/60">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription>
            Enter your details to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* Social Sign In */}
          <Button
            variant="outline"
            className="w-full py-6 font-medium border-slate-200 hover:bg-slate-50 transition-all"
            onClick={handleSocialGoogleSignIn}
          >
            <Key className="mr-2 h-5 w-5 text-red-500" />
            Continue with Google
          </Button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500 font-medium">
                Or continue with
              </span>
            </div>
          </div>

          <form
            id="form-rhf-demo"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FieldGroup className="space-y-3">
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs font-semibold uppercase text-slate-500">
                      Username
                    </FieldLabel>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        {...field}
                        className="pl-10"
                        placeholder="johndoe"
                        autoComplete="off"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs font-semibold uppercase text-slate-500">
                      Email
                    </FieldLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        {...field}
                        className="pl-10"
                        placeholder="name@example.com"
                        autoComplete="off"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center justify-between">
                      <FieldLabel className="text-xs font-semibold uppercase text-slate-500">
                        Password
                      </FieldLabel>
                      <span className="text-xs text-primary hover:underline cursor-pointer font-medium">
                        Forgot password?
                      </span>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        {...field}
                        type="password"
                        className="pl-10"
                        placeholder="••••••••"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button
            type="submit"
            form="form-rhf-demo"
            className="w-full py-6 text-base font-semibold transition-all active:scale-[0.98]"
          >
            Sign In
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <p className="text-sm text-center text-slate-500">
            Don&apos;t have an account?{" "}
            <span className="text-primary font-semibold hover:underline cursor-pointer">
              Create one
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInPage;

// <div>
//   <Card className="w-full sm:max-w-md">
//     <CardHeader>
//       <CardTitle>Sign In</CardTitle>
//       <CardDescription>Sign In to your account</CardDescription>
//     </CardHeader>
//     <CardContent>
//       <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
//         <FieldGroup>
//           <Controller
//             name="username"
//             control={form.control}
//             render={({ field, fieldState }) => (
//               <Field data-invalid={fieldState.invalid}>
//                 <FieldLabel htmlFor="form-rhf-demo-username">
//                   Username
//                 </FieldLabel>
//                 <Input
//                   {...field}
//                   id="form-rhf-demo-username"
//                   aria-invalid={fieldState.invalid}
//                   placeholder="username"
//                   autoComplete="off"
//                 />
//                 {fieldState.invalid && (
//                   <FieldError errors={[fieldState.error]} />
//                 )}
//               </Field>
//             )}
//           />

//           <Controller
//             name="email"
//             control={form.control}
//             render={({ field, fieldState }) => (
//               <Field data-invalid={fieldState.invalid}>
//                 <FieldLabel htmlFor="form-rhf-demo-email">Email</FieldLabel>
//                 <Input
//                   {...field}
//                   id="form-rhf-demo-email"
//                   aria-invalid={fieldState.invalid}
//                   placeholder="work email"
//                   autoComplete="off"
//                 />
//                 {fieldState.invalid && (
//                   <FieldError errors={[fieldState.error]} />
//                 )}
//               </Field>
//             )}
//           />

//           <Controller
//             name="password"
//             control={form.control}
//             render={({ field, fieldState }) => (
//               <Field data-invalid={fieldState.invalid}>
//                 <FieldLabel htmlFor="form-rhf-demo-password">
//                   Password
//                 </FieldLabel>
//                 <Input
//                   {...field}
//                   id="form-rhf-demo-password"
//                   aria-invalid={fieldState.invalid}
//                   placeholder="super secret password"
//                   autoComplete="off"
//                   type="password"
//                 />
//                 <FieldDescription>
//                   To get started with the platform first start with sign in
//                   process
//                 </FieldDescription>
//                 {fieldState.invalid && (
//                   <FieldError errors={[fieldState.error]} />
//                 )}
//               </Field>
//             )}
//           />
//         </FieldGroup>
//       </form>
//     </CardContent>
//     <CardFooter>
//       <Field orientation="vertical">
//         <Button type="submit" form="form-rhf-demo">
//           Sign In
//         </Button>
//         <Button
//           type="button"
//           variant="outline"
//           onClick={() => form.reset()}
//         >
//           Reset
//         </Button>

//         <div className="flex items-center justify-center w-full gap-4">
//           <div className="border h-0.5 border-primary w-full" />
//           <span className=" font-bold">Or</span>
//           <div className="border h-0.5 border-primary w-full" />
//         </div>

//         <Button onClick={handleSocialGoogleSignIn}>
//           <Key className="mr-2 h-4 w-4" />
//           Sign In with Google
//         </Button>
//       </Field>
//     </CardFooter>
//   </Card>
// </div>
