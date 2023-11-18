type GPALookupTable = {
  [key: string]: number;
};

const gpaLookupTable: GPALookupTable = {
  '85-100': 4.0,
  '80-84': 3.7,
  '75-79': 3.3,
  '70-74': 3.0,
  '65-69': 2.7,
  '60-64': 2.3,
  '55-59': 2.0,
  '50-54': 1.7,
  '0-49': 0.0,
};

export function lookupGPA(score: number): number {
  for (const range in gpaLookupTable) {
    const [min, max] = range.split('-').map(Number);
    if (score >= min && score <= max) {
      return gpaLookupTable[range];
    }
  }
  return 0;
}
