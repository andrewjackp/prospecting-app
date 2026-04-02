import { seedCompanies } from './seed';

const verticalCounts: Record<string, number> = {};
const signalTypeCounts: Record<string, number> = {};

for (const company of seedCompanies) {
  verticalCounts[company.vertical] = (verticalCounts[company.vertical] ?? 0) + 1;
  for (const signal of company.signals) {
    signalTypeCounts[signal.type] = (signalTypeCounts[signal.type] ?? 0) + 1;
  }
}

console.log(`\nTotal companies: ${seedCompanies.length}`);

console.log('\nBy vertical:');
for (const [vertical, count] of Object.entries(verticalCounts).sort()) {
  console.log(`  ${vertical.padEnd(32)} ${count}`);
}

console.log('\nBy signal type:');
for (const [type, count] of Object.entries(signalTypeCounts).sort()) {
  console.log(`  ${type.padEnd(32)} ${count}`);
}

console.log();
