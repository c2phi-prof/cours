// Dataset des sujets de philosophie (exemple)
const sujetsPhilo = [
    {
        sujet: "La technique éloigne-t-elle l'homme de la nature ?",
        notions: ["technique", "nature"],
        reperes: ["Transcendant/immanent"],
        theses: [
            "La technique est un moyen de domination de la nature (Heidegger)",
            "La technique prolonge l'action naturelle de l'homme (Bergson)",
            "La technique risque de déshumaniser (Ellul)"
        ]
    },
    {
        sujet: "Le travail est-il une condition du bonheur ?",
        notions: ["travail", "bonheur"],
        reperes: ["Obligation/contrainte"],
        theses: [
            "Le travail aliène l'homme (Marx)",
            "Le travail permet l'épanouissement personnel (Aristote)",
            "Le loisir est supérieur au travail (Arendt)"
        ]
    },
    {
        sujet: "Peut-on prouver l'existence de Dieu ?",
        notions: ["religion", "raison", "science"],
        reperes: ["Croire/savoir"],
        theses: [
            "Les preuves métaphysiques de l'existence de Dieu (Descartes)",
            "La foi relève d'une conviction intime (Pascal)",
            "Dieu n'est pas un objet de science (Kant)"
        ]
    },
    {
        sujet: "L'art doit-il imiter la nature ?",
        notions: ["art", "nature"],
        reperes: ["Idéal/réel"],
        theses: [
            "L'art est imitation de la nature (Platon)",
            "L'art exprime l'idéal humain (Hegel)",
            "L'art doit s'affranchir de la nature (Nietzsche)"
        ]
    },
    {
        sujet: "Sommes-nous responsables de nos désirs ?",
        notions: ["liberté", "conscience", "inconscient"],
        reperes: ["Origine/fondement"],
        theses: [
            "Les désirs naissent du corps (Spinoza)",
            "L'inconscient détermine nos désirs (Freud)",
            "La raison peut gouverner les désirs (Epictète)"
        ]
    },
    {
        sujet: "La justice peut-elle se passer de lois ?",
        notions: ["justice", "lois"],
        reperes: ["Légal/légitime"],
        theses: [
            "La loi fonde la justice (Hobbes)",
            "La justice dépasse la loi positive (Rousseau)",
            "La justice sans lois mène à l'arbitraire (Rawls)"
        ]
    },
    {
        sujet: "La conscience suffit-elle pour définir la personne ?",
        notions: ["conscience"],
        reperes: ["Identité/égalité/différence"],
        theses: [
            "La conscience fonde l'identité personnelle (Descartes)",
            "Le corps participe à la personne (Merleau-Ponty)",
            "La mémoire assure la continuité de la personne (Locke)"
        ]
    },
    {
        sujet: "Peut-on tout démontrer ?",
        notions: ["science", "raison", "vérité"],
        reperes: ["Exemple/preuve"],
        theses: [
            "La science repose sur la démonstration (Euclide)",
            "Toute démonstration part de postulats indémontrables (Gödel)",
            "Il existe des vérités de fait et des vérités de raison (Leibniz)"
        ]
    },
    {
        sujet: "La liberté consiste-t-elle à obéir à la raison ?",
        notions: ["liberté", "raison"],
        reperes: ["Obligation/contrainte"],
        theses: [
            "Être libre, c'est suivre la raison (Spinoza)",
            "La raison peut être une contrainte (Kant)",
            "La liberté est le choix authentique (Sartre)"
        ]
    },
    {
        sujet: "Le temps détruit-il tout ?",
        notions: ["temps", "nature"],
        reperes: ["Transcendant/immanent"],
        theses: [
            "Le temps est corruption de l'être (Platon)",
            "Le temps est création continue (Bergson)",
            "Le temps humain trouve un sens dans l'histoire (Hegel)"
        ]
    }
];

// Notions et repères
const notions = [
    "art", "devoir", "bonheur", "conscience", "inconscient", "liberté",
    "langage", "justice", "lois", "nature", "raison", "religion",
    "science", "technique", "temps", "travail", "vérité"
];

const reperes = [
    "Absolu/relatif", "Abstrait/concret", "En acte/en puissance", "Analyse/synthèse",
    "Concept/image/métaphore", "Contingent/nécessaire", "Croire/savoir",
    "Essentiel/accidentel", "Exemple/preuve", "Expliquer/comprendre",
    "En fait/en droit", "Formel/matériel", "Genre/espèce/individu",
    "Hypothèse/conséquence/conclusion", "Idéal/réel", "Identité/égalité/différence",
    "Impossible/possible", "Intuitif/discoursif", "Légal/légitime",
    "Médiat/immédiat", "Objectif/subjectif/intersubjectif", "Obligation/contrainte",
    "Origine/fondement", "Persuader/convaincre", "Principe/cause/fin",
    "Public/privé", "Ressemblance/analogie", "Théorie/pratique",
    "Transcendant/immanent", "Universel/général/particulier/singulier",
    "Vrai/probable/certain"
];

// Sélections utilisateur
let selectedNotions = [];
let selectedReperes = [];
let locked = false;
let selectedSubject = null;

