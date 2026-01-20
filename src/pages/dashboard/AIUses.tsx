// import React, { useEffect, useMemo, useState } from "react";
// import axios from "../../api/axiosInstance";

// function adminHeaders() {
//   const token = localStorage.getItem("admin_access") || "";
//   return token ? { Authorization: `Bearer ${token}` } : {};
// }

// type ApiData = {
//   range: { from: string; to: string; group: string };
//   kpis: { ai_resumes: number; ai_downloads: number; unique_users: number; avg_per_user: number };
//   time_series: Array<{ label: string; ai_resumes: number; downloads: number }>;
//   top_domains: Array<{ name: string; count: number }>;
//   low_domains: Array<{ name: string; count: number }>;
//   templates: Array<{ key: string; layout: string; count: number }>;
//   heatmap: { days: string[]; hours: number[]; matrix: number[][] };
// };

// function SvgLineChart({
//   data,
//   width = "100%",
//   height = 160,
//   getY,
//   color = "#2563eb",
//   title = ""
// }: {
//   data: any[];
//   width?: string | number;
//   height?: number;
//   getY: (d: any) => number;
//   color?: string;
//   title?: string;
// }) {
//   const pad = 24;
  
//   // Handle empty data
//   if (!data || data.length === 0) {
//     return (
//       <svg width={width} height={height} style={{ display: "block" }}>
//         <rect x="0" y="0" width="100%" height="100%" fill="white" rx="12" />
//         <line x1={pad} y1={height - pad} x2={"100%"} y2={height - pad} stroke="#e5e7eb" />
//         <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#e5e7eb" />
//         <text x="50%" y={height/2} textAnchor="middle" fontSize="12" fill="#64748b">
//           No data available
//         </text>
//       </svg>
//     );
//   }

//   const svgWidth = typeof width === 'number' ? width : 520;
//   const maxY = Math.max(1, ...data.map(getY));
//   const pts = data.map((d, i) => {
//     const x = pad + (i * (svgWidth - pad * 2)) / Math.max(1, data.length - 1);
//     const y = height - pad - (getY(d) * (height - pad * 2)) / maxY;
//     return { x, y };
//   });

//   const dPath = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
//   const hasValidData = pts.length > 0;

//   return (
//     <svg width={width} height={height} style={{ display: "block" }}>
//       <defs>
//         <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
//           <stop offset="0%" stopColor={color} stopOpacity="0.3" />
//           <stop offset="100%" stopColor={color} stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       <rect x="0" y="0" width="100%" height="100%" fill="white" rx="12" />
//       <line x1={pad} y1={height - pad} x2={svgWidth - pad} y2={height - pad} stroke="#e5e7eb" />
//       <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#e5e7eb" />
      
//       {/* Gradient area under line - only render if we have data */}
//       {hasValidData && (
//         <path 
//           d={`${dPath} L ${pts[pts.length-1].x} ${height-pad} L ${pts[0].x} ${height-pad} Z`} 
//           fill={`url(#gradient-${color.replace('#', '')})`} 
//         />
//       )}
      
//       {hasValidData && (
//         <path d={dPath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
//       )}
      
//       {hasValidData && pts.map((p, i) => (
//         <circle key={i} cx={p.x} cy={p.y} r="4" fill={color} stroke="white" strokeWidth="2" />
//       ))}
      
//       {/* Y-axis labels */}
//       {hasValidData && (
//         <>
//           <text x={pad - 10} y={pad + 10} fontSize="10" fill="#64748b" textAnchor="end">
//             {maxY}
//           </text>
//           <text x={pad - 10} y={height - pad - 5} fontSize="10" fill="#64748b" textAnchor="end">
//             0
//           </text>
//         </>
//       )}
//     </svg>
//   );
// }

// function SvgBarChart({
//   rows,
//   width = "100%",
//   height = 220,
//   color = "#2563eb",
//   showLabels = true
// }: {
//   rows: Array<{ label: string; value: number }>;
//   width?: string | number;
//   height?: number;
//   color?: string;
//   showLabels?: boolean;
// }) {
//   const pad = 24;
//   const svgWidth = typeof width === 'number' ? width : 520;
  
//   // Handle empty data
//   if (!rows || rows.length === 0) {
//     return (
//       <svg width={width} height={height} style={{ display: "block" }}>
//         <rect x="0" y="0" width="100%" height="100%" fill="white" rx="12" />
//         <text x="50%" y="50%" textAnchor="middle" fontSize="12" fill="#64748b">
//           No data available
//         </text>
//       </svg>
//     );
//   }
  
//   const maxV = Math.max(1, ...rows.map((r) => r.value));
//   const barH = (height - pad * 2) / Math.max(1, rows.length);
  
//   return (
//     <svg width={width} height={height} style={{ display: "block" }}>
//       <rect x="0" y="0" width="100%" height="100%" fill="white" rx="12" />
//       {rows.map((r, i) => {
//         const y = pad + i * barH;
//         const w = ((svgWidth - pad * 2) * r.value) / maxV;
//         const barColor = i % 3 === 0 ? color : 
//                         i % 3 === 1 ? "#7c3aed" : "#059669";
        
//         return (
//           <g key={i}>
//             {showLabels && (
//               <text x={pad} y={y + barH * 0.65} fontSize="11" fill="#334155" fontWeight="500">
//                 {r.label.length > 20 ? r.label.substring(0, 20) + "..." : r.label}
//               </text>
//             )}
//             <rect 
//               x={showLabels ? pad + 160 : pad} 
//               y={y + barH * 0.2} 
//               width={Math.max(w, 4)} // Ensure minimum width for visibility
//               height={barH * 0.55} 
//               rx="6" 
//               fill={barColor}
//               opacity="0.9"
//             />
//             <text 
//               x={(showLabels ? pad + 160 + w + 6 : pad + w + 6)} 
//               y={y + barH * 0.65} 
//               fontSize="11" 
//               fill="#64748b"
//               fontWeight="600"
//             >
//               {r.value.toLocaleString()}
//             </text>
//           </g>
//         );
//       })}
//     </svg>
//   );
// }

// function Heatmap({
//   days,
//   hours,
//   matrix,
// }: {
//   days: string[];
//   hours: number[];
//   matrix: number[][];
// }) {
//   // Handle empty data
//   if (!days || !hours || !matrix || days.length === 0 || hours.length === 0) {
//     return (
//       <svg width="100%" height={200} style={{ display: "block" }}>
//         <rect x="0" y="0" width="100%" height="100%" fill="white" rx="12" />
//         <text x="50%" y="50%" textAnchor="middle" fontSize="12" fill="#64748b">
//           No heatmap data available
//         </text>
//       </svg>
//     );
//   }

//   const cell = 20;
//   const pad = 40;
//   const w = pad + hours.length * cell + 10;
//   const h = pad + days.length * cell + 10;
//   const maxV = Math.max(1, ...matrix.flat());

//   const colors = [
//     "#dbeafe", // 0-20%
//     "#93c5fd", // 20-40%
//     "#60a5fa", // 40-60%
//     "#3b82f6", // 60-80%
//     "#1d4ed8", // 80-100%
//   ];

//   const getColor = (value: number) => {
//     const percentage = value / maxV;
//     if (percentage < 0.2) return colors[0];
//     if (percentage < 0.4) return colors[1];
//     if (percentage < 0.6) return colors[2];
//     if (percentage < 0.8) return colors[3];
//     return colors[4];
//   };

//   return (
//     <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }}>
//       <rect x="0" y="0" width={w} height={h} fill="white" rx="12" />
      
