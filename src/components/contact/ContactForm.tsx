"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { FormContent } from "@/content/types";
import { EmailNotConfiguredError, sendContactEmail } from "@/lib/emailjs";
import { Icon } from "../ui/Icon";
import styles from "./ContactForm.module.css";

const MIN_MESSAGE = 20;
/** Submissions faster than this are almost certainly automated. */
const MIN_FILL_MS = 2500;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type FieldName = "name" | "email" | "message";
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "sending" | "success" | "error" | "unconfigured";

interface ContactFormProps {
  locale: string;
  content: FormContent;
  serviceOptions: { value: string; label: string }[];
  email: string;
  privacyHref: string;
}

export function ContactForm({ locale, content, serviceOptions, email, privacyHref }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const startedAt = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const { fields, validation: v } = content;

  // The fill-time clock starts when the form appears.
  useEffect(() => {
    startedAt.current = Date.now();
  }, [status]);

  const validate = (data: FormData): Errors => {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const mail = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name) next.name = v.nameRequired;
    if (!mail) next.email = v.emailRequired;
    else if (!EMAIL_RE.test(mail)) next.email = v.emailInvalid;
    if (!message) next.message = v.messageRequired;
    else if (message.length < MIN_MESSAGE) next.message = v.messageTooShort.replace("{min}", String(MIN_MESSAGE));
    return next;
  };

  /**
   * Re-validate a field while the user types once it has an error, so messages
   * clear as soon as the value is fixed. (Doing this on blur would shift the
   * layout under the pointer when the user clicks Submit.)
   */
  const revalidate = (field: FieldName) => {
    if (!errors[field] || !formRef.current) return;
    const next = validate(new FormData(formRef.current));
    setErrors((current) => ({ ...current, [field]: next[field] }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);

    const nextErrors = validate(data);
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as FieldName[])[0];
    if (firstInvalid) {
      summaryRef.current?.focus();
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    // Spam protection: hidden honeypot field and a minimum human fill time.
    const isBot = String(data.get("website") ?? "") !== "" || Date.now() - startedAt.current < MIN_FILL_MS;
    setStatus("sending");
    try {
      if (!isBot) {
        const serviceValue = String(data.get("service") ?? "");
        await sendContactEmail({
          name: String(data.get("name")).trim(),
          email: String(data.get("email")).trim(),
          company: String(data.get("company") ?? "").trim(),
          service: serviceOptions.find((o) => o.value === serviceValue)?.label ?? "",
          message: String(data.get("message")).trim(),
          locale,
        });
      }
      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus(error instanceof EmailNotConfiguredError ? "unconfigured" : "error");
    }
    requestAnimationFrame(() => resultRef.current?.focus());
  };

  if (status === "success") {
    return (
      <div ref={resultRef} tabIndex={-1} className={styles.success} role="status">
        <span className={styles.successIcon} aria-hidden="true">
          <Icon name="check" size={28} strokeWidth={2.2} />
        </span>
        <h2 className="t-h3">{content.successTitle}</h2>
        <p className="t-body">{content.successText}</p>
        <button type="button" className={styles.again} onClick={() => setStatus("idle")}>
          {content.sendAnother}
        </button>
      </div>
    );
  }

  const errorList = Object.values(errors).filter(Boolean);
  const [consentBefore, consentAfter] = content.consent.split("{privacy}");
  const sending = status === "sending";

  const fieldProps = (name: FieldName) => ({
    id: `cf-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `cf-${name}-error` : undefined,
    onChange: () => revalidate(name),
  });

  const fieldError = (name: FieldName) =>
    errors[name] ? (
      <p id={`cf-${name}-error`} className={styles.error}>
        <Icon name="alert" size={16} />
        {errors[name]}
      </p>
    ) : null;

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate aria-busy={sending}>
      <div ref={summaryRef} tabIndex={-1} className={styles.summary} role="alert" aria-live="assertive">
        {errorList.length > 0 && (
          <p>
            <Icon name="alert" size={18} />
            {v.summary}
          </p>
        )}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="cf-name" className={styles.label}>
            {fields.name.label} <span aria-hidden="true">*</span>
          </label>
          <input {...fieldProps("name")} type="text" autoComplete="name" required placeholder={fields.name.placeholder} className={styles.input} />
          {fieldError("name")}
        </div>
        <div className={styles.field}>
          <label htmlFor="cf-email" className={styles.label}>
            {fields.email.label} <span aria-hidden="true">*</span>
          </label>
          <input
            {...fieldProps("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder={fields.email.placeholder}
            className={styles.input}
          />
          {fieldError("email")}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="cf-company" className={styles.label}>
            {fields.company.label} <span className={styles.optional}>{content.optional}</span>
          </label>
          <input id="cf-company" name="company" type="text" autoComplete="organization" placeholder={fields.company.placeholder} className={styles.input} />
        </div>
        <div className={styles.field}>
          <label htmlFor="cf-service" className={styles.label}>
            {fields.service.label} <span className={styles.optional}>{content.optional}</span>
          </label>
          <div className={styles.selectWrap}>
            <select id="cf-service" name="service" defaultValue="" className={`${styles.input} ${styles.select}`}>
              <option value="">{fields.service.placeholder}</option>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <svg className={styles.chevron} viewBox="0 0 24 24" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="cf-message" className={styles.label}>
          {fields.message.label} <span aria-hidden="true">*</span>
        </label>
        <textarea {...fieldProps("message")} rows={6} required placeholder={fields.message.placeholder} className={`${styles.input} ${styles.textarea}`} />
        {fieldError("message")}
      </div>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div className={styles.trap} aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className={styles.consent}>
        {consentBefore}
        <Link href={privacyHref} className="link">
          {content.privacyLinkText}
        </Link>
        {consentAfter}
      </p>

      {(status === "error" || status === "unconfigured") && (
        <div ref={resultRef} tabIndex={-1} className={styles.failure} role="alert">
          <Icon name="alert" size={20} />
          <div>
            {status === "error" && <p className={styles.failureTitle}>{content.errorTitle}</p>}
            <p>
              {(status === "error" ? content.errorText : content.notConfigured).split("{email}")[0]}
              <a className="link" href={`mailto:${email}`}>
                {email}
              </a>
              {(status === "error" ? content.errorText : content.notConfigured).split("{email}")[1]}
            </p>
          </div>
        </div>
      )}

      <button type="submit" className={styles.submit} disabled={sending}>
        {sending && <span className={styles.spinner} aria-hidden="true" />}
        <span>{sending ? content.sending : content.submit}</span>
        {!sending && <Icon name="arrowRight" size={18} strokeWidth={2.1} />}
      </button>
    </form>
  );
}
