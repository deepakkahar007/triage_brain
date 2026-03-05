"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
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
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { PLANS } from "@/constant";
import { useSession } from "@/lib/auth-client";
import {
  createOrganization,
  setActiveOrganizationId,
} from "@/actions/authServerActions";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const CreateOrgFormSchema = z.object({
  name: z.string(),
  userId: z.string(),
  plan: z.enum(["free", "starter", "pro"]),
});

type CreateOrgFormSchemaType = z.infer<typeof CreateOrgFormSchema>;

const getTicketQuota = (plan: string) => {
  switch (plan) {
    case "free":
      return 500;
    case "starter":
      return 5000;
    case "pro":
      return 10000;

    default:
      return 500;
  }
};

const CreateOrganizationForm = () => {
  const { data: session } = useSession();

  const form = useForm<CreateOrgFormSchemaType>({
    resolver: zodResolver(CreateOrgFormSchema),
    defaultValues: {
      name: "",
      plan: "free",
      userId: "",
    },
  });

  async function onSubmit(data: CreateOrgFormSchemaType) {
    const res = await createOrganization({
      name: data.name,
      slug: data.name,
      plan: data.plan,
      ticket_quota: getTicketQuota(data.plan),
      userId: session?.user.id || "no id found",
    });

    if (res.status) {
      toast.success(res?.data?.message);
      form.reset();

      await setActiveOrganizationId(res.data?.id || "");

      setTimeout(() => {
        redirect("/home");
      }, 500);
    } else {
      toast.error("Something went wrong");
    }
  }

  return (
    <div>
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Create Organization</CardTitle>
          <CardDescription>
            Help us improve by reporting bugs you encounter.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-name">
                      Bug name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Login button not working on mobile"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="plan"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="responsive"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldContent>
                      <FieldLabel htmlFor="form-rhf-plans">
                        Select Plan
                      </FieldLabel>
                      <FieldDescription>
                        select the best plan for your organization
                      </FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="form-rhf-plans"
                        aria-invalid={fieldState.invalid}
                        className="min-w-[120px]"
                      >
                        <SelectValue placeholder="Select plans" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        {PLANS.map((plan, idx) => (
                          <SelectItem key={idx} value={plan.title}>
                            {plan.title} - {plan.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" form="form-rhf-demo">
              Submit
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateOrganizationForm;