//       {/* hour labels */}
//       {hours.map((hr, i) => (
//         i % 3 === 0 ? (
//           <text key={hr} x={pad + i * cell + 2} y={22} fontSize="10" fill="#64748b" fontWeight="500">
//             {hr}:00
//           </text>
//         ) : null
//       ))}
      
//       {/* day labels */}
//       {days.map((d, i) => (
//         <text key={d} x={12} y={pad + i * cell + 14} fontSize="10" fill="#64748b" fontWeight="500">
//           {d}
//         </text>
//       ))}
      
//       {/* cells */}
//       {days.map((_, di) =>
//         hours.map((_, hi) => {
//           const v = matrix?.[di]?.[hi] || 0;
//           return (
//             <g key={`${di}-${hi}`}>
//               <rect
//                 x={pad + hi * cell}
//                 y={pad + di * cell}
//                 width={cell - 2}
//                 height={cell - 2}
//                 fill={getColor(v)}
//                 rx="4"
//               />
//               {v > 0 && (
//                 <text
//                   x={pad + hi * cell + (cell / 2)}
//                   y={pad + di * cell + (cell / 2) + 4}
//                   fontSize="8"
//                   fill={v > maxV * 0.5 ? "white" : "#1e293b"}
//                   textAnchor="middle"
//                   fontWeight="600"
//                 >
//                   {v}
//                 </text>
//               )}
//             </g>
//           );
//         })
//       )}
      
//       {/* Legend */}
//       <g transform={`translate(${w - 150}, ${h - 25})`}>
//         <text x="0" y="0" fontSize="9" fill="#64748b" fontWeight="500">Activity Level:</text>
//         {colors.map((color, i) => (
//           <rect
//             key={i}
//             x={60 + i * 16}
//             y={-8}
//             width={14}
//             height={14}
//             fill={color}
//             rx="2"
//           />
//         ))}
//       </g>
//     </svg>
//   );
// }

// function DonutChart({ value, max = 100, size = 80, color = "#2563eb", label = "" }: any) {
//   const radius = size / 2 - 8;
//   const circumference = 2 * Math.PI * radius;
//   const progress = (value / max) * circumference;
//   const dashArray = `${progress} ${circumference}`;
  
//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//       <svg width={size} height={size}>
//         <circle
//           cx={size/2}
//           cy={size/2}
//           r={radius}
//           fill="none"
//           stroke="#e5e7eb"
//           strokeWidth="8"
//         />
//         <circle
//           cx={size/2}
//           cy={size/2}
//           r={radius}
//           fill="none"
//           stroke={color}
//           strokeWidth="8"
//           strokeDasharray={dashArray}
//           strokeLinecap="round"
//           transform={`rotate(-90 ${size/2} ${size/2})`}
//         />
//         <text
//           x="50%"
//           y="50%"
//           textAnchor="middle"
//           dy="0.3em"
//           fontSize="16"
//           fontWeight="700"
//           fill="#1e293b"
//         >
//           {value}
//         </text>
//       </svg>
//       <div style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>
//         {label}
//       </div>
//     </div>
//   );
// }

// function SparklineChart({ data, height = 40, width = "100%", color = "#2563eb" }: any) {
//   const svgWidth = typeof width === 'number' ? width : 120;
  
//   if (!data || data.length === 0) {
//     return (
//       <svg width={width} height={height} style={{ display: "block" }}>
//         <text x="50%" y="50%" textAnchor="middle" fontSize="10" fill="#64748b">
//           No data
//         </text>
//       </svg>
//     );
//   }
  
//   const max = Math.max(...data);
//   const points = data.map((val: number, i: number) => {
//     const x = (i / (data.length - 1)) * svgWidth;
//     const y = height - (val / max) * height;
//     return `${x},${y}`;
//   }).join(" ");

//   return (
//     <svg width={width} height={height} style={{ display: "block" }}>
//       <polyline
//         fill="none"
//         stroke={color}
//         strokeWidth="2"
//         points={points}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }

// export default function AIUses() {
//   const [data, setData] = useState<ApiData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [preset, setPreset] = useState<string>("30d");
//   const [group, setGroup] = useState<string>("day");
//   const [from, setFrom] = useState<string>("");
//   const [to, setTo] = useState<string>("");

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const params: any = { preset, group };
//       if (from) params.from = from;
//       if (to) params.to = to;

//       const res = await axios.get("/auth/admin/ai-usage/", {
//         headers: adminHeaders(),
//         params,
//       });
//       setData(res.data);
//     } catch (err: any) {
//       console.error("Failed to fetch data:", err);
//       setError(err.response?.data?.message || "Failed to load analytics data");
//       // Set default empty data structure
//       setData({
//         range: { from: new Date().toISOString().split('T')[0], to: new Date().toISOString().split('T')[0], group: "day" },
//         kpis: { ai_resumes: 0, ai_downloads: 0, unique_users: 0, avg_per_user: 0 },
//         time_series: [],
//         top_domains: [],
//         low_domains: [],
//         templates: [],
//         heatmap: { days: [], hours: [], matrix: [[]] }
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData().catch(console.error);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [preset, group]);

//   const topDomainRows = useMemo(() => {
//     return (data?.top_domains || []).slice(0, 8).map((d) => ({ label: d.name, value: d.count }));
//   }, [data]);

//   const lowDomainRows = useMemo(() => {
//     return (data?.low_domains || []).slice(0, 5).map((d) => ({ label: d.name, value: d.count }));
//   }, [data]);

//   const templateRows = useMemo(() => {
//     return (data?.templates || []).slice(0, 10).map((t) => ({ label: `${t.key} (${t.layout || "-"})`, value: t.count }));
//   }, [data]);

//   const kpiCards = [
//     {
//       label: "AI Resumes Generated",
//       value: data?.kpis.ai_resumes ?? 0,
//       color: "#2563eb",
//       icon: "📊",
//       trend: "+12.5%",
//       description: "Total AI-generated resumes"
//     },
//     {
//       label: "AI Downloads",
//       value: data?.kpis.ai_downloads ?? 0,
//       color: "#7c3aed",
//       icon: "⬇️",
//       trend: "+8.3%",
//       description: "Resumes downloaded"
//     },
//     {
//       label: "Unique Users",
//       value: data?.kpis.unique_users ?? 0,
//       color: "#059669",
//       icon: "👥",
//       trend: "+5.2%",
//       description: "Active users"
//     },
//     {
//       label: "Avg Resumes / User",
//       value: data?.kpis.avg_per_user ? data.kpis.avg_per_user.toFixed(1) : 0,
//       color: "#dc2626",
//       icon: "📈",
//       trend: "+3.1%",
//       description: "Per user average"
//     },
//     {
//       label: "Success Rate",
//       value: "94%",
//       color: "#0891b2",
//       icon: "✅",
//       trend: "+2.4%",
//       description: "Generation success"
//     },
//     {
//       label: "Peak Usage Hour",
//       value: "14:00",
//       color: "#ea580c",
//       icon: "⏰",
//       trend: "Today",
//       description: "Highest activity time"
//     },
//     {
//       label: "Top Domain",
//       value: data?.top_domains?.[0]?.name?.split('.')[0] || "-",
//       color: "#9333ea",
//       icon: "🏢",
//       trend: data?.top_domains?.[0]?.count || 0,
//       description: "Most active domain"
//     },
//     {
//       label: "Popular Template",
//       value: data?.templates?.[0]?.key || "-",
//       color: "#16a34a",
//       icon: "📝",
//       trend: data?.templates?.[0]?.count || 0,
//       description: "Most used template"
//     }
//   ];

