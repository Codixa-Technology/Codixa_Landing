import { serviceSlugs, type ServiceSlug } from "@/content/types";
import type { IconName } from "@/components/ui/Icon";

/** Locale-independent service configuration: order, icon and related links. */
export const serviceConfig: Record<ServiceSlug, { icon: IconName; related: ServiceSlug[] }> = {
  "website-development": { icon: "website", related: ["ui-ux-design", "ecommerce-development", "maintenance-support"] },
  "web-application-development": { icon: "modules", related: ["custom-software-development", "ui-ux-design", "business-automation"] },
  "ecommerce-development": { icon: "cart", related: ["website-development", "business-automation", "maintenance-support"] },
  "crm-development": { icon: "crm", related: ["business-automation", "custom-software-development", "web-application-development"] },
  "business-automation": { icon: "integrations", related: ["crm-development", "custom-software-development", "web-application-development"] },
  "custom-software-development": { icon: "code", related: ["web-application-development", "crm-development", "business-automation"] },
  "ui-ux-design": { icon: "design", related: ["website-development", "web-application-development", "ecommerce-development"] },
  "maintenance-support": { icon: "settings", related: ["website-development", "web-application-development", "ecommerce-development"] },
};

export { serviceSlugs };
export const isServiceSlug = (value: string): value is ServiceSlug =>
  (serviceSlugs as readonly string[]).includes(value);
