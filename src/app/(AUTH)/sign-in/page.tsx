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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Key } from "lucide-react";
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

    console.log(authData);

    setTimeout(() => {
      redirect("/");
    }, 1000);
  }

  const handleSocialGoogleSignIn = async () => {
    const { data: authData } = await signIn.social({
      provider: "google",
    });

    console.log(authData);
  };

  return (
    <div>
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Sign In to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-username">
                      Username
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-username"
                      aria-invalid={fieldState.invalid}
                      placeholder="username"
                      autoComplete="off"
                    />
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
                    <FieldLabel htmlFor="form-rhf-demo-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="work email"
                      autoComplete="off"
                    />
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
                    <FieldLabel htmlFor="form-rhf-demo-password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-password"
                      aria-invalid={fieldState.invalid}
                      placeholder="super secret password"
                      autoComplete="off"
                      type="password"
                    />
                    <FieldDescription>
                      To get started with the platform first start with sign in
                      process
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="vertical">
            <Button type="submit" form="form-rhf-demo">
              Sign In
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>

            <div className="flex items-center justify-center w-full gap-4">
              <div className="border h-0.5 border-primary w-full" />
              <span className=" font-bold">Or</span>
              <div className="border h-0.5 border-primary w-full" />
            </div>

            <Button onClick={handleSocialGoogleSignIn}>
              <Key className="mr-2 h-4 w-4" />
              Sign In with Google
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInPage;
