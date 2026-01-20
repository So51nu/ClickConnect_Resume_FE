// import React from "react";

// const SECTION_LABELS: Record<string, string> = {
//   header: "HEADER",
//   contacts: "CONTACT",
//   summary: "SUMMARY",
//   experience: "EXPERIENCE",
//   education: "EDUCATION",
//   skills: "SKILLS",
//   projects: "PROJECTS",
//   certifications: "CERTIFICATIONS",
//   languages: "LANGUAGES",
//   interests: "INTERESTS",
//   strengths: "STRENGTHS",
//   achievements: "ACHIEVEMENTS",
//   courses: "COURSES",
//   sidebarProfile: "PROFILE",
// };

// function muted(theme: any) {
//   return theme?.mutedColor || "#6b7280";
// }

// function enabled(sections: any, id: string) {
//   const v = sections?.[id]?.enabled;
//   return v !== false;
// }

// function labelOf(sections: any, id: string) {
//   return sections?.[id]?.label || SECTION_LABELS[id] || id.toUpperCase();
// }

// function patternBg(pattern?: string | null) {
//   if (!pattern) return undefined;

//   if (pattern === "dots") {
//     return {
//       backgroundImage: "radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)",
//       backgroundSize: "14px 14px",
//     };
//   }
//   if (pattern === "lines") {
//     return {
//       backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
//       backgroundSize: "100% 14px",
//     };
//   }
//   if (pattern === "grid") {
//     return {
//       backgroundImage:
//         "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
//       backgroundSize: "18px 18px",
//     };
//   }
//   if (pattern === "diagonal") {
//     return {
//       backgroundImage: "repeating-linear-gradient(45deg, rgba(0,0,0,0.06) 0 1px, transparent 1px 10px)",
//     };
//   }
//   return undefined;
// }

// function paperStyle(theme: any): React.CSSProperties {
//   const pv = theme?.paperVariant || "plain";
//   const radius = theme?.cardRadius ?? 12;
//   const padding = theme?.cardPadding ?? 32;

//   const base: React.CSSProperties = {
//     width: "794px",
//     minHeight: "1123px",
//     background: "white",
//     boxSizing: "border-box",
//     borderRadius: pv === "plain" ? 0 : radius,
//     padding: padding,
//     margin: "0 auto",
//   };

//   if (pv === "plain") return base;
//   if (pv === "card") return { ...base, boxShadow: "0 10px 28px rgba(0,0,0,0.10)" };
//   if (pv === "soft") return { ...base, boxShadow: "0 8px 22px rgba(15,23,42,0.08)" };
//   if (pv === "borderLeft") return { ...base, borderLeft: `10px solid ${theme?.primary || "#2563eb"}` };
//   if (pv === "borderTop") return { ...base, borderTop: `10px solid ${theme?.primary || "#2563eb"}` };
//   return base;
// }

// function sectionTitleStyle(theme: any): React.CSSProperties {
//   const primary = theme?.primary || "#2563eb";
//   const v = theme?.headingVariant || "underline";
//   const upper = theme?.headingUppercase !== false;

//   const common: React.CSSProperties = {
//     fontSize: `${theme?.titleSize ?? 12}pt`,
//     fontWeight: 900,
//     letterSpacing: "0.06em",
//     textTransform: upper ? "uppercase" : "none",
//     margin: "16px 0 10px",
//   };

//   if (v === "underline") return { ...common, color: primary, borderBottom: `2px solid ${primary}`, paddingBottom: 6 };
//   if (v === "bar") return { ...common, color: "#111827", borderLeft: `6px solid ${primary}`, paddingLeft: 10 };
//   if (v === "pill")
//     return { ...common, color: "#fff", background: primary, display: "inline-block", padding: "6px 12px", borderRadius: 999 };
//   if (v === "boxed")
//     return { ...common, color: primary, border: `2px solid ${primary}`, display: "inline-block", padding: "6px 10px", borderRadius: 10 };
//   if (v === "leftBorder") return { ...common, color: "#111827", borderLeft: `3px solid ${primary}`, paddingLeft: 10 };
//   if (v === "double")
//     return { ...common, color: primary, borderTop: `2px solid ${primary}`, borderBottom: `2px solid ${primary}`, padding: "6px 0" };

//   return { ...common, color: primary, borderBottom: `2px solid ${primary}`, paddingBottom: 6 };
// }

// function bodyStyle(theme: any): React.CSSProperties {
//   return {
//     fontSize: `${theme?.bodySize ?? 10}pt`,
//     lineHeight: theme?.lineHeight ?? 1.45,
//     color: theme?.textColor || "#111827",
//     fontFamily: theme?.fontFamily || "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
//   };
// }

