// // import React from "react";

// // const SAMPLE = {
// //   header: {
// //     fullName: "John Anderson",
// //     jobTitle: "Senior Software Engineer",
// //     email: "john.anderson@email.com",
// //     phone: "+1 (555) 123-4567",
// //     location: "San Francisco, CA",
// //     linkedin: "linkedin.com/in/johnanderson",
// //     website: "johnanderson.dev",
// //   },
// //   summary:
// //     "Results-driven software engineer with 8+ years of experience building scalable web applications. Expert in React, Node.js, and cloud technologies.",
// //   experience: [
// //     {
// //       title: "Senior Software Engineer",
// //       company: "Tech Innovations Inc.",
// //       location: "San Francisco, CA",
// //       from: "2021-01",
// //       to: "Present",
// //       bullets: [
// //         "Led microservices architecture serving 2M+ daily active users.",
// //         "Implemented CI/CD pipelines reducing deployment time by 60%.",
// //       ],
// //     },
// //     {
// //       title: "Software Engineer",
// //       company: "Digital Solutions Co.",
// //       location: "Austin, TX",
// //       from: "2018-03",
// //       to: "2020-12",
// //       bullets: [
// //         "Built React-based dashboard improving customer engagement by 40%.",
// //         "Developed REST APIs handling 10K+ req/min.",
// //       ],
// //     },
// //   ],
// //   education: [
// //     {
// //       school: "University of California, Berkeley",
// //       degree: "B.S. Computer Science",
// //       from: "2012",
// //       to: "2016",
// //     },
// //   ],
// //   skills: {
// //     programming: ["JavaScript", "TypeScript", "Python", "Go", "SQL"],
// //     frameworks: ["React", "Node.js", "Express", "Django"],
// //     tools: ["AWS", "Docker", "Kubernetes", "PostgreSQL", "Redis"],
// //   },
// //   projects: [
// //     { name: "E-commerce Platform", desc: "Full-stack platform with real-time inventory, order tracking, admin dashboard." },
// //     { name: "Task Management App", desc: "Collaboration tool with live updates and drag-and-drop interface." },
// //   ],
// // };

// // const SECTION_LABELS: Record<string, string> = {
// //   header: "HEADER",
// //   summary: "PROFESSIONAL SUMMARY",
// //   experience: "WORK EXPERIENCE",
// //   education: "EDUCATION",
// //   skills: "SKILLS",
// //   projects: "PROJECTS",
// //   certifications: "CERTIFICATIONS",
// //   languages: "LANGUAGES",
// // };

// // function titleStyle(theme: any): React.CSSProperties {
// //   const c = theme?.primary || "#2563eb";
// //   return {
// //     fontSize: theme?.titleSize ?? 12,
// //     fontWeight: 800,
// //     letterSpacing: "0.06em",
// //     textTransform: theme?.headingUppercase ? "uppercase" : "none",
// //     color: c,
// //     borderBottom: `2px solid ${c}`,
// //     paddingBottom: 6,
// //     margin: "14px 0 10px",
// //   };
// // }

// // export default function ResumePreview({ schema }: { schema: any }) {
// //   const s = schema || {};
// //   const theme = s.theme || {};
// //   const sections = s.sections || {};
// //   const layout = s.layout || "Single Column";

// //   const fontFamily = theme.fontFamily || "system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

// //   const Box = ({ children }: any) => (
// //     <div
// //       style={{
// //         width: 420,
// //         background: "white",
// //         borderRadius: 14,
// //         border: "1px solid #e5e7eb",
// //         boxShadow: "0 6px 20px rgba(0,0,0,0.10)",
// //         padding: 18,
// //         fontFamily,
// //       }}
// //     >
// //       {children}
// //     </div>
// //   );

// //   const Header = () => (
// //     <div style={{ marginBottom: 10 }}>
// //       <div style={{ fontSize: 22, fontWeight: 900, color: theme.primary || "#2563eb" }}>
// //         {SAMPLE.header.fullName}
// //       </div>
// //       <div style={{ fontSize: 12, fontWeight: 700, marginTop: 2 }}>{SAMPLE.header.jobTitle}</div>
// //       <div style={{ fontSize: 10, color: "#374151", marginTop: 6, display: "flex", flexWrap: "wrap", gap: 10 }}>
// //         <span>{SAMPLE.header.email}</span>
// //         <span>{SAMPLE.header.phone}</span>
// //         <span>{SAMPLE.header.location}</span>
// //         <span>{SAMPLE.header.linkedin}</span>
// //         <span>{SAMPLE.header.website}</span>
// //       </div>
// //     </div>
// //   );