function createTags(list, container) {
    list.forEach(text => {
        const el = document.createElement('div');
        el.className = 'tag';
        el.draggable = true;
        el.textContent = text;
        el.dataset.value = text;
        el.addEventListener('dragstart', dragStart);
        container.appendChild(el);
    });
}

function dragStart(ev) {
    ev.dataTransfer.setData('text/plain', ev.target.dataset.value);
    ev.dataTransfer.setData('from', ev.target.parentElement.id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function dropToSandbox(ev) {
    ev.preventDefault();
    if (locked) return;
    const value = ev.dataTransfer.getData('text/plain');
    const from = ev.dataTransfer.getData('from');
    if (!value) return;
    const type = from.includes('notions') ? 'notion' : 'repere';
    const list = type === 'notion' ? selectedNotions : selectedReperes;
    if (!list.includes(value)) {
        const tag = document.querySelector(`[data-value="${value}"]`).cloneNode(true);
        tag.addEventListener('dragstart', dragStart);
        sandbox.appendChild(tag);
        list.push(value);
        checkSelections();
    }
}

function checkSelections() {
    if (selectedNotions.length > 0 && selectedReperes.length > 0) {
        lock.setAttribute('draggable', 'true');
    }
}

function handleLockDrop(ev) {
    ev.preventDefault();
    if (selectedNotions.length === 0 || selectedReperes.length === 0) {
        level1Error.textContent = 'Sélection insuffisante.';
        return;
    }
    locked = true;
    sandbox.querySelectorAll('.tag').forEach(tag => {
        tag.draggable = false;
    });
    lock.style.display = 'none';
    lockTarget.classList.add('locked');
    validateBtn.disabled = false;
}

function generateSubjectOptions() {
    subjectSelect.innerHTML = '';
    const matches = sujetsPhilo.filter(s => {
        return s.notions.some(n => selectedNotions.includes(n)) ||
               s.reperes.some(r => selectedReperes.includes(r));
    });
    let pool = sujetsPhilo.slice();
    const options = [];
    function pickRandom(arr) {
        const idx = Math.floor(Math.random() * arr.length);
        return arr.splice(idx, 1)[0];
    }
    if (matches.length > 0) {
        options.push(pickRandom(matches));
    }
    while (options.length < 3 && pool.length > 0) {
        options.push(pickRandom(pool));
    }
    if (options.length === 0) {
        level2Error.textContent = 'Aucun sujet ne correspond à cette combinaison. Veuillez modifier votre sélection.';
        return;
    }
    options.forEach(sub => {
        const opt = document.createElement('option');
        opt.value = sub.sujet;
        opt.textContent = sub.sujet;
        subjectSelect.appendChild(opt);
    });
    selectedSubject = sujetsPhilo.find(s => s.sujet === options[0].sujet);
}

function handleSubjectChange() {
    const val = subjectSelect.value;
    selectedSubject = sujetsPhilo.find(s => s.sujet === val);
    showLevel(3);
    populateTheses();
}

function populateTheses() {
    thesesContainer.innerHTML = '';
    selectedSubject.theses.forEach(t => {
        const div = document.createElement('div');
        div.className = 'thesis';
        div.draggable = true;
        div.textContent = t;
        div.addEventListener('dragstart', dragStartThesis);
        div.addEventListener('drop', dropThesis);
        div.addEventListener('dragover', allowDrop);
        thesesContainer.appendChild(div);
    });
}

let draggedThesis = null;
function dragStartThesis(ev) {
    draggedThesis = ev.target;
}

function dropThesis(ev) {
    ev.preventDefault();
    if (ev.target.classList.contains('thesis')) {
        thesesContainer.insertBefore(draggedThesis, ev.target.nextSibling);
    }
}

function exportResult() {
    const lines = [];
    lines.push('Sujet : ' + selectedSubject.sujet);
    lines.push('');
    lines.push('Plan :');
    thesesContainer.querySelectorAll('.thesis').forEach((t, i) => {
        lines.push((i + 1) + '. ' + t.textContent);
    });
    lines.push('');
    lines.push('Notions : ' + selectedNotions.join(', '));
    lines.push('Repères : ' + selectedReperes.join(', '));
    exportArea.value = lines.join('\n');
}

function showLevel(n) {
    document.querySelectorAll('.level').forEach((lvl, idx) => {
        lvl.classList.toggle('hidden', idx + 1 !== n);
    });
}

// Initialisation DOM
document.addEventListener('DOMContentLoaded', () => {
    createTags(notions, notionsList);
    createTags(reperes, reperesList);
    sandbox.addEventListener('dragover', allowDrop);
    sandbox.addEventListener('drop', dropToSandbox);
    lockTarget.addEventListener('dragover', allowDrop);
    lockTarget.addEventListener('drop', handleLockDrop);
    validateBtn.addEventListener('click', () => {
        showLevel(2);
        generateSubjectOptions();
    });
    subjectSelect.addEventListener('change', handleSubjectChange);
    exportBtn.addEventListener('click', exportResult);
});
