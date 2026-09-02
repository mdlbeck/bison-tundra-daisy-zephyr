import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as AppShell } from "./app-shell-BZJGLr54.mjs";
import { n as FAMILIES, t as Badge } from "./participles-DvMPQBeE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Do70dVzi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TONE = {
	active: "active",
	middle: "middle",
	passive: "passive",
	perfect: "perfect"
};
var CASES = [
	["Nom Sg", "nomSg"],
	["Gen Sg", "genSg"],
	["Dat Sg", "datSg"],
	["Acc Sg", "accSg"],
	["Nom Pl", "nomPl"],
	["Gen Pl", "genPl"],
	["Dat Pl", "datPl"],
	["Acc Pl", "accPl"]
];
function FamilyBlock({ family }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-card shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "flex w-full items-start justify-between gap-3 px-4 py-3 text-left",
			onClick: () => setOpen((v) => !v),
			"aria-expanded": open,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-semibold",
					children: [
						family.tenseVoice,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: TONE[family.category],
							children: family.pattern
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-serif text-lg leading-tight",
					children: family.nom.join(" / ")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-muted",
					children: family.gen.join(" / ")
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "pt-1 text-sm text-muted",
				children: open ? "Hide" : "Full"
			})]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-border px-3 pb-4 pt-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-2 text-sm text-muted",
				children: [
					family.lemma,
					" (",
					family.lemmaGloss,
					") · ",
					family.notes,
					" · ",
					family.markers
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[28rem] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-xs uppercase tracking-wide text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-2 font-medium",
								children: "Case"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-2 font-medium",
								children: "Masculine"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-2 font-medium",
								children: "Feminine"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 font-medium",
								children: "Neuter"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: CASES.map(([label, key]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-1.5 pr-2 text-xs font-semibold text-muted",
							children: label
						}), family.paradigm[key].map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-1.5 pr-2 font-serif text-base",
							children: cell
						}, cell + key))]
					}, key)) })]
				})
			})]
		}) : null]
	});
}
function ChartView() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold tracking-tight",
				children: "Memory chart"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-muted",
				children: "Memorize nominative singular (M/F/N) plus genitive singular. Everything else follows regular 3-1-3 or 2-1-2 endings. Expand a family for the full paradigm."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-xl border border-border bg-card shadow-[var(--shadow-border)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[40rem] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-ink text-primary-fg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 text-xs font-semibold uppercase tracking-wide",
								children: "Tense / Voice"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 text-xs font-semibold uppercase tracking-wide",
								children: "Nom. Sg."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 text-xs font-semibold uppercase tracking-wide",
								children: "Gen. Sg."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 text-xs font-semibold uppercase tracking-wide",
								children: "Markers"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: FAMILIES.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-3 py-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: f.tenseVoice
									}),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: TONE[f.category],
										children: f.pattern
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2.5 font-serif text-base",
								children: f.nom.join(" / ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2.5 font-serif text-base",
								children: f.gen.join(" / ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2.5 font-mono text-xs text-muted",
								children: f.markers
							})
						]
					}, f.id)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3",
				children: FAMILIES.map((family) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FamilyBlock, { family }, family.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "3-1-3 pattern"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "All Active forms and both Aorist Passives, like πᾶς, πᾶσα, πᾶν."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "2-1-2 pattern"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "All Middle / Mid-Pass forms, like καλός, καλή, καλόν."
					})]
				})]
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		active: "chart",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartView, {})
	});
}
//#endregion
export { Home as component };