// function HeaderBlock({ theme, data }: any) {
//   const hv = theme?.headerVariant || "split";
//   const primary = theme?.primary || "#2563eb";
//   const h = data?.header || {};

//   const info = [
//     h.email ? `Email: ${h.email}` : "",
//     h.phone ? `Phone: ${h.phone}` : "",
//     h.location ? `Location: ${h.location}` : "",
//     h.linkedin ? `LinkedIn: ${h.linkedin}` : "",
//     h.website ? `Website: ${h.website}` : "",
//   ].filter(Boolean);

//   if (hv === "banner") {
//     return (
//       <div style={{ marginBottom: 18 }}>
//         <div style={{ background: primary, color: "white", padding: "16px 18px", borderRadius: 14 }}>
//           <div style={{ fontSize: 26, fontWeight: 950 }}>{h.fullName || ""}</div>
//           <div style={{ fontSize: 13, fontWeight: 800, opacity: 0.95, marginTop: 4 }}>{h.jobTitle || ""}</div>
//         </div>
//         <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10, fontSize: 11, color: muted(theme) }}>
//           {info.map((x: string, i: number) => <span key={i}>{x}</span>)}
//         </div>
//       </div>
//     );
//   }

//   if (hv === "centered") {
//     return (
//       <div style={{ textAlign: "center", marginBottom: 18 }}>
//         <div style={{ fontSize: 28, fontWeight: 950, color: primary }}>{h.fullName || ""}</div>
//         <div style={{ fontSize: 13, fontWeight: 800, color: "#374151", marginTop: 6 }}>{h.jobTitle || ""}</div>
//         <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10, marginTop: 10, fontSize: 11, color: muted(theme) }}>
//           {info.map((x: string, i: number) => <span key={i}>{x}</span>)}
//         </div>
//       </div>
//     );
//   }

//   if (hv === "minimal") {
//     return (
//       <div style={{ marginBottom: 14 }}>
//         <div style={{ fontSize: 26, fontWeight: 950, color: "#111827" }}>{h.fullName || ""}</div>
//         <div style={{ fontSize: 13, fontWeight: 800, color: primary, marginTop: 4 }}>{h.jobTitle || ""}</div>
//         <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10, fontSize: 11, color: muted(theme) }}>
//           {info.map((x: string, i: number) => <span key={i}>{x}</span>)}
//         </div>
//       </div>
//     );
//   }

//   // split / classic
//   return (
//     <div style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 16 }}>
//       <div>
//         <div style={{ fontSize: 28, fontWeight: 950, color: primary }}>{h.fullName || ""}</div>
//         <div style={{ fontSize: 13, fontWeight: 800, color: "#374151", marginTop: 6 }}>{h.jobTitle || ""}</div>
//       </div>
//       <div style={{ fontSize: 11, color: muted(theme), display: "grid", gap: 6, textAlign: "right" }}>
//         {info.map((x: string, i: number) => <div key={i}>{x}</div>)}
//       </div>
//     </div>
//   );
// }

// function AvatarBlock({ theme, data }: any) {
//   const primary = theme?.primary || "#2563eb";
//   const url = data?.header?.photoUrl || "";