// //   const Block = ({ title, children }: any) => (
// //     <div>
// //       <div style={titleStyle(theme)}>{title}</div>
// //       <div style={{ fontSize: theme?.bodySize ?? 10, lineHeight: theme?.lineHeight ?? 1.35, color: "#111827" }}>
// //         {children}
// //       </div>
// //     </div>
// //   );

// //   const Summary = () => <Block title={SECTION_LABELS.summary}>{SAMPLE.summary}</Block>;

// //   const Experience = () => (
// //     <Block title={SECTION_LABELS.experience}>
// //       {SAMPLE.experience.map((x, idx) => (
// //         <div key={idx} style={{ marginBottom: 10 }}>
// //           <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
// //             <div style={{ fontWeight: 900 }}>{x.title}</div>
// //             <div style={{ fontSize: 10, color: "#6b7280" }}>
// //               {x.from} - {x.to}
// //             </div>
// //           </div>
// //           <div style={{ fontSize: 10, color: theme.primary || "#2563eb", fontWeight: 800 }}>
// //             {x.company} • {x.location}
// //           </div>
// //           <ul style={{ margin: "6px 0 0", paddingLeft: 16 }}>
// //             {x.bullets.map((b, i) => (
// //               <li key={i}>{b}</li>
// //             ))}
// //           </ul>
// //         </div>
// //       ))}
// //     </Block>
// //   );

// //   const Education = () => (
// //     <Block title={SECTION_LABELS.education}>
// //       {SAMPLE.education.map((e, idx) => (
// //         <div key={idx} style={{ marginBottom: 8 }}>
// //           <div style={{ fontWeight: 900 }}>{e.school}</div>
// //           <div style={{ fontSize: 10, color: "#374151" }}>{e.degree}</div>
// //           <div style={{ fontSize: 10, color: "#6b7280" }}>
// //             {e.from} - {e.to}
// //           </div>
// //         </div>
// //       ))}
// //     </Block>
// //   );

// //   const Skills = () => (
// //     <Block title={SECTION_LABELS.skills}>
// //       <div style={{ marginBottom: 6 }}>
// //         <b>Programming:</b> {SAMPLE.skills.programming.join(", ")}
// //       </div>
// //       <div style={{ marginBottom: 6 }}>
// //         <b>Frameworks:</b> {SAMPLE.skills.frameworks.join(", ")}
// //       </div>
// //       <div>
// //         <b>Tools:</b> {SAMPLE.skills.tools.join(", ")}
// //       </div>
// //     </Block>
// //   );

// //   const Projects = () => (
// //     <Block title={SECTION_LABELS.projects}>
// //       {SAMPLE.projects.map((p, idx) => (
// //         <div key={idx} style={{ marginBottom: 8 }}>
// //           <div style={{ fontWeight: 900 }}>{p.name}</div>
// //           <div>{p.desc}</div>
// //         </div>
// //       ))}
// //     </Block>
// //   );

// //   const renderSection = (id: string) => {
// //     if (!sections?.[id]?.enabled) return null;
// //     if (id === "header") return <Header />;
// //     if (id === "summary") return <Summary />;
// //     if (id === "experience") return <Experience />;
// //     if (id === "education") return <Education />;
// //     if (id === "skills") return <Skills />;
// //     if (id === "projects") return <Projects />;
// //     return null;
// //   };

// //   if (layout === "Single Column") {
// //     const order: string[] = s.order?.length ? s.order : ["header", "summary", "experience", "education", "skills", "projects"];
// //     return <Box>{order.map((id) => <React.Fragment key={id}>{renderSection(id)}</React.Fragment>)}</Box>;
// //   }

// //   const cols = s.columns || { left: [], right: [] };
// //   const left = (cols.left || []).filter((x: string) => sections?.[x]?.enabled);
// //   const right = (cols.right || []).filter((x: string) => sections?.[x]?.enabled);

