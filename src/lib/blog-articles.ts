export type RichArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  callout?: {
    title: string;
    body: string;
  };
};

export type RichArticleContent = {
  reviewedDate: string;
  directAnswer: string;
  takeaways: string[];
  quickFacts: { label: string; value: string }[];
  comparison?: {
    heading: string;
    headers: string[];
    rows: string[][];
  };
  sections: RichArticleSection[];
  checklist: string[];
  faq: { question: string; answer: string }[];
  sources: { label: string; url: string }[];
};

const portugalSource =
  "https://vistos.mne.gov.pt/en/national-visas/necessary-documentation/temporary-stay";
const spainSource =
  "https://www.exteriores.gob.es/Consulados/londres/en/ServiciosConsulares/Paginas/Consular/Digital-Nomad-Visa.aspx";
const croatiaSource =
  "https://mup.gov.hr/aliens-281621/stay-and-work/digital-nomads/286833";
const estoniaSource = "https://www.e-resident.gov.ee/nomadvisa/";
const thailandSource = "https://www.thaievisa.go.th/visa/dtv-visa";
const maltaSource = "https://residencymalta.gov.mt/nomad-residence-permit/";

export const richBlogArticles: Record<string, RichArticleContent> = {
  "portugal-d8-remote-work-visa-official-source-guide": {
    reviewedDate: "2026-06-30",
    directAnswer:
      "Portugal's remote-work visa route can suit employees, freelancers, and business owners whose work is performed remotely for organizations or clients outside Portugal. The application is document-led: the official portal asks for general national-visa documents, qualifying work evidence, proof of average monthly income over the previous three months, and proof of tax residence. A strong application makes every payment, contract, name, and date easy to reconcile.",
    takeaways: [
      "The official temporary-stay checklist separates employed and independent applicants, so use the evidence track that matches how you actually earn.",
      "The income test is linked to four Portuguese minimum monthly guaranteed remunerations and should be recalculated from the current official rule before filing.",
      "Average monthly income is assessed over the previous three months, making consistent statements and matching contracts especially important.",
      "General documents include a valid passport, insurance, criminal-record evidence, financial resources, and proof of lawful status when applying outside your country of nationality.",
      "The national rule is only half of the workflow. The consular post can request additional documents and controls appointment practice.",
    ],
    quickFacts: [
      { label: "Best fit", value: "Stable foreign employment, freelance work, or an overseas business" },
      { label: "Income period", value: "Average monthly income over the previous three months" },
      { label: "Income formula", value: "Four Portuguese minimum monthly guaranteed remunerations" },
      { label: "Work evidence", value: "Employment link, service contracts, company documents, or proof of services" },
      { label: "Final authority", value: "Portuguese visa portal and the consular post receiving the file" },
    ],
    comparison: {
      heading: "Choose the evidence track that matches your income",
      headers: ["Applicant type", "Core evidence", "What the reviewer must understand"],
      rows: [
        [
          "Remote employee",
          "Employment contract, promise of contract, or employer declaration",
          "The employment relationship is real, current, remote, and compatible with a stay in Portugal",
        ],
        [
          "Freelancer or consultant",
          "Service contracts, written proposals, invoices, and proof of services",
          "Who the clients are, what work is delivered, and how payments reach the applicant",
        ],
        [
          "Founder or company owner",
          "Company agreement or ownership records plus contracts, invoices, and bank evidence",
          "The company is active and produces traceable personal income rather than paper-only turnover",
        ],
      ],
    },
    sections: [
      {
        heading: "What the official Portugal route actually asks you to prove",
        paragraphs: [
          "Portugal's Ministry of Foreign Affairs lists a specific temporary-stay category for professional activity performed remotely. The core question is not whether someone calls themselves a digital nomad. It is whether the documents show a lawful, sustainable professional relationship that can continue while the applicant is in Portugal.",
          "Employed applicants can use an employment contract, a promise of an employment contract, or an employer declaration confirming the labor relationship. Independent applicants can use a company agreement, a service contract, a written proposal for services, or another document proving services provided to one or more entities. That distinction should shape the entire file, including the cover note and the order of exhibits.",
          "The portal also asks for proof of average monthly income over the previous three months and a document showing tax residence. These are separate questions. Bank statements show movement of money; tax-residence evidence explains the applicant's existing fiscal connection. One should not be assumed to replace the other.",
        ],
        callout: {
          title: "Use the official formula, not an old converted number",
          body: "Because the threshold is tied to Portugal's minimum guaranteed remuneration, a third-party EUR or USD figure can become stale. Recalculate from the official rule and keep a buffer for currency movement if your income is paid in another currency.",
        },
      },
      {
        heading: "Build a clean three-month income trail",
        paragraphs: [
          "Start with the three statement periods immediately preceding the application. Highlight recurring salary deposits or client payments, but do not edit the statements themselves. Create a one-page index that links each deposit to a payslip, invoice, contract, or payment-platform report.",
          "If income varies, show the arithmetic openly. List each month's qualifying receipts, identify any one-off transfers that should not be counted, and calculate the average. A transparent calculation is more credible than a large balance with no explanation. Savings may strengthen the overall picture, but they should not be presented as recurring income unless the official instructions allow that treatment.",
          "Applicants paid through several platforms should provide a short bridge: platform report, transfer reference, and matching bank credit. The goal is to let a reviewer follow the money without guessing which account or business name belongs to whom.",
        ],
        bullets: [
          "Use complete statements that show the account holder, period, and currency.",
          "Match employer or client names across contracts, invoices, payslips, and deposits.",
          "Explain currency conversions and state the exchange-rate date used.",
          "Separate business turnover from the personal income available to support the stay.",
          "Explain unusually large or irregular transfers before they create questions.",
        ],
      },
      {
        heading: "General national-visa documents still matter",
        paragraphs: [
          "Remote-work evidence does not replace the general national-visa checklist. The official page lists the signed application, recent passport photographs, a qualifying passport, proof of lawful status when applying in a country where the applicant is not a national, travel medical insurance, criminal-record evidence, financial resources, and return-transport evidence.",
          "Document timing can be more difficult than income proof. Criminal-record certificates may need an apostille or legalization, translations can take time, and insurance wording must cover the required medical and repatriation risks. Order slow documents early, but not so early that they expire before the appointment.",
          "Names and dates should be reviewed as a set. A shortened company name on a bank statement, a different address on a tax certificate, or a passport renewal during preparation may be explainable, but unexplained inconsistencies make the file harder to assess.",
        ],
      },
      {
        heading: "Family applications need sequencing and a larger evidence plan",
        paragraphs: [
          "A family should not treat the main applicant's file as the only file. Spouses, partners, and children can create additional requirements for relationship evidence, insurance, consent, schooling plans, accommodation, and financial resources. Civil documents may also require legalization and translation.",
          "Map the sequence before booking travel. Confirm whether family members apply together, accompany a temporary-stay holder, or use a later family-reunification step. The correct sequence affects appointment availability and the documents that must be current on each filing date.",
          "Budget beyond the headline visa fee. Include certificates, apostilles, translations, courier costs, insurance, temporary accommodation, and a contingency for repeated appointments. A route can be affordable for one applicant but administratively expensive for a family of four.",
        ],
      },
      {
        heading: "A practical filing workflow",
        paragraphs: [
          "First, identify the Portuguese consular post responsible for your place of lawful residence. Read both the national portal and that post's current appointment instructions. Save a dated copy of each checklist so you know which version governed your preparation.",
          "Second, choose the correct income track and create a document index. Third, order background and civil-status documents, confirm authentication requirements, and obtain translations. Fourth, assemble financial evidence and a short cover note that explains the remote work, income calculation, intended stay, and family composition.",
          "Finally, conduct a consistency review. Check names, passport numbers, addresses, currencies, dates, contract terms, and signature pages. Bring the originals and copies required by the appointment provider, and be ready for the consular post to request additional evidence.",
        ],
      },
      {
        heading: "Common refusal risks and avoidable weaknesses",
        paragraphs: [
          "The most common weakness is not necessarily low income. It is income that cannot be understood. Founder applicants sometimes submit company revenue without proving personal access to it. Freelancers may show invoices without matching deposits. Employees may omit written permission to work remotely from Portugal.",
          "A second weakness is using a generic online checklist that does not match the responsible consulate. A third is treating the threshold as the entire eligibility test while neglecting insurance, criminal records, lawful residence, or tax-residence evidence.",
          "No article can guarantee approval. The useful standard is narrower: does the file answer the official questions with current, consistent, traceable evidence? If the answer is uncertain, resolve the uncertainty before paying non-refundable relocation costs.",
        ],
      },
    ],
    checklist: [
      "Confirm the responsible Portuguese consular post and its current appointment instructions.",
      "Recalculate the current income threshold from the official minimum-wage-linked formula.",
      "Prepare three complete months of income evidence and a transparent average calculation.",
      "Match every material payment to a contract, payslip, invoice, or company record.",
      "Obtain tax-residence evidence and keep it separate from bank proof.",
      "Check passport validity, insurance wording, criminal-record timing, and authentication rules.",
      "Prepare translated and legalized family documents where applicable.",
      "Run a final name, date, currency, and document-expiry review before the appointment.",
    ],
    faq: [
      {
        question: "Is Portugal's D8 income threshold a fixed EUR amount?",
        answer:
          "The official temporary-stay page expresses the requirement as four Portuguese minimum monthly guaranteed remunerations and asks for average monthly income over the previous three months. Calculate the current amount from the official rule rather than relying on an older article conversion.",
      },
      {
        question: "What can a remote employee use as work evidence?",
        answer:
          "The official page lists an employment contract, a promise of an employment contract, or an employer declaration confirming the labor relationship. The receiving consulate may ask for additional context or remote-work confirmation.",
      },
      {
        question: "What can a freelancer use as work evidence?",
        answer:
          "The official list includes a service contract, a written proposal for a service contract, company documentation, or evidence of services provided to one or more entities. Pair those documents with invoices and matching bank receipts.",
      },
      {
        question: "Are three months of bank statements enough by themselves?",
        answer:
          "Usually not. Statements show money movement but do not always prove the legal source or remote nature of the work. Link deposits to employment, service, invoice, or company evidence and follow the consulate's exact checklist.",
      },
      {
        question: "Can a consulate request more documents than the national portal lists?",
        answer:
          "Yes. The official portal states that the consular post may request additional documents. Use the national page as the baseline and the responsible post as the operational checklist.",
      },
    ],
    sources: [
      { label: "Portugal Ministry of Foreign Affairs - Temporary-stay visa documentation", url: portugalSource },
      { label: "Portugal Ministry of Foreign Affairs - National visa portal", url: "https://vistos.mne.gov.pt/en/" },
    ],
  },

  "spain-digital-nomad-visa-official-source-guide": {
    reviewedDate: "2026-06-30",
    directAnswer:
      "Spain's international telework visa is designed for non-EU applicants who will reside in Spain while working remotely through a foreign employer, foreign business, or qualifying self-employed activity. It rewards organized professional evidence: the application must connect the applicant's qualifications and work history to a real remote relationship, then support that relationship with financial, identity, background, and family documents.",
    takeaways: [
      "The route is residence for international telework, not permission to take an ordinary Spanish job.",
      "Employees and self-employed professionals need different evidence, but both must show a credible, continuing remote-work arrangement.",
      "Professional qualifications or relevant experience can be central to eligibility, so a contract alone may not complete the file.",
      "Family members can be included under the official framework, but each additional applicant increases financial and civil-document requirements.",
      "Consular pages are operational documents. Use the page for the post that will receive your application.",
    ],
    quickFacts: [
      { label: "Route", value: "International telework national visa" },
      { label: "Core work location", value: "Employer, company, or principal professional activity outside Spain" },
      { label: "Applicant profiles", value: "Remote employee, qualified freelancer, or qualifying business owner" },
      { label: "Family", value: "Spouse or partner, dependent children, and qualifying dependent ascendants" },
      { label: "Operational source", value: "The Spanish consulate responsible for the filing location" },
    ],
    comparison: {
      heading: "Employee and self-employed evidence are not interchangeable",
      headers: ["Question", "Remote employee", "Self-employed applicant"],
      rows: [
        ["Who provides the work?", "A foreign employer", "Foreign clients or an overseas business"],
        ["Core relationship evidence", "Contract, employer letter, tenure, and remote-work authorization", "Client agreements, invoices, company records, and service history"],
        ["Main review risk", "Employer letter does not clearly authorize work from Spain", "Income is traceable but the professional relationship is fragmented or poorly explained"],
        ["Best supporting narrative", "One continuing role with clear duties and compensation", "A concise client and revenue map showing continuity and foreign-source work"],
      ],
    },
    sections: [
      {
        heading: "Start with the legal purpose of the route",
        paragraphs: [
          "Spain's consular guidance frames the visa around living in Spain while carrying out remote work for a company, employer, or professional activity located outside Spain. That purpose should remain visible in every part of the application. A job title, client list, and income stream that appear local or ambiguous can undermine an otherwise complete file.",
          "Do not build the application around lifestyle reasons first. Climate, transport, schools, and language may explain why Spain is attractive, but the visa decision turns on legal eligibility and evidence. The cover note should lead with the professional relationship, how the work is performed, where the organization or clients are based, and why the arrangement continues during residence in Spain.",
        ],
      },
      {
        heading: "Prove both professional eligibility and the remote relationship",
        paragraphs: [
          "A strong employee file shows more than a signed contract. It normally explains how long the relationship has existed, what the applicant does, how the salary is paid, and whether the employer authorizes work from Spain. The employer letter should match the contract and bank evidence rather than introduce new dates or compensation figures.",
          "Self-employed applicants should organize client relationships by importance. Include current agreements, recent invoices, matching receipts, and evidence that the professional activity can be carried out remotely. When several small clients produce the income, a summary table can make the file easier to understand.",
          "Qualifications and experience deserve their own exhibit. If the route accepts a degree, professional credential, or relevant work history, present the evidence that most directly matches the work being performed. Avoid submitting a large, unsorted CV archive that leaves the reviewer to infer the connection.",
        ],
        callout: {
          title: "Consistency is a form of credibility",
          body: "Contract dates, employer letters, payslips, invoices, bank deposits, and professional records should tell the same story. Small differences may be explainable, but unexplained differences create avoidable doubt.",
        },
      },
      {
        heading: "Financial evidence should answer three questions",
        paragraphs: [
          "The financial section should show that the applicant reaches the current requirement, that the income is recurring, and that it comes from the qualifying work. A high closing balance answers only the first question imperfectly. It does not establish recurring professional income.",
          "Create a monthly schedule showing gross receipts, net deposits, currency, and the document that supports each amount. When income is paid in another currency, state the exchange-rate source and date. When compensation includes bonuses or owner distributions, explain whether those amounts are recurring and whether the official rule permits them to be counted.",
          "Families should calculate the additional requirement before choosing an appointment date. The main applicant may qualify alone while the combined family threshold, insurance cost, or housing evidence remains incomplete.",
        ],
      },
      {
        heading: "Prepare the civil and background documents as a separate workstream",
        paragraphs: [
          "National-visa applications commonly involve passports, photographs, criminal-record evidence, health or insurance documents, civil-status certificates, and consular forms. These items have different validity windows and authentication rules. A project plan is safer than collecting them randomly.",
          "List each document, issuing authority, authentication step, translation requirement, expiry rule, and responsible person. For family applications, repeat the list for every applicant. A marriage or birth certificate that is valid for one administrative purpose may still need a recent issue date, apostille, or sworn translation for the visa file.",
        ],
      },
      {
        heading: "Family eligibility is useful, but it increases complexity",
        paragraphs: [
          "Official consular guidance includes a spouse or unmarried partner, dependent children, and qualifying dependent relatives in the ascending line. Each relationship must be documented, and dependency may need more than a family certificate.",
          "Plan around the family's actual needs. Check school admission timing, health coverage, housing size, and whether a partner expects local work rights. Immigration permission, tax residence, and employment permission are separate questions and should not be collapsed into a single assumption.",
          "A family cover sheet can help: list each applicant, relationship, passport, financial addition, insurance document, and civil certificate. This reduces the risk that one dependent's missing document delays the whole submission.",
        ],
      },
      {
        heading: "Use a staged application workflow",
        paragraphs: [
          "Stage one is jurisdiction: confirm the responsible consulate and whether you are eligible to apply there. Stage two is eligibility: match the official criteria to your employment, self-employment, qualifications, income, and family composition. Stage three is evidence production: request employer letters, client confirmations, certificates, authentications, and translations.",
          "Stage four is quality control. Check the sequence of dates, spelling of legal names, contract status, currency calculations, and document expiry. Stage five is appointment preparation: follow the provider's order, copy, payment, and biometric instructions exactly.",
          "Do not make irreversible relocation commitments before understanding the filing and decision timeline. Processing estimates are useful for planning but are not guarantees, particularly when additional evidence is requested.",
        ],
      },
      {
        heading: "Who should pause before applying",
        paragraphs: [
          "Pause if the employer will not confirm remote work from Spain, if the company exists only on paper, if most clients are local to Spain, or if income depends on unexplained transfers. These are not formatting problems. They affect the substance of the route.",
          "Also pause when a family member's documents are not ready, when professional qualifications do not match the work, or when the application depends on a threshold found only in an old article. Resolve those points against the current official page or obtain qualified advice before paying fees.",
        ],
      },
    ],
    checklist: [
      "Confirm the correct Spanish consulate and download its current checklist.",
      "Choose the employee or self-employed evidence track and keep the narrative consistent.",
      "Obtain clear remote-work authorization or current foreign-client evidence.",
      "Prepare qualification or experience documents that directly match the professional activity.",
      "Create a monthly income schedule tied to bank statements and source documents.",
      "Calculate family additions and prepare dependency evidence where relevant.",
      "Track apostilles, translations, issue dates, and validity windows.",
      "Review NIE, appointment, fee, copy, and biometric instructions before filing.",
    ],
    faq: [
      {
        question: "Can a freelancer apply for Spain's digital nomad visa?",
        answer:
          "Official consular guidance includes qualifying self-employed activity connected mainly to work outside Spain. The applicant must document the professional relationship, remote nature of the work, income, and relevant qualifications or experience.",
      },
      {
        question: "Is an employment contract enough?",
        answer:
          "Not usually by itself. A complete file commonly needs employer confirmation, remote-work authorization, income evidence, professional eligibility, and the general national-visa documents listed by the responsible consulate.",
      },
      {
        question: "Can family members apply with the main applicant?",
        answer:
          "The official framework includes spouses or partners, dependent children, and qualifying dependent ascendants. Confirm the current financial additions and relationship documents with the receiving consulate.",
      },
      {
        question: "Should I compare Spain only by its income threshold?",
        answer:
          "No. Professional eligibility, employer cooperation, document authentication, family needs, tax exposure, and the local consular process can matter as much as the threshold.",
      },
      {
        question: "Does the visa guarantee a particular processing time?",
        answer:
          "No. Published timelines are planning references. Appointment availability, document completeness, background checks, and additional requests can change the practical timeline.",
      },
    ],
    sources: [
      { label: "Spanish Consulate in London - Digital Nomad Visa", url: spainSource },
      { label: "Spanish Ministry of Foreign Affairs - Consular services", url: "https://www.exteriores.gob.es/" },
    ],
  },

  "croatia-digital-nomad-temporary-stay-guide": {
    reviewedDate: "2026-06-30",
    directAnswer:
      "Croatia's digital-nomad temporary stay is a defined residence category for third-country nationals who work through communication technology for a foreign employer or their own foreign-registered company and do not work for Croatian employers. The route can be unusually clear when the work is genuinely foreign, but it is a poor fit for applicants who expect to mix remote work with Croatian employment or local client services.",
    takeaways: [
      "The no-Croatian-employer boundary is part of the official definition, not a minor condition.",
      "Temporary stay can be granted for up to 18 months, but an individual approval may be shorter.",
      "Applicants should prove the foreign work relationship, financial support, accommodation, insurance, and the other documents listed by the Ministry of the Interior.",
      "Close family can use family reunification after the digital nomad has been granted temporary stay, so sequencing matters.",
      "A temporary-stay approval is not the same as a direct permanent-residence promise.",
    ],
    quickFacts: [
      { label: "Official category", value: "Temporary stay of digital nomads" },
      { label: "Maximum stated stay", value: "Up to 18 months; an approval can be shorter" },
      { label: "Core restriction", value: "No work or services for employers in Croatia" },
      { label: "Family route", value: "Close family through family reunification after approval" },
      { label: "Authority", value: "Croatian Ministry of the Interior" },
    ],
    comparison: {
      heading: "Does the Croatia route fit the planned work?",
      headers: ["Work plan", "Likely fit", "Reason"],
      rows: [
        ["Employee of a company outside Croatia", "Potentially strong", "Matches the foreign-employer structure when remote work is documented"],
        ["Owner of a company registered outside Croatia", "Potentially strong", "Can match the official definition with active business and income evidence"],
        ["Freelancer serving only foreign clients", "Needs careful documentation", "The source, location, and continuity of services must be clear"],
        ["Applicant taking Croatian employment or serving Croatian employers", "Poor fit", "Conflicts with the route's stated no-local-work boundary"],
      ],
    },
    sections: [
      {
        heading: "Read the official definition before reading the document list",
        paragraphs: [
          "Croatia's definition does useful screening work. It identifies a third-country national who performs work through communication technology for a company or their own company that is not registered in Croatia, without working or providing services to employers in Croatia.",
          "This means a complete stack of documents cannot repair a work plan that falls outside the category. Before collecting certificates, map every employer, company, and material client. Identify where each entity is registered and whether any service is delivered to a Croatian employer.",
          "If the answer is mixed or unclear, obtain advice before relying on the digital-nomad route. It is safer to choose the correct immigration category than to describe local work as remote work and hope the distinction is ignored.",
        ],
      },
      {
        heading: "Prove that the foreign business relationship is real",
        paragraphs: [
          "Employees should combine the foreign employment contract with an employer letter that confirms duties, compensation, remote performance, and permission to work while in Croatia. Company owners should show registration, ownership, active operations, and how the business produces the applicant's support.",
          "Freelancers need a client map. List the principal clients, country, contract period, service, recent invoices, and matching deposits. Avoid a file made entirely of screenshots from a platform account without legal names or payment reconciliation.",
          "A short explanatory note is useful when a trading name differs from a legal company name or when payments are processed by an intermediary. The note should clarify evidence, not introduce a new story unsupported by documents.",
        ],
      },
      {
        heading: "Plan the 18-month maximum conservatively",
        paragraphs: [
          "The Ministry of the Interior states that temporary stay can be granted for up to a maximum of 18 months and can be granted for less. Treat 18 months as a ceiling, not a promised duration.",
          "Before signing a long lease or arranging school enrollment, consider the requested stay, passport validity, insurance period, and the possibility of a shorter decision. Review the official timing rules for extension or a subsequent application before building a multi-year residence plan.",
          "Temporary stay also should not be presented as guaranteed progress toward permanent residence or citizenship. Those outcomes depend on separate legal rules, qualifying residence, continuity, and facts beyond the digital-nomad approval.",
        ],
        callout: {
          title: "Maximum duration is not an approval guarantee",
          body: "An authority may grant less than the stated maximum. Align housing, insurance, and family commitments with the actual decision rather than the most favorable possible duration.",
        },
      },
      {
        heading: "Organize the supporting documents by purpose",
        paragraphs: [
          "Create separate sections for identity and lawful stay, foreign work, financial support, insurance, criminal record, accommodation, and family evidence. A purpose-based index helps the reviewer understand why each document is included.",
          "Check the Ministry page for current submission channels and formats. Depending on the applicant's circumstances, a filing may involve an embassy or consulate, a police administration or station, or an online process. The correct channel affects originals, copies, translations, and the sequence after entry.",
          "Accommodation should be realistic for the household. Insurance should cover the requested period and satisfy the official wording. Financial evidence should show access to funds, not merely business revenue that remains unavailable to the applicant.",
        ],
        bullets: [
          "Passport and identity pages that cover the intended stay.",
          "Foreign employment, company, or freelance evidence.",
          "Financial support shown through the current official method.",
          "Health-insurance evidence for the requested period.",
          "Accommodation and local address information where required.",
          "Criminal-record and civil documents with required authentication or translation.",
        ],
      },
      {
        heading: "Family reunification requires deliberate sequencing",
        paragraphs: [
          "The official guidance states that close family members of a digital nomad who has been granted temporary stay may join through family reunification. The phrase 'has been granted' matters. Confirm whether the main approval must exist before the family file can proceed.",
          "Prepare relationship certificates, passports, insurance, accommodation, financial support, consent documents for minors, and translations in parallel, but do not assume every document should be issued on the same date. Some certificates have practical validity windows.",
          "Families should also compare city-level housing, healthcare, transport, and school availability. Immigration eligibility answers whether a family may stay; it does not answer whether the chosen base works for daily life.",
        ],
      },
      {
        heading: "Tax and local registration deserve separate advice",
        paragraphs: [
          "Immigration permission does not settle every tax question. Residence length, domicile, employer structure, source of income, treaties, and social-security rules can produce obligations in more than one country. Do not infer 'tax free' from a visa label or an old promotional article.",
          "After approval, follow the official registration and residence-card steps. Keep copies of the submitted file, decision, address records, and any later changes. If the employer, company, client base, or family composition changes, check whether the authority must be notified.",
        ],
      },
      {
        heading: "The mistakes most likely to weaken the case",
        paragraphs: [
          "The largest substantive mistake is including Croatian employment or Croatian-employer services in a route defined around foreign work. The largest documentary mistake is providing business evidence without showing the applicant's actual role and income.",
          "Other weaknesses include assuming 18 months will always be granted, using accommodation that does not fit the family, submitting untranslated civil records, or booking an application through the wrong authority. Each can be reduced by reading the current Ministry page before committing money.",
        ],
      },
    ],
    checklist: [
      "Map every employer, company, and principal client by country of registration.",
      "Confirm that the planned work does not involve Croatian employers.",
      "Choose the correct filing channel for the applicant's location and status.",
      "Build a purpose-based index for work, funds, insurance, background, and accommodation evidence.",
      "Treat 18 months as a maximum rather than a guaranteed approval period.",
      "Confirm the family-reunification sequence before booking family travel.",
      "Check authentication and translation rules for criminal and civil documents.",
      "Obtain separate tax advice for the planned length of stay and work structure.",
    ],
    faq: [
      { question: "Can a Croatia digital nomad work for a Croatian employer?", answer: "The official definition says the digital nomad does not perform work or provide services to employers in Croatia. A plan involving Croatian employment needs a different legal analysis." },
      { question: "Is the stay always granted for 18 months?", answer: "No. The official page says temporary stay may be granted for up to 18 months and may be granted for less." },
      { question: "Can family members join?", answer: "The Ministry points close family members toward family reunification after the digital nomad has been granted temporary stay. Verify sequencing and current documents before filing." },
      { question: "Does the permit create a direct permanent-residence path?", answer: "Do not assume it does. Permanent residence depends on separate residence rules and the applicant's complete history." },
      { question: "Should a freelancer list every client?", answer: "List at least the material clients needed to explain continuity, foreign-source work, and income. Pair agreements and invoices with matching receipts." },
    ],
    sources: [{ label: "Croatian Ministry of the Interior - Temporary stay of digital nomads", url: croatiaSource }],
  },

  "estonia-digital-nomad-visa-vs-e-residency-guide": {
    reviewedDate: "2026-06-30",
    directAnswer:
      "Estonia's e-Residency and Digital Nomad Visa solve different problems. e-Residency is a government-issued digital identity that enables access to Estonian e-services and online company administration; it does not grant immigration residence. The Digital Nomad Visa is the temporary-stay route for qualifying location-independent workers with foreign employment, a foreign company, or mainly foreign freelance clients.",
    takeaways: [
      "e-Residency is a digital business and identity tool, not permission to live in Estonia.",
      "The Digital Nomad Visa can permit a temporary stay for up to one year under the official program.",
      "The official e-Residency comparison currently states a EUR 4,500 net monthly income threshold for the visa.",
      "The visa route expects work that is independent of location and connected to an employer, company, or clients mostly outside Estonia.",
      "A founder may benefit from e-Residency and separately qualify for the visa, but one status does not create the other.",
    ],
    quickFacts: [
      { label: "e-Residency purpose", value: "Digital identity and online access to Estonian e-services" },
      { label: "Visa purpose", value: "Temporary stay for qualifying remote workers" },
      { label: "Maximum visa stay", value: "Up to one year" },
      { label: "Published income threshold", value: "EUR 4,500 net per month on the official comparison page" },
      { label: "Published processing signal", value: "Up to 30 days through the nearest Estonian embassy" },
    ],
    comparison: {
      heading: "e-Residency and the Digital Nomad Visa side by side",
      headers: ["Question", "e-Residency", "Digital Nomad Visa"],
      rows: [
        ["What is it?", "A secure government-issued digital identity", "A visa granting qualifying remote workers a temporary stay"],
        ["Does it grant residence?", "No", "Yes, temporarily, subject to approval and visa rules"],
        ["Main use", "Run a company and access e-services online", "Live in Estonia while continuing qualifying remote work"],
        ["Application channel", "Online application and identity verification", "Nearest Estonian embassy under standard visa procedures"],
        ["Can one replace the other?", "No", "No"],
      ],
    },
    sections: [
      {
        heading: "Choose the status based on the problem you need to solve",
        paragraphs: [
          "Someone who wants an Estonian digital identity, online company administration, and access to e-services may be considering e-Residency. Someone who wants legal permission to stay temporarily in Estonia while working remotely is considering the Digital Nomad Visa. The names are connected to the same digitally advanced country, but the legal functions are distinct.",
          "This distinction matters because business access is not immigration status. An e-resident can manage an Estonian company from another country without acquiring a right to enter or live in Estonia. Likewise, a visa holder does not automatically receive every company or tax advantage associated with e-Residency.",
        ],
        callout: {
          title: "The shortest accurate answer",
          body: "e-Residency helps a person transact with Estonia online. The Digital Nomad Visa helps a qualifying person stay in Estonia temporarily. Neither status silently includes the other.",
        },
      },
      {
        heading: "Screen the work relationship for visa eligibility",
        paragraphs: [
          "The official comparison describes applicants who can work online and independently of location. It lists an active employment contract with a company registered outside Estonia, business through the applicant's own company registered abroad, or freelance work for clients mostly outside Estonia.",
          "Organize the file around the relevant category. Employees should show the continuing foreign employment relationship and remote permission. Founders should show registration, ownership, active operations, and personal income. Freelancers should show client concentration, agreements, invoices, and receipts.",
          "The word 'mostly' matters for freelancers. If a material share of the work is connected to Estonia, obtain specific guidance instead of assuming a foreign mailing address cures the issue.",
        ],
      },
      {
        heading: "Treat the EUR 4,500 figure as a current official threshold, not a permanent constant",
        paragraphs: [
          "The official e-Residency comparison currently publishes a EUR 4,500 net monthly income requirement. Record the date on which you checked it and confirm the visa application source again immediately before filing.",
          "Net income should be evidenced in a way that matches the applicant's legal and financial records. An employee may use salary documents and statements. A founder should distinguish company revenue from personal net income. A freelancer should reconcile invoices, platform reports, tax records where relevant, and bank receipts.",
          "If income fluctuates, do not cherry-pick the strongest month. Present the period requested by the embassy and explain seasonality or contract changes with evidence.",
        ],
      },
      {
        heading: "Plan around the embassy process",
        paragraphs: [
          "The official page directs Digital Nomad Visa applicants to the nearest Estonian embassy and says the process takes up to 30 days. Standard visa rules and procedures apply. Appointment availability, jurisdiction, complete documents, and additional requests can still extend the practical timeline.",
          "Confirm that the selected embassy accepts the application based on nationality or lawful residence. Ask whether originals, translations, or in-person biometrics are required. Avoid signing a non-refundable long lease before the visa decision.",
          "For e-Residency, the official comparison describes an online application, a three-to-eight-week process, and collection of the digital identity kit at a pickup point after identity verification. That process does not substitute for the embassy visa process.",
        ],
      },
      {
        heading: "Understand company, tax, and immigration boundaries",
        paragraphs: [
          "Creating or managing an Estonian company does not by itself determine where the company is effectively managed, where the owner is personally tax resident, or where social-security obligations arise. Those questions depend on operations and individual facts.",
          "Similarly, obtaining a Digital Nomad Visa does not mean all income becomes taxable only in Estonia or exempt elsewhere. Length of stay, treaty rules, employer presence, business management, and the applicant's prior residence can matter.",
          "Use the visa for immigration planning and e-Residency for digital administration. Obtain tax advice when the business or residence plan crosses jurisdictions.",
        ],
      },
      {
        heading: "Four common misunderstandings",
        paragraphs: [
          "First, e-Residency is not physical residency. Second, an Estonian company does not automatically make its owner an Estonian tax resident or eliminate tax elsewhere. Third, the Digital Nomad Visa is not an ordinary local work permit. Fourth, a published maximum or processing period is not a guaranteed outcome.",
          "These misunderstandings often begin with a true statement used outside its context. Keep the official comparison page in the file and label each benefit as digital identity, company administration, immigration stay, or tax. If a claim does not fit one of those categories clearly, investigate it before relying on it.",
        ],
      },
    ],
    checklist: [
      "Write down whether the real goal is digital business administration, physical stay, or both.",
      "Do not treat e-Residency as immigration permission.",
      "Match the visa application to foreign employment, a foreign company, or mostly foreign freelance clients.",
      "Confirm the current net monthly income threshold on the official page.",
      "Reconcile income evidence to contracts, invoices, and bank deposits.",
      "Confirm embassy jurisdiction, appointment method, and document format.",
      "Keep company, immigration, personal-tax, and corporate-tax questions separate.",
      "Avoid irreversible travel and housing costs before the visa decision.",
    ],
    faq: [
      { question: "Does e-Residency let me live in Estonia?", answer: "No. The official program describes e-Residency as digital identity and access to e-services. A qualifying immigration status, such as the Digital Nomad Visa, is required for the temporary stay." },
      { question: "Can I have e-Residency and a Digital Nomad Visa?", answer: "Potentially, if each application independently qualifies. One does not automatically grant or replace the other." },
      { question: "What income threshold does the official page currently show?", answer: "The e-Residency comparison page currently states EUR 4,500 net per month for the Digital Nomad Visa. Recheck it before filing." },
      { question: "How long can the visa allow a stay?", answer: "The official comparison describes a temporary stay of up to one year, subject to the application and standard visa procedures." },
      { question: "Does an Estonian company settle my tax residence?", answer: "No. Company registration, effective management, personal residence, and tax obligations are separate analyses." },
    ],
    sources: [
      { label: "Republic of Estonia e-Residency - e-Residency vs Digital Nomad Visa", url: estoniaSource },
      { label: "Estonian Ministry of Foreign Affairs - Visa application portal", url: "https://eelviisataotlus.vm.ee/" },
    ],
  },

  "thailand-destination-thailand-visa-dtv-guide": {
    reviewedDate: "2026-06-30",
    directAnswer:
      "Thailand's Destination Thailand Visa is an official eVisa category that can be relevant to remote workers, but the practical document list depends heavily on the applicant's passport, current location, and responsible embassy or consulate. The safest approach is to create the file from the Thailand eVisa workflow after selecting the correct filing location, not from a social-media checklist.",
    takeaways: [
      "Start with Thailand's official eVisa DTV page and the mission responsible for your location.",
      "Do not assume one applicant's document list applies to every passport or embassy.",
      "Financial evidence, professional purpose, identity, and current-location evidence should tell one consistent story.",
      "Remote-work eligibility should not be interpreted as unrestricted permission to work for Thai employers or local clients.",
      "Save the checklist and upload requirements used on the filing date because portal instructions can change.",
    ],
    quickFacts: [
      { label: "Application system", value: "Official Thailand eVisa portal where available" },
      { label: "Main audience", value: "Qualifying remote workers and other activities listed by the official DTV category" },
      { label: "Biggest variable", value: "Embassy, passport, and current-location document requirements" },
      { label: "Main work caution", value: "Do not assume the visa authorizes Thai employment" },
      { label: "Best evidence style", value: "Clear files, recent statements, and a concise explanation of the purpose" },
    ],
    comparison: {
      heading: "Official workflow versus an informal checklist",
      headers: ["Question", "Official eVisa workflow", "Social post or forum list"],
      rows: [
        ["Does it know the filing location?", "Yes, after the applicant selects the relevant mission", "Often not"],
        ["Can requirements change?", "The portal can display current mission-specific requests", "A screenshot becomes stale"],
        ["Is it suitable as final authority?", "Yes, together with the responsible embassy", "No, use only as informal experience"],
        ["How should conflicts be resolved?", "Follow the official portal or ask the mission", "Do not prefer popularity over authority"],
      ],
    },
    sections: [
      {
        heading: "Choose the filing location before building the file",
        paragraphs: [
          "Thailand's eVisa system routes applications through a responsible embassy or consulate. Eligibility to use a mission can depend on nationality, residence, or physical location. Confirm that jurisdiction before collecting mission-specific evidence.",
          "An otherwise strong application can fail operationally if filed through the wrong mission or if current-location evidence is missing. Check whether the portal asks for immigration stamps, residence permits, utility records, or other proof that the mission is responsible for the application.",
          "Save the mission name and a dated copy of the displayed document list. If you later move countries, do not assume the same upload requirements remain valid.",
        ],
      },
      {
        heading: "Explain the remote-work purpose without exaggeration",
        paragraphs: [
          "A concise professional narrative should identify the employer, business, or principal clients; describe the work; explain how it is performed online; and show where the income originates. The narrative should match contracts, company records, portfolios, and bank evidence.",
          "Avoid broad claims such as 'online entrepreneur' when the documents do not show an active business. A portfolio proves ability, not necessarily current income. A company certificate proves existence, not necessarily operations. Pair each claim with the evidence that answers it.",
          "If the intended activity includes Thai employment, local services, or another regulated activity, obtain specific advice. A long-stay visa label should not be treated as a general work permit.",
        ],
        callout: {
          title: "Purpose evidence should be current",
          body: "Old contracts and dormant company records may establish history, but the application should also show what work and income continue during the planned stay.",
        },
      },
      {
        heading: "Make financial evidence readable",
        paragraphs: [
          "Use the financial form and period requested by the portal. Provide complete statements with account holder, dates, currency, and transaction history visible. If funds are held across several accounts, explain the role of each account rather than uploading an unexplained stack.",
          "For salary, connect employer records to deposits. For freelance income, connect contracts and invoices to receipts. For founders, distinguish business balances from personal funds available for the stay. Large recent transfers should be sourced.",
          "Where the mission requests a particular balance or evidence period, meet that instruction directly. A different type of wealth may be impressive but still fail to answer the stated requirement.",
        ],
      },
      {
        heading: "Prepare uploads as if a stranger will review them quickly",
        paragraphs: [
          "Use descriptive filenames, legible scans, correct orientation, and reasonable file sizes. Combine related pages in a logical order. Do not hide key information behind password-protected files or screenshots with cropped names and dates.",
          "Create an index outside the portal before uploading. Mark each official requirement, the filename that answers it, and any explanatory note. This prevents last-minute substitutions and makes it easier to respond if the mission asks for more evidence.",
        ],
        bullets: [
          "Passport biodata and requested travel-history pages.",
          "Proof of current location or lawful residence where requested.",
          "Financial evidence in the exact form and period requested.",
          "Employment, freelance, company, portfolio, or activity evidence matched to the chosen category.",
          "Accommodation, travel, or insurance evidence when shown by the workflow.",
          "Certified translations for documents not accepted in their original language.",
        ],
      },
      {
        heading: "Plan for questions after submission",
        paragraphs: [
          "Monitor the email address and portal account used for filing. A request for additional evidence often has a deadline. Keep the source documents available so a clearer copy or updated statement can be produced quickly.",
          "Do not change the professional story casually after submission. If the employer, company, or financial position changes materially, answer truthfully and provide updated evidence. Contradictory responses are more damaging than a well-explained change.",
          "Processing times vary. Avoid non-refundable travel, housing, and school commitments that depend on approval by a specific date.",
        ],
      },
      {
        heading: "How to evaluate Thailand against another destination",
        paragraphs: [
          "Compare more than validity and entry structure. Look at work restrictions, tax-residence exposure, healthcare, insurance, family needs, city-level air quality, time zones, and whether the route supports the applicant's long-term goals.",
          "Thailand may be compelling for cost, infrastructure, food, transport, and regional access. It may be less suitable for someone who needs a direct permanent-residence path, local employment flexibility, or one universal document checklist across every embassy.",
        ],
      },
    ],
    checklist: [
      "Confirm which Thai mission is responsible for the application.",
      "Open the official DTV category after selecting the correct passport and location context.",
      "Save a dated copy of the mission-specific upload list.",
      "Prepare current professional evidence that explains foreign remote work.",
      "Reconcile financial documents to salary, client, or business records.",
      "Use legible, clearly named, correctly oriented files.",
      "Do not assume permission for Thai employment or local-client work.",
      "Monitor the portal and email for time-sensitive additional requests.",
    ],
    faq: [
      { question: "Is every DTV checklist the same?", answer: "No. The official workflow and responsible mission can request documents based on passport, residence, and filing location. Use the list displayed for your application." },
      { question: "Can I use a social-media checklist?", answer: "Use it only to understand another person's experience. Build the actual file from the official Thailand eVisa portal and responsible mission." },
      { question: "Does DTV automatically permit work for Thai employers?", answer: "Do not assume it does. A plan involving Thai employment or local clients needs confirmation from an official source or qualified professional." },
      { question: "What makes remote-work evidence stronger?", answer: "Current contracts or employer records, a clear description of online duties, company or client details, and matching financial receipts." },
      { question: "Should I book flights before approval?", answer: "Avoid non-refundable commitments that depend on a guaranteed decision date. Mission workload and additional requests can affect timing." },
    ],
    sources: [
      { label: "Official Thailand eVisa - Destination Thailand Visa", url: thailandSource },
      { label: "Official Thailand eVisa portal", url: "https://www.thaievisa.go.th/" },
    ],
  },

  "malta-nomad-residence-permit-official-guide": {
    reviewedDate: "2026-06-30",
    directAnswer:
      "Malta's Nomad Residence Permit can suit third-country remote employees, freelancers, and business owners whose work and income remain connected outside Malta. Its appeal is practical - English-language administration, an EU island base, and a formal residence program - but a credible application still needs stable qualifying work, the current income threshold, appropriate insurance and accommodation, and a realistic family budget.",
    takeaways: [
      "Use Residency Malta Agency as the controlling program source and recheck its current threshold, fees, and forms before filing.",
      "Employees, freelancers, and owners should document different income structures rather than use one generic proof bundle.",
      "Housing, insurance, and dependent costs can materially change the affordability calculation.",
      "Foreign remote work does not automatically settle Maltese tax residence or permit local employment.",
      "A complete application should be easy to audit from professional relationship to bank receipt.",
    ],
    quickFacts: [
      { label: "Program", value: "Malta Nomad Residence Permit" },
      { label: "Best fit", value: "Established remote professionals with foreign work and stable income" },
      { label: "Administration", value: "Residency Malta Agency" },
      { label: "Cost caution", value: "Housing, insurance, schools, and island logistics" },
      { label: "Rule to verify", value: "Current gross-income threshold and dependent requirements" },
    ],
    comparison: {
      heading: "How applicant profiles should prove remote work",
      headers: ["Profile", "Evidence focus", "Frequent weakness"],
      rows: [
        ["Employee", "Foreign employer, active contract, remote permission, salary receipts", "Employer letter does not authorize work from Malta"],
        ["Freelancer", "Foreign clients, service agreements, invoices, continuity, receipts", "Many invoices but no clear recurring client base"],
        ["Business owner", "Foreign company ownership, active operations, contracts, personal income", "Company turnover is presented as if it were personal income"],
      ],
    },
    sections: [
      {
        heading: "Decide whether Malta fits the work and the budget",
        paragraphs: [
          "Malta is often shortlisted for English-language administration, Mediterranean access, and a formal nomad program. Those benefits can justify a higher monthly budget for some applicants, but they should be weighed against rent, insurance, transport, and family costs before the permit process begins.",
          "Start with two independent tests. The immigration test asks whether the applicant has qualifying foreign remote work and reaches the current official threshold. The practical test asks whether the remaining income supports the actual household after rent and required expenses.",
          "Do not use the minimum threshold as a recommended lifestyle budget. A household can satisfy the formal amount while finding the chosen area, school, or insurance plan unaffordable.",
        ],
      },
      {
        heading: "Document the foreign work relationship",
        paragraphs: [
          "Remote employees should obtain a letter that identifies the foreign employer, role, compensation, employment duration, and permission to perform the job remotely from Malta. It should match the contract, payslips, and bank deposits.",
          "Freelancers should show a stable professional activity through current agreements, invoices, and receipts. If the work is project-based, explain the recent history and expected continuation. Owners should show the company is active and that personal income is available to the applicant.",
          "Keep Maltese local work separate from the nomad narrative. If the plan includes local employment, local clients, or a Maltese business operation, confirm the appropriate authorization rather than assuming the nomad permit covers it.",
        ],
      },
      {
        heading: "Treat income, cash flow, and savings as different evidence",
        paragraphs: [
          "Income evidence demonstrates qualifying earnings. Cash-flow evidence shows those earnings reaching the applicant. Savings demonstrate reserves. Each can strengthen a file, but one should not be relabeled as another.",
          "Prepare the period requested by the current official checklist. Reconcile salary or invoice records to statements, explain currency conversions, and distinguish company revenue from personal gross income. If compensation recently changed, document when and why.",
          "For a family, calculate any official additions and then build a separate living-cost budget. Include deposits, temporary accommodation, school fees, insurance premiums, document legalization, and travel.",
        ],
        callout: {
          title: "Verify the current threshold at the point of application",
          body: "Program thresholds and fee schedules can change. Use the Residency Malta page and current application documents instead of an amount copied from an older comparison article.",
        },
      },
      {
        heading: "Insurance and accommodation are substantive, not decorative",
        paragraphs: [
          "Insurance should meet the program's current coverage wording for the applicant and any dependents. Compare exclusions, geographic limits, deductibles, and start date rather than buying the cheapest certificate available.",
          "Accommodation evidence should match the intended household and period. Before signing a lease, understand whether the application needs a final agreement, preliminary booking, or later proof. Avoid a non-refundable commitment that assumes approval or a fixed processing date.",
          "Island housing markets can vary sharply by location and season. Research commute, noise, transport, school access, and summer pricing in addition to the advertised monthly rent.",
        ],
      },
      {
        heading: "Prepare a family file, not an attachment to the main file",
        paragraphs: [
          "Each dependent may require identity, relationship, insurance, background, consent, and financial evidence. Build a separate checklist for every person and a family summary that shows how the records connect.",
          "Check whether civil documents require apostille, legalization, certified copies, or translation. Track issue dates and validity. For children, consider passport renewal, parental consent, custody records, and school admission timing.",
          "A partner's ability to work locally is a separate legal question. Do not assume dependent status includes unrestricted employment rights.",
        ],
      },
      {
        heading: "Keep immigration and tax analysis separate",
        paragraphs: [
          "A residence permit answers an immigration question. Tax residence depends on time, facts, treaties, source rules, employer structure, and other connections. Malta-specific treatment and obligations elsewhere should be reviewed before a long stay.",
          "Founders should pay particular attention to where a company is effectively managed. Employees should ask whether working from Malta creates employer registration or payroll issues. Freelancers should consider VAT and business-presence questions where relevant.",
          "The right professional advice depends on the work structure. A generic promise of tax efficiency is not a substitute for personal analysis.",
        ],
      },
      {
        heading: "What a high-quality application looks like",
        paragraphs: [
          "A reviewer can identify the applicant, understand the foreign work, follow income into the applicant's account, confirm insurance and accommodation, and verify every family relationship without reconstructing the story from scattered files.",
          "Use a document index, descriptive filenames, complete scans, and a concise cover note. Check current forms and fees immediately before submission, and keep the submitted version for later residence and renewal steps.",
        ],
      },
    ],
    checklist: [
      "Recheck the current Residency Malta threshold, fees, forms, and eligibility categories.",
      "Choose the employee, freelance, or owner evidence track.",
      "Reconcile professional records to personal income receipts.",
      "Build a household budget separate from the formal income threshold.",
      "Confirm insurance wording, exclusions, and dates for every applicant.",
      "Check accommodation evidence before signing a non-refundable lease.",
      "Prepare authenticated and translated family documents where required.",
      "Obtain tax and employer-structure advice for the intended length of stay.",
    ],
    faq: [
      { question: "Is Malta suitable for employees, freelancers, and founders?", answer: "The program can cover different remote-work profiles, but each must use the current official eligibility category and evidence that matches how the income is earned." },
      { question: "Should I rely on a threshold shown in an article?", answer: "Use third-party figures for initial comparison only. Confirm the current amount and definition on the Residency Malta page before filing." },
      { question: "Can savings replace qualifying income?", answer: "Do not assume they can. Savings may support the overall financial picture, but the official program's current income rule controls." },
      { question: "Can dependents join?", answer: "Malta's program can be family-relevant, but relationship evidence, income additions, insurance, fees, and work rights should be checked individually." },
      { question: "Does the permit make all remote income tax free?", answer: "No. Immigration permission and tax treatment are separate. Obtain advice based on residence length, income source, employer or company structure, and treaty position." },
    ],
    sources: [
      { label: "Residency Malta Agency - Nomad Residence Permit", url: maltaSource },
      { label: "Residency Malta Agency", url: "https://residencymalta.gov.mt/" },
    ],
  },

  "how-to-check-official-digital-nomad-visa-sources": {
    reviewedDate: "2026-06-30",
    directAnswer:
      "The safest visa-research method is to use third-party articles for orientation and official government, immigration, embassy, consular, or eVisa pages for decisions. Record the exact source, filing location, date checked, and wording for each material rule. Then separate stable program facts from changeable thresholds, fees, forms, and appointment instructions.",
    takeaways: [
      "A government domain is useful, but the page must also apply to the correct route and filing location.",
      "National law, ministry guidance, consular instructions, and an application portal can answer different parts of the same process.",
      "Income thresholds, fees, insurance wording, forms, and document validity are moving facts that should be rechecked before payment and filing.",
      "Save a source trail so a later update can be compared against the version used to prepare the file.",
      "When two official sources conflict, use the more specific authority for the filing step and request clarification for any eligibility issue.",
    ],
    quickFacts: [
      { label: "Best starting source", value: "National immigration authority or foreign affairs visa portal" },
      { label: "Operational source", value: "The embassy, consulate, or eVisa mission receiving the file" },
      { label: "Recheck moments", value: "Before paying, booking, filing, traveling, and responding to a request" },
      { label: "Evidence to save", value: "URL, page title, date checked, PDF or screenshot, and exact quoted requirement" },
      { label: "Conflict rule", value: "Prefer the source with authority over the applicant's exact filing step" },
    ],
    comparison: {
      heading: "A practical source hierarchy",
      headers: ["Source", "Best use", "Main limitation"],
      rows: [
        ["Law or regulation", "Legal basis and formal definitions", "May not explain the filing workflow in plain language"],
        ["National ministry or immigration portal", "Eligibility, route purpose, and national document baseline", "May defer operational details to consulates"],
        ["Responsible embassy or consulate", "Jurisdiction, appointments, local forms, copies, and authentication", "Can lag behind a newer national change"],
        ["Official eVisa portal", "Live application categories and upload requirements", "Instructions may appear only after profile and location choices"],
        ["Professional or editorial guide", "Context, comparisons, and preparation strategy", "Not the final authority for a legal requirement"],
      ],
    },
    sections: [
      {
        heading: "Define the exact question before searching",
        paragraphs: [
          "A search for 'Portugal digital nomad visa' mixes several questions: who qualifies, which national-visa category applies, how much income is required, which consulate has jurisdiction, what documents are needed, and what happens after arrival. One page may not answer all of them.",
          "Write the question in operational form. For example: 'Which documents does the Portuguese consulate responsible for a Pakistani national lawfully residing in the UAE require for remote professional activity in July 2026?' This makes source relevance easier to judge.",
          "Record nationality, country of lawful residence, intended route, employee or self-employed status, family composition, and planned filing date. These facts determine which official page is relevant.",
        ],
      },
      {
        heading: "Verify authority, scope, and date",
        paragraphs: [
          "Authority asks who published the page. Scope asks whether it covers the correct route, applicant, and filing location. Date asks whether the information is current enough for a moving requirement. All three are necessary.",
          "A genuine government page can still be irrelevant if it describes a tourist visa, a different consulate, or an older program. A current consular page can be operationally useful but incomplete on the national legal basis. Use sources together rather than forcing one page to answer every question.",
          "Inspect the domain carefully. Follow links from the government's main site when possible. Be cautious with copied PDFs, unofficial translation sites, advertising pages designed to resemble government portals, and search snippets without context.",
        ],
        callout: {
          title: "Official does not always mean applicable",
          body: "A page can be authentic and still answer the wrong route, nationality, consulate, or date. Relevance is as important as domain authority.",
        },
      },
      {
        heading: "Separate stable facts from moving facts",
        paragraphs: [
          "Stable facts often include the legal name and broad purpose of a route, whether it is intended for foreign remote work, and whether local employment is restricted. They still deserve verification, but they usually change less often.",
          "Moving facts include income formulas, converted thresholds, fees, processing notices, forms, appointment providers, insurance language, document validity, accepted payment methods, and portal upload limits. Recheck these close to the filing date.",
          "Some facts move indirectly. Portugal's remote-work threshold is linked to minimum remuneration, so an unchanged legal formula can produce a new amount. Currency conversion can also make a stable local-currency requirement look different in USD.",
        ],
      },
      {
        heading: "Build a one-page source record for each country",
        paragraphs: [
          "Create a table with the question, exact answer, source title, URL, authority, filing location, date checked, and a short note. Save a PDF or screenshot of material instructions when allowed. Do not rely on browser bookmarks alone because URLs and pages can change.",
          "Copy only the short wording needed to preserve the requirement and keep the full source link. Mark interpretation separately from quotation. For example, 'official formula: four minimum remunerations' is a source fact; 'planning estimate in USD' is an editorial calculation.",
          "When a source changes, compare the old and new text. A new layout or cookie banner is not a visa-rule change. Confirm whether the altered content affects eligibility, evidence, cost, timing, or procedure before updating guidance.",
        ],
        bullets: [
          "Route name and official category.",
          "Applicant profile and foreign-work definition.",
          "Income formula, evidence period, and currency.",
          "Family eligibility and financial additions.",
          "Local-work restrictions.",
          "Required forms, documents, authentication, and translations.",
          "Filing authority, jurisdiction, appointment provider, and fee.",
          "Last checked date and unresolved questions.",
        ],
      },
      {
        heading: "Resolve conflicts between official pages",
        paragraphs: [
          "First check whether the pages describe the same route and applicant. Second check publication or update dates. Third identify which authority controls the disputed step. A national ministry may control eligibility while a consulate controls appointment copies and local submission format.",
          "For a material conflict, do not choose the answer you prefer. Contact the responsible authority in writing, keep the response, and phrase any public guidance conservatively until the conflict is resolved. If the issue can determine eligibility or tax, seek qualified professional advice.",
          "A lack of response is not confirmation. The safe editorial wording is 'the sources conflict' or 'the filing post should confirm,' not a confident unsupported rule.",
        ],
      },
      {
        heading: "Use blogs, communities, and AI for the right jobs",
        paragraphs: [
          "Editorial guides are valuable for comparison, document organization, worked examples, and identifying questions a government page does not explain. Communities are useful for appointment experiences, local logistics, and discovering where instructions are confusing. AI can help summarize and structure a checklist.",
          "None should be the final authority for eligibility, work rights, tax treatment, or a current fee. Verify every material claim against the official source. Ask whether the article links directly to the authority and states when the information was checked.",
          "A polished page can still be outdated. A personal success story proves that one person succeeded under one set of facts, not that the same documents will work for another applicant.",
        ],
      },
      {
        heading: "Recheck at decision points, not only once",
        paragraphs: [
          "Recheck before paying a government or service-provider fee, booking an appointment, ordering time-sensitive certificates, signing a lease, submitting the application, traveling, and responding to additional requests. These are points where stale information becomes expensive.",
          "After arrival, use official residence, registration, tax, and renewal sources. A visa approval does not freeze the rules for later stages. Keep the same source-record discipline through residence-card collection and renewal.",
        ],
      },
    ],
    checklist: [
      "Write the exact route, nationality, lawful-residence country, and filing location.",
      "Find the national immigration or foreign affairs source.",
      "Find the responsible embassy, consulate, or eVisa mission instructions.",
      "Record authority, scope, page title, URL, and date checked.",
      "Separate source wording from your own calculation or interpretation.",
      "Save material instructions and note unresolved conflicts.",
      "Recheck moving facts immediately before payment and filing.",
      "Use qualified advice for unresolved eligibility, work-right, or tax questions.",
    ],
    faq: [
      { question: "Is a government website always the final source?", answer: "It is the strongest starting point, but the page must apply to the correct route and filing location. A responsible consulate or live eVisa workflow may control operational details." },
      { question: "What if the ministry and consulate disagree?", answer: "Check dates and scope, then ask which authority controls the disputed step. Preserve the response and avoid presenting an unresolved conflict as settled." },
      { question: "How often should I recheck a visa requirement?", answer: "Recheck at each expensive or irreversible decision point: payment, appointment, document ordering, filing, travel, and renewal." },
      { question: "Can I trust an article with many official links?", answer: "Links improve transparency but do not guarantee the interpretation is correct or current. Open the sources and compare the article's claim with the official wording." },
      { question: "What should I save from an official page?", answer: "Save the URL, page title, authority, date checked, relevant short wording, and a PDF or screenshot of material instructions when appropriate." },
    ],
    sources: [
      { label: "Portugal Ministry of Foreign Affairs - Temporary-stay visa documentation", url: portugalSource },
      { label: "Spanish Consulate - Digital Nomad Visa guidance", url: spainSource },
      { label: "Croatian Ministry of the Interior - Digital nomads", url: croatiaSource },
      { label: "Republic of Estonia e-Residency - Visa comparison", url: estoniaSource },
      { label: "Official Thailand eVisa portal", url: "https://www.thaievisa.go.th/" },
    ],
  },

  "digital-nomad-visa-income-proof-guide": {
    reviewedDate: "2026-06-30",
    directAnswer:
      "Strong income proof does four jobs: it identifies the legal source of earnings, shows the work qualifies for the visa, demonstrates that money is recurring, and connects the stated income to deposits the applicant can actually use. Bank statements alone often prove only that money moved. Contracts alone prove only that an agreement exists. A persuasive file reconciles the two.",
    takeaways: [
      "Use the official route's definition of income and evidence period before choosing documents.",
      "Employees, freelancers, and founders should not submit identical proof bundles.",
      "Connect each material receipt to a payslip, invoice, contract, platform report, or company record.",
      "Distinguish gross income, net income, company turnover, savings, loans, and transfers between your own accounts.",
      "A short reconciliation schedule and factual cover note can make a complex income stream understandable.",
    ],
    quickFacts: [
      { label: "Best evidence", value: "Documents that connect legal source, qualifying work, and actual receipt" },
      { label: "Most common weakness", value: "Large balances or deposits with no documented source" },
      { label: "Employee focus", value: "Employment continuity, remote permission, salary, and deposits" },
      { label: "Freelancer focus", value: "Client continuity, contracts, invoices, and matching receipts" },
      { label: "Founder focus", value: "Active company, ownership, business activity, and personal income" },
    ],
    comparison: {
      heading: "Income evidence by applicant profile",
      headers: ["Profile", "Primary documents", "Add context for"],
      rows: [
        ["Employee", "Contract, employer letter, payslips, statements", "Remote permission, salary changes, bonuses, or probation"],
        ["Freelancer", "Client contracts, invoices, statements, tax or platform records", "Multiple clients, irregular timing, retainers, and foreign-source work"],
        ["Founder", "Company registration, ownership, accounts, contracts, personal statements", "Difference between turnover, profit, salary, dividends, and owner draws"],
        ["Mixed income", "Separate evidence package for each source", "Which sources the official rule permits and how the total is calculated"],
      ],
    },
    sections: [
      {
        heading: "Begin with the official income definition",
        paragraphs: [
          "Before downloading statements, identify whether the official rule uses gross income, net income, salary, average monthly income, annual income, financial resources, savings, or a combination. These terms are not interchangeable.",
          "Also identify the evidence period. Portugal's official temporary-stay page, for example, asks for average monthly income over the previous three months for remote professional activity. Another country may ask for a longer history, a current balance, or an annual tax record.",
          "Record whether dependents increase the requirement and whether currency conversion is addressed. This source note becomes the calculation rule for the file.",
        ],
        callout: {
          title: "Do not reverse-engineer the rule from your documents",
          body: "Choose documents that answer the official requirement. Do not choose the most impressive documents first and then reinterpret the requirement so they appear sufficient.",
        },
      },
      {
        heading: "Employee files should show continuity and permission",
        paragraphs: [
          "An employee's evidence usually begins with the signed contract and a current employer letter. The letter should identify the employer, applicant, role, start date, compensation, continuing employment, and permission to work remotely from the destination when relevant.",
          "Payslips should match salary deposits. If the net deposit differs because of tax, insurance, exchange, or deductions, the payslip should make the bridge understandable. If compensation changed recently, include the amendment and enough history to show whether the new amount is established.",
          "Bonuses and commissions may be genuine income but not always stable. Present base compensation separately and explain variable elements. Avoid counting reimbursements or transfers from the employer that are not earnings.",
        ],
        bullets: [
          "Current signed employment contract and amendments.",
          "Employer confirmation of role, salary, tenure, and remote arrangement.",
          "Payslips for the official evidence period.",
          "Complete bank statements showing matching deposits.",
          "Tax or social-insurance records when requested or helpful.",
        ],
      },
      {
        heading: "Freelancers need a client and payment map",
        paragraphs: [
          "Freelance income is often strong but administratively noisy. Build a schedule listing each material client, country, service, contract period, invoice numbers, invoice dates, currency, and matching receipt dates.",
          "Retainers are easier to understand than isolated projects, but project income can still show continuity when the history is documented. Explain payment delays, platform fees, partial payments, and deposits that combine several invoices.",
          "If the route requires mostly foreign clients, identify client location from the agreement or business record. A payment processor's country does not necessarily establish the client's location.",
        ],
      },
      {
        heading: "Founders must bridge company activity to personal support",
        paragraphs: [
          "A company bank account with substantial revenue does not automatically prove the owner has qualifying personal income. Show company registration and ownership, then explain whether the applicant receives salary, dividends, distributions, or another lawful payment.",
          "Use accounts, payroll records, board resolutions, dividend vouchers, tax documents, and personal bank receipts as appropriate. Keep terminology consistent with the company's jurisdiction and actual accounting treatment.",
          "Avoid presenting loans, capital contributions, or transfers between the applicant's own accounts as new income. If the business is young, provide contracts and current operations evidence, but understand that projected revenue may not replace the historical period required by the visa.",
        ],
      },
      {
        heading: "Create a reconciliation schedule",
        paragraphs: [
          "A reconciliation schedule is a simple table, not a rewritten bank statement. List the date, payer, source document, gross amount, deductions or platform fees, net deposit, currency, and statement page. Total only the amounts allowed by the official rule.",
          "When currencies differ, use one reputable exchange-rate source and state the rate date or method. Do not switch rates month by month solely to maximize the result. Keep a buffer above the threshold because exchange rates and interpretation can move.",
          "Attach the schedule as an index and retain the unedited source records behind it. A reviewer should be able to verify every line.",
        ],
      },
      {
        heading: "Use a cover note when the evidence is not self-explanatory",
        paragraphs: [
          "A cover note should identify the applicant profile, summarize the work relationship, state the official income rule, explain the evidence period, show the calculation, and point to exhibits. It should be factual and short enough to guide rather than overwhelm.",
          "Explain only real complexities: multiple currencies, a trading name, a recent employer merger, platform payment timing, mixed salary and dividends, or a contract renewal. Do not use the note to make unsupported legal arguments or conceal a gap.",
        ],
        bullets: [
          "One sentence describing the qualifying remote work.",
          "One sentence identifying the official threshold and evidence period.",
          "A small income table with source-document references.",
          "A short explanation of any genuine inconsistency.",
          "A list of exhibits in the order submitted.",
        ],
      },
      {
        heading: "Red flags to resolve before filing",
        paragraphs: [
          "Unexplained cash deposits, recent loans, circular transfers, cropped statements, missing account-holder names, unsigned contracts, invoices with no receipts, receipts with no invoices, and company revenue presented as personal salary all invite questions.",
          "Other risks are structural: an employer will not authorize overseas remote work, clients are located in the destination when local work is restricted, or income reaches the threshold only after counting a source the official rule does not recognize.",
          "Resolve documentary gaps with better evidence. Resolve structural gaps by reconsidering the route or obtaining qualified advice. Formatting cannot turn ineligible work into eligible work.",
        ],
      },
      {
        heading: "Worked example: a freelancer with three clients",
        paragraphs: [
          "Assume a consultant has two monthly retainers and one project client. The consultant should provide the retainer agreements, project statement of work, invoices for the requested period, platform or payment records, and bank statements. The schedule should show each invoice and the net amount received after fees.",
          "If one project invoice was issued in March but paid in April, the note should explain whether the official rule and consulate assess invoiced income, received income, or another measure. The applicant should not silently move the payment into the month that produces the best average.",
          "The lesson is not a universal calculation. It is transparent treatment. Use the official definition, disclose timing, and let the records support the result.",
        ],
      },
    ],
    checklist: [
      "Copy the official income definition, period, currency rule, and dependent additions.",
      "Choose the evidence track that matches employee, freelance, founder, or mixed income.",
      "Use complete statements with account holder, period, currency, and transaction details.",
      "Connect each material receipt to its legal source document.",
      "Separate recurring earnings from savings, loans, transfers, and reimbursements.",
      "Reconcile foreign currencies with a stated method and sensible buffer.",
      "Prepare a concise cover note and document index for complex income.",
      "Resolve substantive eligibility gaps before paying application costs.",
    ],
    faq: [
      { question: "How many months of statements do I need?", answer: "Use the period stated by the current official source or responsible consulate. Do not assume one country's three-month rule applies to another route." },
      { question: "Can savings replace monthly income?", answer: "Only when the official route allows savings or general financial resources to satisfy the requirement. Otherwise savings may support but not replace recurring qualifying income." },
      { question: "Can a founder count company revenue?", answer: "Company turnover is not automatically personal income. Show the lawful method by which company activity produces salary, dividends, distributions, or other personal support." },
      { question: "Should I highlight transactions on statements?", answer: "Use an index or reconciliation schedule and, if accepted, a clearly marked copy. Keep the complete unedited statement available so the original record remains verifiable." },
      { question: "What if my income is irregular?", answer: "Present the full requested period, explain seasonality or payment timing, and calculate using the official method. Do not omit weak months or count unsupported future revenue." },
      { question: "Is a cover note required?", answer: "Not always, but it can help when income involves multiple clients, currencies, payment platforms, company ownership, or a recent documented change." },
    ],
    sources: [
      { label: "Portugal Ministry of Foreign Affairs - Remote professional activity evidence", url: portugalSource },
      { label: "Spanish Consulate - Digital Nomad Visa guidance", url: spainSource },
      { label: "Croatian Ministry of the Interior - Digital nomad guidance", url: croatiaSource },
    ],
  },
};

export function getRichBlogArticle(slug: string) {
  return richBlogArticles[slug];
}

export function getRichArticleReadTime(slug: string, fallback: string) {
  const article = getRichBlogArticle(slug);

  if (!article) return fallback;

  const text = [
    article.directAnswer,
    ...article.takeaways,
    ...article.quickFacts.flatMap((item) => [item.label, item.value]),
    ...(article.comparison?.rows.flat() ?? []),
    ...article.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.bullets ?? []),
      section.callout?.title ?? "",
      section.callout?.body ?? "",
    ]),
    ...article.checklist,
    ...article.faq.flatMap((item) => [item.question, item.answer]),
  ].join(" ");
  const words = text.trim().split(/\s+/).length;

  return `${Math.max(1, Math.ceil(words / 210))} min read`;
}
