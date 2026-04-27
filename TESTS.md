# Drone Designer — Test Specifications

This document lists all automated and manual tests for the Drone Designer app. Tests are grouped by feature area. Each test describes what is being checked and what the correct result looks like.

---

## 1. Authentication (Sign In / Sign Out)

| Test # | What is tested | Expected result |
|--------|---------------|-----------------|
| 1.1 | Home page loads without being signed in | The page loads successfully; a "Sign In" button is visible in the header |
| 1.2 | Clicking "Sign In" opens the identity flow | The Internet Identity sign-in dialog opens |
| 1.3 | After signing in, the header reflects the signed-in state | The header shows the user is signed in (e.g. shows a sign-out option) |
| 1.4 | Signing out returns the app to the logged-out state | The "Sign In" button reappears; no user-specific actions are available |
| 1.5 | Attempting to save a design while signed out | The app prompts the user to sign in before saving |

---

## 2. Home Page (Landing Page)

| Test # | What is tested | Expected result |
|--------|---------------|-----------------|
| 2.1 | The home page renders all key sections | Hero section, four feature cards, a "Start Designing" CTA button, and a footer are all visible |
| 2.2 | "Component Library" card is clickable and navigates to the library | Clicking the Component Library card takes the user to `/library` |
| 2.3 | "Start Designing" CTA button navigates to the workspace | Clicking the button takes the user to `/workspace` |
| 2.4 | Favicon appears in the browser tab | A drone-themed icon is visible in the browser tab |
| 2.5 | The app tagline is visible on the home page | The text "Choose from frames, motors, props, batteries, flight controllers, and cameras to build your perfect configuration." is displayed |

---

## 3. Component Library

| Test # | What is tested | Expected result |
|--------|---------------|-----------------|
| 3.1 | The `/library` route loads the library page | Navigating to `/library` shows the Component Library page |
| 3.2 | Clicking "Component Library" on the home page opens the library | The user is taken to the parts library at `/library` |
| 3.3 | Sample parts are shown by default | At least one sample part is displayed for each category (frame, motor, prop, battery, flight controller, camera) |
| 3.4 | Category filter tabs show only parts in the selected category | Clicking a category tab (e.g. "Motors") shows only motor parts; other categories are hidden |
| 3.5 | Search field filters parts by name | Typing in the search box narrows the list to parts whose names match the search term |
| 3.6 | Each part card shows key information | Every part card displays the part's name, category, specs, and weight |
| 3.7 | Part cards with images display the image | If a part has an image URL set, the image appears on its card |
| 3.8 | Signed-in user can add a new part | A signed-in user fills in the part form and submits it; the new part appears in the list |
| 3.9 | Signed-in user can edit their own part | An "Edit" button appears on the user's own parts; clicking it opens the edit form and changes are saved |
| 3.10 | Signed-in user can delete their own part | A "Delete" button appears on the user's own parts; clicking it removes the part from the list |
| 3.11 | Sample parts cannot be deleted | No "Delete" button appears on sample parts |
| 3.12 | Signed-out users can browse but not add, edit, or delete | Parts are visible to anyone; add/edit/delete controls are hidden or disabled for signed-out users |

---

## 4. Drone Design Workspace

| Test # | What is tested | Expected result |
|--------|---------------|-----------------|
| 4.1 | The workspace page shows three panels | Navigating to `/workspace` shows: Component Editor (left), 3D Preview (centre), Design Summary + Saved Designs (right) |
| 4.2 | Selecting a frame type updates the 3D preview | Changing the frame in the Component Editor causes the 3D model to update |
| 4.3 | Changing motor KV or quantity updates the performance summary | Performance metrics (thrust, weight, ratio) recalculate when motor settings change |
| 4.4 | Changing battery cells or capacity updates the flight time estimate | The estimated flight time range changes when battery settings are updated |
| 4.5 | Thrust-to-weight colour coding is correct | Ratio below 1.5 shows red; 1.5–2.5 shows yellow; 2.5 and above shows green |
| 4.6 | All six component categories are configurable | The user can configure frame, motor, prop, battery, flight controller, and camera in the Component Editor |

---

## 5. Performance Metrics (Design Summary)

| Test # | What is tested | Expected result |
|--------|---------------|-----------------|
| 5.1 | Total weight is displayed | The Design Summary shows the total weight in grams and kilograms |
| 5.2 | Total thrust is displayed | The Design Summary shows the total thrust figure |
| 5.3 | Thrust-to-weight ratio is displayed with colour coding | The ratio is shown as a number alongside a colour indicator (red / yellow / green) |
| 5.4 | Estimated flight time range is displayed | The Design Summary shows a minimum and maximum estimated flight time in minutes |
| 5.5 | Metrics update immediately when a component changes | Changing any component setting updates all metrics without requiring a page reload |

---

## 6. Saving and Managing Designs

| Test # | What is tested | Expected result |
|--------|---------------|-----------------|
| 6.1 | Signed-in user can save a drone design | After saving, the design appears in the "My Designs" list |
| 6.2 | Saved designs persist across sessions | Signing out and back in again shows the same saved designs |
| 6.3 | A saved design can be loaded | Clicking a saved design restores all component configurations in the workspace |
| 6.4 | A saved design can be renamed | The user can edit the design name and the change is saved |
| 6.5 | A saved design can be deleted | Deleting a design removes it from the "My Designs" list |
| 6.6 | A design can be exported | The user can export a design (e.g. download as a file or copy to clipboard) |

---

## 7. 3D Preview

| Test # | What is tested | Expected result |
|--------|---------------|-----------------|
| 7.1 | The 3D canvas renders in the centre panel | A 3D canvas element is present and visible in the workspace |
| 7.2 | The drone model is visible by default | A drone model appears on screen when the workspace first loads |
| 7.3 | No console errors from the 3D renderer | Opening the browser console shows no errors related to the 3D preview |

---

## 8. Navigation

| Test # | What is tested | Expected result |
|--------|---------------|-----------------|
| 8.1 | Header navigation links work correctly | Clicking "Home", "Library", and "Workspace" in the header navigates to the correct pages |
| 8.2 | Direct URL access loads the correct page | Visiting `/library` or `/workspace` directly in the browser loads the expected page |
| 8.3 | No unhandled errors on any route | Navigating to any defined route does not produce an unhandled error or blank page |

---

## 9. Image Uploads for Parts

| Test # | What is tested | Expected result |
|--------|---------------|-----------------|
| 9.1 | The part form includes an image URL field | When adding or editing a part, there is a field to enter an image URL |
| 9.2 | A part with a valid image URL displays the image | After saving a part with an image URL, the image appears on the part card in the library |
| 9.3 | A part without an image shows a placeholder | If no image is set, the part card displays a category icon or placeholder graphic instead |

---

> **Note:** Tests are run automatically as part of every deployment. Results are not stored as code files — they are evaluated by the build pipeline each time the app is deployed.
