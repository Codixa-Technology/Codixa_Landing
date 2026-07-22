import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { contact } from "../../../content/contact";
import { sendContactEmail } from "../../../lib/emailjs";
import { charSpring, revealUp50, revealUp60, VIEWPORT } from "../../../lib/motion";
import { Marquee } from "../../primitives/Marquee/Marquee";
import { SplitText } from "../../primitives/SplitText/SplitText";
import styles from "./Contact.module.css";

type Status = "idle" | "sending" | "sent" | "error";

/** Contact: watermark headline over a dark card holding the enquiry form. */
export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const data = new FormData(event.currentTarget);
    const form = event.currentTarget;
    setStatus("sending");

    try {
      await sendContactEmail({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        message: String(data.get("message") ?? ""),
      });
      form.reset();
      setStatus("sent");
    } catch (error) {
      console.error("Contact form failed to send", error);
      setStatus("error");
    }
  };

  const submitLabel =
    status === "sending"
      ? "Sending…"
      : status === "sent"
        ? "Sent — thank you!"
        : contact.submitLabel;

  return (
    <section className={styles.root} id="contact">
      <motion.div
        className={styles.heading}
        variants={revealUp60}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        <div className={styles.textBox}>
          <h2 className={`t t-displayXl ${styles.watermark}`}>
            <span className={styles.watermarkFill}>{contact.watermark}</span>
          </h2>
        </div>
      </motion.div>

      <motion.div
        className={styles.bottom}
        variants={revealUp50}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        <div className={styles.card}>
          <img className={styles.cardBackground} src={contact.background} alt="" aria-hidden="true" />

          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.left}>
                <SplitText
                  as="h3"
                  text={contact.heading}
                  className={`t t-h2 ${styles.title}`}
                  trigger="view"
                  transition={charSpring}
                />
                <p className={`t t-label ${styles.subtitle}`}>{contact.subheading}</p>
              </div>

              <div className={styles.right}>
                <form className={styles.form} onSubmit={handleSubmit}>
                  {contact.fields.map((field) => (
                    <div key={field.id} className={styles.field}>
                      <label className={`t t-label ${styles.label}`} htmlFor={`contact-${field.id}`}>
                        {field.label}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea
                          id={`contact-${field.id}`}
                          name={field.id}
                          className={`${styles.input} ${styles.textarea}`}
                          placeholder={field.placeholder}
                          required
                        />
                      ) : (
                        <input
                          id={`contact-${field.id}`}
                          name={field.id}
                          type={field.type}
                          className={styles.input}
                          placeholder={field.placeholder}
                          required
                        />
                      )}
                    </div>
                  ))}

                  <button type="submit" className={styles.submit} disabled={status === "sending"}>
                    <span className={`t t-labelMd ${styles.submitLabel}`}>{submitLabel}</span>
                  </button>

                  {status === "error" && (
                    <p className={`t t-label ${styles.formError}`} role="alert">
                      Something went wrong. Please try again or email us at {contact.email}.
                    </p>
                  )}
                </form>
              </div>
            </div>

            <div className={styles.emails} aria-hidden="true">
              <Marquee gap={32} speed={50} itemHeight={40}>
                {[0, 1, 2, 3].map((index) => (
                  <span key={index} className={styles.emailCard}>
                    <img className={styles.emailIcon} src={contact.marqueeIcon} alt="" />
                    <span className={`t t-h5 ${styles.emailText}`}>
                      {contact.email.split("@")[0]}
                      <span className={styles.emailAt}>@</span>
                      {contact.email.split("@")[1]}
                    </span>
                  </span>
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
