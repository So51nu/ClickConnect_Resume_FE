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
  summary:
    "Results-driven software engineer with 8+ years of experience building scalable web applications. Expert in React, Node.js, and cloud technologies.",
  experience: [
    {
      title: "Senior Software Engineer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      from: "2021-01",
      to: "Present",
      bullets: [
        "Led microservices architecture serving 2M+ daily active users.",
        "Implemented CI/CD pipelines reducing deployment time by 60%.",
      ],
    },
    {
      title: "Software Engineer",
      company: "Digital Solutions Co.",
      location: "Austin, TX",
      from: "2018-03",
      to: "2020-12",
      bullets: [
        "Built React-based dashboard improving customer engagement by 40%.",
        "Developed REST APIs handling 10K+ req/min.",
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
    fontSize: theme?.titleSize ?? 12,
    fontWeight: 800,
    letterSpacing: "0.06em",
    textTransform: theme?.headingUppercase ? "uppercase" : "none",
    color: c,
    borderBottom: `2px solid ${c}`,
    paddingBottom: 6,
    margin: "14px 0 10px",
  };
}

export default function ResumePreview({ schema }: { schema: any }) {
  const s = schema || {};
  const theme = s.theme || {};
  const sections = s.sections || {};
  const layout = s.layout || "Single Column";

  const fontFamily = theme.fontFamily || "system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

  const Box = ({ children }: any) => (
    <div
      style={{
        width: 420,
        background: "white",
        borderRadius: 14,
        border: "1px solid #e5e7eb",
        boxShadow: "0 6px 20px rgba(0,0,0,0.10)",
        padding: 18,
        fontFamily,
      }}
    >
      {children}
    </div>
  );

  const Header = () => (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 22, fontWeight: 900, color: theme.primary || "#2563eb" }}>
        {SAMPLE.header.fullName}
      </div>
      <div style={{ fontSize: 12, fontWeight: 700, marginTop: 2 }}>{SAMPLE.header.jobTitle}</div>
      <div style={{ fontSize: 10, color: "#374151", marginTop: 6, display: "flex", flexWrap: "wrap", gap: 10 }}>
        <span>{SAMPLE.header.email}</span>
        <span>{SAMPLE.header.phone}</span>
        <span>{SAMPLE.header.location}</span>
        <span>{SAMPLE.header.linkedin}</span>
        <span>{SAMPLE.header.website}</span>
      </div>
    </div>
  );

  const Block = ({ title, children }: any) => (
    <div>
      <div style={titleStyle(theme)}>{title}</div>
      <div style={{ fontSize: theme?.bodySize ?? 10, lineHeight: theme?.lineHeight ?? 1.35, color: "#111827" }}>
        {children}
      </div>
    </div>
  );

  const Summary = () => <Block title={SECTION_LABELS.summary}>{SAMPLE.summary}</Block>;

  const Experience = () => (
    <Block title={SECTION_LABELS.experience}>
      {SAMPLE.experience.map((x, idx) => (
        <div key={idx} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
            <div style={{ fontWeight: 900 }}>{x.title}</div>
            <div style={{ fontSize: 10, color: "#6b7280" }}>
              {x.from} - {x.to}
            </div>
          </div>
          <div style={{ fontSize: 10, color: theme.primary || "#2563eb", fontWeight: 800 }}>
            {x.company} • {x.location}
          </div>
          <ul style={{ margin: "6px 0 0", paddingLeft: 16 }}>
            {x.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </Block>
  );

  const Education = () => (
    <Block title={SECTION_LABELS.education}>
      {SAMPLE.education.map((e, idx) => (
        <div key={idx} style={{ marginBottom: 8 }}>
          <div style={{ fontWeight: 900 }}>{e.school}</div>
          <div style={{ fontSize: 10, color: "#374151" }}>{e.degree}</div>
          <div style={{ fontSize: 10, color: "#6b7280" }}>
            {e.from} - {e.to}
          </div>
        </div>
      ))}
    </Block>
  );

  const Skills = () => (
    <Block title={SECTION_LABELS.skills}>
      <div style={{ marginBottom: 6 }}>
        <b>Programming:</b> {SAMPLE.skills.programming.join(", ")}
      </div>
      <div style={{ marginBottom: 6 }}>
        <b>Frameworks:</b> {SAMPLE.skills.frameworks.join(", ")}
      </div>
      <div>
        <b>Tools:</b> {SAMPLE.skills.tools.join(", ")}
      </div>
    </Block>
  );

  const Projects = () => (
    <Block title={SECTION_LABELS.projects}>
      {SAMPLE.projects.map((p, idx) => (
        <div key={idx} style={{ marginBottom: 8 }}>
          <div style={{ fontWeight: 900 }}>{p.name}</div>
          <div>{p.desc}</div>
        </div>
      ))}
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
    return null;
  };

  if (layout === "Single Column") {
    const order: string[] = s.order?.length ? s.order : ["header", "summary", "experience", "education", "skills", "projects"];
    return <Box>{order.map((id) => <React.Fragment key={id}>{renderSection(id)}</React.Fragment>)}</Box>;
  }

  const cols = s.columns || { left: [], right: [] };
  const left = (cols.left || []).filter((x: string) => sections?.[x]?.enabled);
  const right = (cols.right || []).filter((x: string) => sections?.[x]?.enabled);

  return (
    <Box>
      <div style={{ display: "flex", gap: 14 }}>
        <div style={{ width: "36%" }}>{left.map((id: string) => <React.Fragment key={id}>{renderSection(id)}</React.Fragment>)}</div>
        <div style={{ width: "64%" }}>{right.map((id: string) => <React.Fragment key={id}>{renderSection(id)}</React.Fragment>)}</div>
      </div>
    </Box>
  );
}
