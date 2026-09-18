// import React, { useState } from "react";

// export default function ApiTester() {
//   // 1. Request States
//   const [method, setMethod] = useState("GET");
//   const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/posts/1");
//   const [body, setBody] = useState("");
//   const [activeTab, setActiveTab] = useState("body"); // "body" or "params"

//   // 2. Response States
//   const [response, setResponse] = useState(null);
//   const [status, setStatus] = useState(null);
//   const [time, setTime] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // 3. Send Request Function
//   const handleSend = async () => {
//     if (!url.trim()) return;

//     setLoading(true);
//     setError(null);
//     setResponse(null);
//     setStatus(null);

//     const startTime = performance.now();

//     try {
//       const options = {
//         method: method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };

//       // Only attach body for methods that allow it
//       if (["POST", "PUT", "PATCH"].includes(method) && body.trim()) {
//         options.body = body;
//       }

//       const res = await fetch(url, options);
//       const endTime = performance.now();

//       setStatus(res.status);
//       setTime(Math.round(endTime - startTime));

//       // Try reading as JSON first, fallback to plain text
//       const text = await res.text();
//       try {
//         setResponse(JSON.parse(text));
//       } catch {
//         setResponse(text);
//       }
//     } catch (err) {
//       setError(err.message || "Failed to fetch. CORS issue or invalid URL.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper badge color for HTTP methods
//   const getMethodColor = (m) => {
//     switch (m) {
//       case "GET": return "text-emerald-400 font-bold";
//       case "POST": return "text-amber-400 font-bold";
//       case "PUT": return "text-blue-400 font-bold";
//       case "DELETE": return "text-rose-400 font-bold";
//       default: return "text-white font-bold";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#1e1e1e] text-zinc-200 flex flex-col font-sans p-4 md:p-8">
//       {/* Top Header */}
//       <header className="max-w-5xl mx-auto w-full mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 rounded-lg bg-[#FF6C37] flex items-center justify-center font-black text-black text-sm">
//             P
//           </div>
//           <div>
//             <h1 className="text-lg font-bold text-white leading-tight">API Tester</h1>
//             <p className="text-xs text-zinc-400">Simple Postman Dark Mode</p>
//           </div>
//         </div>
//       </header>

//       {/* Main Container */}
//       <main className="max-w-5xl mx-auto w-full flex flex-col gap-6">
//         {/* URL / Send Bar */}
//         <div className="flex flex-col sm:flex-row gap-2 bg-[#252526] p-2 rounded-lg border border-zinc-700 shadow-sm">
//           {/* Method Select */}
//           <select
//             value={method}
//             onChange={(e) => setMethod(e.target.value)}
//             className={`bg-[#2d2d2d] px-3 py-2 rounded border border-zinc-700 outline-none text-sm cursor-pointer ${getMethodColor(method)}`}
//           >
//             <option value="GET" className="text-emerald-400 bg-[#252526]">GET</option>
//             <option value="POST" className="text-amber-400 bg-[#252526]">POST</option>
//             <option value="PUT" className="text-blue-400 bg-[#252526]">PUT</option>
//             <option value="DELETE" className="text-rose-400 bg-[#252526]">DELETE</option>
//           </select>

//           {/* URL Input */}
//           <input
//             type="text"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//             placeholder="Enter request URL..."
//             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             className="flex-1 bg-[#1e1e1e] px-4 py-2 rounded border border-zinc-700 text-sm font-mono text-white placeholder-zinc-500 outline-none focus:border-[#FF6C37]"
//           />

//           {/* Send Button */}
//           <button
//             onClick={handleSend}
//             disabled={loading}
//             className="bg-[#FF6C37] hover:bg-[#e05826] active:scale-95 text-white font-semibold px-6 py-2 rounded text-sm transition-all disabled:opacity-50 cursor-pointer"
//           >
//             {loading ? "Sending..." : "Send"}
//           </button>
//         </div>

//         {/* Request & Response Split Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* LEFT: Request Body */}
//           <section className="bg-[#252526] border border-zinc-800 rounded-lg flex flex-col overflow-hidden">
//             <div className="flex border-b border-zinc-800 bg-[#1e1e1e] px-4 text-xs font-semibold">
//               <button
//                 onClick={() => setActiveTab("body")}
//                 className={`py-3 px-2 border-b-2 transition-colors ${
//                   activeTab === "body"
//                     ? "border-[#FF6C37] text-white"
//                     : "border-transparent text-zinc-400 hover:text-zinc-200"
//                 }`}
//               >
//                 Body (JSON)
//               </button>
//             </div>