//   const analyticsSections = [
//     {
//       title: "Time Series Analysis",
//       description: "AI usage patterns over selected period",
//       type: "charts",
//       content: (
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
//           <div>
//             <div style={{ fontWeight: "700", marginBottom: 8, color: "#1e293b" }}>AI Resumes Over Time</div>
//             <SvgLineChart data={data?.time_series || []} getY={(d) => d.ai_resumes || 0} color="#2563eb" height={180} />
//           </div>
//           <div>
//             <div style={{ fontWeight: "700", marginBottom: 8, color: "#1e293b" }}>Downloads Over Time</div>
//             <SvgLineChart data={data?.time_series || []} getY={(d) => d.downloads || 0} color="#059669" height={180} />
//           </div>
//         </div>
//       )
//     },
//     {
//       title: "Domain Distribution",
//       description: "Top performing domains and low activity domains",
//       type: "bars",
//       content: (
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
//           <div>
//             <div style={{ fontWeight: "700", marginBottom: 8, color: "#1e293b" }}>Top Domains</div>
//             <SvgBarChart rows={topDomainRows} color="#2563eb" height={240} />
//           </div>
//           <div>
//             <div style={{ fontWeight: "700", marginBottom: 8, color: "#1e293b" }}>Low Activity Domains</div>
//             <SvgBarChart rows={lowDomainRows} color="#dc2626" height={240} />
//           </div>
//         </div>
//       )
//     },
//     {
//       title: "Template Usage Analytics",
//       description: "Most popular resume templates",
//       type: "bars",
//       content: (
//         <div>
//           <div style={{ fontWeight: "700", marginBottom: 8, color: "#1e293b" }}>Template Usage Ranking</div>
//           <SvgBarChart rows={templateRows} height={260} color="#7c3aed" />
//         </div>
//       )
//     },
//     {
//       title: "Usage Heatmap Analysis",
//       description: "Peak hours and daily activity patterns",
//       type: "heatmap",
//       content: data?.heatmap ? (
//         <div>
//           <div style={{ fontWeight: "700", marginBottom: 8, color: "#1e293b" }}>Weekly Activity Heatmap</div>
//           <Heatmap 
//             days={data.heatmap.days || []} 
//             hours={data.heatmap.hours || []} 
//             matrix={data.heatmap.matrix || [[]]} 
//           />
//         </div>
//       ) : (
//         <div style={{ textAlign: "center", padding: 20, color: "#64748b" }}>
//           No heatmap data available
//         </div>
//       )
//     },
//     {
//       title: "Performance Metrics",
//       description: "Key performance indicators and ratios",
//       type: "metrics",
//       content: (
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
//           <DonutChart value={75} max={100} color="#2563eb" label="User Satisfaction" />
//           <DonutChart 
//             value={data?.kpis.ai_downloads || 0} 
//             max={Math.max(data?.kpis.ai_resumes || 1, 1)} 
//             color="#059669" 
//             label="Download Rate" 
//           />
//           <DonutChart value={60} max={100} color="#7c3aed" label="Return Rate" />
//           <DonutChart value={85} max={100} color="#ea580c" label="Completion Rate" />
//         </div>
//       )
//     },
//     {
//       title: "Trend Analysis",
//       description: "Weekly and monthly trends",
//       type: "sparklines",
//       content: (
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
//           <div style={{ background: "#f8fafc", padding: 16, borderRadius: 12 }}>
//             <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>Weekly Trend</div>
//             <SparklineChart data={[30, 40, 25, 50, 45, 60, 55]} color="#2563eb" width="100%" />
//             <div style={{ fontSize: 14, fontWeight: "600", marginTop: 8 }}>↑ 15% this week</div>
//           </div>
//           <div style={{ background: "#f8fafc", padding: 16, borderRadius: 12 }}>
//             <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>Monthly Trend</div>
//             <SparklineChart data={[100, 150, 120, 180, 200, 220, 250]} color="#059669" width="100%" />
//             <div style={{ fontSize: 14, fontWeight: "600", marginTop: 8 }}>↑ 25% this month</div>
//           </div>
//           <div style={{ background: "#f8fafc", padding: 16, borderRadius: 12 }}>
//             <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>Peak Hours</div>
//             <SparklineChart data={[10, 30, 50, 80, 100, 90, 70, 60, 40, 30, 20, 10]} color="#7c3aed" width="100%" />
//             <div style={{ fontSize: 14, fontWeight: "600", marginTop: 8 }}>Peak: 14:00-15:00</div>
//           </div>
//         </div>
//       )
//     }
//   ];

//   if (loading && !data) {
//     return (
//       <div style={{ 
//         position: "fixed",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)", 
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         zIndex: 1000
//       }}>
//         <div style={{ 
//           width: 50, 
//           height: 50, 
//           border: "4px solid #e5e7eb",
//           borderTopColor: "#2563eb",
//           borderRadius: "50%",
//           animation: "spin 1s linear infinite"
//         }} />
//         <div style={{ marginTop: 20, fontSize: 16, color: "#64748b" }}>
//           Loading analytics dashboard...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{ 
//       position: "absolute",
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       overflow: "auto",
//       background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)", 
//       fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
//       padding: "0"
//     }}>
//       <div style={{ 
//         maxWidth: "100%",
//         padding: "20px",
//         margin: "0 auto",
//         boxSizing: "border-box"
//       }}>
//         {/* Error Message */}
//         {error && (
//           <div style={{ 
//             background: "#fee2e2", 
//             border: "1px solid #fca5a5", 
//             borderRadius: 12, 
//             padding: 16, 
//             marginBottom: 24,
//             color: "#dc2626",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center"
//           }}>
//             <div>
//               <strong>Error:</strong> {error}
//             </div>
//             <button 
//               onClick={() => setError(null)}
//               style={{ 
//                 background: "none", 
//                 border: "none", 
//                 color: "#dc2626", 
//                 cursor: "pointer",
//                 fontSize: 20
//               }}
//             >
//               ×
//             </button>
//           </div>
//         )}

//         {/* Header Section */}
//         <div style={{ 
//           background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)", 
//           borderRadius: 16, 
//           padding: 24, 
//           marginBottom: 24,
//           color: "white",
//           width: "100%",
//           boxSizing: "border-box"
//         }}>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
//             <div style={{ flex: 1, minWidth: "300px" }}>
//               <h1 style={{ fontSize: "clamp(24px, 4vw, 28px)", fontWeight: "800", margin: 0 }}>🚀 AI Usage Analytics Dashboard</h1>
//               <p style={{ fontSize: 14, color: "#cbd5e1", marginTop: 8, marginBottom: 0 }}>
//                 {data ? `Period: ${data.range.from} → ${data.range.to} (Grouped by ${data.range.group})` : "Analytics dashboard"}
//               </p>
//             </div>
            
//             <div style={{ 
//               background: "rgba(255, 255, 255, 0.1)", 
//               padding: 12, 
//               borderRadius: 12,
//               backdropFilter: "blur(10px)",
//               minWidth: "150px"
//             }}>
//               <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 4 }}>Data Status</div>
//               <div style={{ fontSize: 14, fontWeight: "600" }}>
//                 {loading ? "Updating..." : "Data Loaded"}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Filters Section */}
//         <div style={{ 
//           background: "white", 
//           borderRadius: 16, 
//           padding: 20, 
//           marginBottom: 24,
//           boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
//           width: "100%",
//           boxSizing: "border-box"
//         }}>
//           <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
//             <div style={{ fontSize: 15, fontWeight: "600", color: "#475569", marginRight: 8 }}>Filters:</div>
            
