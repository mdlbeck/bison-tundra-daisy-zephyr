import { y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as AppShell } from "./app-shell-BZJGLr54.mjs";
import { n as useProgress, t as Button } from "./progress-BAqnaatn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-DV4znf4l.js
var import_jsx_runtime = require_jsx_runtime();
var MODE_LABEL = {
	match: "Memory match",
	identify: "Identify",
	flash: "Flashcards",
	six: "Six slots"
};
function ProgressPage() {
	const rounds = useProgress((s) => s.rounds);
	const best = useProgress((s) => s.best);
	const known = useProgress((s) => s.flashKnown);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		active: "progress",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-semibold tracking-tight",
					children: "Progress"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted",
					children: "Stored on this device only."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
					children: Object.keys(MODE_LABEL).map((mode) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-wide text-muted",
								children: MODE_LABEL[mode]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-2xl tabular-nums",
								children: best[mode]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: "best score"
							})
						]
					}, mode))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: ["Flash families marked known: ", known.length]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold",
					children: "Recent rounds"
				}), rounds.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "No rounds yet. Open Games to build one."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 divide-y divide-border rounded-xl border border-border bg-card",
					children: rounds.slice(0, 12).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: MODE_LABEL[r.mode]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: new Date(r.at).toLocaleString()
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "tabular-nums text-sm",
							children: [
								r.score,
								"/",
								r.total
							]
						})]
					}, r.at))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => {
						try {
							localStorage.removeItem("metoche-progress");
							window.location.reload();
						} catch {
							window.location.reload();
						}
					},
					children: "Clear local progress"
				})
			]
		})
	});
}
//#endregion
export { ProgressPage as component };
