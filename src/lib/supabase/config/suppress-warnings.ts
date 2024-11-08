const conWarn = console.warn;
const conLog = console.log;

const IGNORE_WARNINGS = [
  'Using the user object as returned from supabase.auth.getSession()',
];

export function suppressWarnings() {
  console.warn = (...args) => {
    const match = args.find((arg) =>
      typeof arg === 'string'
        ? IGNORE_WARNINGS.find((warning) => arg.includes(warning))
        : false
    );
    if (!match) {
      conWarn(...args);
    }
  };

  console.log = (...args) => {
    const match = args.find((arg) =>
      typeof arg === 'string'
        ? IGNORE_WARNINGS.find((warning) => arg.includes(warning))
        : false
    );
    if (!match) {
      conLog(...args);
    }
  };
}
