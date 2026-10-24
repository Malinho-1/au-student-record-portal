import React from 'react';

interface AfricaUniversityLogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export const AfricaUniversityLogo: React.FC<AfricaUniversityLogoProps> = ({
  className = 'h-12',
  showSubtitle = true,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official Africa University Emblem Box */}
      <div className="flex items-center gap-2.5 bg-white px-2.5 py-1.5 rounded border border-neutral-300 shadow-xs">
        {/* Acacia Tree Emblem */}
        <div className="w-9 h-9 rounded-sm flex items-center justify-center p-0.5 bg-neutral-900 shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full text-amber-50">
            {/* Arch Frame */}
            <path
              d="M 12 88 L 12 40 A 38 38 0 0 1 88 40 L 88 88 Z"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="4"
            />
            {/* Acacia Tree Umbrella Silhouette */}
            <path
              d="M 50 85 L 50 56 M 50 64 L 38 48 M 50 62 L 62 48 M 38 52 L 28 42 M 62 52 L 72 42"
              stroke="#FFFFFF"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* Canopy */}
            <ellipse cx="50" cy="38" rx="34" ry="9" fill="#FFFFFF" />
            <ellipse cx="50" cy="35" rx="28" ry="7" fill="#FFFFFF" />
            <ellipse cx="36" cy="40" rx="14" ry="5" fill="#FFFFFF" />
            <ellipse cx="64" cy="40" rx="14" ry="5" fill="#FFFFFF" />
            {/* Ground Horizon */}
            <line x1="16" y1="85" x2="84" y2="85" stroke="#FFFFFF" strokeWidth="4" />
          </svg>
        </div>

        {/* Africa University Text Wordmark */}
        <div className="flex flex-col leading-none text-left">
          <span className="font-serif font-black tracking-wider text-[13px] text-[#A51C30] uppercase">
            Africa
          </span>
          <span className="font-serif font-black tracking-wider text-[12px] text-[#1E1E24] uppercase">
            University.
          </span>
          {showSubtitle && (
            <span className="text-[7.5px] italic text-neutral-600 tracking-tighter mt-0.5 font-serif">
              A United Methodist-Related Institution
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
