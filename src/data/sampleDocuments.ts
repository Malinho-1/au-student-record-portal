// High-fidelity SVG Data URLs for official university documents and certificates

export const SAMPLE_RESULT_SLIP = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1050" width="800" height="1050">
  <rect width="800" height="1050" fill="%23ffffff" />
  <rect x="25" y="25" width="750" height="1000" fill="none" stroke="%23A51C30" stroke-width="3" />
  <rect x="35" y="35" width="730" height="980" fill="none" stroke="%23333333" stroke-width="1" />
  
  <!-- Header -->
  <g transform="translate(60, 60)">
    <rect x="0" y="0" width="60" height="60" fill="%231E1E24" rx="4"/>
    <path d="M 12 52 L 12 25 A 18 18 0 0 1 48 25 L 48 52 Z" fill="none" stroke="%23ffffff" stroke-width="2.5"/>
    <path d="M 30 50 L 30 32 M 30 36 L 22 26 M 30 35 L 38 26" stroke="%23ffffff" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="30" cy="22" rx="20" ry="6" fill="%23ffffff"/>
    
    <text x="80" y="28" font-family="serif" font-weight="900" font-size="24" fill="%23A51C30" letter-spacing="2">AFRICA UNIVERSITY</text>
    <text x="80" y="48" font-family="serif" font-size="12" fill="%23333333" letter-spacing="1">OFFICE OF THE ACADEMIC REGISTRAR</text>
    <text x="80" y="62" font-family="sans-serif" font-size="10" fill="%23666666">Old Mutare, Zimbabwe · Official Semester Result Slip</text>
  </g>

  <!-- Divider -->
  <line x1="60" y1="140" x2="740" y2="140" stroke="%23A51C30" stroke-width="2"/>

  <!-- Student Info Box -->
  <rect x="60" y="160" width="680" height="130" fill="%23FBFBFA" stroke="%23E5E7EB" rx="6"/>
  <text x="80" y="190" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23666666">STUDENT NAME:</text>
  <text x="210" y="190" font-family="sans-serif" font-size="13" font-weight="bold" fill="%23111827">Tapiwa Moyo</text>

  <text x="80" y="220" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23666666">STUDENT ID:</text>
  <text x="210" y="220" font-family="monospace" font-size="13" font-weight="bold" fill="%23A51C30">AU-2023-0492</text>

  <text x="80" y="250" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23666666">PROGRAMME:</text>
  <text x="210" y="250" font-family="sans-serif" font-size="12" fill="%23333333">B.Sc. Computer Information Systems (Year 3)</text>

  <text x="440" y="190" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23666666">FACULTY:</text>
  <text x="530" y="190" font-family="sans-serif" font-size="12" fill="%23333333">Engineering &amp; Applied Sci.</text>

  <text x="440" y="220" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23666666">ACADEMIC STANDING:</text>
  <text x="590" y="220" font-family="sans-serif" font-size="12" font-weight="bold" fill="%23047857">Dean's List (Good Standing)</text>

  <text x="440" y="250" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23666666">SEMESTER:</text>
  <text x="530" y="250" font-family="sans-serif" font-size="12" fill="%23333333">Semester 1, 2026</text>

  <!-- Table Header -->
  <rect x="60" y="320" width="680" height="34" fill="%231E1E24" rx="4"/>
  <text x="80" y="342" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23ffffff">COURSE CODE</text>
  <text x="200" y="342" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23ffffff">COURSE TITLE</text>
  <text x="540" y="342" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23ffffff">CREDITS</text>
  <text x="640" y="342" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23ffffff">GRADE</text>

  <!-- Rows -->
  <g transform="translate(60, 360)">
    <!-- Row 1 -->
    <rect x="0" y="0" width="680" height="40" fill="%23ffffff" stroke="%23E5E7EB"/>
    <text x="20" y="25" font-family="monospace" font-size="12" font-weight="bold" fill="%23111827">CSC 301</text>
    <text x="140" y="25" font-family="sans-serif" font-size="12" fill="%23333333">Advanced Web &amp; Enterprise Systems</text>
    <text x="495" y="25" font-family="sans-serif" font-size="12" fill="%23666666">4.0</text>
    <text x="590" y="25" font-family="sans-serif" font-size="13" font-weight="bold" fill="%23A51C30">A (4.0)</text>

    <!-- Row 2 -->
    <rect x="0" y="40" width="680" height="40" fill="%23F9FAFB" stroke="%23E5E7EB"/>
    <text x="20" y="65" font-family="monospace" font-size="12" font-weight="bold" fill="%23111827">CSC 204</text>
    <text x="140" y="65" font-family="sans-serif" font-size="12" fill="%23333333">Data Structures &amp; Algorithms</text>
    <text x="495" y="65" font-family="sans-serif" font-size="12" fill="%23666666">4.0</text>
    <text x="590" y="65" font-family="sans-serif" font-size="13" font-weight="bold" fill="%23A51C30">A- (3.7)</text>

    <!-- Row 3 -->
    <rect x="0" y="80" width="680" height="40" fill="%23ffffff" stroke="%23E5E7EB"/>
    <text x="20" y="105" font-family="monospace" font-size="12" font-weight="bold" fill="%23111827">CSC 305</text>
    <text x="140" y="105" font-family="sans-serif" font-size="12" fill="%23333333">Database Systems &amp; SQL Architecture</text>
    <text x="495" y="105" font-family="sans-serif" font-size="12" fill="%23666666">3.0</text>
    <text x="590" y="105" font-family="sans-serif" font-size="13" font-weight="bold" fill="%23A51C30">A (4.0)</text>

    <!-- Row 4 -->
    <rect x="0" y="120" width="680" height="40" fill="%23F9FAFB" stroke="%23E5E7EB"/>
    <text x="20" y="145" font-family="monospace" font-size="12" font-weight="bold" fill="%23111827">SWE 310</text>
    <text x="140" y="145" font-family="sans-serif" font-size="12" fill="%23333333">Software Engineering Principles</text>
    <text x="495" y="145" font-family="sans-serif" font-size="12" fill="%23666666">3.0</text>
    <text x="590" y="145" font-family="sans-serif" font-size="13" font-weight="bold" fill="%23A51C30">A (4.0)</text>
  </g>

  <!-- Summary GPA Box -->
  <rect x="420" y="550" width="320" height="100" fill="%23FAF0F1" stroke="%23A51C30" stroke-dasharray="4" rx="6"/>
  <text x="440" y="580" font-family="sans-serif" font-size="12" font-weight="bold" fill="%23333333">SEMESTER GPA:</text>
  <text x="640" y="580" font-family="sans-serif" font-size="15" font-weight="bold" fill="%23A51C30">3.92 / 4.00</text>

  <text x="440" y="610" font-family="sans-serif" font-size="12" font-weight="bold" fill="%23333333">CUMULATIVE GPA:</text>
  <text x="640" y="610" font-family="sans-serif" font-size="16" font-weight="black" fill="%23A51C30">3.84 / 4.00</text>

  <text x="440" y="635" font-family="sans-serif" font-size="10" fill="%23666666">Total Credits Earned: 78.0 Credits</text>

  <!-- Stamp and Verification -->
  <g transform="translate(100, 750)">
    <!-- Red Seal Circle -->
    <circle cx="90" cy="80" r="65" fill="none" stroke="%23A51C30" stroke-width="3" stroke-dasharray="6,3"/>
    <circle cx="90" cy="80" r="58" fill="none" stroke="%23A51C30" stroke-width="1.5"/>
    <text x="90" y="55" font-family="serif" font-size="9" font-weight="bold" fill="%23A51C30" text-anchor="middle">AFRICA UNIVERSITY</text>
    <text x="90" y="82" font-family="sans-serif" font-size="12" font-weight="black" fill="%23A51C30" text-anchor="middle">VERIFIED</text>
    <text x="90" y="96" font-family="sans-serif" font-size="8" fill="%23A51C30" text-anchor="middle">ACADEMIC RECORDS</text>
    <text x="90" y="112" font-family="sans-serif" font-size="7" fill="%23A51C30" text-anchor="middle">OFFICIAL TRANSCRIPT</text>
  </g>

  <g transform="translate(420, 780)">
    <line x1="0" y1="40" x2="280" y2="40" stroke="%23333333" stroke-width="1"/>
    <text x="140" y="60" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23333333" text-anchor="middle">REGISTRAR'S AUTHORIZATION</text>
    <text x="140" y="75" font-family="sans-serif" font-size="9" fill="%23666666" text-anchor="middle">Africa University Examinations &amp; Records</text>
  </g>

  <!-- Footer security code -->
  <text x="60" y="970" font-family="monospace" font-size="9" fill="%239CA3AF">VERIFICATION CODE: AU-TR-2026-X9924-STU · ISSUED UNDER UNIVERSITY AUTHORITY</text>