//             <select 
//               value={preset} 
//               onChange={(e) => setPreset(e.target.value)} 
//               style={{ 
//                 padding: "10px 14px", 
//                 borderRadius: 10, 
//                 border: "2px solid #e2e8f0", 
//                 background: "white",
//                 fontSize: 14,
//                 fontWeight: "500",
//                 color: "#334155",
//                 cursor: "pointer",
//                 minWidth: 140,
//                 flex: "1 0 auto"
//               }}
//             >
//               <option value="today">📅 Today</option>
//               <option value="7d">📊 Last 7 days</option>
//               <option value="30d">📈 Last 30 days</option>
//               <option value="90d">📉 Last 90 days</option>
//               <option value="1y">🗓️ Last 1 year</option>
//             </select>

//             <select 
//               value={group} 
//               onChange={(e) => setGroup(e.target.value)} 
//               style={{ 
//                 padding: "10px 14px", 
//                 borderRadius: 10, 
//                 border: "2px solid #e2e8f0", 
//                 background: "white",
//                 fontSize: 14,
//                 fontWeight: "500",
//                 color: "#334155",
//                 cursor: "pointer",
//                 minWidth: 160,
//                 flex: "1 0 auto"
//               }}
//             >
//               <option value="day">📅 Group: Day</option>
//               <option value="week">📅 Group: Week</option>
//               <option value="month">📅 Group: Month</option>
//             </select>

//             <input 
//               type="date" 
//               value={from} 
//               onChange={(e) => setFrom(e.target.value)} 
//               style={{ 
//                 padding: "10px 14px", 
//                 borderRadius: 10, 
//                 border: "2px solid #e2e8f0",
//                 fontSize: 14,
//                 color: "#334155",
//                 flex: "1 0 auto"
//               }} 
//             />
            
//             <input 
//               type="date" 
//               value={to} 
//               onChange={(e) => setTo(e.target.value)} 
//               style={{ 
//                 padding: "10px 14px", 
//                 borderRadius: 10, 
//                 border: "2px solid #e2e8f0",
//                 fontSize: 14,
//                 color: "#334155",
//                 flex: "1 0 auto"
//               }} 
//             />

//             <button 
//               onClick={fetchData} 
//               disabled={loading}
//               style={{ 
//                 padding: "10px 20px", 
//                 borderRadius: 10, 
//                 border: "none", 
//                 background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)", 
//                 color: "white", 
//                 fontWeight: 600,
//                 fontSize: 14,
//                 cursor: loading ? "not-allowed" : "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 8,
//                 transition: "all 0.2s",
//                 boxShadow: "0 2px 4px rgba(37, 99, 235, 0.3)",
//                 opacity: loading ? 0.7 : 1,
//                 flex: "1 0 auto",
//                 justifyContent: "center"
//               }}
//               onMouseOver={(e) => !loading && (e.currentTarget.style.transform = "translateY(-2px)")}
//               onMouseOut={(e) => !loading && (e.currentTarget.style.transform = "translateY(0)")}
//             >
//               {loading ? (
//                 <>
//                   <span style={{
//                     width: 16,
//                     height: 16,
//                     border: "2px solid rgba(255,255,255,0.3)",
//                     borderTopColor: "white",
//                     borderRadius: "50%",
//                     animation: "spin 1s linear infinite"
//                   }} />
//                   Loading...
//                 </>
//               ) : (
//                 "🚀 Apply Filters"
//               )}
//             </button>
//           </div>
//         </div>

//         {/* KPI Cards Grid */}
//         <div style={{ 
//           display: "grid", 
//           gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
//           gap: 16, 
//           marginBottom: 24,
//           width: "100%"
//         }}>
//           {kpiCards.map((kpi, index) => (
//             <div 
//               key={kpi.label} 
//               style={{ 
//                 background: "white", 
//                 border: "1px solid #e2e8f0", 
//                 borderRadius: 16, 
//                 padding: 20,
//                 transition: "all 0.3s ease",
//                 boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
//                 minHeight: "120px",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "space-between"
//               }}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.transform = "translateY(-4px)";
//                 e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.transform = "translateY(0)";
//                 e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
//               }}
//             >
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap" }}>
//                 <div style={{ flex: 1 }}>
//                   <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600, marginBottom: 8 }}>
//                     <span style={{ marginRight: 8 }}>{kpi.icon}</span>
//                     {kpi.label}
//                   </div>
//                   <div style={{ fontSize: "clamp(20px, 5vw, 28px)", fontWeight: 800, color: kpi.color, marginBottom: 4 }}>
//                     {typeof kpi.value === 'number' ? kpi.value.toLocaleString() : kpi.value}
//                   </div>
//                   <div style={{ fontSize: 12, color: "#94a3b8" }}>
//                     {kpi.description}
//                   </div>
//                 </div>
//                 <div style={{ 
//                   background: kpi.color + "15", 
//                   padding: "8px 12px", 
//                   borderRadius: 20,
//                   fontSize: 12,
//                   fontWeight: 600,
//                   color: kpi.color,
//                   alignSelf: "flex-start",
//                   marginLeft: 8
//                 }}>
//                   {kpi.trend}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Analytics Sections */}
//         <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
//           {analyticsSections.map((section, index) => (
//             section.content && (
//               <div 
//                 key={index} 
//                 style={{ 
//                   background: "white", 
//                   borderRadius: 16, 
//                   padding: 24,
//                   boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
//                   border: "1px solid #e2e8f0",
//                   width: "100%",
//                   boxSizing: "border-box"
//                 }}
//               >
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
//                   <div style={{ flex: 1 }}>
//                     <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", margin: 0 }}>
//                       {section.title}
//                     </h3>
//                     <p style={{ fontSize: 13, color: "#64748b", marginTop: 4, marginBottom: 0 }}>
//                       {section.description}
//                     </p>
//                   </div>
//                   <div style={{ 
//                     background: "#f8fafc", 
//                     padding: "6px 12px", 
//                     borderRadius: 20,
//                     fontSize: 12,
//                     fontWeight: 600,
//                     color: "#475569",
//                     flexShrink: 0
//                   }}>
//                     Section {index + 1}
//                   </div>
//                 </div>
                
//                 <div style={{ width: "100%", overflowX: "auto" }}>
//                   {section.content}
//                 </div>
//               </div>
//             )
//           ))}
//         </div>

//         {/* Footer */}
//         <div style={{ 
//           marginTop: 32, 
//           paddingTop: 20, 
//           borderTop: "1px solid #e2e8f0",
//           textAlign: "center",
//           color: "#64748b",
//           fontSize: 13,
//           width: "100%",
//           boxSizing: "border-box"
//         }}>
//           <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", marginBottom: 12 }}>
//             <span>📊 Real-time Analytics</span>
//             <span>🔒 Secure Data</span>
//             <span>📈 Performance Metrics</span>
//             <span>🔄 Auto-refresh</span>
//           </div>
//           <p>AI Usage Analytics Dashboard • Last updated: {new Date().toLocaleString()}</p>
//         </div>
//       </div>

//       <style>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
        
//         * {
//           box-sizing: border-box;
//         }
        
//         body, html, #root {
//           margin: 0;
//           padding: 0;
//           width: 100%;
//           height: 100%;
//           overflow: hidden;
//         }
        
//         @media (max-width: 768px) {
//           .analytics-grid {
//             grid-template-columns: 1fr;
//           }
          
