export const CASES = [
  {
    id: "case-judge-001",
    role: "judge",
    difficulty: 1,

    title: {
      pashto: "د پور د بېرته ورکولو قضیه",
      dari: "قضیه بازپرداخت قرض",
      english: "The Loan Repayment Case"
    },

    story: {
      pashto:
        "احمد ادعا کوي چې بلال ترې ۵۰،۰۰۰ افغانۍ پور اخیستی و او د ټاکلې نېټې له تېرېدو وروسته یې پیسې بېرته نه دي ورکړې. بلال مني چې پیسې یې اخیستې وې، خو وايي چې د بېرته ورکولو لپاره یې لا اضافي وخت غوښتل.",
      dari:
        "احمد ادعا می‌کند که بلال مبلغ ۵۰٬۰۰۰ افغانی از او قرض گرفته و پس از رسیدن موعد آن را پرداخت نکرده است. بلال گرفتن پول را می‌پذیرد، اما می‌گوید برای پرداخت به زمان اضافی نیاز داشته است.",
      english:
        "Ahmad claims that Bilal borrowed 50,000 Afghanis and failed to repay the amount after the agreed date. Bilal admits receiving the money but says he needed additional time to repay it."
    },

    people: [
      {
        id: "person-001",
        name: {
          pashto: "احمد",
          dari: "احمد",
          english: "Ahmad"
        },
        role: {
          pashto: "مدعي",
          dari: "مدعی",
          english: "Claimant"
        },
        statement: {
          pashto:
            "ما بلال ته پیسې ورکړې وې او د بېرته ورکولو ټاکلې نېټه هم معلومه وه.",
          dari:
            "من پول را به بلال دادم و موعد بازپرداخت نیز مشخص بود.",
          english:
            "I gave the money to Bilal and the repayment date was agreed."
        }
      },
      {
        id: "person-002",
        name: {
          pashto: "بلال",
          dari: "بلال",
          english: "Bilal"
        },
        role: {
          pashto: "مدعي علیه",
          dari: "مدعی علیه",
          english: "Defendant"
        },
        statement: {
          pashto:
            "ما پیسې اخیستې وې، خو د کاروبار د ستونزې له امله مې په ټاکلې نېټه ونه شوای ورکولی.",
          dari:
            "من پول را گرفته بودم، اما به دلیل مشکل کاری نتوانستم در موعد تعیین‌شده پرداخت کنم.",
          english:
            "I received the money, but due to a business problem I could not repay it on the agreed date."
        }
      }
    ],

    evidence: [
      {
        id: "evidence-001",
        type: "document",
        title: {
          pashto: "د پور لیکلی سند",
          dari: "سند کتبی قرض",
          english: "Written Loan Document"
        },
        content: {
          pashto:
            "په سند کې د ۵۰،۰۰۰ افغانیو د پور اندازه او د بېرته ورکولو نېټه لیکل شوې ده.",
          dari:
            "در سند مبلغ ۵۰٬۰۰۰ افغانی و تاریخ بازپرداخت درج شده است.",
          english:
            "The document records the 50,000 Afghanis loan and the repayment date."
        }
      },
      {
        id: "evidence-002",
        type: "statement",
        title: {
          pashto: "د شاهد بیان",
          dari: "اظهارات شاهد",
          english: "Witness Statement"
        },
        content: {
          pashto:
            "شاهد وايي چې د پور د پیسو د سپارلو پر مهال حاضر و.",
          dari:
            "شاهد می‌گوید هنگام تحویل پول قرض حضور داشته است.",
          english:
            "The witness states that they were present when the money was handed over."
        }
      }
    ],

    legalIssue: {
      pashto:
        "ایا د موجودو معلوماتو او شواهدو پر بنسټ د پور د بېرته ورکولو ادعا ثابتېدای شي؟",
      dari:
        "آیا بر اساس معلومات و شواهد موجود، ادعای بازپرداخت قرض قابل اثبات است؟",
      english:
        "Can the repayment claim be established based on the available information and evidence?"
    },

    tasks: {
      judge: {
        pashto:
          "شواهد وارزوه، د دواړو خواوو خبرې پرتله کړه، حقوقي موضوع مشخصه کړه او خپل مستدل نظر ثبت کړه.",
        dari:
          "شواهد را ارزیابی کن، اظهارات طرفین را مقایسه کن، موضوع حقوقی را مشخص و نظر مستدل خود را ثبت کن.",
        english:
          "Evaluate the evidence, compare both parties' statements, identify the legal issue, and submit a reasoned opinion."
      },
      prosecutor: {
        pashto:
          "د موجودو معلوماتو پر بنسټ وڅېړه چې ایا د جزايي جرم نښې شته که موضوع حقوقي ماهیت لري.",
        dari:
          "بررسی کن که آیا نشانه‌ای از جرم جزایی وجود دارد یا موضوع ماهیت حقوقی دارد.",
        english:
          "Assess whether the facts indicate a criminal offense or whether the matter is primarily civil."
      },
      defense: {
        pashto:
          "د بلال د دفاع لپاره هغه ټکي ومومه چې د دعوې د ارزونې پر مهال باید په پام کې ونیول شي.",
        dari:
          "برای دفاع از بلال، نکاتی را شناسایی کن که هنگام بررسی دعوا باید مورد توجه قرار گیرد.",
        english:
          "Identify the points that should be considered when defending Bilal."
      }
    },

    evaluation: {
      requiredFacts: [
        "loan_amount",
        "repayment_date",
        "written_document",
        "witness_statement"
      ],
      requiredReasoning: [
        "evidence_based_analysis",
        "distinguish_civil_and_criminal_issue",
        "reasoned_conclusion"
      ],
      minimumCriteria: 2
    },

    hints: {
      first: {
        pashto:
          "لومړی وګوره چې کوم شواهد د پور د موجودیت او شرایطو ملاتړ کوي.",
        dari:
          "نخست بررسی کن کدام شواهد وجود و شرایط قرض را تأیید می‌کنند.",
        english:
          "First identify which evidence supports the existence and terms of the loan."
      },
      second: {
        pashto:
          "د پور موجودیت، ټاکلې نېټه او د شاهد بیان یو له بل سره پرتله کړه.",
        dari:
          "وجود قرض، موعد تعیین‌شده و اظهارات شاهد را با هم مقایسه کن.",
        english:
          "Compare the existence of the loan, the agreed date, and the witness statement."
      },
      third: {
        pashto:
          "خپل وروستی نظر باید د شواهدو پر بنسټ او په منطقي حقوقي استدلال ولاړ وي.",
        dari:
          "نظر نهایی باید بر اساس شواهد و استدلال منطقی حقوقی باشد.",
        english:
          "Your final opinion should be based on evidence and logical legal reasoning."
      }
    },

    completion: {
      minimumCriteria: 2,
      requiresFinalOpinion: true
    }
  },

  {
    id: "case-prosecutor-001",
    role: "prosecutor",
    difficulty: 1,

    title: {
      pashto: "د ورک شوي موبایل قضیه",
      dari: "قضیه موبایل گمشده",
      english: "The Missing Phone Case"
    },

    story: {
      pashto:
        "فرید وايي چې موبایل یې په یوه دفتر کې ورک شوی. نوموړي ادعا کړې چې وروستی ځل یې موبایل د دفتر پر مېز ایښی و. د دفتر د امنیتي ثبت له مخې څو کسان په هغه وخت کې دفتر ته داخل شوي وو.",
      dari:
        "فرید می‌گوید تلفن همراهش در یک دفتر گم شده است. او ادعا دارد که آخرین بار تلفن را روی میز دفتر گذاشته بود. ثبت امنیتی نشان می‌دهد چند نفر در همان زمان وارد دفتر شده بودند.",
      english:
        "Farid reports that his phone went missing in an office. He says he last placed it on a desk. Security records show that several people entered the office around that time."
    },

    people: [
      {
        id: "person-003",
        name: {
          pashto: "فرید",
          dari: "فرید",
          english: "Farid"
        },
        role: {
          pashto: "د مال خاوند",
          dari: "مالک مال",
          english: "Owner"
        },
        statement: {
          pashto:
            "ما موبایل پر مېز ایښی و، کله چې بېرته راغلم هلته نه و.",
          dari:
            "تلفن را روی میز گذاشته بودم، وقتی برگشتم دیگر آنجا نبود.",
          english:
            "I left the phone on the desk, and when I returned it was gone."
        }
      },
      {
        id: "person-004",
        name: {
          pashto: "کریم",
          dari: "کریم",
          english: "Karim"
        },
        role: {
          pashto: "د دفتر کارکوونکی",
          dari: "کارمند دفتر",
          english: "Office employee"
        },
        statement: {
          pashto:
            "ما موبایل نه دی لیدلی او نه پوهېږم چې څوک یې اخیستی.",
          dari:
            "من تلفن را ندیدم و نمی‌دانم چه کسی آن را برده است.",
          english:
            "I did not see the phone and do not know who took it."
        }
      }
    ],

    evidence: [
      {
        id: "evidence-003",
        type: "record",
        title: {
          pashto: "امنیتي ثبت",
          dari: "ثبت امنیتی",
          english: "Security Record"
        },
        content: {
          pashto:
            "ثبت ښيي چې د موبایل د ورکېدو په احتمالي وخت کې څو کسان دفتر ته داخل شوي وو.",
          dari:
            "ثبت نشان می‌دهد که در زمان احتمالی گم‌شدن موبایل چند نفر وارد دفتر شده بودند.",
          english:
            "The record shows that several people entered the office around the likely time of the disappearance."
        }
      }
    ],

    legalIssue: {
      pashto:
        "ایا موجود شواهد د یوه مشخص شخص پر وړاندې د جزايي ادعا د جوړولو لپاره کافي دي؟",
      dari:
        "آیا شواهد موجود برای ایجاد ادعای جزایی علیه یک شخص مشخص کافی است؟",
      english:
        "Are the available facts sufficient to establish a criminal allegation against a specific person?"
    },

    tasks: {
      judge: {
        pashto:
          "د شواهدو بې طرفانه ارزونه وکړه.",
        dari:
          "شواهد را به صورت بی‌طرفانه ارزیابی کن.",
        english:
          "Evaluate the evidence impartially."
      },
      prosecutor: {
        pashto:
          "موجود شواهد تحلیل کړه او مشخص کړه چې د تعقیب لپاره کوم عناصر باید ثابت شي.",
        dari:
          "شواهد موجود را تحلیل کن و مشخص کن که برای تعقیب چه عناصر باید اثبات شوند.",
        english:
          "Analyze the available evidence and identify what elements would need to be established for prosecution."
      },
      defense: {
        pashto:
          "د هر احتمالي تور د کمزورو ټکو تحلیل وکړه.",
        dari:
          "نقاط ضعیف هر ادعای احتمالی را تحلیل کن.",
        english:
          "Analyze the weaknesses of any potential allegation."
      }
    },

    evaluation: {
      requiredFacts: [
        "missing_property",
        "uncertain_identity",
        "security_record"
      ],
      requiredReasoning: [
        "evidence_sufficiency",
        "avoid_unproven_accusation",
        "logical_analysis"
      ],
      minimumCriteria: 2
    },

    hints: {
      first: {
        pashto:
          "یوازې دا چې یو شخص په ځای کې موجود و، د هغه د جرم ثبوت نه جوړوي.",
        dari:
          "صرف حضور یک شخص در محل، به تنهایی اثبات جرم نیست.",
        english:
          "Mere presence at the location does not by itself establish guilt."
      },
      second: {
        pashto:
          "د مشخص شخص د تړلو لپاره کوم مستقیم یا غیرمستقیم شواهد شته؟",
        dari:
          "آیا برای ارتباط دادن یک شخص مشخص با رویداد، شواهد مستقیم یا غیرمستقیم وجود دارد؟",
        english:
          "Ask whether there is direct or indirect evidence connecting a specific person to the event."
      },
      third: {
        pashto:
          "وروستی نظر باید د موجودو شواهدو د قوت او کمزورۍ پر تحلیل ولاړ وي.",
        dari:
          "نظر نهایی باید بر تحلیل قوت و ضعف شواهد موجود استوار باشد.",
        english:
          "The final opinion should assess the strengths and weaknesses of the available evidence."
      }
    },

    completion: {
      minimumCriteria: 2,
      requiresFinalOpinion: true
    }
  },

  {
    id: "case-defense-001",
    role: "defense",
    difficulty: 1,

    title: {
      pashto: "د تړون د اختلاف قضیه",
      dari: "قضیه اختلاف قراردادی",
      english: "The Contract Dispute Case"
    },

    story: {
      pashto:
        "حامد ادعا کوي چې ناصر د یوه لیکلي تړون له مخې باید یو کار بشپړ کړی وای، خو کار په ټاکلې موده کې بشپړ نه شو. ناصر وايي چې د کار د ځنډ علت هغه معلومات وو چې حامد باید مخکې ورکړي وای.",
      dari:
        "حامد ادعا می‌کند که ناصر مطابق یک قرارداد کتبی باید کاری را تکمیل می‌کرد، اما کار در زمان تعیین‌شده تکمیل نشد. ناصر می‌گوید دلیل تأخیر، معلوماتی بوده که حامد باید قبلاً ارائه می‌کرد.",
      english:
        "Hamed claims that Nasir was required by a written contract to complete work within a specified period, but the work was not completed on time. Nasir says the delay resulted from information Hamed was required to provide."
    },

    people: [
      {
        id: "person-005",
        name: {
          pashto: "حامد",
          dari: "حامد",
          english: "Hamed"
        },
        role: {
          pashto: "د تړون یو لوری",
          dari: "یک طرف قرارداد",
          english: "Contracting party"
        },
        statement: {
          pashto:
            "ما غوښتل چې کار په ټاکلې نېټه بشپړ شي، خو بشپړ نه شو.",
          dari:
            "من می‌خواستم کار در تاریخ تعیین‌شده تکمیل شود، اما تکمیل نشد.",
          english:
            "I expected the work to be completed by the agreed date, but it was not."
        }
      },
      {
        id: "person-006",
        name: {
          pashto: "ناصر",
          dari: "ناصر",
          english: "Nasir"
        },
        role: {
          pashto: "د تړون بل لوری",
          dari: "طرف دیگر قرارداد",
          english: "Other contracting party"
        },
        statement: {
          pashto:
            "د کار د بشپړولو لپاره اړین معلومات په وخت راته نه وو سپارل شوي.",
          dari:
            "معلومات لازم برای تکمیل کار به موقع در اختیار من قرار نگرفته بود.",
          english:
            "The information necessary to complete the work was not provided to me on time."
        }
      }
    ],

    evidence: [
      {
        id: "evidence-004",
        type: "contract",
        title: {
          pashto: "لیکلی تړون",
          dari: "قرارداد کتبی",
          english: "Written Contract"
        },
        content: {
          pashto:
            "تړون د کار موضوع او د بشپړولو ټاکلې موده مشخصوي.",
          dari:
            "قرارداد موضوع کار و مدت تعیین‌شده برای تکمیل آن را مشخص می‌کند.",
          english:
            "The contract identifies the work and the agreed completion period."
        }
      },
      {
        id: "evidence-005",
        type: "communication",
        title: {
          pashto: "د اړیکو ثبت",
          dari: "سوابق ارتباطی",
          english: "Communication Record"
        },
        content: {
          pashto:
            "د اړیکو له ثبت څخه ښکاري چې د اړینو معلوماتو د سپارلو په اړه خبرې شوې وې.",
          dari:
            "سوابق ارتباطی نشان می‌دهد که درباره ارائه اطلاعات لازم گفتگو شده بود.",
          english:
            "The communication record shows discussions about providing the required information."
        }
      }
    ],

    legalIssue: {
      pashto:
        "د مدافع له نظره باید وکتل شي چې ایا د ځنډ مسؤولیت په بشپړ ډول د ناصر پر غاړه دی که نور عوامل هم شته.",
      dari:
        "از دید دفاع باید بررسی شود که آیا مسئولیت تأخیر کاملاً بر عهده ناصر است یا عوامل دیگری نیز وجود دارد.",
      english:
        "From the defense perspective, determine whether Nasir bears full responsibility for the delay or whether other factors are relevant."
    },

    tasks: {
      judge: {
        pashto:
          "د دواړو لوریو شواهد او ادعاوې وارزوه.",
        dari:
          "شواهد و ادعاهای هر دو طرف را ارزیابی کن.",
        english:
          "Evaluate both parties' evidence and claims."
      },
      prosecutor: {
        pashto:
          "د موضوع حقوقي ماهیت تحلیل کړه.",
        dari:
          "ماهیت حقوقی موضوع را تحلیل کن.",
        english:
          "Analyze the legal nature of the matter."
      },
      defense: {
        pashto:
          "د ناصر د دفاع لپاره د تړون او اړیکو ثبت هغه ټکي پیدا کړه چې د ځنډ د علت په معلومولو کې مهم دي.",
        dari:
          "برای دفاع از ناصر، نکات مهم قرارداد و سوابق ارتباطی را که در تعیین علت تأخیر مؤثر است شناسایی کن.",
        english:
          "For Nasir's defense, identify the contract and communication points relevant to determining the cause of the delay."
      }
    },

    evaluation: {
      requiredFacts: [
        "contract_terms",
        "completion_deadline",
        "required_information",
        "communication_record"
      ],
      requiredReasoning: [
        "consider_both_sides",
        "causation_analysis",
        "evidence_based_defense"
      ],
      minimumCriteria: 2
    },

    hints: {
      first: {
        pashto:
          "د تړون شرایط او د کار د بشپړولو موده لومړی وګوره.",
        dari:
          "نخست شرایط قرارداد و مدت تکمیل کار را بررسی کن.",
        english:
          "First examine the contract terms and completion deadline."
      },
      second: {
        pashto:
          "وروسته وګوره چې اړین معلومات چا او کله باید سپارلي وای.",
        dari:
          "سپس بررسی کن که اطلاعات لازم را چه کسی و چه زمانی باید ارائه می‌کرد.",
        english:
          "Then determine who was required to provide the necessary information and when."
      },
      third: {
        pashto:
          "دفاع دې باید د موجودو شواهدو پر بنسټ د ځنډ د علت منطقي تحلیل وړاندې کړي.",
        dari:
          "دفاع باید بر اساس شواهد موجود، تحلیل منطقی علت تأخیر را ارائه کند.",
        english:
          "The defense should logically analyze the cause of the delay using the available evidence."
      }
    },

    completion: {
      minimumCriteria: 2,
      requiresFinalOpinion: true
    }
  }
];

