// src/app/utils/projectMeta.ts
import type { ProjectMeta, FieldConfig } from "@/types/projectMeta";
import {
  GLOBAL_DEFAULTS,
  BRANCH_DEFAULTS,
  type Branch,
} from "@/utils/projectDefaults";
import { PROJECTS } from "@/utils/projectOverrides";

/* ---------------- core merge ---------------- */
function mergeBranch(branch: Branch, override?: Partial<ProjectMeta>): ProjectMeta {
  return {
    ...GLOBAL_DEFAULTS,
    ...BRANCH_DEFAULTS[branch],
    ...(override ?? {}),
  } as ProjectMeta;
}

export const projectMetaMap: Record<string, ProjectMeta> = Object.fromEntries(
  Object.entries(PROJECTS).map(([slug, { branch, override }]) => [
    slug,
    mergeBranch(branch, override),
  ])
);

export function getProjectMeta(slug: string): ProjectMeta {
  const meta = projectMetaMap[slug];
  if (meta) return meta;

  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "[projectMeta] Fallback meta used for slug:",
      slug,
      "Available slugs:",
      Object.keys(projectMetaMap)
    );
  }

  return {
    ...GLOBAL_DEFAULTS,
    ...BRANCH_DEFAULTS.auh,
    remarks: `Unregistered project slug: ${slug}`,
  };
}

export function visibleExtraFields(
  meta: ProjectMeta | undefined,
  utmCampaign?: string
): FieldConfig[] {
  const list = meta?.form?.extraFields ?? [];
  if (!list.length) return [];
  if (!utmCampaign) return list.filter((f) => !f.showIfUtm || f.showIfUtm.length === 0);
  return list.filter((f) => !f.showIfUtm || f.showIfUtm.includes(utmCampaign));
}

export function defaultsForExtraFields(fields: FieldConfig[]): Record<string, unknown> {
  const dv: Record<string, unknown> = {};
  for (const f of fields) {
    if (typeof f.defaultValue !== "undefined") dv[f.id] = f.defaultValue;
  }
  return dv;
}

export function applyExtraFieldsToPayload(
  payload: Record<string, unknown>,
  fields: FieldConfig[],
  formData: Record<string, unknown>
): void {
  const setDeep = (obj: Record<string, unknown>, path: string, value: unknown) => {
    const parts = path.split(".");
    let cur: Record<string, unknown> = obj;

    for (let i = 0; i < parts.length; i++) {
      const key = parts[i];

      if (i === parts.length - 1) {
        cur[key] = value;
        return;
      }

      const next = cur[key];
      if (typeof next === "object" && next !== null && !Array.isArray(next)) {
        cur = next as Record<string, unknown>;
      } else {
        cur[key] = {};
        cur = cur[key] as Record<string, unknown>;
      }
    }
  };

  for (const f of fields) {
    if (!f.payloadKey) continue;
    if (!(f.id in formData)) continue;
    setDeep(payload, f.payloadKey, formData[f.id]);
  }
}

export function appendExtrasToRemarks(
  baseHtmlRemark: string,
  fields: FieldConfig[],
  formData: Record<string, unknown>
): string {
  let out = baseHtmlRemark;

  for (const f of fields) {
    const v = formData[f.id];
    if (typeof v === "undefined") continue;

    const label = f.label ?? f.labelKey ?? f.id;
    out += `</br>${label}: ${String(v)}`;
  }

  return out;
}
