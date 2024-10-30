'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  value: z.number().min(0, "Value must be a positive number"),
  timestamp: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, "Invalid timestamp format"),
  category: z.enum(["engagement", "acquisition", "revenue", "feature"]),
  granularity: z.enum(["daily", "hourly", "minute"]),
  source: z.string().optional(),
  metadata: z.record(z.string(), z.any()).default({}),
  tags: z.array(z.string()).default([]),
});

export type MetricFormData = z.infer<typeof formSchema>;

interface MetricFormProps {
  initialData?: MetricFormData;
  onSubmit: (data: MetricFormData) => Promise<void>;
  submitButtonText: string;
}

export default function MetricForm({ initialData, onSubmit, submitButtonText }: MetricFormProps) {
  const form = useForm<MetricFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: 0,
      timestamp: new Date().toISOString().slice(0, 16),
      category: "engagement",
      granularity: "daily",
      source: "",
      metadata: {},
      tags: [],
    },
  });

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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timestamp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timestamp</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["engagement", "acquisition", "revenue", "feature"].map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="granularity"
          render={({ field }) => (
            <FormItem>
                <FormLabel>Granularity</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a granularity" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {["daily", "hourly", "minute"].map((granularity) => (
                        <SelectItem key={granularity} value={granularity}>
                        {granularity.charAt(0).toUpperCase() + granularity.slice(1)}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem>
                <FormLabel>Source</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a source" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {["api", "web", "mobile"].map((source) => (
                        <SelectItem key={source} value={source}>
                        {source.charAt(0).toUpperCase() + source.slice(1)}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (comma-separated)</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  value={field.value.join(', ')}
                  onChange={(e) => field.onChange(e.target.value.split(',').map(tag => tag.trim()))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">{submitButtonText}</Button>
      </form>
    </Form>
  );
}