export function getCaseById(caseId) {
  const id = String(caseId || "").trim();

  if (!id) {
    return null;
  }

  return (
    CASES.find(
      (item) =>
        String(item.id) === id
    ) || null
  );
}

export function getCasesByRole(role) {
  const cleanRole =
    String(role || "").trim();

  if (!cleanRole) {
    return [];
  }

  return CASES.filter(
    (item) =>
      item.role === cleanRole
  );
}

export function getCasesByDifficulty(
  difficulty
) {
  const cleanDifficulty =
    Number(difficulty);

  if (!Number.isFinite(cleanDifficulty)) {
    return [];
  }

  return CASES.filter(
    (item) =>
      Number(item.difficulty) ===
      cleanDifficulty
  );
}

export function getCaseTask(
  caseData,
  role
) {
  if (!caseData) {
    return null;
  }

  const cleanRole =
    String(role || "").trim();

  return (
    caseData.tasks?.[cleanRole] ||
    null
  );
}

export function getCaseTitle(
  caseData,
  language = "pashto"
) {
  return (
    caseData?.title?.[language] ||
    caseData?.title?.pashto ||
    caseData?.title?.dari ||
    caseData?.title?.english ||
    ""
  );
}

export function getCaseStory(
  caseData,
  language = "pashto"
) {
  return (
    caseData?.story?.[language] ||
    caseData?.story?.pashto ||
    caseData?.story?.dari ||
    caseData?.story?.english ||
    ""
  );
}

export function getCaseLegalIssue(
  caseData,
  language = "pashto"
) {
  return (
    caseData?.legalIssue?.[language] ||
    caseData?.legalIssue?.pashto ||
    caseData?.legalIssue?.dari ||
    caseData?.legalIssue?.english ||
    ""
  );
}

export function getCaseCompletionRules(
  caseData
) {
  return {
    minimumCriteria:
      Number(
        caseData?.completion
          ?.minimumCriteria
      ) ||
      Number(
        caseData?.evaluation
          ?.minimumCriteria
      ) ||
      1,

    requiresFinalOpinion:
      caseData?.completion
        ?.requiresFinalOpinion !== false
  };
}