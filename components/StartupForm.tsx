"use client";

import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);

      if (result.status == "SUCCESS") {
        toast({
          title: "Success!",
          description: "Your startup pitch has been created successfully",
        });

        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        setErrors(fieldErrors as unknown as Record<string, string>);

        toast({
          title: "Validation Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <div className="section-container">
      <form action={formAction} className="form-container">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Startup Title
          </label>
          <Input
            id="title"
            name="title"
            className="form-input focus-ring"
            required
            placeholder="Enter your startup name"
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <p id="title-error" className="form-error" role="alert">
              {errors.title}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            className="form-textarea focus-ring"
            required
            placeholder="Briefly describe your startup and what problem it solves"
            aria-describedby={errors.description ? "description-error" : undefined}
          />
          {errors.description && (
            <p id="description-error" className="form-error" role="alert">
              {errors.description}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <Input
            id="category"
            name="category"
            className="form-input focus-ring"
            required
            placeholder="e.g., Technology, Healthcare, Education, Finance"
            aria-describedby={errors.category ? "category-error" : undefined}
          />
          {errors.category && (
            <p id="category-error" className="form-error" role="alert">
              {errors.category}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="link" className="form-label">
            Image URL
          </label>
          <Input
            id="link"
            name="link"
            type="url"
            className="form-input focus-ring"
            required
            placeholder="https://example.com/your-startup-image.jpg"
            aria-describedby={errors.link ? "link-error" : undefined}
          />
          {errors.link && (
            <p id="link-error" className="form-error" role="alert">
              {errors.link}
            </p>
          )}
        </div>

        <div className="form-group" data-color-mode="light">
          <label htmlFor="pitch" className="form-label">
            Detailed Pitch
          </label>
          <div className="mt-2">
            <MDEditor
              value={pitch}
              onChange={(value: string) => setPitch(value as string)}
              id="pitch"
              preview="edit"
              height={300}
              style={{ 
                borderRadius: '0.75rem', 
                overflow: 'hidden',
                border: '1px solid #d4d4d4'
              }}
              textareaProps={{
                placeholder: "Provide a detailed explanation of your startup idea, business model, target market, and what makes it unique...",
                style: { fontSize: '14px', lineHeight: '1.5' }
              }}
              previewOptions={{
                disallowedElements: ["style"],
              }}
            />
          </div>
          {errors.pitch && (
            <p className="form-error" role="alert">
              {errors.pitch}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="form-button focus-ring"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Creating Pitch...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Submit Your Pitch
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default StartupForm;