//   return (
//     <div style={{ marginBottom: 12, display: "grid", placeItems: "center" }}>
//       <div
//         style={{
//           width: 110,
//           height: 110,
//           borderRadius: 999,
//           border: `3px solid ${primary}`,
//           overflow: "hidden",
//           background: "#f1f5f9",
//         }}
//       >
//         {url ? (
//           <img src={url} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//         ) : (
//           <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", color: muted(theme), fontWeight: 900 }}>
//             PHOTO
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default function ResumePreview({ schema, data }: { schema?: any; data?: any }) {
//   const s = schema || {};
//   const theme = s.theme || {};
//   const sections = s.sections || {};
//   const layout = s.layout || "Single Column";
//   const resumeData = data || {};

//   const Paper: React.FC<{ children: any }> = ({ children }) => (
//     <div style={{ ...paperStyle(theme), ...patternBg(theme?.pattern), ...bodyStyle(theme) }}>{children}</div>
//   );

//   const Block: React.FC<{ id: string; children: any }> = ({ id, children }) => (
//     <div style={{ marginBottom: 10 }}>
//       <div style={sectionTitleStyle(theme)}>{labelOf(sections, id)}</div>
//       <div>{children}</div>
//     </div>
//   );

//   const renderList = (id: string, items: any[]) => (
//     <Block id={id}>
//       <div style={{ display: "grid", gap: 6 }}>
//         {(items || []).map((x: any, idx: number) => (
//           <div key={idx} style={{ fontSize: "10pt" }}>
//             • {typeof x === "string" ? x : x?.title || x?.name || ""}
//           </div>
//         ))}
//       </div>
//     </Block>
//   );

//   const renderTimeline = (id: string, items: any[]) => (
//     <Block id={id}>
//       {(items || []).map((x: any, idx: number) => (
//         <div key={idx} style={{ marginBottom: 14, pageBreakInside: "avoid" }}>
//           <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
//             <div>
//               <div style={{ fontWeight: 950, fontSize: 12 }}>{x.title || x.school || x.name || ""}</div>
//               <div style={{ fontSize: 10, fontWeight: 900, color: theme.primary || "#2563eb" }}>
//                 {x.company || x.degree || ""} {x.location ? `• ${x.location}` : ""}
//               </div>
//             </div>
//             <div style={{ fontSize: 10, color: muted(theme), fontWeight: 800, whiteSpace: "nowrap" }}>
//               {(x.from || "") + (x.to ? ` – ${x.to}` : "")}
//             </div>
//           </div>
//           {Array.isArray(x.bullets) ? (
//             <ul style={{ margin: "8px 0 0", paddingLeft: 18, fontSize: 10 }}>
//               {x.bullets.map((b: string, i: number) => (
//                 <li key={i} style={{ marginBottom: 4 }}>{b}</li>
//               ))}
//             </ul>
//           ) : null}
//           {x.desc ? <div style={{ fontSize: 10, marginTop: 6 }}>{x.desc}</div> : null}
//         </div>
//       ))}
//     </Block>
//   );

//   const renderSkills = () => (
//     <Block id="skills">
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
//         {!!resumeData?.skills?.programming?.length && (
//           <div>
//             <div style={{ fontWeight: 950, fontSize: 10, marginBottom: 4, color: theme.primary || "#2563eb" }}>Programming</div>
//             <div style={{ fontSize: 10 }}>{resumeData.skills.programming.join(", ")}</div>
//           </div>
//         )}
//         {!!resumeData?.skills?.frameworks?.length && (
//           <div>
//             <div style={{ fontWeight: 950, fontSize: 10, marginBottom: 4, color: theme.primary || "#2563eb" }}>Frameworks</div>
//             <div style={{ fontSize: 10 }}>{resumeData.skills.frameworks.join(", ")}</div>
//           </div>
//         )}
//         {!!resumeData?.skills?.tools?.length && (
//           <div>
//             <div style={{ fontWeight: 950, fontSize: 10, marginBottom: 4, color: theme.primary || "#2563eb" }}>Tools</div>
//             <div style={{ fontSize: 10 }}>{resumeData.skills.tools.join(", ")}</div>
//           </div>
//         )}
//       </div>
//     </Block>
//   );

//   const renderSection = (id: string) => {
//     if (!enabled(sections, id)) return null;

//     const cfg = sections?.[id] || {};
//     const dk = cfg.dataKey || id;

//     if (id === "sidebarProfile") return <AvatarBlock theme={theme} data={resumeData} />;
//     if (id === "header") return <HeaderBlock theme={theme} data={resumeData} />;
//     if (id === "contacts") {
//       const h = resumeData.header || {};
//       const items = [
//         h.email ? `Email: ${h.email}` : "",
//         h.phone ? `Phone: ${h.phone}` : "",
//         h.location ? `Location: ${h.location}` : "",
//         h.linkedin ? `LinkedIn: ${h.linkedin}` : "",
//         h.website ? `Website: ${h.website}` : "",
//       ].filter(Boolean);
//       return renderList("contacts", items);
//     }

//     if (cfg.type === "text") return <Block id={id}><div style={{ fontSize: 10 }}>{(resumeData as any)?.[dk] || ""}</div></Block>;
//     if (cfg.type === "skills") return renderSkills();
//     if (cfg.type === "timeline") return renderTimeline(id, (resumeData as any)?.[dk] || []);
//     if (cfg.type === "list" || cfg.type === "languages") return renderList(id, (resumeData as any)?.[dk] || []);

//     // fallback
//     const v = (resumeData as any)?.[dk];
//     if (typeof v === "string") return <Block id={id}><div style={{ fontSize: 10 }}>{v}</div></Block>;
//     if (Array.isArray(v)) return renderList(id, v);
//     return <Block id={id}><div style={{ fontSize: 10, color: muted(theme) }}>—</div></Block>;
//   };

//   // Layout render
//   if (layout === "Single Column") {
//     const order = s.order?.length ? s.order : ["header","contacts","summary","experience","education","skills","projects"];
//     return <Paper>{order.map((id: string) => <React.Fragment key={id}>{renderSection(id)}</React.Fragment>)}</Paper>;
//   }

//   const cols = s.columns || { left: [], right: [] };
//   const left = (cols.left || []).filter((id: string) => enabled(sections, id));
//   const right = (cols.right || []).filter((id: string) => enabled(sections, id));

//   if (layout === "Two Column") {
//     return (
//       <Paper>
//         <div style={{ display: "flex", gap: 22 }}>
//           <div style={{ width: "40%" }}>{left.map((id: string) => <React.Fragment key={id}>{renderSection(id)}</React.Fragment>)}</div>
//           <div style={{ width: "60%" }}>{right.map((id: string) => <React.Fragment key={id}>{renderSection(id)}</React.Fragment>)}</div>
//         </div>
//       </Paper>
//     );
//   }

//   // Sidebar layouts
//   const sidebarBg = theme?.sidebarBg || "#f8fafc";
//   const sidebarText = theme?.sidebarText || theme?.sidebarTextColor || "#0f172a";
//   const sidebarAccent = theme?.sidebarAccent || theme?.primary || "#2563eb";

//   const SidebarBox: React.FC<{ children: any }> = ({ children }) => (
//     <div style={{ width: "35%", background: sidebarBg, color: sidebarText, padding: 18, borderRadius: 14 }}>
//       <div style={{ height: 8, borderBottom: `3px solid ${sidebarAccent}`, marginBottom: 10, borderRadius: 999 }} />
//       {children}
//     </div>
//   );

//   const MainBox: React.FC<{ children: any }> = ({ children }) => <div style={{ width: "65%" }}>{children}</div>;

//   if (layout === "Sidebar Left") {
//     return (
//       <Paper>
//         <div style={{ display: "flex", gap: 18 }}>
//           <SidebarBox>{left.map((id: string) => <React.Fragment key={id}>{renderSection(id)}</React.Fragment>)}</SidebarBox>
//           <MainBox>{right.map((id: string) => <React.Fragment key={id}>{renderSection(id)}</React.Fragment>)}</MainBox>
//         </div>
//       </Paper>
//     );
//   }

//   if (layout === "Sidebar Right") {
//     return (
//       <Paper>
//         <div style={{ display: "flex", gap: 18 }}>
//           <MainBox>{left.map((id: string) => <React.Fragment key={id}>{renderSection(id)}</React.Fragment>)}</MainBox>
//           <SidebarBox>{right.map((id: string) => <React.Fragment key={id}>{renderSection(id)}</React.Fragment>)}</SidebarBox>
//         </div>
//       </Paper>
//     );
//   }

//   return <Paper>{renderSection("header")}</Paper>;
// }


import React, { useMemo } from "react";

const SECTION_LABELS: Record<string, string> = {
  header: "HEADER",
  contacts: "CONTACT",
  summary: "SUMMARY",
  experience: "EXPERIENCE",
  education: "EDUCATION",
  skills: "SKILLS",
  projects: "PROJECTS",
  certifications: "CERTIFICATIONS",
  languages: "LANGUAGES",
  interests: "INTERESTS",
  strengths: "STRENGTHS",
  achievements: "ACHIEVEMENTS",
  courses: "COURSES",
  sidebarProfile: "PROFILE",
};

function muted(theme: any) {
  return theme?.mutedColor || "#6b7280";
}

function enabled(sections: any, id: string) {
  const v = sections?.[id]?.enabled;
  return v !== false;
}

function labelOf(sections: any, id: string) {
  return sections?.[id]?.label || SECTION_LABELS[id] || id.toUpperCase();
}

function patternBg(pattern?: string | null) {
  if (!pattern) return undefined;

  if (pattern === "dots") {
    return {
      backgroundImage: "radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)",
      backgroundSize: "14px 14px",
    };
  }
  if (pattern === "lines") {
    return {
      backgroundImage:
        "linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
      backgroundSize: "100% 14px",
    };
  }
  if (pattern === "grid") {
    return {
      backgroundImage:
        "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
      backgroundSize: "18px 18px",
    };
  }
  if (pattern === "diagonal") {
    return {
      backgroundImage:
        "repeating-linear-gradient(45deg, rgba(0,0,0,0.06) 0 1px, transparent 1px 10px)",
    };
  }
  return undefined;
}

function paperStyle(theme: any): React.CSSProperties {
  const pv = theme?.paperVariant || "plain";
  const radius = theme?.cardRadius ?? 12;
  const padding = theme?.cardPadding ?? 32;

  const base: React.CSSProperties = {
    width: "794px",
    minHeight: "1123px",
    background: "white",
    boxSizing: "border-box",
    borderRadius: pv === "plain" ? 0 : radius,
    padding,
    margin: "0 auto",
    overflow: "hidden",
  };

  if (pv === "plain") return base;
  if (pv === "card")
    return { ...base, boxShadow: "0 10px 28px rgba(0,0,0,0.10)" };
  if (pv === "soft")
    return { ...base, boxShadow: "0 8px 22px rgba(15,23,42,0.08)" };
  if (pv === "borderLeft")
    return {
      ...base,
      borderLeft: `10px solid ${theme?.primary || "#2563eb"}`,
    };
  if (pv === "borderTop")
    return {
      ...base,
      borderTop: `10px solid ${theme?.primary || "#2563eb"}`,
    };
  return base;
}

function sectionTitleStyle(theme: any): React.CSSProperties {
  const primary = theme?.primary || "#2563eb";
  const v = theme?.headingVariant || "underline";
  const upper = theme?.headingUppercase !== false;

  const common: React.CSSProperties = {
    fontSize: `${theme?.titleSize ?? 12}pt`,
    fontWeight: 900,
    letterSpacing: "0.06em",
    textTransform: upper ? "uppercase" : "none",
    margin: "16px 0 10px",
  };

  if (v === "underline")
    return {
      ...common,
      color: primary,
      borderBottom: `2px solid ${primary}`,
      paddingBottom: 6,
    };
  if (v === "bar")
    return {
      ...common,
      color: "#111827",
      borderLeft: `6px solid ${primary}`,
      paddingLeft: 10,
    };
  if (v === "pill")
    return {
      ...common,
      color: "#fff",
      background: primary,
      display: "inline-block",
      padding: "6px 12px",
      borderRadius: 999,
    };
  if (v === "boxed")
    return {
      ...common,
      color: primary,
      border: `2px solid ${primary}`,
      display: "inline-block",
      padding: "6px 10px",
      borderRadius: 10,
    };
  if (v === "leftBorder")
    return {
      ...common,
      color: "#111827",
      borderLeft: `3px solid ${primary}`,
      paddingLeft: 10,
    };
  if (v === "double")
    return {
      ...common,
      color: primary,
      borderTop: `2px solid ${primary}`,
      borderBottom: `2px solid ${primary}`,
      padding: "6px 0",
    };

  return {
    ...common,
    color: primary,
    borderBottom: `2px solid ${primary}`,
    paddingBottom: 6,
  };
}

function bodyStyle(theme: any): React.CSSProperties {
  return {
    fontSize: `${theme?.bodySize ?? 10}pt`,
    lineHeight: theme?.lineHeight ?? 1.45,
    color: theme?.textColor || "#111827",
    fontFamily:
      theme?.fontFamily ||
      "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
  };
}

/** ---------------- PDF mode helpers ---------------- */
function isPdfTemplate(schema?: any, template?: any) {
  const s = schema || {};
  const t = template || {};
  if (s?.layout === "PDF Template" || s?.layout === "PDF Background") return true;
  if (s?.pdf?.pages?.length) return true;
  if (t?.pages?.length) return true;
  if (t?.schema?.pdf?.pages?.length) return true;
  if (t?.pdf_pages?.length) return true;
  return false;
}

function resolvePdfPages(schema?: any, template?: any) {
  const s = schema || {};
  const t = template || {};
  const raw = s?.pdf?.pages || t?.pages || t?.schema?.pdf?.pages || t?.pdf_pages || [];
  const out: string[] = [];
  for (const p of raw) {
    if (!p) continue;
    if (typeof p === "string") out.push(p);
    else out.push(p.url || p.image || p.src || "");
  }
  return out.filter(Boolean);
}

/** ---------------- Dummy data generator ---------------- */
function buildDummyData(_schema: any) {
  return {
    header: {
      fullName: "Aarav Sharma",
      jobTitle: "Frontend Developer",
      email: "aarav.sharma@email.com",
      phone: "+91 90000 00000",
      location: "Mumbai, India",
      linkedin: "linkedin.com/in/aaravsharma",
      website: "aarav.dev",
      photoUrl: "",
    },
    summary:
      "Results-driven developer with 3+ years of experience building responsive web apps. Strong in React, TypeScript and UI polish. Focused on clean code, performance, and great UX.",
    experience: [
      {
        title: "Frontend Developer",
        company: "VibeConnect",
        location: "Mumbai",
        from: "2023",
        to: "Present",
        bullets: [
          "Built reusable UI components and improved dashboard performance.",
          "Integrated APIs and improved error handling / loading states.",
          "Worked closely with backend team for stable schema-driven templates.",
        ],
      },
      {
        title: "Junior Developer",
        company: "Startup Studio",
        location: "Remote",
        from: "2021",
        to: "2023",
        bullets: [
          "Implemented responsive layouts and improved mobile UX.",
          "Created admin tools for template management and preview.",
        ],
      },
    ],
    education: [
      {
        school: "University of Mumbai",
        degree: "B.Sc. Computer Science",
        from: "2018",
        to: "2021",
      },
    ],
    skills: {
      programming: ["JavaScript", "TypeScript", "Python"],
      frameworks: ["React", "Next.js", "Django"],
      tools: ["Git", "REST APIs", "Tailwind", "Figma"],
    },
    projects: [
      {
        name: "Resume Builder",
        desc: "Schema-driven resume templates with admin marketplace and exports.",
      },
      {
        name: "Admin Dashboard",
        desc: "Analytics, template editor, preview and export workflows.",
      },
    ],
    certifications: ["Meta Front-End Developer", "AWS Cloud Practitioner"],
    languages: ["English", "Hindi"],
    interests: ["UI/UX", "Performance", "Automation"],
    strengths: ["Problem Solving", "Ownership", "Communication"],
    achievements: ["Increased template conversion by improving preview UI"],
    courses: ["Data Structures & Algorithms", "System Design Basics"],
  };
}

/** ---------------- Blocks ---------------- */
function HeaderBlock({ theme, data }: any) {
  const hv = theme?.headerVariant || "split";
  const primary = theme?.primary || "#2563eb";
  const h = data?.header || {};

  const info = [
    h.email ? `Email: ${h.email}` : "",
    h.phone ? `Phone: ${h.phone}` : "",
    h.location ? `Location: ${h.location}` : "",
    h.linkedin ? `LinkedIn: ${h.linkedin}` : "",
    h.website ? `Website: ${h.website}` : "",
  ].filter(Boolean);

  if (hv === "banner") {
    return (
      <div style={{ marginBottom: 18 }}>
        <div
          style={{
            background: primary,
            color: "white",
            padding: "16px 18px",
            borderRadius: 14,
          }}
        >
          <div style={{ fontSize: 26, fontWeight: 950 }}>{h.fullName || ""}</div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 800,
              opacity: 0.95,
              marginTop: 4,
            }}
          >
            {h.jobTitle || ""}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginTop: 10,
            fontSize: 11,
            color: muted(theme),
          }}
        >
          {info.map((x: string, i: number) => (
            <span key={i}>{x}</span>
          ))}
        </div>
      </div>
    );
  }

  if (hv === "centered") {
    return (
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <div style={{ fontSize: 28, fontWeight: 950, color: primary }}>
          {h.fullName || ""}
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 800,
            color: "#374151",
            marginTop: 6,
          }}
        >
          {h.jobTitle || ""}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 10,
            marginTop: 10,
            fontSize: 11,
            color: muted(theme),
          }}
        >
          {info.map((x: string, i: number) => (
            <span key={i}>{x}</span>
          ))}
        </div>
      </div>
    );
  }

  if (hv === "minimal") {
    return (
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 26, fontWeight: 950, color: "#111827" }}>
          {h.fullName || ""}
        </div>
        <div style={{ fontSize: 13, fontWeight: 800, color: primary, marginTop: 4 }}>
          {h.jobTitle || ""}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginTop: 10,
            fontSize: 11,
            color: muted(theme),
          }}
        >
          {info.map((x: string, i: number) => (
            <span key={i}>{x}</span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 16 }}>
      <div>
        <div style={{ fontSize: 28, fontWeight: 950, color: primary }}>{h.fullName || ""}</div>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#374151", marginTop: 6 }}>
          {h.jobTitle || ""}
        </div>
      </div>
      <div style={{ fontSize: 11, color: muted(theme), display: "grid", gap: 6, textAlign: "right" }}>
        {info.map((x: string, i: number) => (
          <div key={i}>{x}</div>
        ))}
      </div>
    </div>
  );
}

