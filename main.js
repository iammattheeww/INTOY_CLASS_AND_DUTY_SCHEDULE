// Configuration
const START_HOUR = 7; // 7:00 AM
const END_HOUR = 21; // 9:00 PM (21:00)
const PIXELS_PER_HOUR = 60; // 1 hour = 60px height
const TOTAL_HOURS = END_HOUR - START_HOUR;
const GRID_HEIGHT = TOTAL_HOURS * PIXELS_PER_HOUR;

// Data based on the provided image
// Times are represented as decimal hours (e.g., 7:30 = 7.5, 1:30 PM = 13.5)
const scheduleData = [
  // MONDAY
  { day: 1, start: 7.5, end: 8.5, type: "class", label: "Class" },
  { day: 1, start: 8.5, end: 10.5, type: "duty", label: "Duty" },
  { day: 1, start: 10.5, end: 12.0, type: "class", label: "Class" },
  { day: 1, start: 12.5, end: 15.0, type: "class", label: "Class" },
  { day: 1, start: 15.0, end: 18.0, type: "duty", label: "Duty" },
  { day: 1, start: 18.5, end: 19.5, type: "class", label: "Class" },

  // TUESDAY
  { day: 2, start: 7.5, end: 8.5, type: "class", label: "Class" },
  { day: 2, start: 8.5, end: 9.5, type: "duty", label: "Duty" },
  { day: 2, start: 9.5, end: 10.5, type: "class", label: "Class" },
  { day: 2, start: 10.5, end: 12.0, type: "duty", label: "Duty" },
  { day: 2, start: 12.0, end: 13.0, type: "class", label: "Class" },
  { day: 2, start: 13.5, end: 15.0, type: "class", label: "Class" },
  { day: 2, start: 15.0, end: 16.0, type: "duty", label: "Duty" },
  { day: 2, start: 16.0, end: 17.0, type: "class", label: "Class" },
  { day: 2, start: 17.0, end: 18.0, type: "duty", label: "Duty" },

  // WEDNESDAY
  { day: 3, start: 7.5, end: 8.5, type: "class", label: "Class" },
  { day: 3, start: 8.5, end: 10.5, type: "duty", label: "Duty" },
  { day: 3, start: 10.5, end: 12.0, type: "class", label: "Class" },
  { day: 3, start: 12.5, end: 15.0, type: "class", label: "Class" },
  { day: 3, start: 15.0, end: 18.0, type: "duty", label: "Duty" },
  { day: 3, start: 18.5, end: 19.5, type: "class", label: "Class" },

  // THURSDAY
  { day: 4, start: 7.5, end: 8.5, type: "class", label: "Class" },
  { day: 4, start: 8.5, end: 9.5, type: "duty", label: "Duty" },
  { day: 4, start: 9.5, end: 10.5, type: "class", label: "Class" },
  { day: 4, start: 10.5, end: 12.0, type: "duty", label: "Duty" },
  { day: 4, start: 12.0, end: 13.0, type: "class", label: "Class" },
  { day: 4, start: 13.5, end: 15.0, type: "class", label: "Class" },
  { day: 4, start: 15.0, end: 16.0, type: "duty", label: "Duty" },
  { day: 4, start: 16.0, end: 17.0, type: "class", label: "Class" },
  { day: 4, start: 17.0, end: 18.0, type: "duty", label: "Duty" },

  // FRIDAY
  { day: 5, start: 8.0, end: 12.0, type: "duty", label: "Duty" },
];

// Set container heights based on calculated total duration
document.getElementById("time-axis").style.height = `${GRID_HEIGHT}px`;

const timeAxisContainer = document.getElementById("time-axis");
const gridLinesContainer = document.getElementById("grid-lines");

