// src/pages/student/StudentTemplatePreview.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axiosInstance";
import ResumePreview from "../pages/dashboard/ResumePreview";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";

function authHeaders() {
  const token = localStorage.getItem("access") || "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const SAMPLE_DATA = {
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
    { 
      name: "E-commerce Platform", 
      desc: "Full-stack platform with real-time inventory management, order tracking, and admin dashboard. Built with React, Node.js, and MongoDB." 
    },
  ],
};

export default function StudentTemplatePreview() {
  const navigate = useNavigate();
  const { id } = useParams();
  const templateId = Number(id);

  const [template, setTemplate] = useState<any>(null);
  const [schema, setSchema] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creatingResume, setCreatingResume] = useState(false);

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`/auth/student/templates/${templateId}/`, { 
          headers: authHeaders() 
        });
        
        setTemplate(response.data);
        setSchema(response.data?.schema || {});
      } catch (err: any) {
        console.error("Error loading template:", err);
        setError("Failed to load template. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (templateId) {
      loadTemplate();
    }
  }, [templateId]);

  const handleCreateResume = async () => {
    try {
      setCreatingResume(true);
      setError(null);
      
      const response = await axios.post(
        "/auth/student/resumes/",
        { 
          template_id: templateId, 
          title: `Resume - ${template?.name || "New Resume"}` 
        },
        { headers: authHeaders() }
      );
      
      // Navigate to resume editor
      navigate(`/student/resume/edit/${response.data.id}`);
      
    } catch (err: any) {
      console.error("Error creating resume:", err);
      setError(err.response?.data?.detail || "Failed to create resume. Please try again.");
    } finally {
      setCreatingResume(false);
    }
  };

  const handleBack = () => {
    navigate("/student/dashboard");
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{ textAlign: 'center' }}>
          <Loader2 size={32} color="#3b82f6" className="animate-spin" style={{ margin: '0 auto 16px' }} />
          <div style={{ fontSize: '16px', color: '#64748b' }}>Loading Template...</div>
        </div>
      </div>
    );
  }

  if (error && !template) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        padding: '20px'
      }}>
        <div style={{ 
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          <AlertCircle size={48} color="#dc2626" style={{ marginBottom: '16px' }} />
          <h2 style={{ color: '#dc2626', marginBottom: '12px' }}>Error Loading Template</h2>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>{error}</p>
          <button
            onClick={handleBack}
            style={{
              backgroundColor: '#1e40af',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              margin: '0 auto'
            }}
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f9fafb', 
      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' 
    }}>
      {/* Header */}
      <div style={{ 
        position: "sticky", 
        top: 0, 
        zIndex: 10, 
        background: "white", 
        borderBottom: "1px solid #e5e7eb", 
        padding: "12px 16px", 
        display: "flex", 
        justifyContent: "space-between", 
        gap: 10,
        flexWrap: "wrap",
        alignItems: "center"
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={handleBack}
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '8px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <ArrowLeft size={16} /> Back
          </button>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18 }}>Template Preview: {template?.name}</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>{template?.category} • {template?.layout}</div>
          </div>
        </div>
        
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button 
            onClick={handleCreateResume}
            disabled={creatingResume}
            style={{ 
              padding: "10px 14px", 
              borderRadius: 10, 
              border: "1px solid #1d4ed8", 
              background: creatingResume ? "#93c5fd" : "#2563eb", 
              color: "white", 
              fontWeight: 900,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: creatingResume ? 'not-allowed' : 'pointer'
            }}
          >
            {creatingResume ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Creating...
              </>
            ) : (
              <>Use This Template</>
            )}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          border: '1px solid #fecaca',
          color: '#dc2626',
          padding: '16px',
          margin: '16px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Preview Content */}
      <div style={{ 
        display: "grid", 
        placeItems: "center", 
        padding: "16px",
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ width: "100%" }}>
          <div style={{ 
            fontWeight: 950, 
            marginBottom: 10,
            fontSize: '20px',
            color: '#1e293b'
          }}>
            Template Preview
          </div>
          <div style={{ 
            fontSize: 12, 
            color: "#6b7280", 
            marginBottom: 20,
            maxWidth: '800px'
          }}>
            This preview shows how your resume will look with this template. Click "Use This Template" to start creating your own resume.
          </div>

          <div style={{ 
            background: "white", 
            padding: 24, 
            borderRadius: 14, 
            border: "1px solid #eef2f7",
            width: "794px", 
            maxWidth: "100%", 
            boxSizing: "border-box",
            margin: '0 auto'
          }}>
            <ResumePreview schema={schema} data={SAMPLE_DATA} />
          </div>
          
          <div style={{ 
            marginTop: 16, 
            padding: 16, 
            backgroundColor: "#f8fafc", 
            borderRadius: 10, 
            fontSize: 12, 
            color: "#64748b",
            maxWidth: '800px',
            margin: '20px auto'
          }}>
            <strong>Note:</strong> This is a sample preview. When you create your own resume, you can customize all the content including name, experience, education, skills, and more.
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '16px',
            marginTop: '32px'
          }}>
            <button
              onClick={handleBack}
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                color: '#475569'
              }}
            >
              Cancel
            </button>
            <button 
              onClick={handleCreateResume}
              disabled={creatingResume}
              style={{ 
                padding: "12px 24px", 
                borderRadius: 10, 
                border: "1px solid #1d4ed8", 
                background: creatingResume ? "#93c5fd" : "#2563eb", 
                color: "white", 
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: creatingResume ? 'not-allowed' : 'pointer'
              }}
            >
              {creatingResume ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Creating Resume...
                </>
              ) : (
                <>Use This Template to Create Resume</>
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}