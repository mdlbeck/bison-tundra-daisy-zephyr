import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as shuffle, n as cn, r as pick, t as AppShell } from "./app-shell-BZJGLr54.mjs";
import { a as familiesFromIds, i as allParseItems, n as FAMILIES, o as memoryItems, r as PRESETS, t as Badge } from "./participles-DvMPQBeE.mjs";
import { n as useProgress, t as Button } from "./progress-BAqnaatn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/play-DKNnkDXQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function familiesFor(config) {
	const list = familiesFromIds(config.familyIds);
	return list.length ? list : familiesFromIds(["pres-act"]);
}
function itemsFor(config) {
	const families = familiesFor(config);
	return config.depth === "full" ? allParseItems(families) : memoryItems(families);
}
function makeMatchPairs(config) {
	const items = itemsFor(config);
	const unique = /* @__PURE__ */ new Map();
	for (const item of items) if (!unique.has(item.greek)) unique.set(item.greek, item);
	return pick([...unique.values()], config.pairCount).map((item) => ({
		id: item.id,
		greek: item.greek,
		label: item.parse
	}));
}
function makeIdentifyRound(config) {
	const items = itemsFor(config);
	const pool = pick(items, config.questionCount);
	const labels = [...new Set(items.map((i) => i.parse))];
	return pool.map((prompt) => {
		const distractors = shuffle(labels.filter((l) => l !== prompt.parse)).slice(0, 3);
		return {
			prompt,
			choices: shuffle([prompt.parse, ...distractors]),
			answer: prompt.parse
		};
	});
}
function makeFlashCards(config) {
	const families = familiesFor(config);
	return shuffle(families.map((f) => ({
		id: f.id,
		front: `${f.nom.join("  ·  ")}\n${f.gen.join("  ·  ")}`,
		back: `${f.tenseVoice}\n${f.markers}\n${f.notes}`,
		familyId: f.id
	})));
}
function makeSixPuzzles(config) {
	const families = shuffle(familiesFor(config)).slice(0, config.questionCount);
	const allEndings = familiesFor(config).flatMap((f) => [...f.nom, ...f.gen]);
	return families.map((f) => {
		const slots = [
			{
				key: "nm",
				label: "Nom. masc.",
				answer: f.nom[0] ?? ""
			},
			{
				key: "nf",
				label: "Nom. fem.",
				answer: f.nom[1] ?? ""
			},
			{
				key: "nn",
				label: "Nom. neut.",
				answer: f.nom[2] ?? ""
			},
			{
				key: "gm",
				label: "Gen. masc.",
				answer: f.gen[0] ?? ""
			},
			{
				key: "gf",
				label: "Gen. fem.",
				answer: f.gen[1] ?? ""
			},
			{
				key: "gn",
				label: "Gen. neut.",
				answer: f.gen[2] ?? ""
			}
		];
		const distractors = shuffle(allEndings.filter((e) => !slots.some((s) => s.answer === e))).slice(0, 4);
		const bankTexts = shuffle([...slots.map((s) => s.answer), ...distractors]);
		return {
			familyId: f.id,
			title: f.tenseVoice,
			slots,
			bank: bankTexts.map((text, n) => ({
				id: `${f.id}-b${n}`,
				text
			}))
		};
	});
}
function Flashcards({ config, onExit }) {
	const markFlash = useProgress((s) => s.markFlash);
	const recordRound = useProgress((s) => s.recordRound);
	const knownSet = useProgress((s) => s.flashKnown);
	const [cards] = (0, import_react.useState)(() => makeFlashCards(config));
	const [i, setI] = (0, import_react.useState)(0);
	const [flipped, setFlipped] = (0, import_react.useState)(false);
	const [known, setKnown] = (0, import_react.useState)(0);
	const [done, setDone] = (0, import_react.useState)(false);
	const card = cards[i];
	function grade(didKnow) {
		if (!card) return;
		if (didKnow) {
			setKnown((n) => n + 1);
			markFlash(card.familyId, true);
		} else markFlash(card.familyId, false);
		if (i + 1 >= cards.length) {
			const score = known + (didKnow ? 1 : 0);
			setDone(true);
			recordRound({
				mode: "flash",
				score,
				total: cards.length,
				at: Date.now(),
				preset: config.familyIds.join(",")
			});
			return;
		}
		setI((n) => n + 1);
		setFlipped(false);
	}
	if (!card || done) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "Flashcards"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Knew ",
				known,
				" of ",
				cards.length,
				" families this round."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: onExit,
				children: "New game"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold tracking-tight",
					children: "Flashcards"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"Six memory forms. ",
						i + 1,
						" / ",
						cards.length
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm tabular-nums text-muted",
					children: [known, " known"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setFlipped((v) => !v),
				className: "w-full rounded-xl border border-border bg-card p-8 text-center shadow-[var(--shadow-border)] min-h-52",
				children: [flipped ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "font-sans text-lg font-medium leading-relaxed whitespace-pre-wrap",
					children: card.back
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "font-serif text-2xl leading-relaxed whitespace-pre-wrap",
					children: card.front
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-xs uppercase tracking-widest text-muted",
					children: flipped ? "Tap to hide" : "Tap to reveal"
				})]
			}),
			flipped ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => grade(false),
					children: "Still learning"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => grade(true),
					children: "Knew it"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				onClick: onExit,
				children: "Back to studio"
			}),
			knownSet.includes(card.familyId) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-ok",
				children: "Marked known in earlier rounds."
			}) : null
		]
	});
}
function IdentifyGame({ config, onExit }) {
	const recordRound = useProgress((s) => s.recordRound);
	const [qs] = (0, import_react.useState)(() => makeIdentifyRound(config));
	const [i, setI] = (0, import_react.useState)(0);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [score, setScore] = (0, import_react.useState)(0);
	const [done, setDone] = (0, import_react.useState)(false);
	const q = qs[i];
	const remaining = qs.length - i;
	const status = (0, import_react.useMemo)(() => {
		if (!picked || !q) return null;
		return picked === q.answer;
	}, [picked, q]);
	function choose(choice) {
		if (picked || !q) return;
		setPicked(choice);
		if (choice === q.answer) setScore((s) => s + 1);
	}
	function next() {
		if (!q) return;
		if (i + 1 >= qs.length) {
			setDone(true);
			recordRound({
				mode: "identify",
				score,
				total: qs.length,
				at: Date.now(),
				preset: config.familyIds.join(",")
			});
			return;
		}
		setI((n) => n + 1);
		setPicked(null);
	}
	if (!q || done) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "Identify"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-lg",
				children: [
					"Score ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums font-semibold",
						children: score
					}),
					" / ",
					qs.length
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: onExit,
					children: "New game"
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold tracking-tight",
					children: "Identify"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"Parse the form. ",
						remaining,
						" left."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "tabular-nums text-sm text-muted",
					children: [score, " correct"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-6 text-center shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-4xl",
					children: q.prompt.greek
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Choose the parse"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2",
				children: q.choices.map((choice) => {
					const show = Boolean(picked);
					const isAnswer = choice === q.answer;
					const isPick = choice === picked;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => choose(choice),
						className: cn("min-h-12 rounded-lg border px-4 py-3 text-left text-sm transition-colors duration-150", !show && "border-border bg-card hover:bg-bg-subtle", show && isAnswer && "border-ok bg-ok/10 text-ok", show && isPick && !isAnswer && "border-danger bg-danger/10 text-danger", show && !isAnswer && !isPick && "border-border bg-card text-muted"),
						children: choice
					}, choice);
				})
			}),
			picked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: next,
				children: i + 1 >= qs.length ? "See score" : "Next"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				onClick: onExit,
				children: "Back to studio"
			}),
			status === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-danger",
				children: ["Correct parse: ", q.answer]
			}) : null
		]
	});
}
function buildDeck(config) {
	const pairs = makeMatchPairs(config);
	const cards = [];
	for (const p of pairs) {
		cards.push({
			key: `${p.id}-g`,
			pairId: p.id,
			face: "greek",
			text: p.greek
		});
		cards.push({
			key: `${p.id}-l`,
			pairId: p.id,
			face: "label",
			text: p.label
		});
	}
	return shuffle(cards);
}
function MemoryMatch({ config, onExit }) {
	const recordRound = useProgress((s) => s.recordRound);
	const [deck, setDeck] = (0, import_react.useState)(() => buildDeck(config));
	const [open, setOpen] = (0, import_react.useState)([]);
	const [matched, setMatched] = (0, import_react.useState)([]);
	const [wrong, setWrong] = (0, import_react.useState)([]);
	const [moves, setMoves] = (0, import_react.useState)(0);
	const [lock, setLock] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	const totalPairs = (0, import_react.useMemo)(() => deck.length / 2, [deck.length]);
	const score = matched.length / 2;
	function flip(key) {
		if (lock || matched.includes(key) || open.includes(key) || done) return;
		const next = [...open, key];
		setOpen(next);
		if (next.length < 2) return;
		setLock(true);
		setMoves((m) => m + 1);
		const a = deck.find((c) => c.key === next[0]);
		const b = deck.find((c) => c.key === next[1]);
		if (a && b && a.pairId === b.pairId) {
			const nowMatched = [
				...matched,
				a.key,
				b.key
			];
			setMatched(nowMatched);
			setOpen([]);
			setLock(false);
			if (nowMatched.length === deck.length) {
				setDone(true);
				recordRound({
					mode: "match",
					score: totalPairs,
					total: totalPairs,
					at: Date.now(),
					preset: config.familyIds.join(",")
				});
			}
		} else {
			setWrong(next);
			window.setTimeout(() => {
				setOpen([]);
				setWrong([]);
				setLock(false);
			}, 750);
		}
	}
	function restart() {
		setDeck(buildDeck(config));
		setOpen([]);
		setMatched([]);
		setWrong([]);
		setMoves(0);
		setLock(false);
		setDone(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold tracking-tight",
					children: "Memory match"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Pair each Greek form with its parse."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "tabular-nums text-sm text-muted",
					children: [
						score,
						"/",
						totalPairs,
						" · ",
						moves,
						" moves"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
				children: deck.map((card) => {
					const isUp = open.includes(card.key) || matched.includes(card.key);
					const isWrong = wrong.includes(card.key);
					const isMatch = matched.includes(card.key);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => flip(card.key),
						className: "min-h-24 rounded-lg border p-3 text-left transition-transform duration-150 active:scale-[0.98]",
						style: {
							background: isMatch ? "color-mix(in oklab, var(--color-ok) 12%, var(--color-card))" : isWrong ? "color-mix(in oklab, var(--color-danger) 12%, var(--color-card))" : isUp ? "var(--color-card)" : "var(--color-ink)",
							color: isUp ? "var(--color-fg)" : "var(--color-primary-fg)",
							borderColor: isMatch ? "var(--color-ok)" : "var(--color-border)"
						},
						children: isUp ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: card.face === "greek" ? "font-serif text-lg leading-tight" : "text-sm leading-snug",
							children: card.text
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs uppercase tracking-widest text-primary-fg/70",
							children: "Metochē"
						})
					}, card.key);
				})
			}),
			done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-semibold",
					children: [
						"Board cleared in ",
						moves,
						" moves."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: restart,
						children: "Play again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: onExit,
						children: "New game"
					})]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				onClick: onExit,
				children: "Back to studio"
			})
		]
	});
}
function SixSlots({ config, onExit }) {
	const recordRound = useProgress((s) => s.recordRound);
	const [puzzles] = (0, import_react.useState)(() => makeSixPuzzles(config));
	const [i, setI] = (0, import_react.useState)(0);
	const [placed, setPlaced] = (0, import_react.useState)({});
	const [selectedSlot, setSelectedSlot] = (0, import_react.useState)(null);
	const [checked, setChecked] = (0, import_react.useState)(false);
	const [score, setScore] = (0, import_react.useState)(0);
	const [done, setDone] = (0, import_react.useState)(false);
	const puzzle = puzzles[i];
	function place(bankId) {
		if (!selectedSlot || checked) return;
		setPlaced((p) => ({
			...p,
			[selectedSlot]: bankId
		}));
		setSelectedSlot(null);
	}
	function check() {
		if (!puzzle) return;
		if (puzzle.slots.every((s) => {
			return puzzle.bank.find((b) => b.id === placed[s.key])?.text === s.answer;
		})) setScore((n) => n + 1);
		setChecked(true);
	}
	function next() {
		if (i + 1 >= puzzles.length) {
			setDone(true);
			recordRound({
				mode: "six",
				score,
				total: puzzles.length,
				at: Date.now(),
				preset: config.familyIds.join(",")
			});
			return;
		}
		setI((n) => n + 1);
		setPlaced({});
		setSelectedSlot(null);
		setChecked(false);
	}
	if (!puzzle || done) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "Six slots"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				score,
				" / ",
				puzzles.length,
				" families placed correctly."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: onExit,
				children: "New game"
			})
		]
	});
	const used = new Set(Object.values(placed));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold tracking-tight",
				children: "Six slots"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: ["Place the six memory forms for ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-fg font-medium",
					children: puzzle.title
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2 sm:grid-cols-2",
				children: puzzle.slots.map((slot) => {
					const value = puzzle.bank.find((b) => b.id === placed[slot.key])?.text;
					const ok = checked && value === slot.answer;
					const bad = checked && value !== slot.answer;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => !checked && setSelectedSlot(slot.key),
						className: cn("min-h-16 rounded-lg border px-3 py-2 text-left", selectedSlot === slot.key && "ring-2 ring-primary/40 border-primary", ok && "border-ok bg-ok/10", bad && "border-danger bg-danger/10", !ok && !bad && "border-border bg-card"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-wide text-muted",
								children: slot.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-serif text-xl",
								children: value ?? "—"
							}),
							bad ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-ok",
								children: ["Answer: ", slot.answer]
							}) : null
						]
					}, slot.key);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs uppercase tracking-wide text-muted",
				children: "Bank"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: puzzle.bank.map((chip) => {
					const taken = used.has(chip.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: taken || !selectedSlot || checked,
						onClick: () => place(chip.id),
						className: cn("min-h-11 rounded-md border px-3 font-serif text-lg", taken ? "border-border text-subtle" : "border-border-strong bg-bg-elevated hover:bg-bg-subtle"),
						children: chip.text
					}, chip.id);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [!checked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: check,
					disabled: puzzle.slots.some((s) => !placed[s.key]),
					children: "Check"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: next,
					children: i + 1 >= puzzles.length ? "See score" : "Next family"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: onExit,
					children: "Back to studio"
				})]
			})
		]
	});
}
var MODES = [
	{
		id: "match",
		title: "Memory match",
		body: "Flip cards. Pair a Greek form with its parse."
	},
	{
		id: "identify",
		title: "Identify",
		body: "See one form. Choose the correct parse from four options."
	},
	{
		id: "flash",
		title: "Flashcards",
		body: "Six memory forms on the front, tense and markers on the back."
	},
	{
		id: "six",
		title: "Six slots",
		body: "Place nom. and gen. singular endings into the six slots."
	}
];
var TONE = {
	active: "active",
	middle: "middle",
	passive: "passive",
	perfect: "perfect"
};
function GameStudio() {
	const [mode, setMode] = (0, import_react.useState)("match");
	const [ids, setIds] = (0, import_react.useState)(PRESETS[0]?.ids ?? ["pres-act"]);
	const [depth, setDepth] = (0, import_react.useState)("memory");
	const [size, setSize] = (0, import_react.useState)(8);
	const [running, setRunning] = (0, import_react.useState)(null);
	const config = (0, import_react.useMemo)(() => ({
		mode,
		familyIds: ids,
		depth,
		pairCount: size,
		questionCount: mode === "six" ? Math.min(size, ids.length || 1) : size
	}), [
		mode,
		ids,
		depth,
		size
	]);
	function toggle(id) {
		setIds((curr) => curr.includes(id) ? curr.filter((x) => x !== id) : [...curr, id]);
	}
	if (running) {
		const exit = () => setRunning(null);
		if (running.mode === "match") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryMatch, {
			config: running,
			onExit: exit
		});
		if (running.mode === "identify") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdentifyGame, {
			config: running,
			onExit: exit
		});
		if (running.mode === "flash") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flashcards, {
			config: running,
			onExit: exit
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SixSlots, {
			config: running,
			onExit: exit
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold tracking-tight",
				children: "Game studio"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-muted",
				children: "Build a round from the chart: pick families, pick a mode, then play. Scores stay on this device."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold uppercase tracking-wide text-muted",
					children: "Mode"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2 sm:grid-cols-2",
					children: MODES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setMode(m.id),
						className: cn("rounded-xl border p-4 text-left min-h-24", mode === m.id ? "border-primary bg-primary/8" : "border-border bg-card hover:bg-bg-subtle"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: m.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: m.body
						})]
					}, m.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold uppercase tracking-wide text-muted",
						children: "Material"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setIds(p.ids),
							className: cn("min-h-11 rounded-full border px-3 text-sm", ids.join() === p.ids.join() ? "border-primary bg-primary text-primary-fg" : "border-border bg-card text-fg"),
							children: p.label
						}, p.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2 sm:grid-cols-2",
						children: FAMILIES.map((f) => {
							const on = ids.includes(f.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: cn("flex min-h-14 cursor-pointer items-center gap-3 rounded-lg border px-3 py-2", on ? "border-primary/40 bg-card" : "border-border bg-card"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: on,
									onChange: () => toggle(f.id),
									className: "size-4 accent-primary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: f.tenseVoice
										}),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											tone: TONE[f.category],
											children: f.pattern
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-0.5 block font-serif text-sm text-muted",
											children: f.example
										})
									]
								})]
							}, f.id);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: "Depth"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: depth === "memory" ? "default" : "outline",
								onClick: () => setDepth("memory"),
								children: "Memory forms"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: depth === "full" ? "default" : "outline",
								onClick: () => setDepth("full"),
								children: "Full paradigm"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted",
							children: "Memory forms use nom. + gen. singular. Full paradigm includes all cases."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: "Round size"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex gap-2",
							children: [
								6,
								8,
								12
							].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: size === n ? "default" : "outline",
								onClick: () => setSize(n),
								children: n
							}, n))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted",
							children: "Pairs for match, questions for identify, families for flash and six slots."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "lg",
				disabled: ids.length === 0,
				onClick: () => setRunning(config),
				children: ["Start ", MODES.find((m) => m.id === mode)?.title.toLowerCase()]
			})
		]
	});
}
function Play() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		active: "games",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameStudio, {})
	});
}
//#endregion
export { Play as component };