</svg>`;

export const SAMPLE_CERTIFICATE_AWS = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 650" width="900" height="650">
  <rect width="900" height="650" fill="%23ffffff" />
  <rect x="25" y="25" width="850" height="600" fill="%23FAFAFA" stroke="%23FF9900" stroke-width="4" rx="8" />
  <rect x="40" y="40" width="820" height="570" fill="none" stroke="%23232F3E" stroke-width="1.5" rx="4" />

  <!-- Badge Top -->
  <g transform="translate(400, 80)">
    <polygon points="50,0 95,25 95,80 50,110 5,80 5,25" fill="%23232F3E" stroke="%23FF9900" stroke-width="3"/>
    <text x="50" y="55" font-family="sans-serif" font-size="14" font-weight="black" fill="%23FF9900" text-anchor="middle">AWS</text>
    <text x="50" y="75" font-family="sans-serif" font-size="9" font-weight="bold" fill="%23ffffff" text-anchor="middle">CERTIFIED</text>
  </g>

  <text x="450" y="240" font-family="sans-serif" font-size="20" font-weight="bold" fill="%23232F3E" text-anchor="middle" letter-spacing="1">CERTIFICATE OF ACHIEVEMENT</text>
  <text x="450" y="270" font-family="sans-serif" font-size="13" fill="%23666666" text-anchor="middle">This certifies that</text>

  <text x="450" y="325" font-family="serif" font-size="34" font-weight="bold" fill="%23A51C30" text-anchor="middle">Tapiwa Moyo</text>

  <text x="450" y="370" font-family="sans-serif" font-size="14" fill="%23333333" text-anchor="middle">has successfully completed all requirements and is officially certified as</text>

  <text x="450" y="420" font-family="sans-serif" font-size="24" font-weight="black" fill="%23FF9900" text-anchor="middle" letter-spacing="0.5">AWS Certified Cloud Practitioner</text>

  <g transform="translate(150, 490)">
    <text x="0" y="20" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23666666">VALIDATION NUMBER:</text>
    <text x="140" y="20" font-family="monospace" font-size="12" font-weight="bold" fill="%23232F3E">AWS-AU-99214</text>

    <text x="0" y="45" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23666666">ISSUE DATE:</text>
    <text x="140" y="45" font-family="sans-serif" font-size="12" fill="%23333333">January 15, 2026</text>
  </g>

  <g transform="translate(600, 490)">
    <line x1="0" y1="25" x2="180" y2="25" stroke="%23666666" stroke-width="1"/>
    <text x="90" y="45" font-family="sans-serif" font-size="10" font-weight="bold" fill="%23333333" text-anchor="middle">AWS Global Certifications</text>
  </g>
</svg>`;

