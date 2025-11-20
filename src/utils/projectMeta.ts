// src/app/utils/projectMeta.ts
import type { ProjectMeta, FieldConfig } from "@/types/projectMeta";
import { GLOBAL_DEFAULTS, BRANCH_DEFAULTS, type Branch } from "@/utils/projectDefaults";
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
export function visibleExtraFields(meta: ProjectMeta | undefined, utmCampaign?: string): FieldConfig[] {
  const list = meta?.form?.extraFields ?? [];
  if (!list.length) return [];
  if (!utmCampaign) return list.filter(f => !f.showIfUtm || f.showIfUtm.length === 0);
  return list.filter(f => !f.showIfUtm || f.showIfUtm.includes(utmCampaign));
}
export function defaultsForExtraFields(fields: FieldConfig[]): Record<string, any> {
  const dv: Record<string, any> = {};
  for (const f of fields) {
    if (typeof f.defaultValue !== "undefined") dv[f.id] = f.defaultValue as any;
  }
  return dv;
}
export function applyExtraFieldsToPayload(
  payload: Record<string, any>,
  fields: FieldConfig[],
  formData: Record<string, any>
): void {
  const setDeep = (obj: any, path: string, value: unknown) => {
    const parts = path.split(".");
    let cur = obj;
    parts.forEach((p, i) => {
      if (i === parts.length - 1) cur[p] = value;
      else cur = cur[p] ??= {};
    });
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
  formData: Record<string, any>
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