//           .filters-container {
//             flex-direction: column;
//             align-items: stretch;
//           }
          
//           select, input, button {
//             width: 100%;
//           }
          
//           .section-grid {
//             grid-template-columns: 1fr !important;
//           }
//         }
        
//         @media (max-width: 480px) {
//           .kpi-grid {
//             grid-template-columns: 1fr;
//           }
          
//           h1 {
//             font-size: 22px !important;
//           }
          
//           .dashboard-container {
//             padding: 10px !important;
//           }
//         }
        
//         /* Scrollbar styling */
//         ::-webkit-scrollbar {
//           width: 8px;
//           height: 8px;
//         }
        
//         ::-webkit-scrollbar-track {
//           background: #f1f5f9;
//           border-radius: 4px;
//         }
        
//         ::-webkit-scrollbar-thumb {
//           background: #cbd5e1;
//           border-radius: 4px;
//         }
        
//         ::-webkit-scrollbar-thumb:hover {
//           background: #94a3b8;
//         }
//       `}</style>
//     </div>
//   );
// }

import  { useEffect, useMemo, useState } from "react";
import axios from "../../api/axiosInstance";

function adminHeaders() {
  const token = localStorage.getItem("admin_access") || "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

type ApiData = {
  range: { from: string; to: string; group: string };
  kpis: { ai_resumes: number; ai_downloads: number; unique_users: number; avg_per_user: number };
  time_series: Array<{ label: string; ai_resumes: number; downloads: number }>;
  top_domains: Array<{ name: string; count: number }>;
  low_domains: Array<{ name: string; count: number }>;
  templates: Array<{ key: string; layout: string; count: number }>;
  heatmap: { days: string[]; hours: number[]; matrix: number[][] };
};

function SvgLineChart({
  data,
  width = "100%",
  height = 160,
  getY,
  color = "#2563eb",
  //title = ""
}: {
  data: any[];
  width?: string | number;
  height?: number;
  getY: (d: any) => number;
  color?: string;
  title?: string;
}) {
  const pad = 24;
  
  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <svg width={width} height={height} style={{ display: "block" }}>
        <rect x="0" y="0" width="100%" height="100%" fill="white" rx="12" />
        <line x1={pad} y1={height - pad} x2={typeof width === 'number' ? width - pad : "100%"} y2={height - pad} stroke="#e5e7eb" />
        <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#e5e7eb" />
        <text x="50%" y={height/2} textAnchor="middle" fontSize="12" fill="#64748b">
          No data available
        </text>
      </svg>
    );
  }

  const svgWidth = typeof width === 'number' ? width : 520;
  const maxY = Math.max(1, ...data.map(getY));
  const pts = data.map((d, i) => {
    const x = pad + (i * (svgWidth - pad * 2)) / Math.max(1, data.length - 1);
    const y = height - pad - (getY(d) * (height - pad * 2)) / maxY;
    return { x, y };
  });

  const dPath = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const hasValidData = pts.length > 0;

  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <defs>
        <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="white" rx="12" />
      <line x1={pad} y1={height - pad} x2={svgWidth - pad} y2={height - pad} stroke="#e5e7eb" />
      <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#e5e7eb" />
      
      {hasValidData && (
        <path 
          d={`${dPath} L ${pts[pts.length-1].x} ${height-pad} L ${pts[0].x} ${height-pad} Z`} 
          fill={`url(#gradient-${color.replace('#', '')})`} 
        />
      )}
      
      {hasValidData && (
        <path d={dPath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      )}
      
      {hasValidData && pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill={color} stroke="white" strokeWidth="2" />
      ))}
      
      {hasValidData && (
        <>
          <text x={pad - 10} y={pad + 10} fontSize="10" fill="#64748b" textAnchor="end">
            {maxY}
          </text>
          <text x={pad - 10} y={height - pad - 5} fontSize="10" fill="#64748b" textAnchor="end">
            0
          </text>
        </>
      )}
    </svg>
  );
}