// //   return (
// //     <Box>
// //       <div style={{ display: "flex", gap: 14 }}>
// //         <div style={{ width: "36%" }}>{left.map((id: string) => <React.Fragment key={id}>{renderSection(id)}</React.Fragment>)}</div>
// //         <div style={{ width: "64%" }}>{right.map((id: string) => <React.Fragment key={id}>{renderSection(id)}</React.Fragment>)}</div>
// //       </div>
// //     </Box>
// //   );
// // }

// import React from "react";

// const SAMPLE = {
//   header: {
//     fullName: "John Anderson",
//     jobTitle: "Senior Software Engineer",
//     email: "john.anderson@email.com",
//     phone: "+1 (555) 123-4567",
//     location: "San Francisco, CA",
//     linkedin: "linkedin.com/in/johnanderson",
//     website: "johnanderson.dev",
//   },
//   summary:
//     "Results-driven software engineer with 8+ years of experience building scalable web applications. Expert in React, Node.js, and cloud technologies.",
//   experience: [
//     {
//       title: "Senior Software Engineer",
//       company: "Tech Innovations Inc.",
//       location: "San Francisco, CA",
//       from: "2021-01",
//       to: "Present",
//       bullets: [
//         "Led microservices architecture serving 2M+ daily active users.",
//         "Implemented CI/CD pipelines reducing deployment time by 60%.",
//       ],
//     },
//     {
//       title: "Software Engineer",
//       company: "Digital Solutions Co.",
//       location: "Austin, TX",
//       from: "2018-03",
//       to: "2020-12",
//       bullets: [
//         "Built React-based dashboard improving customer engagement by 40%.",
//         "Developed REST APIs handling 10K+ req/min.",
//       ],
//     },
//   ],
//   education: [
//     {
//       school: "University of California, Berkeley",
//       degree: "B.S. Computer Science",
//       from: "2012",
//       to: "2016",
//     },
//   ],
//   skills: {
//     programming: ["JavaScript", "TypeScript", "Python", "Go", "SQL"],
//     frameworks: ["React", "Node.js", "Express", "Django"],
//     tools: ["AWS", "Docker", "Kubernetes", "PostgreSQL", "Redis"],
//   },
//   projects: [
//     { name: "E-commerce Platform", desc: "Full-stack platform with real-time inventory, order tracking, admin dashboard." },
//     { name: "Task Management App", desc: "Collaboration tool with live updates and drag-and-drop interface." },
//   ],
// };

// const SECTION_LABELS: Record<string, string> = {
//   header: "HEADER",
//   summary: "PROFESSIONAL SUMMARY",
//   experience: "WORK EXPERIENCE",
//   education: "EDUCATION",
//   skills: "SKILLS",
//   projects: "PROJECTS",
//   certifications: "CERTIFICATIONS",
//   languages: "LANGUAGES",
// };

// function titleStyle(theme: any): React.CSSProperties {
//   const c = theme?.primary || "#2563eb";
//   return {
//     fontSize: theme?.titleSize ?? 12,
//     fontWeight: 800,
//     letterSpacing: "0.06em",
//     textTransform: theme?.headingUppercase ? "uppercase" : "none",
//     color: c,
//     borderBottom: `2px solid ${c}`,
//     paddingBottom: 6,
//     margin: "14px 0 10px",
//   };
// }

// export default function ResumePreview({ schema, data = SAMPLE }: { schema: any; data?: any }) {
//   const s = schema || {};
//   const theme = s.theme || {};
//   const sections = s.sections || {};
//   const layout = s.layout || "Single Column";

//   const Box = ({ children }: { children: React.ReactNode }) => (
//     <div style={{ fontFamily: theme.fontFamily, lineHeight: theme.lineHeight, fontSize: theme.bodySize, color: "#111827", width: 420, padding: 20, background: "white" }}>
//       {children}
//     </div>
//   );

//   const Block = ({ title, children }: { title: string; children: React.ReactNode }) => (
//     <div>
//       <div style={titleStyle(theme)}>{title}</div>
//       {children}
//     </div>
//   );