export const SAMPLE_CERTIFICATE_DEANS = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 650" width="900" height="650">
  <rect width="900" height="650" fill="%23FBFBFA" />
  <rect x="25" y="25" width="850" height="600" fill="%23ffffff" stroke="%23A51C30" stroke-width="5" rx="10" />
  <rect x="40" y="40" width="820" height="570" fill="none" stroke="%23D4AF37" stroke-width="2" rx="6" />

  <text x="450" y="120" font-family="serif" font-size="28" font-weight="bold" fill="%23A51C30" text-anchor="middle" letter-spacing="3">AFRICA UNIVERSITY</text>
  <text x="450" y="145" font-family="serif" font-size="13" font-style="italic" fill="%23666666" text-anchor="middle">Faculty of Engineering and Applied Sciences</text>

  <text x="450" y="210" font-family="sans-serif" font-size="16" font-weight="bold" fill="%23B45309" text-anchor="middle" letter-spacing="2">DEAN'S ACADEMIC HONOR LIST</text>
  <text x="450" y="250" font-family="serif" font-size="14" fill="%234B5563" text-anchor="middle">In recognition of outstanding scholastic accomplishment, this honor is awarded to</text>

  <text x="450" y="320" font-family="serif" font-size="36" font-weight="bold" fill="%23111827" text-anchor="middle">Tapiwa Moyo</text>

  <text x="450" y="370" font-family="sans-serif" font-size="13" fill="%234B5563" text-anchor="middle">For achieving a Grade Point Average in the top percentile of the Faculty for Academic Year 2025/2026</text>

  <g transform="translate(180, 480)">
    <line x1="0" y1="20" x2="160" y2="20" stroke="%23111827" stroke-width="1.5"/>
    <text x="80" y="40" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23374151" text-anchor="middle">Dean of Faculty</text>
  </g>

  <g transform="translate(560, 480)">
    <line x1="0" y1="20" x2="160" y2="20" stroke="%23111827" stroke-width="1.5"/>
    <text x="80" y="40" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23374151" text-anchor="middle">Vice Chancellor</text>
  </g>
</svg>`;