//             <div className="p-4 flex-1 flex flex-col">
//               <textarea
//                 value={body}
//                 onChange={(e) => setBody(e.target.value)}
//                 placeholder='{\n  "title": "Hello World",\n  "body": "My post content",\n  "userId": 1\n}'
//                 rows={12}
//                 className="w-full flex-1 bg-[#18181b] border border-zinc-700 rounded p-3 font-mono text-xs text-zinc-200 resize-none outline-none focus:border-[#FF6C37] leading-relaxed"
//               />
//               <span className="text-[11px] text-zinc-500 mt-2">
//                 Tip: Only POST/PUT/PATCH send request bodies.
//               </span>
//             </div>
//           </section>

//           {/* RIGHT: Response Viewer */}
//           <section className="bg-[#252526] border border-zinc-800 rounded-lg flex flex-col overflow-hidden">
//             <div className="flex items-center justify-between border-b border-zinc-800 bg-[#1e1e1e] px-4 py-3 text-xs">
//               <span className="font-semibold text-white">Response</span>

//               {status !== null && (
//                 <div className="flex items-center gap-3 font-mono text-[11px]">
//                   <span
//                     className={`font-bold px-2 py-0.5 rounded ${
//                       status < 300
//                         ? "bg-emerald-500/20 text-emerald-400"
//                         : "bg-rose-500/20 text-rose-400"
//                     }`}
//                   >
//                     Status: {status}
//                   </span>
//                   <span className="text-zinc-400">{time} ms</span>
//                 </div>
//               )}
//             </div>

//             <div className="p-4 flex-1 bg-[#18181b] overflow-auto max-h-[380px]">
//               {loading && (
//                 <div className="h-full flex items-center justify-center text-zinc-400 text-xs py-10">
//                   Sending request...
//                 </div>
//               )}

//               {error && (
//                 <div className="p-3 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
//                   <strong>Error: </strong> {error}
//                 </div>
//               )}

//               {!loading && !error && response === null && (
//                 <div className="h-full flex items-center justify-center text-zinc-500 text-xs py-10">
//                   Enter a URL and click "Send" to see results.
//                 </div>
//               )}

//               {!loading && response !== null && (
//                 <pre className="text-emerald-400 font-mono text-xs whitespace-pre-wrap break-all">
//                   {typeof response === "object"
//                     ? JSON.stringify(response, null, 2)
//                     : response}
//                 </pre>
//               )}
//             </div>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// }

import React, { useState } from "react";

export default function ApiTester() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!url) return;
    setLoading(true);
    setResponse(null);
    setStatus(null);

    try {
      const options = {
        method,
        headers: { "Content-Type": "application/json" },
      };

      if (["POST", "PUT", "PATCH"].includes(method) && body) {
        options.body = body;
      }

      const res = await fetch(url, options);
      setStatus(res.status);

      const text = await res.text();
      try {
        setResponse(JSON.stringify(JSON.parse(text), null, 2));
      } catch {
        setResponse(text);
      }
    } catch (err) {
      setResponse("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#1e1e1e", color: "#fff", minHeight: "100vh", padding: "20px", fontFamily: "monospace" }}>
      <h2>API Tester</h2>

      {/* URL & Method Row */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          style={{ backgroundColor: "#2d2d2d", color: "#fff", padding: "8px", border: "1px solid #444" }}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ flex: 1, backgroundColor: "#2d2d2d", color: "#fff", padding: "8px", border: "1px solid #444" }}
        />

        <button
          onClick={handleSend}
          disabled={loading}
          style={{ backgroundColor: "#ff6c37", color: "#fff", border: "none", padding: "8px 16px", cursor: "pointer" }}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>

      {/* Request Body */}
      <div style={{ marginBottom: "15px" }}>
        <label>Request Body (JSON):</label>
        <textarea
          rows={5}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder='{"key": "value"}'
          style={{ width: "100%", marginTop: "5px", backgroundColor: "#2d2d2d", color: "#fff", padding: "8px", border: "1px solid #444", boxSizing: "border-box" }}
        />
      </div>

      {/* Response Display */}
      <div>
        <div style={{ marginBottom: "5px" }}>
          <strong>Response</strong> {status && <span>(Status: {status})</span>}
        </div>
        <pre
          style={{ backgroundColor: "#141414", padding: "12px", border: "1px solid #444", minHeight: "120px", overflowX: "auto", color: "#4ade80" }}
        >
          {response || (loading ? "Waiting for response..." : "No response yet.")}
        </pre>
      </div>
    </div>
  );
}