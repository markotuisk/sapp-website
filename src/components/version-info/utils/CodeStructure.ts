
// Define the interface for codebase structure
export interface CodeStructure {
  name: string;
  linesOfCode: number;
  percentage: number;
}

// Export utility function to calculate percentages of codebase structure
export const calculateCodeStructure = (totalLinesOfCode: number): CodeStructure[] => {
  const structure: CodeStructure[] = [
    { name: 'UI Components', linesOfCode: Math.round(totalLinesOfCode * 0.42), percentage: 42 },
    { name: 'Pages', linesOfCode: Math.round(totalLinesOfCode * 0.23), percentage: 23 },
    { name: 'Business Logic', linesOfCode: Math.round(totalLinesOfCode * 0.15), percentage: 15 },
    { name: 'Utilities', linesOfCode: Math.round(totalLinesOfCode * 0.12), percentage: 12 },
    { name: 'Type Definitions', linesOfCode: Math.round(totalLinesOfCode * 0.08), percentage: 8 }
  ];
  
  return structure;
};