// Draw Time Axis & Background Lines
for (let i = 0; i <= TOTAL_HOURS; i++) {
  const currentHour = START_HOUR + i;
  const yPos = i * PIXELS_PER_HOUR;

  // 1. Time Label
  if (i < TOTAL_HOURS) {
    // Don't print 9:00 PM label if there's no block after it
    const timeLabel = document.createElement("div");
    timeLabel.className =
      "absolute right-2 text-xs font-medium text-slate-400 w-full text-right pr-2 transform -translate-y-1/2";
    timeLabel.style.top = `${yPos}px`;

    const displayHour = currentHour > 12 ? currentHour - 12 : currentHour;
    const ampm = currentHour >= 12 ? "PM" : "AM";
    timeLabel.innerText = `${displayHour}:00 ${ampm}`;
    timeAxisContainer.appendChild(timeLabel);
  }

  // 2. Background Grid Line
  const line = document.createElement("div");
  line.className = "absolute left-0 w-full border-t border-slate-100";
  line.style.top = `${yPos}px`;
  gridLinesContainer.appendChild(line);

  // 3. Half-hour subtle dashed line
  if (i < TOTAL_HOURS) {
    const halfLine = document.createElement("div");
    halfLine.className =
      "absolute left-0 w-full border-t border-slate-50 border-dashed";
    halfLine.style.top = `${yPos + PIXELS_PER_HOUR / 2}px`;
    gridLinesContainer.appendChild(halfLine);
  }
}

// Format decimal time to elegant string (e.g., 7.5 -> "7:30 AM")
function formatTime(decimalTime) {
  const h = Math.floor(decimalTime);
  const m = Math.round((decimalTime - h) * 60);
  const ampm = h >= 12 ? "PM" : "AM";
  const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
  const displayM = m === 0 ? "00" : m.toString().padStart(2, "0");
  return `${displayH}:${displayM} ${ampm}`;
}

// Set Day column heights
for (let d = 1; d <= 5; d++) {
  document.getElementById(`col-${d}`).style.height = `${GRID_HEIGHT}px`;
}

// Render Events
scheduleData.forEach((event) => {
  const startY = (event.start - START_HOUR) * PIXELS_PER_HOUR;
  const height = (event.end - event.start) * PIXELS_PER_HOUR;

  const card = document.createElement("div");
  // Base classes + positioning
  card.className = `event-card absolute left-1 right-1 rounded-xl p-3 flex flex-col justify-start overflow-hidden border shadow-sm cursor-default`;
  card.style.top = `${startY}px`;
  card.style.height = `${height - 2}px`; // -2 for slight gap between consecutive blocks

  // Icons mapping
  const classIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 opacity-75" viewBox="0 0 20 20" fill="currentColor"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" /></svg>`;
  const dutyIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 opacity-75" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 6a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0V6a.5.5 0 00-.5-.5h-7a.5.5 0 00-.5.5v2a.5.5 0 00.5.5h7a.5.5 0 00.5-.5zm-8.5 6A1.5 1.5 0 017 10.5h6A1.5 1.5 0 0114.5 12v4.5A1.5 1.5 0 0113 18H7a1.5 1.5 0 01-1.5-1.5V12z" clip-rule="evenodd" /></svg>`;

  // Styling based on event type
  let iconSvg = "";
  if (event.type === "class") {
    card.classList.add(
      "bg-indigo-50",
      "border-indigo-100",
      "border-l-4",
      "border-l-indigo-500",
      "text-indigo-900",
    );
    iconSvg = classIcon;
  } else if (event.type === "duty") {
    card.classList.add(
      "bg-rose-50",
      "border-rose-100",
      "border-l-4",
      "border-l-rose-500",
      "text-rose-900",
    );
    iconSvg = dutyIcon;
  }

  // HTML content inside the card
  // We use line-clamp if the block is very small (1 hour = 60px), ensuring text doesn't overflow
  card.innerHTML = `
                <div class="flex items-center font-bold text-sm mb-1 tracking-tight">
                    ${iconSvg}
                    ${event.label}
                </div>
                <div class="text-[11px] font-medium opacity-80 leading-tight">
                    ${formatTime(event.start)} - ${formatTime(event.end)}
                </div>
            `;

  // Append to correct day column
  const targetCol = document.getElementById(`col-${event.day}`);
  if (targetCol) {
    targetCol.appendChild(card);
  }
});
