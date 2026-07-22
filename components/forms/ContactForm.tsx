"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;
type ContactFormTranslator = ReturnType<typeof useTranslations>;

/**
 * Builds the default contact form state used for initial render and reset.
 */
function createInitialContactValues(): ContactFormValues {
  return {
    name: "",
    email: "",
    subject: "",
    message: "",
  };
}

/**
 * Validates contact form fields and returns localized, field-level errors.
 */
function validateContactValues(values: ContactFormValues, t: ContactFormTranslator): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const normalizedName = values.name.trim();
  const normalizedEmail = values.email.trim();
  const normalizedSubject = values.subject.trim();
  const normalizedMessage = values.message.trim();

  if (!normalizedName) {
    errors.name = t("validation.requiredName");
  } else if (normalizedName.length < 2) {
    errors.name = t("validation.nameTooShort");
  }

  if (!normalizedEmail) {
    errors.email = t("validation.requiredEmail");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    errors.email = t("validation.invalidEmail");
  }

  if (!normalizedSubject) {
    errors.subject = t("validation.requiredSubject");
  } else if (normalizedSubject.length < 3) {
    errors.subject = t("validation.subjectTooShort");
  }

  if (!normalizedMessage) {
    errors.message = t("validation.requiredMessage");
  } else if (normalizedMessage.length < 10) {
    errors.message = t("validation.messageTooShort");
  }

  return errors;
}

/**
 * Renders the localized contact form with client-side validation and temporary
 * submit behavior that logs payload data and displays a success toast.
 */
export function ContactForm() {
  const t = useTranslations("ContactPage.form");
  const [values, setValues] = useState<ContactFormValues>(createInitialContactValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Updates one field value and clears any stale validation message for that field.
   */
  const updateField = <K extends keyof ContactFormValues>(field: K, value: ContactFormValues[K]) => {
    setValues((previousValues) => ({ ...previousValues, [field]: value }));
    setErrors((previousErrors) => {
      if (!previousErrors[field]) {
        return previousErrors;
      }

      const nextErrors = { ...previousErrors };
      delete nextErrors[field];
      return nextErrors;
    });
  };

  /**
   * Runs validation, logs a normalized payload, and confirms submission with a toast.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateContactValues(values, t);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      subject: values.subject.trim(),
      message: values.message.trim(),
      submittedAt: new Date().toISOString(),
    };

    console.info("[ContactForm] Submitted contact payload:", payload);
    // TODO: Send this payload to Strapi and trigger notification emails for the team.
    toast.success(t("successToast"));
    setValues(createInitialContactValues());
    setErrors({});
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="contact-name">{t("nameLabel")}</FieldLabel>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
          />
          <FieldError>{errors.name}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="contact-email">{t("emailLabel")}</FieldLabel>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
          />
          <FieldError>{errors.email}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="contact-subject">{t("subjectLabel")}</FieldLabel>
          <Input
            id="contact-subject"
            name="subject"
            placeholder={t("subjectPlaceholder")}
            value={values.subject}
            onChange={(event) => updateField("subject", event.target.value)}
            aria-invalid={Boolean(errors.subject)}
          />
          <FieldError>{errors.subject}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="contact-message">{t("messageLabel")}</FieldLabel>
          <Textarea
            id="contact-message"
            name="message"
            rows={6}
            placeholder={t("messagePlaceholder")}
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
          />
          <FieldError>{errors.message}</FieldError>
        </Field>
      </FieldGroup>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? t("submitPending") : t("submit")}
      </Button>
    </form>
  );
}