function AvatarBlock({ theme, data }: any) {
  const primary = theme?.primary || "#2563eb";
  const url = data?.header?.photoUrl || "";
  if (!url) return null;

  return (
    <div style={{ marginBottom: 12, display: "grid", placeItems: "center" }}>
      <div
        style={{
          width: 110,
          height: 110,
          borderRadius: 999,
          border: `3px solid ${primary}`,
          overflow: "hidden",
          background: "#f1f5f9",
        }}
      >
        <img
          src={url}
          alt="profile"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
}

export default function ResumePreview({
  schema,
  data,
  template,
}: {
  schema?: any;
  data?: any;
  template?: any;
}) {
  const s = schema || {};
  const theme = s.theme || {};
  const sections = s.sections || {};
  const layout = s.layout || "Single Column";

  const hasRealData = data && Object.keys(data || {}).length > 0;
  const resumeData = useMemo(
    () => (hasRealData ? data : buildDummyData(s)),
    [hasRealData, data, s]
  );

  /** ✅ PDF preview: show pages as images */
  const pdfMode = isPdfTemplate(s, template);
  const pdfPages = useMemo(() => resolvePdfPages(s, template), [s, template]);

  if (pdfMode) {
    const A4W = 794;
    const A4H = 1123;

    return (
      <div style={{ display: "grid", gap: 14, placeItems: "start center" }}>
        {pdfPages.length === 0 ? (
          <div style={{ ...paperStyle(theme), ...bodyStyle(theme), padding: 22 }}>
            <div style={{ fontWeight: 900, fontSize: 16 }}>PDF Template</div>
            <div style={{ marginTop: 8, fontSize: 12, color: muted(theme) }}>
              PDF pages not found in schema/template. Make sure API returns
              `schema.pdf.pages` OR `template.pages`.
            </div>
          </div>
        ) : (
          pdfPages.map((url, idx) => (
            <div
              key={url + idx}
              style={{
                width: `${A4W}px`,
                height: `${A4H}px`,
                background: "white",
                border: "1px solid #e5e7eb",
                overflow: "hidden",
                boxSizing: "border-box",
                borderRadius: 12,
                boxShadow: "0 10px 28px rgba(0,0,0,0.10)",
              }}
            >
              <img
                src={url}
                alt={`page-${idx + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain", // ✅ IMPORTANT: no cut
                  display: "block",
                  background: "#fff",
                }}
              />
            </div>
          ))
        )}
      </div>
    );
  }

  const Paper: React.FC<{ children: any }> = ({ children }) => (
    <div style={{ ...paperStyle(theme), ...patternBg(theme?.pattern), ...bodyStyle(theme) }}>
      {children}
    </div>
  );

  const Block: React.FC<{ id: string; children: any }> = ({ id, children }) => (
    <div style={{ marginBottom: 10 }}>
      <div style={sectionTitleStyle(theme)}>{labelOf(sections, id)}</div>
      <div>{children}</div>
    </div>
  );
const renderList = (id: string, items: any[]) => (
  <Block id={id}>
    <div style={{ display: "grid", gap: 6 }}>
      {(items || []).slice(0, 6).map((x: any, idx: number) => (
        <div key={idx} style={{ fontSize: "10pt" }}>
          • {typeof x === "string" ? x : x?.title || x?.name || ""}
        </div>
      ))}
    </div>
  </Block>
);


  const renderTimeline = (id: string, items: any[]) => (
    <Block id={id}>
      {(items || []).slice(0, 3).map((x: any, idx: number) => (
        <div key={idx} style={{ marginBottom: 14, pageBreakInside: "avoid" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
            <div>
              <div style={{ fontWeight: 950, fontSize: 12 }}>
                {x.title || x.school || x.name || ""}
              </div>
              <div style={{ fontSize: 10, fontWeight: 900, color: theme.primary || "#2563eb" }}>
                {x.company || x.degree || ""} {x.location ? `• ${x.location}` : ""}
              </div>
            </div>
            <div
              style={{
                fontSize: 10,
                color: muted(theme),
                fontWeight: 800,
                whiteSpace: "nowrap",
              }}
            >
              {(x.from || "") + (x.to ? ` – ${x.to}` : "")}
            </div>
          </div>
          {Array.isArray(x.bullets) ? (
            <ul style={{ margin: "8px 0 0", paddingLeft: 18, fontSize: 10 }}>
              {x.bullets.slice(0, 3).map((b: string, i: number) => (
                <li key={i} style={{ marginBottom: 4 }}>
                  {b}
                </li>
              ))}
            </ul>
          ) : null}
          {x.desc ? <div style={{ fontSize: 10, marginTop: 6 }}>{x.desc}</div> : null}
        </div>
      ))}
    </Block>
  );

  const renderSkills = () => (
    <Block id="skills">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 10,
        }}
      >
        {!!resumeData?.skills?.programming?.length && (
          <div>
            <div style={{ fontWeight: 950, fontSize: 10, marginBottom: 4, color: theme.primary || "#2563eb" }}>
              Programming
            </div>
            <div style={{ fontSize: 10 }}>{resumeData.skills.programming.join(", ")}</div>
          </div>
        )}
        {!!resumeData?.skills?.frameworks?.length && (
          <div>
            <div style={{ fontWeight: 950, fontSize: 10, marginBottom: 4, color: theme.primary || "#2563eb" }}>
              Frameworks
            </div>
            <div style={{ fontSize: 10 }}>{resumeData.skills.frameworks.join(", ")}</div>
          </div>
        )}
        {!!resumeData?.skills?.tools?.length && (
          <div>
            <div style={{ fontWeight: 950, fontSize: 10, marginBottom: 4, color: theme.primary || "#2563eb" }}>
              Tools
            </div>
            <div style={{ fontSize: 10 }}>{resumeData.skills.tools.join(", ")}</div>
          </div>
        )}
      </div>
    </Block>
  );

  const renderSection = (id: string) => {
    if (!enabled(sections, id)) return null;

    const cfg = sections?.[id] || {};
    const dk = cfg.dataKey || id;

    if (id === "sidebarProfile") return <AvatarBlock theme={theme} data={resumeData} />;
    if (id === "header") return <HeaderBlock theme={theme} data={resumeData} />;

    if (id === "contacts") {
      const h = resumeData.header || {};
      const items = [
        h.email ? `Email: ${h.email}` : "",
        h.phone ? `Phone: ${h.phone}` : "",
        h.location ? `Location: ${h.location}` : "",
        h.linkedin ? `LinkedIn: ${h.linkedin}` : "",
        h.website ? `Website: ${h.website}` : "",
      ].filter(Boolean);
      return renderList("contacts", items);
    }

    if (cfg.type === "text") {
      const txt = (resumeData as any)?.[dk] || "Short professional summary goes here.";
      return (
        <Block id={id}>
          <div style={{ fontSize: 10 }}>{txt}</div>
        </Block>
      );
    }

    if (cfg.type === "skills") return renderSkills();
    if (cfg.type === "timeline") return renderTimeline(id, (resumeData as any)?.[dk] || []);
    if (cfg.type === "list" || cfg.type === "languages")
      return renderList(id, (resumeData as any)?.[dk] || []);

    const v = (resumeData as any)?.[dk];
    if (typeof v === "string")
      return (
        <Block id={id}>
          <div style={{ fontSize: 10 }}>{v}</div>
        </Block>
      );
    if (Array.isArray(v)) return renderList(id, v);

    return (
      <Block id={id}>
        <div style={{ fontSize: 10, color: muted(theme) }}>Sample content</div>
      </Block>
    );
  };

  /** layout render */
  if (layout === "Single Column") {
    const order = s.order?.length
      ? s.order
      : ["header", "contacts", "summary", "experience", "education", "skills", "projects"];
    return (
      <Paper>
        {order.map((id: string) => (
          <React.Fragment key={id}>{renderSection(id)}</React.Fragment>
        ))}
      </Paper>
    );
  }

  const cols = s.columns || { left: [], right: [] };
  const left = (cols.left || []).filter((id: string) => enabled(sections, id));
  const right = (cols.right || []).filter((id: string) => enabled(sections, id));

  if (layout === "Two Column") {
    return (
      <Paper>
        <div style={{ display: "flex", gap: 22 }}>
          <div style={{ width: "40%" }}>
            {left.map((id: string) => (
              <React.Fragment key={id}>{renderSection(id)}</React.Fragment>
            ))}
          </div>
          <div style={{ width: "60%" }}>
            {right.map((id: string) => (
              <React.Fragment key={id}>{renderSection(id)}</React.Fragment>
            ))}
          </div>
        </div>
      </Paper>
    );
  }

  const sidebarBg = theme?.sidebarBg || "#f8fafc";
  const sidebarText = theme?.sidebarText || theme?.sidebarTextColor || "#0f172a";
  const sidebarAccent = theme?.sidebarAccent || theme?.primary || "#2563eb";

  const SidebarBox: React.FC<{ children: any }> = ({ children }) => (
    <div style={{ width: "35%", background: sidebarBg, color: sidebarText, padding: 18, borderRadius: 14 }}>
      <div style={{ height: 8, borderBottom: `3px solid ${sidebarAccent}`, marginBottom: 10, borderRadius: 999 }} />
      {children}
    </div>
  );

  const MainBox: React.FC<{ children: any }> = ({ children }) => <div style={{ width: "65%" }}>{children}</div>;

  if (layout === "Sidebar Left") {
    return (
      <Paper>
        <div style={{ display: "flex", gap: 18 }}>
          <SidebarBox>
            {left.map((id: string) => (
              <React.Fragment key={id}>{renderSection(id)}</React.Fragment>
            ))}
          </SidebarBox>
          <MainBox>
            {right.map((id: string) => (
              <React.Fragment key={id}>{renderSection(id)}</React.Fragment>
            ))}
          </MainBox>
        </div>
      </Paper>
    );
  }

  if (layout === "Sidebar Right") {
    return (
      <Paper>
        <div style={{ display: "flex", gap: 18 }}>
          <MainBox>
            {left.map((id: string) => (
              <React.Fragment key={id}>{renderSection(id)}</React.Fragment>
            ))}
          </MainBox>
          <SidebarBox>
            {right.map((id: string) => (
              <React.Fragment key={id}>{renderSection(id)}</React.Fragment>
            ))}
          </SidebarBox>
        </div>
      </Paper>
    );
  }

  return <Paper>{renderSection("header")}</Paper>;
}
