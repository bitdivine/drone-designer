# Drone Designer — Non-Functional Requirements (NFRs)

This document describes the quality standards and constraints that apply to the Drone Designer app beyond its individual features. These requirements cover how the app should perform, behave under stress, protect user data, and remain usable over time.

---

## 1. Performance

| # | Requirement | Target |
|---|-------------|--------|
| P1 | Pages should load within a reasonable time on a standard broadband connection | Under 3 seconds for initial page load |
| P2 | Performance metrics (weight, thrust, flight time) should recalculate quickly after a component change | Within 200 milliseconds |
| P3 | The 3D preview should render smoothly on modern desktop browsers | Acceptable frame rate with no visible stuttering under normal use |

---

## 2. Reliability

| # | Requirement | Detail |
|---|-------------|--------|
| R1 | The app should remain usable if the backend is temporarily unavailable | The parts library falls back to sample data; the user is informed but the UI does not break |
| R2 | Saved designs should not be lost due to transient errors | If a save fails, the user is shown an error message and given a chance to retry |
| R3 | Authentication errors should show a clear message | If sign-in fails or times out, the user sees a meaningful error — not a blank or broken page |

---

## 3. Security

| # | Requirement | Detail |
|---|-------------|--------|
| S1 | Only authenticated users may save, edit, or delete parts and designs | Unauthenticated users can browse the library and workspace but cannot make changes |
| S2 | Users may only edit or delete their own parts | A user cannot modify or remove parts created by another user or sample parts |
| S3 | Authentication is provided by Internet Identity | No passwords are stored by the app; all identity is managed by Internet Identity |

---

## 4. Accessibility

| # | Requirement | Detail |
|---|-------------|--------|
| A1 | The app should be usable with keyboard navigation | Users should be able to tab through controls, activate buttons, and use forms without a mouse |
| A2 | Colour is not the only indicator of status | For example, the thrust-to-weight ratio shows a numeric value alongside the colour coding (red / yellow / green) |
| A3 | Text contrast should meet accessibility standards | All body text and UI labels should meet WCAG AA contrast requirements (minimum 4.5:1 for normal text) |

---

## 5. Usability

| # | Requirement | Detail |
|---|-------------|--------|
| U1 | The app should work on modern desktop browsers | Supported browsers: Chrome, Firefox, Safari, and Edge (latest two major versions of each) |
| U2 | The UI should be responsive on tablet-sized screens | The layout should be usable on screens 768px wide and above |
| U3 | Destructive actions require confirmation | Deleting a part or a saved design requires the user to confirm before the action is carried out |

---

## 6. Maintainability

| # | Requirement | Detail |
|---|-------------|--------|
| M1 | The codebase uses TypeScript throughout | Type errors are caught at build time, reducing runtime failures |
| M2 | Components are modular and scoped to their feature area | Each component has a single clear responsibility and is located in a folder matching its feature |
| M3 | The backend uses a well-defined type system | Motoko types on the backend are shared with the frontend via generated bindings, so both sides always agree on data shapes |

---

## 7. Data Integrity

| # | Requirement | Detail |
|---|-------------|--------|
| D1 | Each part and design is associated with its owner | Every saved item records the Internet Identity principal of the user who created it |
| D2 | Only the owner can modify or delete their own items | The backend enforces ownership checks — a user cannot change another user's data even via direct API calls |
| D3 | Sample parts are read-only | Sample parts are permanently protected; no user (including the owner) can delete them |

---

## 8. Browser Compatibility

| # | Requirement | Detail |
|---|-------------|--------|
| B1 | Target browsers | The app supports the latest two versions of Chrome, Firefox, Safari, and Edge |
| B2 | Internet Explorer is not supported | No effort is made to maintain compatibility with Internet Explorer |

---

> These requirements apply to the app as a whole and are evaluated throughout development and deployment. They represent the baseline quality bar that the Drone Designer must meet in production.