//   const Header = () => (
//     <div style={{ textAlign: "center", marginBottom: 14 }}>
//       <div style={{ fontSize: 22, fontWeight: 900 }}>{data.header.fullName}</div>
//       <div style={{ fontSize: 12, color: "#374151" }}>{data.header.jobTitle}</div>
//       <div style={{ fontSize: 10, color: "#6b7280", marginTop: 6 }}>
//         {data.header.email} | {data.header.phone} | {data.header.location}
//       </div>
//       <div style={{ fontSize: 10, color: "#6b7280" }}>
//         {data.header.linkedin} | {data.header.website}
//       </div>
//     </div>
//   );

//   const Summary = () => (
//     <Block title={SECTION_LABELS.summary}>
//       <div style={{ fontSize: 10 }}>{data.summary}</div>
//     </Block>
//   );

//   const Experience = () => (
//     <Block title={SECTION_LABELS.experience}>
//       {data.experience.map((x: any, idx: number) => (
//         <div key={idx} style={{ marginBottom: 10 }}>
//           <div style={{ fontWeight: 900 }}>{x.title}</div>
//           <div style={{ fontSize: 10, color: "#374151" }}>{x.company}, {x.location}</div>
//           <div style={{ fontSize: 10, color: "#6b7280" }}>{x.from} - {x.to}</div>
//           <ul style={{ listStyleType: "disc", paddingLeft: 20, fontSize: 10 }}>
//             {x.bullets.map((b: string, i: number) => (
//               <li key={i}>{b}</li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </Block>
//   );

//   const Education = () => (
//     <Block title={SECTION_LABELS.education}>
//       {data.education.map((e: any, idx: number) => (
//         <div key={idx} style={{ marginBottom: 8 }}>
//           <div style={{ fontWeight: 900 }}>{e.school}</div>
//           <div style={{ fontSize: 10, color: "#374151" }}>{e.degree}</div>
//           <div style={{ fontSize: 10, color: "#6b7280" }}>
//             {e.from} - {e.to}
//           </div>
//         </div>
//       ))}
//     </Block>
//   );

//   const Skills = () => (
//     <Block title={SECTION_LABELS.skills}>
//       <div style={{ marginBottom: 6 }}>
//         <b>Programming:</b> {data.skills.programming.join(", ")}
//       </div>
//       <div style={{ marginBottom: 6 }}>
//         <b>Frameworks:</b> {data.skills.frameworks.join(", ")}
//       </div>
//       <div>
//         <b>Tools:</b> {data.skills.tools.join(", ")}
//       </div>
//     </Block>
//   );

//   const Projects = () => (
//     <Block title={SECTION_LABELS.projects}>
//       {data.projects.map((p: any, idx: number) => (
//         <div key={idx} style={{ marginBottom: 8 }}>
//           <div style={{ fontWeight: 900 }}>{p.name}</div>
//           <div>{p.desc}</div>
//         </div>
//       ))}
//     </Block>
//   );

//   const renderSection = (id: string) => {
//     if (!sections?.[id]?.enabled) return null;
//     if (id === "header") return <Header />;
//     if (id === "summary") return <Summary />;
//     if (id === "experience") return <Experience />;
//     if (id === "education") return <Education />;
//     if (id === "skills") return <Skills />;
//     if (id === "projects") return <Projects />;
//     return null;
//   };

//   if (layout === "Single Column") {
//     const order: string[] = s.order?.length ? s.order : ["header", "summary", "experience", "education", "skills", "projects"];
//     return <Box>{order.map((id) => <React.Fragment key={id}>{renderSection(id)}</React.Fragment>)}</Box>;
//   }

//   const cols = s.columns || { left: [], right: [] };
//   const left = (cols.left || []).filter((x: string) => sections?.[x]?.enabled);
//   const right = (cols.right || []).filter((x: string) => sections?.[x]?.enabled);

//   return (
//     <Box>
//       <div style={{ display: "flex", gap: 14 }}>
//         <div style={{ width: "36%" }}>{left.map((id: string) => <React.Fragment key={id}>{renderSection(id)}</React.Fragment>)}</div>
//         <div style={{ width: "64%" }}>{right.map((id: string) => <React.Fragment key={id}>{renderSection(id)}</React.Fragment>)}</div>
//       </div>
//     </Box>
//   );
// }

