import React, { useEffect, useState, useRef } from 'react';
import { IconBrandGithub } from '@tabler/icons-react';

const GITHUB_USERNAME = 'Ram-Gold';

interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0-4
}

interface ContributionData {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

// GitHub-inspired green palette on dark bg
const LEVEL_COLORS = [
  'rgba(255,255,255,0.04)',  // level 0 — empty
  '#0e4429',                  // level 1
  '#006d32',                  // level 2
  '#26a641',                  // level 3
  '#39d353',                  // level 4
];

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = ['Mon', 'Wed', 'Fri'];

export const GitHubContributions: React.FC = () => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
        );
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data: ContributionData = await response.json();
        setContributions(data.contributions);
        // Sum total from all years in response
        const total = Object.values(data.total).reduce((sum, n) => sum + n, 0);
        setTotalCount(total);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load');
      } finally {
        setLoading(false);
      }
    };
    fetchContributions();
  }, []);

  // Build the calendar grid: 53 columns (weeks) × 7 rows (days)
  const buildGrid = (): (ContributionDay | null)[][] => {
    if (contributions.length === 0) return [];

    const weeks: (ContributionDay | null)[][] = [];
    let currentWeek: (ContributionDay | null)[] = [];

    // Pad the first week with nulls if it doesn't start on Sunday
    const firstDay = new Date(contributions[0].date);
    const firstDayOfWeek = firstDay.getDay(); // 0 = Sunday
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }

    for (const day of contributions) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // Pad the last week
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    return weeks;
  };

  // Compute month label positions based on week index where a new month starts
  const getMonthLabels = (weeks: (ContributionDay | null)[][]): { label: string; weekIndex: number }[] => {
    const labels: { label: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    for (let w = 0; w < weeks.length; w++) {
      // Find the first non-null day in this week
      const firstDay = weeks[w].find(d => d !== null);
      if (!firstDay) continue;
      const month = new Date(firstDay.date).getMonth();
      if (month !== lastMonth) {
        labels.push({ label: MONTH_LABELS[month], weekIndex: w });
        lastMonth = month;
      }
    }
    return labels;
  };

  const handleMouseEnter = (day: ContributionDay, event: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const targetRect = (event.target as HTMLElement).getBoundingClientRect();
    const x = targetRect.left - rect.left + targetRect.width / 2;
    const y = targetRect.top - rect.top - 8;

    const date = new Date(day.date + 'T00:00:00');
    const formatted = date.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
    const text = day.count === 0
      ? `No contributions on ${formatted}`
      : `${day.count} contribution${day.count > 1 ? 's' : ''} on ${formatted}`;
    setTooltip({ text, x, y });
  };

  const handleMouseLeave = () => setTooltip(null);

  // --- Rendering ---

  if (loading) {
    return (
      <section className="mt-8 mb-6 animate-fade-in">
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-4">
            <IconBrandGithub size={20} className="text-neutral-400" />
            <p className="font-semibold text-white">Contributions</p>
          </div>
          <div className="h-[120px] bg-neutral-800/30 rounded-lg animate-pulse" />
        </div>
      </section>
    );
  }

  if (error || contributions.length === 0) return null;

  const weeks = buildGrid();
  const monthLabels = getMonthLabels(weeks);

  const cellSize = 11;
  const cellGap = 3;
  const step = cellSize + cellGap;
  const leftPadding = 32; // space for day labels
  const topPadding = 18; // space for month labels
  const svgWidth = leftPadding + weeks.length * step;
  const svgHeight = topPadding + 7 * step;

  return (
    <section className="mt-8 mb-6 animate-fade-in animate-slide-up">
      <div className="card p-4">
        <div className="flex items-center justify-between text-white mb-3 shrink-0">
          <div className="flex items-center gap-2">
            <IconBrandGithub size={20} className="text-neutral-400" />
            <p className="font-semibold">Contributions</p>
            <span className="text-xs text-neutral-500 font-mono ml-1">
              {totalCount.toLocaleString()} in the last year
            </span>
          </div>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors font-mono"
          >
            @{GITHUB_USERNAME}
          </a>
        </div>

        <div className="relative overflow-x-auto" ref={containerRef}>
          {/* Tooltip */}
          {tooltip && (
            <div
              className="absolute z-50 px-2.5 py-1.5 text-[11px] text-white bg-neutral-800 border border-neutral-700 rounded-md shadow-lg pointer-events-none whitespace-nowrap font-mono"
              style={{
                left: tooltip.x,
                top: tooltip.y,
                transform: 'translate(-50%, -100%)',
              }}
            >
              {tooltip.text}
            </div>
          )}

          <svg
            width={svgWidth}
            height={svgHeight}
            className="block"
            style={{ minWidth: svgWidth }}
          >
            {/* Month labels */}
            {monthLabels.map(({ label, weekIndex }) => (
              <text
                key={`month-${weekIndex}`}
                x={leftPadding + weekIndex * step}
                y={10}
                className="fill-neutral-500"
                fontSize="10"
                fontFamily="monospace"
              >
                {label}
              </text>
            ))}

            {/* Day labels */}
            {DAY_LABELS.map((label, i) => {
              // Mon=1, Wed=3, Fri=5
              const row = [1, 3, 5][i];
              return (
                <text
                  key={`day-${label}`}
                  x={0}
                  y={topPadding + row * step + cellSize - 1}
                  className="fill-neutral-500"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {label}
                </text>
              );
            })}

            {/* Contribution cells */}
            {weeks.map((week, weekIdx) =>
              week.map((day, dayIdx) => {
                if (!day) return null;
                return (
                  <rect
                    key={day.date}
                    x={leftPadding + weekIdx * step}
                    y={topPadding + dayIdx * step}
                    width={cellSize}
                    height={cellSize}
                    rx={2}
                    ry={2}
                    fill={LEVEL_COLORS[day.level]}
                    className="transition-opacity duration-150 cursor-pointer"
                    onMouseEnter={(e) => handleMouseEnter(day, e)}
                    onMouseLeave={handleMouseLeave}
                  />
                );
              })
            )}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1.5 mt-2">
          <span className="text-[10px] text-neutral-500 font-mono mr-1">Less</span>
          {LEVEL_COLORS.map((color, i) => (
            <div
              key={i}
              className="w-[11px] h-[11px] rounded-[2px]"
              style={{ backgroundColor: color }}
            />
          ))}
          <span className="text-[10px] text-neutral-500 font-mono ml-1">More</span>
        </div>
      </div>
    </section>
  );
};