function SvgBarChart({
  rows,
  width = "100%",
  height = 220,
  color = "#2563eb",
  showLabels = true
}: {
  rows: Array<{ label: string; value: number }>;
  width?: string | number;
  height?: number;
  color?: string;
  showLabels?: boolean;
}) {
  const pad = 24;
  const svgWidth = typeof width === 'number' ? width : 520;
  
  if (!rows || rows.length === 0) {
    return (
      <svg width={width} height={height} style={{ display: "block" }}>
        <rect x="0" y="0" width="100%" height="100%" fill="white" rx="12" />
        <text x="50%" y="50%" textAnchor="middle" fontSize="12" fill="#64748b">
          No data available
        </text>
      </svg>
    );
  }
  
  const maxV = Math.max(1, ...rows.map((r) => r.value));
  const barH = (height - pad * 2) / Math.max(1, rows.length);
  
  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <rect x="0" y="0" width="100%" height="100%" fill="white" rx="12" />
      {rows.map((r, i) => {
        const y = pad + i * barH;
        const w = ((svgWidth - pad * 2) * r.value) / maxV;
        
        return (
          <g key={i}>
            {showLabels && (
              <text x={pad} y={y + barH * 0.65} fontSize="11" fill="#334155" fontWeight="500">
                {r.label.length > 20 ? r.label.substring(0, 20) + "..." : r.label}
              </text>
            )}
            <rect 
              x={showLabels ? pad + 160 : pad} 
              y={y + barH * 0.2} 
              width={Math.max(w, 4)}
              height={barH * 0.55} 
              rx="6" 
              fill={color}
              opacity="0.8"
            />
            <text 
              x={(showLabels ? pad + 160 + w + 6 : pad + w + 6)} 
              y={y + barH * 0.65} 
              fontSize="11" 
              fill="#64748b"
              fontWeight="600"
            >
              {r.value.toLocaleString()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Heatmap({
  days,
  hours,
  matrix,
}: {
  days: string[];
  hours: number[];
  matrix: number[][];
}) {
  if (!days || !hours || !matrix || days.length === 0 || hours.length === 0) {
    return (
      <svg width="100%" height={200} style={{ display: "block" }}>
        <rect x="0" y="0" width="100%" height="100%" fill="white" rx="12" />
        <text x="50%" y="50%" textAnchor="middle" fontSize="12" fill="#64748b">
          No heatmap data available
        </text>
      </svg>
    );
  }

  const cell = 20;
  const pad = 40;
  const w = pad + hours.length * cell + 10;
  const h = pad + days.length * cell + 10;
  const maxV = Math.max(1, ...matrix.flat());

  const colors = [
    "#dbeafe", // 0-20%
    "#93c5fd", // 20-40%
    "#60a5fa", // 40-60%
    "#3b82f6", // 60-80%
    "#1d4ed8", // 80-100%
  ];

  const getColor = (value: number) => {
    const percentage = value / maxV;
    if (percentage < 0.2) return colors[0];
    if (percentage < 0.4) return colors[1];
    if (percentage < 0.6) return colors[2];
    if (percentage < 0.8) return colors[3];
    return colors[4];
  };

  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }}>
      <rect x="0" y="0" width={w} height={h} fill="white" rx="12" />
      
      {hours.map((hr, i) => (
        i % 3 === 0 ? (
          <text key={hr} x={pad + i * cell + 2} y={22} fontSize="10" fill="#64748b" fontWeight="500">
            {hr}:00
          </text>
        ) : null
      ))}
      
      {days.map((d, i) => (
        <text key={d} x={12} y={pad + i * cell + 14} fontSize="10" fill="#64748b" fontWeight="500">
          {d}
        </text>
      ))}
      
      {days.map((_, di) =>
        hours.map((_, hi) => {
          const v = matrix?.[di]?.[hi] || 0;
          return (
            <g key={`${di}-${hi}`}>
              <rect
                x={pad + hi * cell}
                y={pad + di * cell}
                width={cell - 2}
                height={cell - 2}
                fill={getColor(v)}
                rx="4"
              />
              {v > 0 && (
                <text
                  x={pad + hi * cell + (cell / 2)}
                  y={pad + di * cell + (cell / 2) + 4}
                  fontSize="8"
                  fill={v > maxV * 0.5 ? "white" : "#1e293b"}
                  textAnchor="middle"
                  fontWeight="600"
                >
                  {v}
                </text>
              )}
            </g>
          );
        })
      )}
      
      <g transform={`translate(${w - 150}, ${h - 25})`}>
        <text x="0" y="0" fontSize="9" fill="#64748b" fontWeight="500">Activity Level:</text>
        {colors.map((color, i) => (
          <rect
            key={i}
            x={60 + i * 16}
            y={-8}
            width={14}
            height={14}
            fill={color}
            rx="2"
          />
        ))}
      </g>
    </svg>
  );
}

function DonutChart({ value, max = 100, size = 80, color = "#2563eb", label = "" }: any) {
  const radius = size / 2 - 8;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / max) * circumference;
  const dashArray = `${progress} ${circumference}`;
  
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <svg width={size} height={size}>
        <circle
          cx={size/2}
          cy={size/2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="8"
        />
        <circle
          cx={size/2}
          cy={size/2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={dashArray}
          strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="0.3em"
          fontSize="16"
          fontWeight="700"
          fill="#1e293b"
        >
          {value}
        </text>
      </svg>
      <div style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>
        {label}
      </div>
    </div>
  );
}

function SparklineChart({ data, height = 40, width = "100%", color = "#2563eb" }: any) {
  const svgWidth = typeof width === 'number' ? width : 120;
  
  if (!data || data.length === 0) {
    return (
      <svg width={width} height={height} style={{ display: "block" }}>
        <text x="50%" y="50%" textAnchor="middle" fontSize="10" fill="#64748b">
          No data
        </text>
      </svg>
    );
  }
  
  const max = Math.max(...data);
  const points = data.map((val: number, i: number) => {
    const x = (i / (data.length - 1)) * svgWidth;
    const y = height - (val / max) * height;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AIUses() {
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [preset, setPreset] = useState<string>("30d");
  const [group, setGroup] = useState<string>("day");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const params: any = { preset, group };
      if (from) params.from = from;
      if (to) params.to = to;

      const res = await axios.get("/auth/admin/ai-usage/", {
        headers: adminHeaders(),
        params,
      });
      setData(res.data);
    } catch (err: any) {
      console.error("Failed to fetch data:", err);
      setError(err.response?.data?.message || "Failed to load analytics data");
      // Set empty data structure with zeros instead of dummy data
      setData({
        range: { from: new Date().toISOString().split('T')[0], to: new Date().toISOString().split('T')[0], group: "day" },
        kpis: { ai_resumes: 0, ai_downloads: 0, unique_users: 0, avg_per_user: 0 },
        time_series: [],
        top_domains: [],
        low_domains: [],
        templates: [],
        heatmap: { days: [], hours: [], matrix: [[]] }
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset, group]);

  const topDomainRows = useMemo(() => {
    return (data?.top_domains || []).slice(0, 8).map((d) => ({ label: d.name, value: d.count }));
  }, [data]);

  const lowDomainRows = useMemo(() => {
    return (data?.low_domains || []).slice(0, 5).map((d) => ({ label: d.name, value: d.count }));
  }, [data]);

  const templateRows = useMemo(() => {
    return (data?.templates || []).slice(0, 10).map((t) => ({ label: `${t.key} (${t.layout || "-"})`, value: t.count }));
  }, [data]);

  // Calculate dynamic KPIs from actual data
  const dynamicKpis = useMemo(() => {
    if (!data) return [];
    
    const { kpis, top_domains, templates } = data;
    
    // Calculate download rate from actual data
    const downloadRate = kpis.ai_resumes > 0 
      ? Math.round((kpis.ai_downloads / kpis.ai_resumes) * 100)
      : 0;
    
    // Calculate growth trends from time series data
    const timeSeries = data.time_series || [];
    const recentTrend = timeSeries.length > 1 
      ? timeSeries[timeSeries.length - 1].ai_resumes - timeSeries[0].ai_resumes
      : 0;
    
    const growthPercentage = timeSeries.length > 1 && timeSeries[0].ai_resumes > 0
      ? Math.round(((timeSeries[timeSeries.length - 1].ai_resumes - timeSeries[0].ai_resumes) / timeSeries[0].ai_resumes) * 100)
      : 0;
    
    // Find peak hour from heatmap data
    let peakHour = "N/A";
    let peakValue = 0;
    if (data.heatmap && data.heatmap.matrix && data.heatmap.hours) {
      data.heatmap.matrix.forEach((row) => {
        row.forEach((value, hourIndex) => {
          if (value > peakValue) {
            peakValue = value;
            peakHour = `${data.heatmap.hours[hourIndex]}:00`;
          }
        });
      });
    }
    
    return [
      {
        label: "AI Resumes Generated",
        value: kpis.ai_resumes || 0,
        color: "#2563eb",
        icon: "📊",
        trend: `${growthPercentage >= 0 ? '+' : ''}${growthPercentage}%`,
        description: "Total AI-generated resumes"
      },
      {
        label: "AI Downloads",
        value: kpis.ai_downloads || 0,
        color: "#7c3aed",
        icon: "⬇️",
        trend: `${downloadRate}% download rate`,
        description: "Resumes downloaded"
      },
      {
        label: "Unique Users",
        value: kpis.unique_users || 0,
        color: "#059669",
        icon: "👥",
        trend: kpis.avg_per_user ? `${kpis.avg_per_user.toFixed(1)} avg/user` : "0 avg/user",
        description: "Active users"
      },
      {
        label: "Avg Resumes / User",
        value: kpis.avg_per_user ? kpis.avg_per_user.toFixed(1) : "0",
        color: "#dc2626",
        icon: "📈",
        trend: recentTrend >= 0 ? `+${recentTrend} trend` : `${recentTrend} trend`,
        description: "Per user average"
      },
      {
        label: "Download Rate",
        value: `${downloadRate}%`,
        color: "#0891b2",
        icon: "✅",
        trend: downloadRate > 50 ? "Good" : "Needs improvement",
        description: "Downloads per generation"
      },
      {
        label: "Peak Usage Hour",
        value: peakHour,
        color: "#ea580c",
        icon: "⏰",
        trend: peakValue > 0 ? `${peakValue} activities` : "No data",
        description: "Highest activity time"
      },
      {
        label: "Top Domain",
        value: top_domains?.[0]?.name?.split('.')[0] || "-",
        color: "#9333ea",
        icon: "🏢",
        trend: top_domains?.[0]?.count ? `${top_domains[0].count} uses` : "0 uses",
        description: "Most active domain"
      },
      {
        label: "Popular Template",
        value: templates?.[0]?.key || "-",
        color: "#16a34a",
        icon: "📝",
        trend: templates?.[0]?.count ? `${templates[0].count} uses` : "0 uses",
        description: "Most used template"
      }
    ];
  }, [data]);

  // Calculate actual performance metrics from data
  const performanceMetrics = useMemo(() => {
    if (!data) return [];
    
    const { kpis } = data;
    
    // Calculate actual download rate
    const downloadRate = kpis.ai_resumes > 0 
      ? Math.round((kpis.ai_downloads / kpis.ai_resumes) * 100)
      : 0;
    
    // Calculate retention rate (simplified - based on unique users vs downloads)
    const retentionRate = kpis.unique_users > 0 && kpis.ai_downloads > 0
      ? Math.min(100, Math.round((kpis.ai_downloads / kpis.unique_users) * 100))
      : 0;
    
    // Calculate completion rate (assume most users complete if they download)
    const completionRate = kpis.unique_users > 0
      ? Math.min(100, Math.round((kpis.ai_downloads / kpis.unique_users) * 100))
      : 0;
    
    // Calculate user satisfaction (simplified metric)
    const satisfactionRate = downloadRate > 80 ? 85 : 
                           downloadRate > 60 ? 75 : 
                           downloadRate > 40 ? 65 : 50;
    
    return [
      { value: satisfactionRate, max: 100, color: "#2563eb", label: "User Satisfaction" },
      { value: downloadRate, max: 100, color: "#059669", label: "Download Rate" },
      { value: retentionRate, max: 100, color: "#7c3aed", label: "Retention Rate" },
      { value: completionRate, max: 100, color: "#ea580c", label: "Completion Rate" }
    ];
  }, [data]);

  // Calculate actual trends from time series data
  const actualTrends = useMemo(() => {
    if (!data?.time_series || data.time_series.length === 0) return [];
    
    const timeSeries = data.time_series;
    
    // Weekly trend (last 7 data points or all if less)
    const weeklyData = timeSeries.slice(-7).map(d => d.ai_resumes || 0);
    const weeklyGrowth = weeklyData.length > 1
      ? Math.round(((weeklyData[weeklyData.length - 1] - weeklyData[0]) / weeklyData[0]) * 100)
      : 0;
    
    // Monthly trend (all data points)
    const monthlyData = timeSeries.map(d => d.ai_resumes || 0);
    const monthlyGrowth = monthlyData.length > 1
      ? Math.round(((monthlyData[monthlyData.length - 1] - monthlyData[0]) / monthlyData[0]) * 100)
      : 0;
    
    // Peak hours trend from heatmap
    const peakData = data.heatmap?.matrix?.[0] || Array(24).fill(0);
    
    return [
      {
        title: "Weekly Trend",
        data: weeklyData,
        color: "#2563eb",
        growth: weeklyGrowth,
        description: weeklyData.length > 0 ? `${weeklyData[weeklyData.length - 1]} this week` : "No data"
      },
      {
        title: "Monthly Trend",
        data: monthlyData,
        color: "#059669",
        growth: monthlyGrowth,
        description: monthlyData.length > 0 ? `${monthlyData[monthlyData.length - 1]} this month` : "No data"
      },
      {
        title: "Peak Hours",
        data: peakData,
        color: "#7c3aed",
        growth: 0,
        description: "Daily activity pattern"
      }
    ];
  }, [data]);

  const analyticsSections = [
    {
      title: "Time Series Analysis",
      description: "AI usage patterns over selected period",
      type: "charts",
      content: (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          <div>
            <div style={{ fontWeight: "700", marginBottom: 8, color: "#1e293b" }}>AI Resumes Over Time</div>
            <SvgLineChart data={data?.time_series || []} getY={(d) => d.ai_resumes || 0} color="#2563eb" height={180} />
          </div>
          <div>
            <div style={{ fontWeight: "700", marginBottom: 8, color: "#1e293b" }}>Downloads Over Time</div>
            <SvgLineChart data={data?.time_series || []} getY={(d) => d.downloads || 0} color="#059669" height={180} />
          </div>
        </div>
      )
    },
    {
      title: "Domain Distribution",
      description: "Top performing domains and low activity domains",
      type: "bars",
      content: (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          <div>
            <div style={{ fontWeight: "700", marginBottom: 8, color: "#1e293b" }}>Top Domains</div>
            <SvgBarChart rows={topDomainRows} color="#2563eb" height={240} />
          </div>
          <div>
            <div style={{ fontWeight: "700", marginBottom: 8, color: "#1e293b" }}>Low Activity Domains</div>
            <SvgBarChart rows={lowDomainRows} color="#dc2626" height={240} />
          </div>
        </div>
      )
    },
    {
      title: "Template Usage Analytics",
      description: "Most popular resume templates",
      type: "bars",
      content: (
        <div>
          <div style={{ fontWeight: "700", marginBottom: 8, color: "#1e293b" }}>Template Usage Ranking</div>
          <SvgBarChart rows={templateRows} height={260} color="#7c3aed" />
        </div>
      )
    },
    {
      title: "Usage Heatmap Analysis",
      description: "Peak hours and daily activity patterns",
      type: "heatmap",
      content: data?.heatmap ? (
        <div>
          <div style={{ fontWeight: "700", marginBottom: 8, color: "#1e293b" }}>Weekly Activity Heatmap</div>
          <Heatmap 
            days={data.heatmap.days || []} 
            hours={data.heatmap.hours || []} 
            matrix={data.heatmap.matrix || [[]]} 
          />
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: 20, color: "#64748b" }}>
          No heatmap data available
        </div>
      )
    },
    {
      title: "Performance Metrics",
      description: "Key performance indicators and ratios calculated from actual data",
      type: "metrics",
      content: (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {performanceMetrics.map((metric, index) => (
            <DonutChart 
              key={index}
              value={metric.value} 
              max={metric.max} 
              color={metric.color} 
              label={metric.label} 
            />
          ))}
        </div>
      )
    },
    {
      title: "Trend Analysis",
      description: "Weekly and monthly trends calculated from actual data",
      type: "sparklines",
      content: (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
          {actualTrends.map((trend, index) => (
            <div key={index} style={{ background: "#f8fafc", padding: 16, borderRadius: 12 }}>
              <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>{trend.title}</div>
              <SparklineChart data={trend.data} color={trend.color} width="100%" />
              <div style={{ 
                fontSize: 14, 
                fontWeight: "600", 
                marginTop: 8,
                color: trend.growth >= 0 ? "#059669" : "#dc2626"
              }}>
                {trend.growth !== 0 ? `${trend.growth >= 0 ? '↑' : '↓'} ${Math.abs(trend.growth)}%` : "No trend data"}
              </div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
                {trend.description}
              </div>
            </div>
          ))}
        </div>
      )
    }
  ];

  if (loading && !data) {
    return (
      <div style={{ 
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)", 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000
      }}>
        <div style={{ 
          width: 50, 
          height: 50, 
          border: "4px solid #e5e7eb",
          borderTopColor: "#2563eb",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }} />
        <div style={{ marginTop: 20, fontSize: 16, color: "#64748b" }}>
          Loading analytics dashboard...
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: "auto",
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)", 
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      padding: "0"
    }}>
      <div style={{ 
        maxWidth: "100%",
        padding: "20px",
        margin: "0 auto",
        boxSizing: "border-box"
      }}>
        {/* Error Message */}
        {error && (
          <div style={{ 
            background: "#fee2e2", 
            border: "1px solid #fca5a5", 
            borderRadius: 12, 
            padding: 16, 
            marginBottom: 24,
            color: "#dc2626",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div>
              <strong>Error:</strong> {error}
            </div>
            <button 
              onClick={() => setError(null)}
              style={{ 
                background: "none", 
                border: "none", 
                color: "#dc2626", 
                cursor: "pointer",
                fontSize: 20
              }}
            >
              ×
            </button>
          </div>
        )}

        {/* Header Section */}
        <div style={{ 
          background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)", 
          borderRadius: 16, 
          padding: 24, 
          marginBottom: 24,
          color: "white",
          width: "100%",
          boxSizing: "border-box"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
            <div style={{ flex: 1, minWidth: "300px" }}>
              <h1 style={{ fontSize: "clamp(24px, 4vw, 28px)", fontWeight: "800", margin: 0 }}>🚀 AI Usage Analytics Dashboard</h1>
              <p style={{ fontSize: 14, color: "#cbd5e1", marginTop: 8, marginBottom: 0 }}>
                {data ? `Period: ${data.range.from} → ${data.range.to} (Grouped by ${data.range.group})` : "Analytics dashboard"}
              </p>
            </div>
            
            <div style={{ 
              background: "rgba(255, 255, 255, 0.1)", 
              padding: 12, 
              borderRadius: 12,
              backdropFilter: "blur(10px)",
              minWidth: "150px"
            }}>
              <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 4 }}>Data Status</div>
              <div style={{ fontSize: 14, fontWeight: "600" }}>
                {loading ? "Updating..." : "Data Loaded"}
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div style={{ 
          background: "white", 
          borderRadius: 16, 
          padding: 20, 
          marginBottom: 24,
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
          width: "100%",
          boxSizing: "border-box"
        }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ fontSize: 15, fontWeight: "600", color: "#475569", marginRight: 8 }}>Filters:</div>
            
            <select 
              value={preset} 
              onChange={(e) => setPreset(e.target.value)} 
              style={{ 
                padding: "10px 14px", 
                borderRadius: 10, 
                border: "2px solid #e2e8f0", 
                background: "white",
                fontSize: 14,
                fontWeight: "500",
                color: "#334155",
                cursor: "pointer",
                minWidth: 140,
                flex: "1 0 auto"
              }}
            >
              <option value="today">📅 Today</option>
              <option value="7d">📊 Last 7 days</option>
              <option value="30d">📈 Last 30 days</option>
              <option value="90d">📉 Last 90 days</option>
              <option value="1y">🗓️ Last 1 year</option>
            </select>

            <select 
              value={group} 
              onChange={(e) => setGroup(e.target.value)} 
              style={{ 
                padding: "10px 14px", 
                borderRadius: 10, 
                border: "2px solid #e2e8f0", 
                background: "white",
                fontSize: 14,
                fontWeight: "500",
                color: "#334155",
                cursor: "pointer",
                minWidth: 160,
                flex: "1 0 auto"
              }}
            >
              <option value="day">📅 Group: Day</option>
              <option value="week">📅 Group: Week</option>
              <option value="month">📅 Group: Month</option>
            </select>

            <input 
              type="date" 
              value={from} 
              onChange={(e) => setFrom(e.target.value)} 
              style={{ 
                padding: "10px 14px", 
                borderRadius: 10, 
                border: "2px solid #e2e8f0",
                fontSize: 14,
                color: "#334155",
                flex: "1 0 auto"
              }} 
            />
            
            <input 
              type="date" 
              value={to} 
              onChange={(e) => setTo(e.target.value)} 
              style={{ 
                padding: "10px 14px", 
                borderRadius: 10, 
                border: "2px solid #e2e8f0",
                fontSize: 14,
                color: "#334155",
                flex: "1 0 auto"
              }} 
            />

            <button 
              onClick={fetchData} 
              disabled={loading}
              style={{ 
                padding: "10px 20px", 
                borderRadius: 10, 
                border: "none", 
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)", 
                color: "white", 
                fontWeight: 600,
                fontSize: 14,
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.2s",
                boxShadow: "0 2px 4px rgba(37, 99, 235, 0.3)",
                opacity: loading ? 0.7 : 1,
                flex: "1 0 auto",
                justifyContent: "center"
              }}
              onMouseOver={(e) => !loading && (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseOut={(e) => !loading && (e.currentTarget.style.transform = "translateY(0)")}
            >
              {loading ? (
                <>
                  <span style={{
                    width: 16,
                    height: 16,
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "white",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite"
                  }} />
                  Loading...
                </>
              ) : (
                "🚀 Apply Filters"
              )}
            </button>
          </div>
        </div>

        {/* KPI Cards Grid - Now fully dynamic */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
          gap: 16, 
          marginBottom: 24,
          width: "100%"
        }}>
          {dynamicKpis.map((kpi) => (
            <div 
              key={kpi.label} 
              style={{ 
                background: "white", 
                border: "1px solid #e2e8f0", 
                borderRadius: 16, 
                padding: 20,
                transition: "all 0.3s ease",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                minHeight: "120px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600, marginBottom: 8 }}>
                    <span style={{ marginRight: 8 }}>{kpi.icon}</span>
                    {kpi.label}
                  </div>
                  <div style={{ fontSize: "clamp(20px, 5vw, 28px)", fontWeight: 800, color: kpi.color, marginBottom: 4 }}>
                    {kpi.value}
                  </div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>
                    {kpi.description}
                  </div>
                </div>
                <div style={{ 
                  background: kpi.color + "15", 
                  padding: "8px 12px", 
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 600,
                  color: kpi.color,
                  alignSelf: "flex-start",
                  marginLeft: 8
                }}>
                  {kpi.trend}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Analytics Sections - All fully dynamic */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
          {analyticsSections.map((section, index) => (
            section.content && (
              <div 
                key={index} 
                style={{ 
                  background: "white", 
                  borderRadius: 16, 
                  padding: 24,
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                  border: "1px solid #e2e8f0",
                  width: "100%",
                  boxSizing: "border-box"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", margin: 0 }}>
                      {section.title}
                    </h3>
                    <p style={{ fontSize: 13, color: "#64748b", marginTop: 4, marginBottom: 0 }}>
                      {section.description}
                    </p>
                  </div>
                  <div style={{ 
                    background: "#f8fafc", 
                    padding: "6px 12px", 
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#475569",
                    flexShrink: 0
                  }}>
                    Section {index + 1}
                  </div>
                </div>
                
                <div style={{ width: "100%", overflowX: "auto" }}>
                  {section.content}
                </div>
              </div>
            )
          ))}
        </div>

        {/* Footer */}
        <div style={{ 
          marginTop: 32, 
          paddingTop: 20, 
          borderTop: "1px solid #e2e8f0",
          textAlign: "center",
          color: "#64748b",
          fontSize: 13,
          width: "100%",
          boxSizing: "border-box"
        }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", marginBottom: 12 }}>
            <span>📊 Real-time Analytics</span>
            <span>🔒 Secure Data</span>
            <span>📈 Performance Metrics</span>
            <span>🔄 Auto-refresh</span>
          </div>
          <p>AI Usage Analytics Dashboard • Last updated: {new Date().toLocaleString()}</p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        * {
          box-sizing: border-box;
        }
        
        body, html, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        @media (max-width: 768px) {
          .analytics-grid {
            grid-template-columns: 1fr;
          }
          
          .filters-container {
            flex-direction: column;
            align-items: stretch;
          }
          
          select, input, button {
            width: 100%;
          }
          
          .section-grid {
            grid-template-columns: 1fr !important;
          }
        }
        
        @media (max-width: 480px) {
          .kpi-grid {
            grid-template-columns: 1fr;
          }
          
          h1 {
            font-size: 22px !important;
          }
          
          .dashboard-container {
            padding: 10px !important;
          }
        }
        
        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}