// src/pages/dashboard/ResumePreview.tsx
import React from "react";

const SAMPLE = {
  header: {
    fullName: "John Anderson",
    jobTitle: "Senior Software Engineer",
    email: "john.anderson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/johnanderson",
    website: "johnanderson.dev",
  },
  summary: "Results-driven software engineer with 8+ years of experience building scalable web applications. Expert in React, Node.js, and cloud technologies. Proven track record of leading teams and delivering high-quality software solutions.",
  experience: [
    {
      title: "Senior Software Engineer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      from: "2021-01",
      to: "Present",
      bullets: [
        "Led microservices architecture serving 2M+ daily active users, improving system performance by 40%",
        "Implemented CI/CD pipelines reducing deployment time by 60% and increasing deployment frequency",
        "Mentored 5 junior developers and conducted code reviews ensuring high code quality standards",
        "Collaborated with product managers to define technical requirements and project timelines"
      ],
    },
    {
      title: "Software Engineer",
      company: "Digital Solutions Co.",
      location: "Austin, TX",
      from: "2018-03",
      to: "2020-12",
      bullets: [
        "Built React-based dashboard improving customer engagement by 40% through real-time analytics",
        "Developed REST APIs handling 10K+ requests per minute with 99.9% uptime",
        "Optimized database queries reducing response time by 70%",
        "Implemented automated testing increasing test coverage from 60% to 90%"
      ],
    },
  ],
  education: [
    {
      school: "University of California, Berkeley",
      degree: "B.S. Computer Science",
      from: "2012",
      to: "2016",
    },
  ],
  skills: {
    programming: ["JavaScript", "TypeScript", "Python", "Go", "SQL"],
    frameworks: ["React", "Node.js", "Express", "Django"],
    tools: ["AWS", "Docker", "Kubernetes", "PostgreSQL", "Redis"],
  },
  projects: [
    { name: "E-commerce Platform", desc: "Full-stack platform with real-time inventory, order tracking, admin dashboard." },
    { name: "Task Management App", desc: "Collaboration tool with live updates and drag-and-drop interface." },
  ],
  certifications: [
    "AWS Certified Solutions Architect",
    "Google Professional Cloud Architect",
    "React Developer Certification"
  ],
  languages: [
    "English (Native)",
    "Spanish (Professional)",
    "French (Intermediate)"
  ]
};

const SECTION_LABELS: Record<string, string> = {
  header: "HEADER",
  summary: "PROFESSIONAL SUMMARY",
  experience: "WORK EXPERIENCE",
  education: "EDUCATION",
  skills: "SKILLS",
  projects: "PROJECTS",
  certifications: "CERTIFICATIONS",
  languages: "LANGUAGES",
};

function titleStyle(theme: any): React.CSSProperties {
  const c = theme?.primary || "#2563eb";
  return {
    fontSize: `${theme?.titleSize ?? 12}pt`,
    fontWeight: 800,
    letterSpacing: "0.06em",
    textTransform: theme?.headingUppercase ? "uppercase" : "none",
    color: c,
    borderBottom: `2px solid ${c}`,
    paddingBottom: 6,
    margin: "18px 0 12px",
  };
}

interface ResumePreviewProps {
  schema?: any;
  data?: any;
}

