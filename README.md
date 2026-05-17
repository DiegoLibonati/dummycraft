# Dummycraft

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Description

**Dummycraft** is a web application that instantly generates Lorem Ipsum placeholder text on demand. The user types a number into an input field and clicks `Generate` — the app then renders exactly that many paragraphs of Lorem Ipsum content on screen, each one drawn from a curated pool of 12 predefined texts that cycle and repeat as needed to fulfill the requested count.

The allowed range starts at 1 and has no upper limit: you can generate a single paragraph for a quick copy-paste or hundreds of paragraphs to stress-test a layout. Defensive input handling is built in — if the user submits a value of 0, a negative number, or leaves the field empty, the app falls back gracefully and renders a single paragraph instead of breaking or showing an error.

Under the hood, the paragraph selection logic shuffles and sequences the 12 predefined texts so that the output feels varied even when large counts are requested, avoiding obvious repetition. The UI is minimal by design: a numeric input, a button, and the generated paragraphs stacked below — no distractions, no configuration overhead, just placeholder text as fast as possible.

The project follows a flat component hierarchy (`App → DummycraftPage → Paragraph`), is written in strict TypeScript, and ships with a full Jest + React Testing Library test suite covering both unit and integration scenarios.

## Technologies used

1. React JS
2. TypeScript
3. Vite
4. HTML5
5. CSS3

## Libraries used

#### Dependencies

```
"react": "^19.2.4"
"react-dom": "^19.2.4"
```

#### devDependencies

```
"@eslint/js": "^9.0.0"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.0.1"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"@types/react": "^19.2.14"
"@types/react-dom": "^19.2.3"
"@vitejs/plugin-react": "^5.0.2"
"eslint": "^9.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.5.5"
"eslint-plugin-react-hooks": "^5.0.0"
"eslint-plugin-react-refresh": "^0.4.0"
"globals": "^15.0.0"
"husky": "^9.0.0"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^15.0.0"
"prettier": "^3.0.0"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.0.0"
"vite": "^7.1.6"
```

## Getting Started

With the stack and dependencies above in mind, here is how to run the project locally:

1. Make sure you are using Node `22` (see `.nvmrc`)
2. Clone the repository
3. Navigate to the project folder
4. Execute: `npm install`
5. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`

## Testing

Once the app runs locally, you can validate behavior with the test suite:

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Continuous Integration

The repository ships with a **GitHub Actions** pipeline defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). It runs automatically on every `push` and `pull_request` targeting the `main` branch, chaining three sequential jobs that gate the branch on code quality, tests, and a production build.

### Pipeline overview

```
                 ┌─── PR or push to main ───┐
                 ▼                          ▼
┌──────────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   lint-and-audit     │─▶│      testing     │─▶│       build      │
│ eslint · type-check  │  │   jest (jsdom)   │  │ tsc + vite build │
└──────────────────────┘  └──────────────────┘  └──────────────────┘
```

Each job spins up a fresh `ubuntu-latest` runner, installs Node using the version pinned in [`.nvmrc`](.nvmrc) (Node `22`) with npm cache enabled, and runs `npm ci` before its specific step.

### Validation jobs (run on every PR and push)

1. **`lint-and-audit`** — `npm run lint` (ESLint over `src`) followed by `npm run type-check` (`tsc -p tsconfig.app.json --noEmit`). Fails fast on style or type errors before any tests run.
2. **`testing`** — depends on `lint-and-audit`. Runs `npm run test`, executing the full Jest + React Testing Library suite under `jest-environment-jsdom`. The `coverageThreshold` of 70% (branches, functions, lines, statements) configured in [`jest.config.js`](jest.config.js) is enforced when coverage runs.
3. **`build`** — depends on `testing`. Runs `npm run build`, which type-checks the app with `tsc -p tsconfig.app.json` and produces the production bundle with `vite build`. Catches build-only regressions (e.g. broken imports under production minification, missing assets) that the dev server tolerates.

### Running the same checks locally

```bash
# lint-and-audit
npm run lint
npm run type-check

# testing
npm run test

# build
npm run build
```

## Security Audit

Beyond functional tests, the project ships with two security/health checks:

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

### React Doctor

Run a health check on the project (security, performance, dead code, architecture):

```bash
npm run doctor
```

Use `--verbose` to see specific files and line numbers:

```bash
npm run doctor -- --verbose
```

## Known Issues

None at the moment.

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/dummycraft`](https://www.diegolibonati.com.ar/#/project/dummycraft)
