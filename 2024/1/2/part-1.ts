const input = Bun.file("./input.txt");
const text = await input.text();
const reports = text.split("\n");

let safeCount = 0;
for (const report of reports) {
    const levels = report.split(" ").map(Number);
    if (isReportSafe(levels)) {
        safeCount++;
    }
}

console.log("Safe Count", safeCount);

type Direction = "increasing" | "decreasing" | "mixed";

function getDirection(a: number, b: number): Direction {
    if (b > a) return "increasing";
    if (b < a) return "decreasing";
    return "mixed";
}

function isReportSafe(levels: number[]): boolean {
    if (levels.length < 2) return true;

    let expectedDirection = getDirection(levels[0], levels[1]);
    if (expectedDirection === "mixed") return false;

    for (let i = 0; i < levels.length - 1; i++) {
        const current = levels[i];
        const next = levels[i + 1];

        const diff = Math.abs(next - current);

        if (diff < 1 || diff > 3) return false;

        const currentDirection = getDirection(current, next);
        if (
            currentDirection === "mixed" ||
            currentDirection !== expectedDirection
        ) {
            return false;
        }
    }

    return true;
}
