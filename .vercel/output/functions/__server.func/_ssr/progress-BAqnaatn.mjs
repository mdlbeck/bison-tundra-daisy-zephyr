import { y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn } from "./app-shell-BZJGLr54.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-BAqnaatn.js
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 min-h-11 px-4", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg hover:bg-primary-hover",
			secondary: "bg-bg-subtle text-fg hover:bg-border",
			outline: "border border-border-strong bg-bg-elevated text-fg hover:bg-bg-subtle",
			ghost: "text-fg hover:bg-bg-subtle",
			danger: "bg-danger text-primary-fg hover:opacity-90"
		},
		size: {
			default: "h-11",
			sm: "h-9 min-h-9 px-3 text-sm",
			lg: "h-12 px-5",
			icon: "size-11 p-0"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var SAVE_VERSION = 1;
var emptyBest = {
	match: 0,
	identify: 0,
	flash: 0,
	six: 0
};
var useProgress = create()(persist((set) => ({
	version: SAVE_VERSION,
	rounds: [],
	best: { ...emptyBest },
	flashKnown: [],
	recordRound: (round) => set((s) => ({
		rounds: [round, ...s.rounds].slice(0, 40),
		best: {
			...s.best,
			[round.mode]: Math.max(s.best[round.mode] ?? 0, round.score)
		}
	})),
	markFlash: (id, known) => set((s) => {
		const setIds = new Set(s.flashKnown);
		if (known) setIds.add(id);
		else setIds.delete(id);
		return { flashKnown: [...setIds] };
	})
}), {
	name: "metoche-progress",
	version: SAVE_VERSION,
	migrate: (persisted) => {
		const p = persisted;
		return {
			version: SAVE_VERSION,
			rounds: Array.isArray(p.rounds) ? p.rounds : [],
			best: {
				...emptyBest,
				...p.best ?? {}
			},
			flashKnown: Array.isArray(p.flashKnown) ? p.flashKnown : [],
			recordRound: () => {},
			markFlash: () => {}
		};
	}
}));
//#endregion
export { useProgress as n, Button as t };
