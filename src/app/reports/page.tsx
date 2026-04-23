import { DashboardCard } from "@/components/DashboardCard";

// Sankey layout constants
const SVG_W = 900;
const SVG_H = 350;

// Column x positions
const COL_LEFT_X = 20;
const COL_MID_X = 340;
const COL_RIGHT_X = 660;
const BAR_W = 120;

// Income source bars (middle column) — y positions computed proportionally from total height
const midBars = [
  { label: "Interest", pct: 82.82, amount: "$473,794.44", color: "#0797B9" },
  { label: "Other Income", pct: 11.68, amount: "$66,800.11", color: "#1348A5" },
  { label: "Paychecks", pct: 3.50, amount: "$20,007.39", color: "#22C55E" },
  { label: "Business", pct: 2.00, amount: "$11,469.20", color: "#A855F7" },
];

// Right column bars
const rightBars = [
  { label: "Savings", pct: 69.22, amount: "$396,014.77", color: "#0797B9" },
  { label: "Housing", pct: 12.57, amount: "$71,918.72", color: "#F59E0B" },
  { label: "Financial", pct: 6.44, amount: "$36,818.26", color: "#EF4444" },
  { label: "Health", pct: 2.77, amount: "$15,835.84", color: "#EC4899" },
];

// Compute y/height for bar segments within [topY, bottomY]
function computeSegments(bars: typeof midBars, topY: number, bottomY: number) {
  const totalH = bottomY - topY;
  let cursor = topY;
  return bars.map((b) => {
    const h = (b.pct / 100) * totalH;
    const y = cursor;
    cursor += h;
    return { ...b, y, h };
  });
}

const CHART_TOP = 20;
const CHART_BOTTOM = SVG_H - 20;

const midSegs = computeSegments(midBars, CHART_TOP, CHART_BOTTOM);
const rightSegs = computeSegments(rightBars, CHART_TOP, CHART_BOTTOM);

// Build a bezier flow path between two horizontal segments
function flowPath(
  x1: number, y1: number, h1: number,
  x2: number, y2: number, h2: number
): string {
  const mx = (x1 + x2) / 2;
  return [
    `M${x1},${y1}`,
    `C${mx},${y1} ${mx},${y2} ${x2},${y2}`,
    `L${x2},${y2 + h2}`,
    `C${mx},${y2 + h2} ${mx},${y1 + h1} ${x1},${y1 + h1}`,
    "Z",
  ].join(" ");
}

// Map mid → right flows: Savings gets full Interest band; others map 1:1 roughly
// For simplicity, each right segment draws a flow from the proportionally matching mid position
function buildFlows() {
  const paths: { d: string; color: string }[] = [];
  const n = Math.min(midSegs.length, rightSegs.length);
  for (let i = 0; i < n; i++) {
    const ms = midSegs[i];
    const rs = rightSegs[i];
    paths.push({
      d: flowPath(COL_MID_X + BAR_W, ms.y, ms.h, COL_RIGHT_X, rs.y, rs.h),
      color: rs.color,
    });
  }
  return paths;
}

