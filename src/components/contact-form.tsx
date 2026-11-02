"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { contactFormAction } from "@/app/actions/contact";
import {
  contactFormSchema,
  serviceOptions,
  currencyOptions,
  OTHER_SERVICE,
  type ContactFormValues,
} from "@/lib/validations/contact";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: "",
      serviceOther: "",
      budgetCurrency: "USD",
      budgetMin: "",
      budgetMax: "",
      message: "",
      website: "",
    },
  });

  const service = useWatch({ control: form.control, name: "service" });
  const currency = useWatch({ control: form.control, name: "budgetCurrency" });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const result = await contactFormAction(values);
      if (result.success) {
        toast.success("Message sent. We’ll get back to you soon.");
        form.reset();
      } else {
        toast.error(result.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Your name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="you@example.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Company / business name{" "}
                <span className="font-normal text-muted-foreground">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Your business name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service needed</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {serviceOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {service === OTHER_SERVICE && (
          <FormField
            name="serviceOther"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What service do you need?</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. A booking system for our clinic" autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium leading-none">
            Budget range{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </legend>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-[8.5rem_minmax(0,1fr)_minmax(0,1fr)]">
            <FormField
              name="budgetCurrency"
              render={({ field }) => (
                <FormItem className="col-span-2 sm:col-span-1">
                  <FormLabel className="sr-only">Currency</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger aria-label="Currency">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {currencyOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="budgetMin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Minimum budget ({currency})</FormLabel>
                  <FormControl>
                    <Input {...field} inputMode="decimal" placeholder={`From (${currency})`} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="budgetMax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Maximum budget ({currency})</FormLabel>
                  <FormControl>
                    <Input {...field} inputMode="decimal" placeholder={`To (${currency})`} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Leave blank if you&rsquo;re not sure yet. We&rsquo;ll suggest options that fit.
          </p>
        </fieldset>

        <FormField
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Tell us about your project..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Honeypot field: hidden, left empty by real users. */}
        <input
          type="text"
          {...form.register("website")}
          autoComplete="off"
          style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }}
          tabIndex={-1}
          aria-hidden="true"
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8"
        >
          {isSubmitting ? "Sending..." : "Get a quote"}
        </Button>
      </form>
    </Form>
  );
}
