import { y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn } from "./app-shell-BZJGLr54.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/participles-DvMPQBeE.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full px-2 py-0.5 text-[0.68rem] font-semibold tracking-wide", {
	variants: { tone: {
		active: "bg-active/10 text-active",
		middle: "bg-middle/12 text-middle",
		passive: "bg-passive/12 text-passive",
		perfect: "bg-perfect/12 text-perfect",
		muted: "bg-bg-subtle text-muted"
	} },
	defaultVariants: { tone: "muted" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ tone }), className),
		...props
	});
}
var GENDERS = [
	"m",
	"f",
	"n"
];
var GENDER_LABEL = {
	m: "masc.",
	f: "fem.",
	n: "neut."
};
var CASE_LABEL = {
	nom: "nom.",
	gen: "gen.",
	dat: "dat.",
	acc: "acc."
};
var NUM_LABEL = {
	sg: "sg.",
	pl: "pl."
};
function p(nomSg, genSg, datSg, accSg, nomPl, genPl, datPl, accPl) {
	return {
		nomSg,
		genSg,
		datSg,
		accSg,
		nomPl,
		genPl,
		datPl,
		accPl
	};
}
var FAMILIES = [
	{
		id: "pres-act",
		tenseVoice: "Present Active",
		short: "Pres. Act.",
		category: "active",
		pattern: "3-1-3",
		markers: "-οντ- / -ουσα",
		notes: "Continuous aspect",
		lemma: "λύω",
		lemmaGloss: "I loose",
		example: "λύων",
		nom: [
			"-ων",
			"-ουσα",
			"-ον"
		],
		gen: [
			"-οντος",
			"-ουσης",
			"-οντος"
		],
		paradigm: p([
			"λύων",
			"λύουσα",
			"λῦον"
		], [
			"λύοντος",
			"λυούσης",
			"λύοντος"
		], [
			"λύοντι",
			"λυούσῃ",
			"λύοντι"
		], [
			"λύοντα",
			"λύουσαν",
			"λῦον"
		], [
			"λύοντες",
			"λύουσαι",
			"λύοντα"
		], [
			"λυόντων",
			"λυουσῶν",
			"λυόντων"
		], [
			"λύουσι(ν)",
			"λυούσαις",
			"λύουσι(ν)"
		], [
			"λύοντας",
			"λυούσας",
			"λύοντα"
		])
	},
	{
		id: "pres-mp",
		tenseVoice: "Present Mid/Pass",
		short: "Pres. Mid/Pass.",
		category: "middle",
		pattern: "2-1-2",
		markers: "-ομεν-",
		notes: "2-1-2 pattern",
		lemma: "λύω",
		lemmaGloss: "I loose",
		example: "λυόμενος",
		nom: [
			"-όμενος",
			"-ομένη",
			"-όμενον"
		],
		gen: [
			"-ομένου",
			"-ομένης",
			"-ομένου"
		],
		paradigm: p([
			"λυόμενος",
			"λυομένη",
			"λυόμενον"
		], [
			"λυομένου",
			"λυομένης",
			"λυομένου"
		], [
			"λυομένῳ",
			"λυομένῃ",
			"λυομένῳ"
		], [
			"λυόμενον",
			"λυομένην",
			"λυόμενον"
		], [
			"λυόμενοι",
			"λυόμεναι",
			"λυόμενα"
		], [
			"λυομένων",
			"λυομένων",
			"λυομένων"
		], [
			"λυομένοις",
			"λυομέναις",
			"λυομένοις"
		], [
			"λυομένους",
			"λυομένας",
			"λυόμενα"
		])
	},
	{
		id: "aor1-act",
		tenseVoice: "1st Aorist Active",
		short: "1 Aor. Act.",
		category: "active",
		pattern: "3-1-3",
		markers: "-σαντ- / -σασα",
		notes: "σα formative",
		lemma: "λύω",
		lemmaGloss: "I loose",
		example: "λύσας",
		nom: [
			"-σας",
			"-σασα",
			"-σαν"
		],
		gen: [
			"-σαντος",
			"-σασης",
			"-σαντος"
		],
		paradigm: p([
			"λύσας",
			"λύσασα",
			"λῦσαν"
		], [
			"λύσαντος",
			"λυσάσης",
			"λύσαντος"
		], [
			"λύσαντι",
			"λυσάσῃ",
			"λύσαντι"
		], [
			"λύσαντα",
			"λύσασαν",
			"λῦσαν"
		], [
			"λύσαντες",
			"λύσασαι",
			"λύσαντα"
		], [
			"λυσάντων",
			"λυσασῶν",
			"λυσάντων"
		], [
			"λύσασι(ν)",
			"λυσάσαις",
			"λύσασι(ν)"
		], [
			"λύσαντας",
			"λυσάσας",
			"λύσαντα"
		])
	},
	{
		id: "aor1-mid",
		tenseVoice: "1st Aorist Middle",
		short: "1 Aor. Mid.",
		category: "middle",
		pattern: "2-1-2",
		markers: "-σαμεν-",
		notes: "2-1-2 pattern",
		lemma: "λύω",
		lemmaGloss: "I loose",
		example: "λυσάμενος",
		nom: [
			"-σάμενος",
			"-σαμένη",
			"-σάμενον"
		],
		gen: [
			"-σαμένου",
			"-σαμένης",
			"-σαμένου"
		],
		paradigm: p([
			"λυσάμενος",
			"λυσαμένη",
			"λυσάμενον"
		], [
			"λυσαμένου",
			"λυσαμένης",
			"λυσαμένου"
		], [
			"λυσαμένῳ",
			"λυσαμένῃ",
			"λυσαμένῳ"
		], [
			"λυσάμενον",
			"λυσαμένην",
			"λυσάμενον"
		], [
			"λυσάμενοι",
			"λυσάμεναι",
			"λυσάμενα"
		], [
			"λυσαμένων",
			"λυσαμένων",
			"λυσαμένων"
		], [
			"λυσαμένοις",
			"λυσαμέναις",
			"λυσαμένοις"
		], [
			"λυσαμένους",
			"λυσαμένας",
			"λυσάμενα"
		])
	},
	{
		id: "aor1-pass",
		tenseVoice: "1st Aorist Passive",
		short: "1 Aor. Pass.",
		category: "passive",
		pattern: "3-1-3",
		markers: "-θεντ- / -θεισα",
		notes: "θε formative",
		lemma: "λύω",
		lemmaGloss: "I loose",
		example: "λυθείς",
		nom: [
			"-θείς",
			"-θεῖσα",
			"-θέν"
		],
		gen: [
			"-θέντος",
			"-θείσης",
			"-θέντος"
		],
		paradigm: p([
			"λυθείς",
			"λυθεῖσα",
			"λυθέν"
		], [
			"λυθέντος",
			"λυθείσης",
			"λυθέντος"
		], [
			"λυθέντι",
			"λυθείσῃ",
			"λυθέντι"
		], [
			"λυθέντα",
			"λυθεῖσαν",
			"λυθέν"
		], [
			"λυθέντες",
			"λυθεῖσαι",
			"λυθέντα"
		], [
			"λυθέντων",
			"λυθεισῶν",
			"λυθέντων"
		], [
			"λυθεῖσι(ν)",
			"λυθείσαις",
			"λυθεῖσι(ν)"
		], [
			"λυθέντας",
			"λυθείσας",
			"λυθέντα"
		])
	},
	{
		id: "aor2-act",
		tenseVoice: "2nd Aorist Active",
		short: "2 Aor. Act.",
		category: "active",
		pattern: "3-1-3",
		markers: "aorist stem + -οντ-",
		notes: "Same endings as Present Active",
		lemma: "βάλλω",
		lemmaGloss: "I throw",
		example: "βαλών",
		nom: [
			"-ών",
			"-οῦσα",
			"-όν"
		],
		gen: [
			"-όντος",
			"-ούσης",
			"-όντος"
		],
		paradigm: p([
			"βαλών",
			"βαλοῦσα",
			"βαλόν"
		], [
			"βαλόντος",
			"βαλούσης",
			"βαλόντος"
		], [
			"βαλόντι",
			"βαλούσῃ",
			"βαλόντι"
		], [
			"βαλόντα",
			"βαλοῦσαν",
			"βαλόν"
		], [
			"βαλόντες",
			"βαλοῦσαι",
			"βαλόντα"
		], [
			"βαλόντων",
			"βαλουσῶν",
			"βαλόντων"
		], [
			"βαλοῦσι(ν)",
			"βαλούσαις",
			"βαλοῦσι(ν)"
		], [
			"βαλόντας",
			"βαλούσας",
			"βαλόντα"
		])
	},
	{
		id: "aor2-mid",
		tenseVoice: "2nd Aorist Middle",
		short: "2 Aor. Mid.",
		category: "middle",
		pattern: "2-1-2",
		markers: "aorist stem + -ομεν-",
		notes: "Same endings as Present Mid/Pass",
		lemma: "γίνομαι",
		lemmaGloss: "I become",
		example: "γενόμενος",
		nom: [
			"-όμενος",
			"-ομένη",
			"-όμενον"
		],
		gen: [
			"-ομένου",
			"-ομένης",
			"-ομένου"
		],
		paradigm: p([
			"γενόμενος",
			"γενομένη",
			"γενόμενον"
		], [
			"γενομένου",
			"γενομένης",
			"γενομένου"
		], [
			"γενομένῳ",
			"γενομένῃ",
			"γενομένῳ"
		], [
			"γενόμενον",
			"γενομένην",
			"γενόμενον"
		], [
			"γενόμενοι",
			"γενόμεναι",
			"γενόμενα"
		], [
			"γενομένων",
			"γενομένων",
			"γενομένων"
		], [
			"γενομένοις",
			"γενομέναις",
			"γενομένοις"
		], [
			"γενομένους",
			"γενομένας",
			"γενόμενα"
		])
	},
	{
		id: "aor2-pass",
		tenseVoice: "2nd Aorist Passive",
		short: "2 Aor. Pass.",
		category: "passive",
		pattern: "3-1-3",
		markers: "aorist stem + -εντ-",
		notes: "No θ (e.g. γραφείς)",
		lemma: "γράφω",
		lemmaGloss: "I write",
		example: "γραφείς",
		nom: [
			"-είς",
			"-εῖσα",
			"-έν"
		],
		gen: [
			"-έντος",
			"-είσης",
			"-έντος"
		],
		paradigm: p([
			"γραφείς",
			"γραφεῖσα",
			"γραφέν"
		], [
			"γραφέντος",
			"γραφείσης",
			"γραφέντος"
		], [
			"γραφέντι",
			"γραφείσῃ",
			"γραφέντι"
		], [
			"γραφέντα",
			"γραφεῖσαν",
			"γραφέν"
		], [
			"γραφέντες",
			"γραφεῖσαι",
			"γραφέντα"
		], [
			"γραφέντων",
			"γραφεισῶν",
			"γραφέντων"
		], [
			"γραφεῖσι(ν)",
			"γραφείσαις",
			"γραφεῖσι(ν)"
		], [
			"γραφέντας",
			"γραφείσας",
			"γραφέντα"
		])
	},
	{
		id: "perf-act",
		tenseVoice: "Perfect Active",
		short: "Perf. Act.",
		category: "perfect",
		pattern: "3-1-3",
		markers: "redup + -κοτ- / -κυια",
		notes: "Resulting state",
		lemma: "λύω",
		lemmaGloss: "I loose",
		example: "λελυκώς",
		nom: [
			"-κώς",
			"-κυῖα",
			"-κός"
		],
		gen: [
			"-κότος",
			"-κυίας",
			"-κότος"
		],
		paradigm: p([
			"λελυκώς",
			"λελυκυῖα",
			"λελυκός"
		], [
			"λελυκότος",
			"λελυκυίας",
			"λελυκότος"
		], [
			"λελυκότι",
			"λελυκυίᾳ",
			"λελυκότι"
		], [
			"λελυκότα",
			"λελυκυῖαν",
			"λελυκός"
		], [
			"λελυκότες",
			"λελυκυῖαι",
			"λελυκότα"
		], [
			"λελυκότων",
			"λελυκυιῶν",
			"λελυκότων"
		], [
			"λελυκόσι(ν)",
			"λελυκυίαις",
			"λελυκόσι(ν)"
		], [
			"λελυκότας",
			"λελυκυίας",
			"λελυκότα"
		])
	},
	{
		id: "perf-mp",
		tenseVoice: "Perfect Mid/Pass",
		short: "Perf. Mid/Pass.",
		category: "perfect",
		pattern: "2-1-2",
		markers: "redup + -μεν-",
		notes: "Same endings as Present Mid/Pass",
		lemma: "λύω",
		lemmaGloss: "I loose",
		example: "λελυμένος",
		nom: [
			"-μένος",
			"-μένη",
			"-μένον"
		],
		gen: [
			"-μένου",
			"-μένης",
			"-μένου"
		],
		paradigm: p([
			"λελυμένος",
			"λελυμένη",
			"λελυμένον"
		], [
			"λελυμένου",
			"λελυμένης",
			"λελυμένου"
		], [
			"λελυμένῳ",
			"λελυμένῃ",
			"λελυμένῳ"
		], [
			"λελυμένον",
			"λελυμένην",
			"λελυμένον"
		], [
			"λελυμένοι",
			"λελυμέναι",
			"λελυμένα"
		], [
			"λελυμένων",
			"λελυμένων",
			"λελυμένων"
		], [
			"λελυμένοις",
			"λελυμέναις",
			"λελυμένοις"
		], [
			"λελυμένους",
			"λελυμένας",
			"λελυμένα"
		])
	}
];
var FAMILY_BY_ID = Object.fromEntries(FAMILIES.map((f) => [f.id, f]));
var PRESETS = [
	{
		id: "six",
		label: "Six memory forms",
		hint: "Nom. + Gen. sg. of the core six",
		ids: [
			"pres-act",
			"pres-mp",
			"aor1-act",
			"aor1-mid",
			"aor1-pass",
			"perf-act"
		]
	},
	{
		id: "present",
		label: "Present only",
		hint: "Active and mid/pass",
		ids: ["pres-act", "pres-mp"]
	},
	{
		id: "aorist",
		label: "Aorist set",
		hint: "1st and 2nd, all voices",
		ids: [
			"aor1-act",
			"aor1-mid",
			"aor1-pass",
			"aor2-act",
			"aor2-mid",
			"aor2-pass"
		]
	},
	{
		id: "perfect",
		label: "Perfect set",
		hint: "Active and mid/pass",
		ids: ["perf-act", "perf-mp"]
	},
	{
		id: "all",
		label: "All families",
		hint: "Every tense and voice",
		ids: FAMILIES.map((f) => f.id)
	}
];
function endingFromForm(form, lemmaStemHint) {
	return form;
}
function memoryItems(families) {
	const items = [];
	for (const f of families) GENDERS.forEach((g, i) => {
		items.push({
			id: `${f.id}-nom-sg-${g}`,
			familyId: f.id,
			greek: f.paradigm.nomSg[i] ?? "",
			ending: f.nom[i] ?? "",
			tenseVoice: f.tenseVoice,
			short: f.short,
			parse: `${f.short} nom. sg. ${GENDER_LABEL[g]}`,
			case: "nom",
			number: "sg",
			gender: g,
			category: f.category,
			isMemory: true
		});
		items.push({
			id: `${f.id}-gen-sg-${g}`,
			familyId: f.id,
			greek: f.paradigm.genSg[i] ?? "",
			ending: f.gen[i] ?? "",
			tenseVoice: f.tenseVoice,
			short: f.short,
			parse: `${f.short} gen. sg. ${GENDER_LABEL[g]}`,
			case: "gen",
			number: "sg",
			gender: g,
			category: f.category,
			isMemory: true
		});
	});
	return items;
}
function allParseItems(families) {
	const slots = [
		{
			key: "nomSg",
			case: "nom",
			number: "sg"
		},
		{
			key: "genSg",
			case: "gen",
			number: "sg"
		},
		{
			key: "datSg",
			case: "dat",
			number: "sg"
		},
		{
			key: "accSg",
			case: "acc",
			number: "sg"
		},
		{
			key: "nomPl",
			case: "nom",
			number: "pl"
		},
		{
			key: "genPl",
			case: "gen",
			number: "pl"
		},
		{
			key: "datPl",
			case: "dat",
			number: "pl"
		},
		{
			key: "accPl",
			case: "acc",
			number: "pl"
		}
	];
	const items = [];
	for (const f of families) for (const slot of slots) GENDERS.forEach((g, i) => {
		const greek = f.paradigm[slot.key][i] ?? "";
		const isMemory = slot.number === "sg" && (slot.case === "nom" || slot.case === "gen");
		items.push({
			id: `${f.id}-${slot.key}-${g}`,
			familyId: f.id,
			greek,
			ending: isMemory ? slot.case === "nom" ? f.nom[i] ?? greek : f.gen[i] ?? greek : endingFromForm(greek, f.lemma),
			tenseVoice: f.tenseVoice,
			short: f.short,
			parse: `${f.short} ${CASE_LABEL[slot.case]} ${NUM_LABEL[slot.number]} ${GENDER_LABEL[g]}`,
			case: slot.case,
			number: slot.number,
			gender: g,
			category: f.category,
			isMemory
		});
	});
	return items;
}
function familiesFromIds(ids) {
	return ids.map((id) => FAMILY_BY_ID[id]).filter((f) => Boolean(f));
}
//#endregion
export { familiesFromIds as a, allParseItems as i, FAMILIES as n, memoryItems as o, PRESETS as r, Badge as t };