export default function ResumePreview({ schema, data }: ResumePreviewProps) {
  const s = schema || {};
  const theme = s.theme || {};
  const sections = s.sections || {};
  const layout = s.layout || "Single Column";
  const resumeData = data || SAMPLE;

  const fontFamily = theme.fontFamily || "system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

  // A4 size container (210mm x 297mm at 96 DPI = 794px x 1123px)
  const Box = ({ children }: any) => (
    <div
      style={{
        width: "794px",
        maxWidth: "100%",
        background: "white",
        borderRadius: 8,
        border: "1px solid #e5e7eb",
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        padding: "32px 40px",
        fontFamily,
        minHeight: "1123px",
        boxSizing: "border-box",
        margin: "0 auto",
      }}
    >
      {children}
    </div>
  );

  const Header = () => (
    <div style={{ marginBottom: 24, borderBottom: `1px solid ${theme.primary || "#2563eb"}`, paddingBottom: 16 }}>
      <div style={{ fontSize: 28, fontWeight: 900, color: theme.primary || "#2563eb", marginBottom: 4 }}>
        {resumeData.header.fullName}
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#374151", marginBottom: 12 }}>{resumeData.header.jobTitle}</div>
      <div style={{ fontSize: 11, color: "#6b7280", display: "flex", flexWrap: "wrap", gap: 12 }}>
        {resumeData.header.email && <span>📧 {resumeData.header.email}</span>}
        {resumeData.header.phone && <span>📱 {resumeData.header.phone}</span>}
        {resumeData.header.location && <span>📍 {resumeData.header.location}</span>}
        {resumeData.header.linkedin && <span>🔗 {resumeData.header.linkedin}</span>}
        {resumeData.header.website && <span>🌐 {resumeData.header.website}</span>}
      </div>
    </div>
  );

  const Block = ({ title, children }: any) => (
    <div style={{ marginBottom: 20 }}>
      <div style={titleStyle(theme)}>{title}</div>
      <div style={{ 
        fontSize: `${theme?.bodySize ?? 10}pt`, 
        lineHeight: theme?.lineHeight ?? 1.5, 
        color: "#111827" 
      }}>
        {children}
      </div>
    </div>
  );

  const Summary = () => (
    <Block title={SECTION_LABELS.summary}>
      <div style={{ textAlign: "justify" }}>
        {resumeData.summary}
      </div>
    </Block>
  );

  const Experience = () => (
    <Block title={SECTION_LABELS.experience}>
      {resumeData.experience.map((x: any, idx: number) => (
        <div key={idx} style={{ marginBottom: 16, pageBreakInside: "avoid" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "flex-start", marginBottom: 4 }}>
            <div>
              <div style={{ fontWeight: 900, fontSize: 13 }}>{x.title}</div>
              <div style={{ fontSize: 11, color: theme.primary || "#2563eb", fontWeight: 800 }}>
                {x.company} • {x.location}
              </div>
            </div>
            <div style={{ fontSize: 10, color: "#6b7280", whiteSpace: "nowrap", fontWeight: 700 }}>
              {x.from} – {x.to}
            </div>
          </div>
          <ul style={{ margin: "8px 0 0", paddingLeft: 18, fontSize: 10 }}>
            {x.bullets.map((b: string, i: number) => (
              <li key={i} style={{ marginBottom: 4, textAlign: "justify" }}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </Block>
  );

  const Education = () => (
    <Block title={SECTION_LABELS.education}>
      {resumeData.education.map((e: any, idx: number) => (
        <div key={idx} style={{ marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 12 }}>{e.school}</div>
            <div style={{ fontSize: 10, color: "#374151" }}>{e.degree}</div>
          </div>
          <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 700 }}>
            {e.from} – {e.to}
          </div>
        </div>
      ))}
    </Block>
  );

  const Skills = () => (
    <Block title={SECTION_LABELS.skills}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 }}>
        {resumeData.skills.programming && resumeData.skills.programming.length > 0 && (
          <div>
            <div style={{ fontWeight: 900, fontSize: 10, marginBottom: 4, color: theme.primary || "#2563eb" }}>Programming</div>
            <div style={{ fontSize: 10 }}>{resumeData.skills.programming.join(", ")}</div>
          </div>
        )}
        {resumeData.skills.frameworks && resumeData.skills.frameworks.length > 0 && (
          <div>
            <div style={{ fontWeight: 900, fontSize: 10, marginBottom: 4, color: theme.primary || "#2563eb" }}>Frameworks</div>
            <div style={{ fontSize: 10 }}>{resumeData.skills.frameworks.join(", ")}</div>
          </div>
        )}
        {resumeData.skills.tools && resumeData.skills.tools.length > 0 && (
          <div>
            <div style={{ fontWeight: 900, fontSize: 10, marginBottom: 4, color: theme.primary || "#2563eb" }}>Tools</div>
            <div style={{ fontSize: 10 }}>{resumeData.skills.tools.join(", ")}</div>
          </div>
        )}
      </div>
    </Block>
  );

  const Projects = () => (
    <Block title={SECTION_LABELS.projects}>
      {resumeData.projects.map((p: any, idx: number) => (
        <div key={idx} style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 900, fontSize: 12, marginBottom: 2 }}>{p.name}</div>
          <div style={{ fontSize: 10, textAlign: "justify" }}>{p.desc}</div>
        </div>
      ))}
    </Block>
  );

  const Certifications = () => (
    <Block title={SECTION_LABELS.certifications}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 }}>
        {resumeData.certifications && resumeData.certifications.map((cert: string, idx: number) => (
          <div key={idx} style={{ fontSize: 10, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: theme.primary || "#2563eb" }}>✓</span>
            {cert}
          </div>
        ))}
      </div>
    </Block>
  );

  const Languages = () => (
    <Block title={SECTION_LABELS.languages}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {resumeData.languages && resumeData.languages.map((lang: string, idx: number) => (
          <div key={idx} style={{ fontSize: 10 }}>
            {lang}
          </div>
        ))}
      </div>
    </Block>
  );

  const renderSection = (id: string) => {
    if (!sections?.[id]?.enabled) return null;
    if (id === "header") return <Header />;
    if (id === "summary") return <Summary />;
    if (id === "experience") return <Experience />;
    if (id === "education") return <Education />;
    if (id === "skills") return <Skills />;
    if (id === "projects") return <Projects />;
    if (id === "certifications") return <Certifications />;
    if (id === "languages") return <Languages />;
    return null;
  };

  // Single Column Layout
  if (layout === "Single Column") {
    const order: string[] = s.order?.length ? s.order : ["header", "summary", "experience", "education", "skills", "projects"];
    return (
      <Box>
        {order.map((id) => (
          <React.Fragment key={id}>{renderSection(id)}</React.Fragment>
        ))}
      </Box>
    );
  }

  // Two Column Layout
  if (layout === "Two Column") {
    const cols = s.columns || { left: ["summary", "skills", "education"], right: ["header", "experience", "projects"] };
    const left = (cols.left || []).filter((x: string) => sections?.[x]?.enabled);
    const right = (cols.right || []).filter((x: string) => sections?.[x]?.enabled);

    return (
      <Box>
        <div style={{ display: "flex", gap: 32 }}>
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
      </Box>
    );
  }

  // Sidebar Left Layout
  if (layout === "Sidebar Left") {
    const cols = s.columns || { left: ["header", "skills", "education", "languages"], right: ["summary", "experience", "projects"] };
    const left = (cols.left || []).filter((x: string) => sections?.[x]?.enabled);
    const right = (cols.right || []).filter((x: string) => sections?.[x]?.enabled);

    return (
      <Box>
        <div style={{ display: "flex", gap: 32 }}>
          <div style={{ width: "35%", background: "#f8fafc", padding: 20, borderRadius: 8 }}>
            {left.map((id: string) => (
              <React.Fragment key={id}>{renderSection(id)}</React.Fragment>
            ))}
          </div>
          <div style={{ width: "65%" }}>
            {right.map((id: string) => (
              <React.Fragment key={id}>{renderSection(id)}</React.Fragment>
            ))}
          </div>
        </div>
      </Box>
    );
  }

  // Sidebar Right Layout
  if (layout === "Sidebar Right") {
    const cols = s.columns || { left: ["summary", "experience", "projects"], right: ["header", "skills", "education", "languages"] };
    const left = (cols.left || []).filter((x: string) => sections?.[x]?.enabled);
    const right = (cols.right || []).filter((x: string) => sections?.[x]?.enabled);

    return (
      <Box>
        <div style={{ display: "flex", gap: 32 }}>
          <div style={{ width: "65%" }}>
            {left.map((id: string) => (
              <React.Fragment key={id}>{renderSection(id)}</React.Fragment>
            ))}
          </div>
          <div style={{ width: "35%", background: "#f8fafc", padding: 20, borderRadius: 8 }}>
            {right.map((id: string) => (
              <React.Fragment key={id}>{renderSection(id)}</React.Fragment>
            ))}
          </div>
        </div>
      </Box>
    );
  }

  // Default fallback
  return (
    <Box>
      <Header />
      <Summary />
      <Experience />
      <Education />
      <Skills />
      <Projects />
    </Box>
  );
}