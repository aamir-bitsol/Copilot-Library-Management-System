# Library Management System — GitHub Copilot Instructions

This project is built using **Next.js** and **TypeScript**. Follow the best practices below when generating code.

---

## 🧱 General Project Guidelines

- **Always use TypeScript**. Do not create `.js` or `.jsx` files. If any JavaScript file exists, replace it with TypeScript.
- **Use `*.tsx`** for files that contain JSX. Use `*.ts` for utility, config, or non-UI code.
- Prefer **modular code**, split logic into reusable functions and components.
- Never use `any` as a type. Use proper types or create custom interfaces.
- Use **absolute imports** (e.g., `@/components/Button`) instead of relative imports like `../../../components/Button`.
- Always define **types/interfaces** in a separate `types` or `interfaces` folder or colocate with feature.
- Keep **API logic in `lib` or `services` folders** and don’t mix it with UI components.

---

## 🎨 Styling Guidelines

- **Always use Tailwind CSS** for all styling.
- **Avoid inline styles** (`style={{ ... }}`) completely. If a use case absolutely requires it, encapsulate it in a utility class.
- Use **Tailwind utility classes** and **Tailwind plugins** instead of writing custom CSS when possible.
- Create global styles only when Tailwind cannot solve the problem.
- If a design needs reuse, convert it into a **Tailwind component** using class composition (e.g., via `@apply` in global CSS).

---

## 🧩 Component Architecture

- Use the **atomic design principle**: `components/atoms`, `components/molecules`, `components/organisms`.
- Every component should be **pure, reusable**, and ideally stateless unless it requires state.
- Create a `components` folder under `app` or at root depending on project structure.
- Name all components in **PascalCase** (`UserCard.tsx`).
- Always export components using **named exports**, not default exports.

---

## 🧠 State Management & Logic

- Use **React hooks** (`useState`, `useEffect`, etc.) with correct typing.
- Store global state (if needed) using `zustand`, `jotai`, or React Context. Avoid prop drilling.
- Fetch data using **`getServerSideProps`, `getStaticProps`, or React Server Components (RSC)`** — depending on the use case.
- If using **client-side data fetching**, use `SWR` or `React Query`.

---

## 🔐 Security & Validation

- **Sanitize user inputs** where necessary.
- Validate all form data using `zod` or `yup`.
- Avoid directly injecting user-generated content into the DOM.

---