const flows = buildFlows();

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Sub-nav */}
      <div className="flex gap-6 border-b border-gray-200 text-sm font-semibold">
        <button className="pb-2 border-b-2 border-primary text-primary">Cash Flow</button>
        <button className="pb-2 border-b-2 border-transparent text-secondary hover:text-foreground">Spending</button>
        <button className="pb-2 border-b-2 border-transparent text-secondary hover:text-foreground">Income</button>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4 border-b border-gray-100">
        <div>
          <p className="text-xs text-secondary uppercase tracking-wider mb-1">Total Income</p>
          <p className="text-xl font-bold">$572,078.14</p>
        </div>
        <div>
          <p className="text-xs text-secondary uppercase tracking-wider mb-1">Total Expenses</p>
          <p className="text-xl font-bold text-primary">$176,063.37</p>
        </div>
        <div>
          <p className="text-xs text-secondary uppercase tracking-wider mb-1">Total Net Income</p>
          <p className="text-xl font-bold">$396,014.77</p>
        </div>
        <div>
          <p className="text-xs text-secondary uppercase tracking-wider mb-1">Savings Rate</p>
          <p className="text-xl font-bold text-chart-teal">69.2%</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap text-sm">
        <span className="bg-gray-100 px-3 py-1 rounded-full font-semibold text-secondary">All time</span>
        <div className="flex bg-gray-100 rounded-lg p-1 font-semibold">
          <button className="bg-white shadow px-3 py-1 rounded-md text-xs">Breakdown</button>
          <button className="px-3 py-1 rounded-md text-xs text-secondary">Trends</button>
        </div>
        <button className="border border-gray-200 bg-white px-3 py-1.5 rounded-md font-semibold hover:bg-gray-50 flex items-center gap-1">
          By category &amp; group
          <span className="text-secondary ml-1">&#9660;</span>
        </button>
        {/* Sankey icon */}
        <button className="border border-gray-200 bg-white w-8 h-8 rounded-md flex items-center justify-center hover:bg-gray-50" title="Sankey view">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="2" width="3" height="12" rx="1" fill="#0797B9" />
            <path d="M4 4 C8 4 8 6 12 6" stroke="#0797B9" strokeWidth="2" fill="none" />
            <path d="M4 10 C8 10 8 10 12 10" stroke="#FF692D" strokeWidth="2" fill="none" />
          </svg>
        </button>
        {/* Download icon */}
        <button className="border border-gray-200 bg-white w-8 h-8 rounded-md flex items-center justify-center hover:bg-gray-50 ml-auto" title="Download">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v8M4 7l3 3 3-3M2 11h10" stroke="#777573" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Sankey SVG */}
      <DashboardCard title="">
        <div className="w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            className="w-full"
            style={{ minHeight: "350px" }}
          >
            {/* Left bar — Total Income */}
            <rect
              x={COL_LEFT_X} y={CHART_TOP}
              width={BAR_W} height={CHART_BOTTOM - CHART_TOP}
              fill="#0797B9" rx="4"
            />
            <text x={COL_LEFT_X + BAR_W / 2} y={CHART_TOP + 20} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Income</text>
            <text x={COL_LEFT_X + BAR_W / 2} y={CHART_TOP + 38} textAnchor="middle" fill="white" fontSize="9">$572,078.14</text>
            <text x={COL_LEFT_X + BAR_W / 2} y={CHART_TOP + 52} textAnchor="middle" fill="white" fontSize="9">(100%)</text>

            {/* Flow paths: left → middle */}
            {midSegs.map((seg, i) => (
              <path
                key={`lm-${i}`}
                d={flowPath(
                  COL_LEFT_X + BAR_W, CHART_TOP + (seg.y - CHART_TOP), seg.h,
                  COL_MID_X, seg.y, seg.h
                )}
                fill={seg.color}
                opacity="0.15"
              />
            ))}

            {/* Middle column bars */}
            {midSegs.map((seg, i) => (
              <g key={`mid-${i}`}>
                <rect
                  x={COL_MID_X} y={seg.y + 1}
                  width={BAR_W} height={Math.max(seg.h - 2, 4)}
                  fill={seg.color} rx="2"
                />
                {seg.h > 18 && (
                  <>
                    <text x={COL_MID_X + BAR_W / 2} y={seg.y + seg.h / 2 - 4} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{seg.label}</text>
                    <text x={COL_MID_X + BAR_W / 2} y={seg.y + seg.h / 2 + 8} textAnchor="middle" fill="white" fontSize="8">{seg.amount}</text>
                  </>
                )}
              </g>
            ))}

            {/* Flow paths: middle → right */}
            {flows.map((f, i) => (
              <path key={`mr-${i}`} d={f.d} fill={f.color} opacity="0.15" />
            ))}

            {/* Right column bars */}
            {rightSegs.map((seg, i) => (
              <g key={`right-${i}`}>
                <rect
                  x={COL_RIGHT_X} y={seg.y + 1}
                  width={BAR_W} height={Math.max(seg.h - 2, 4)}
                  fill={seg.color} rx="2"
                />
                {seg.h > 18 && (
                  <>
                    <text x={COL_RIGHT_X + BAR_W / 2} y={seg.y + seg.h / 2 - 4} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{seg.label}</text>
                    <text x={COL_RIGHT_X + BAR_W / 2} y={seg.y + seg.h / 2 + 8} textAnchor="middle" fill="white" fontSize="8">{seg.amount}</text>
                  </>
                )}
                {/* Right-side label */}
                <text
                  x={COL_RIGHT_X + BAR_W + 8}
                  y={seg.y + seg.h / 2 + 4}
                  fill="#777573" fontSize="9"
                >{seg.pct}%</text>
              </g>
            ))}
          </svg>
        </div>
      </DashboardCard>
    </div>
  );
}
