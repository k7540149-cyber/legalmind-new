const terminology = [
  {
    id: "term-001",
    category: "عمومي حقوق",
    ps: {
      term: "قانون",
      definition: "هغه الزامي قواعد چې د دولت له خوا وضع او تطبیقېږي.",
      explanation: "قانون خلکو او ادارو ته حقوق او مکلفیتونه ټاکي.",
      example: "د جزا قانون د جرمونو او مجازاتو قواعد ټاکي."
    },
    fa: {
      term: "قانون",
      definition: "مجموعه قواعد الزام‌آوری که توسط دولت وضع و اجرا می‌شود.",
      explanation: "قانون حقوق و مکلفیت‌های اشخاص و نهادها را مشخص می‌کند.",
      example: "قانون جزا برای جرایم و مجازات‌ها قواعد تعیین می‌کند."
    },
    en: {
      term: "Law",
      definition: "Binding rules established and enforced by the state.",
      explanation: "Law defines rights and obligations.",
      example: "Criminal law defines offenses and penalties."
    }
  },

  {
    id: "term-002",
    category: "عمومي حقوق",
    ps: {
      term: "حق",
      definition: "هغه قانوني واک یا امتیاز چې قانون یې شخص ته ورکوي.",
      explanation: "حق شخص ته اجازه ورکوي چې د قانون په حدودو کې د یوې ګټې غوښتنه یا استفاده وکړي.",
      example: "هر شخص د خپل قانوني حق د غوښتلو حق لري."
    },
    fa: {
      term: "حق",
      definition: "اختیار یا امتیازی که قانون برای شخص به رسمیت می‌شناسد.",
      explanation: "شخص می‌تواند در حدود قانون از حق خود استفاده کند.",
      example: "هر شخص حق دارد حق قانونی خود را مطالبه کند."
    },
    en: {
      term: "Right",
      definition: "A legal entitlement or power recognized by law.",
      explanation: "A right allows a person to claim or enjoy a lawful interest.",
      example: "A person may claim a legal right."
    }
  },

  {
    id: "term-003",
    category: "عمومي حقوق",
    ps: {
      term: "مکلفیت",
      definition: "هغه قانوني دنده چې شخص یې ترسره کولو ته اړ وي.",
      explanation: "مکلفیت د قانون، قرارداد یا بل قانوني بنسټ له مخې رامنځته کېدای شي.",
      example: "د قرارداد اړخونه خپل قانوني مکلفیتونه لري."
    },
    fa: {
      term: "مکلفیت",
      definition: "وظیفه‌ای که شخص بر اساس قانون یا تعهد باید انجام دهد.",
      explanation: "مکلفیت ممکن است از قانون یا قرارداد ناشی شود.",
      example: "طرفین قرارداد مکلفیت‌های قانونی دارند."
    },
    en: {
      term: "Obligation",
      definition: "A legal duty that a person is required to perform.",
      explanation: "An obligation may arise from law or contract.",
      example: "Contracting parties have legal obligations."
    }
  },

  {
    id: "term-004",
    category: "عمومي حقوق",
    ps: {
      term: "مسؤولیت",
      definition: "د قانون له مخې د خپل عمل یا مکلفیت د پایلو د منلو حالت.",
      explanation: "مسؤولیت مدني، جزايي یا بل قانوني ډول لرلی شي.",
      example: "د زیان رامنځته کوونکی شخص ممکن قانوني مسؤولیت ولري."
    },
    fa: {
      term: "مسؤولیت",
      definition: "تعهد شخص به پاسخ‌گویی در برابر پیامد عمل یا وظیفه قانونی.",
      explanation: "مسؤولیت می‌تواند مدنی یا جزایی باشد.",
      example: "عامل زیان ممکن مسؤولیت قانونی داشته باشد."
    },
    en: {
      term: "Liability",
      definition: "Legal responsibility for an act, omission, or obligation.",
      explanation: "Liability may be civil or criminal.",
      example: "A person causing damage may have legal liability."
    }
  },

  {
    id: "term-005",
    category: "عمومي حقوق",
    ps: {
      term: "قضیه",
      definition: "هغه قانوني موضوع یا شخړه چې د حقوقي ارزونې اړتیا ولري.",
      explanation: "قضیه کې واقعې، اړخونه، شواهد او قانوني مسئله موجوده وي.",
      example: "قاضي باید د قضیې ټول شواهد وارزوي."
    },
    fa: {
      term: "قضیه",
      definition: "موضوع یا اختلافی که نیاز به بررسی حقوقی داشته باشد.",
      explanation: "قضیه شامل وقایع، طرفین و موضوع حقوقی است.",
      example: "قاضی باید تمام شواهد قضیه را بررسی کند."
    },
    en: {
      term: "Case",
      definition: "A legal matter or dispute requiring legal determination.",
      explanation: "A case may involve facts, parties, evidence, and legal issues.",
      example: "The judge reviews the evidence in the case."
    }
  },

  {
    id: "term-006",
    category: "عمومي حقوق",
    ps: {
      term: "دعوه",
      definition: "د حق د ترلاسه کولو یا د قانوني شخړې د حل لپاره رسمي حقوقي غوښتنه.",
      explanation: "دعوه د حقوقي پروسې له لارې مطرح کېږي.",
      example: "مدعي د خپل حق د ترلاسه کولو لپاره دعوه وړاندې کړه."
    },
    fa: {
      term: "دعوا",
      definition: "درخواست رسمی برای مطالبه حق یا حل اختلاف حقوقی.",
      explanation: "دعوا از طریق روند قانونی مطرح می‌شود.",
      example: "مدعی برای مطالبه حق خود دعوا مطرح کرد."
    },
    en: {
      term: "Claim",
      definition: "A formal legal demand for a right or remedy.",
      explanation: "A claim may be brought through a legal proceeding.",
      example: "The claimant filed a claim for payment."
    }
  },

  {
    id: "term-007",
    category: "عمومي حقوق",
    ps: {
      term: "مدعي",
      definition: "هغه شخص چې په قضیه کې د یوه حق یا غوښتنې ادعا کوي.",
      explanation: "مدعي باید خپله قانوني ادعا د اړوندو شواهدو له لارې ثابت کړي.",
      example: "مدعي د خپل ادعا لپاره سند وړاندې کړ."
    },
    fa: {
      term: "مدعی",
      definition: "شخصی که ادعای یک حق یا مطالبه را مطرح می‌کند.",
      explanation: "مدعی باید ادعای خود را با دلایل مربوط اثبات کند.",
      example: "مدعی سند خود را ارائه کرد."
    },
    en: {
      term: "Claimant",
      definition: "A person who makes a legal claim.",
      explanation: "The claimant generally supports the claim with evidence.",
      example: "The claimant submitted a document."
    }
  },

  {
    id: "term-008",
    category: "عمومي حقوق",
    ps: {
      term: "مدعي علیه",
      definition: "هغه شخص چې د مدعي دعوه یا ادعا پرې شوې وي.",
      explanation: "مدعي علیه د خپلې دفاع او ځواب حق لري.",
      example: "مدعي علیه د دعوې په وړاندې دفاع وړاندې کړه."
    },
    fa: {
      term: "مدعی‌علیه",
      definition: "شخصی که ادعای حقوقی علیه او مطرح شده است.",
      explanation: "مدعی‌علیه حق پاسخ و دفاع دارد.",
      example: "مدعی‌علیه در برابر دعوا دفاع کرد."
    },
    en: {
      term: "Defendant",
      definition: "A person against whom a legal claim is brought.",
      explanation: "The defendant has the right to respond and defend.",
      example: "The defendant presented a defense."
    }
  },

  {
    id: "term-009",
    category: "عمومي حقوق",
    ps: {
      term: "طرفین",
      definition: "په یوه قضیه یا قرارداد کې ښکېل قانوني اړخونه.",
      explanation: "طرفین د دعوې یا حقوقي اړیکې اصلي ګډونوال وي.",
      example: "محکمې دواړو طرفینو ته د بیان فرصت ورکړ."
    },
    fa: {
      term: "طرفین",
      definition: "اشخاص یا نهادهای دخیل در یک دعوا یا قرارداد.",
      explanation: "طرفین مشارکت‌کنندگان اصلی رابطه حقوقی هستند.",
      example: "دادگاه به طرفین فرصت اظهارنظر داد."
    },
    en: {
      term: "Parties",
      definition: "The persons or entities involved in a legal matter.",
      explanation: "Parties are the main participants in a legal dispute or agreement.",
      example: "The court heard both parties."
    }
  },

  {
    id: "term-010",
    category: "محکمه",
    ps: {
      term: "محکمه",
      definition: "هغه رسمي قضايي مرجع چې حقوقي یا جزايي قضیې اوري او پرېکړه کوي.",
      explanation: "محکمه د قانون له مخې د قضیو د حل لپاره صلاحیت لري.",
      example: "قضیه محکمې ته وړاندې شوه."
    },
    fa: {
      term: "محکمه",
      definition: "مرجع رسمی قضایی برای رسیدگی و تصمیم‌گیری درباره قضایا.",
      explanation: "محکمه در حدود صلاحیت قانونی خود تصمیم می‌گیرد.",
      example: "قضیه به محکمه ارائه شد."
    },
    en: {
      term: "Court",
      definition: "A judicial body authorized to hear and decide legal matters.",
      explanation: "A court acts within its legal jurisdiction.",
      example: "The case was brought before the court."
    }
  },

  {
    id: "term-011",
    category: "محکمه",
    ps: {
      term: "قاضي",
      definition: "هغه قضايي شخص چې د قانون له مخې قضیه ارزوي او پرېکړه کوي.",
      explanation: "قاضي باید د قضیې واقعې او شواهد په بې‌طرفۍ وارزوي.",
      example: "قاضي د دواړو اړخونو خبرې واورېدې."
    },
    fa: {
      term: "قاضی",
      definition: "شخص دارای صلاحیت قضایی برای رسیدگی و تصمیم‌گیری.",
      explanation: "قاضی باید وقایع و شواهد را بی‌طرفانه بررسی کند.",
      example: "قاضی اظهارات هر دو طرف را شنید."
    },
    en: {
      term: "Judge",
      definition: "A judicial officer who hears and decides cases.",
      explanation: "A judge evaluates facts and evidence impartially.",
      example: "The judge heard both sides."
    }
  },

  {
    id: "term-012",
    category: "محکمه",
    ps: {
      term: "صلاحیت",
      definition: "هغه قانوني واک چې یوه اداره یا محکمه یې د ځانګړې موضوع په اړه لري.",
      explanation: "صلاحیت موضوعي، محلي یا وظیفوي ډول لرلی شي.",
      example: "محکمې د قضیې د اورېدو صلاحیت وڅېړه."
    },
    fa: {
      term: "صلاحیت",
      definition: "اختیار قانونی یک مرجع برای رسیدگی به موضوع مشخص.",
      explanation: "صلاحیت می‌تواند موضوعی، محلی یا وظیفوی باشد.",
      example: "دادگاه صلاحیت رسیدگی را بررسی کرد."
    },
    en: {
      term: "Jurisdiction",
      definition: "Legal authority to hear and decide a matter.",
      explanation: "Jurisdiction may be based on subject, place, or function.",
      example: "The court examined its jurisdiction."
    }
  },

  {
    id: "term-013",
    category: "محکمه",
    ps: {
      term: "محکمه ابتدائیه",
      definition: "هغه محکمه چې د قانون له مخې د قضیې لومړنۍ قضايي رسیدګي ترسره کوي.",
      explanation: "د قضیې لومړنۍ پرېکړه معمولاً د همدې مرحلې له لارې ترسره کېږي.",
      example: "قضیه لومړی ابتدائیه محکمې ته وړاندې شوه."
    },
    fa: {
      term: "محکمه ابتدائیه",
      definition: "محکمه‌ای که رسیدگی اولیه قضایی را انجام می‌دهد.",
      explanation: "رسیدگی نخستین به بسیاری از قضایا در این مرحله انجام می‌شود.",
      example: "قضیه ابتدا به محکمه ابتدائیه رفت."
    },
    en: {
      term: "Trial Court",
      definition: "A court that conducts the initial judicial proceedings.",
      explanation: "It generally makes the first judicial determination.",
      example: "The case was first heard by the trial court."
    }
  },

  {
    id: "term-014",
    category: "محکمه",
    ps: {
      term: "استیناف",
      definition: "د لومړۍ پرېکړې د بیاکتنې لپاره د قانون له مخې د اعتراض قضايي مرحله.",
      explanation: "استیناف محکمه د قانوني غوښتنې او د قضیې د ثبت شوو مواردو له مخې بیاکتنه کوي.",
      example: "اړخ د ابتدائیه پرېکړې پر وړاندې استیناف وکړ."
    },
    fa: {
      term: "استیناف",
      definition: "مرحله‌ای برای بررسی دوباره تصمیم محکمه نخستین.",
      explanation: "تصمیم مورد اعتراض در حدود قانون بررسی می‌شود.",
      example: "طرف نسبت به تصمیم ابتدائیه استیناف کرد."
    },
    en: {
      term: "Appeal",
      definition: "A legal process for reviewing a lower court decision.",
      explanation: "An appeal challenges a decision within legal limits.",
      example: "The party filed an appeal."
    }
  },

  {
    id: "term-015",
    category: "محکمه",
    ps: {
      term: "فیصله",
      definition: "د محکمې رسمي پرېکړه د یوې قضیې په اړه.",
      explanation: "فیصله باید د قضیې پر واقعو، شواهدو او قانون ولاړه وي.",
      example: "محکمې خپله فیصله صادره کړه."
    },
    fa: {
      term: "فیصله",
      definition: "تصمیم رسمی محکمه درباره یک قضیه.",
      explanation: "تصمیم باید بر اساس قانون، وقایع و شواهد باشد.",
      example: "محکمه فیصله خود را صادر کرد."
    },
    en: {
      term: "Judgment",
      definition: "A formal decision of a court on a case.",
      explanation: "A judgment should be based on law, facts, and evidence.",
      example: "The court issued its judgment."
    }
  },

  {
    id: "term-016",
    category: "محکمه",
    ps: {
      term: "قرار",
      definition: "د قضايي مرجع هغه رسمي تصمیم چې د قضیې د بهیر په جریان کې صادرېږي.",
      explanation: "قرار ممکن د قضیې د یوې اجرایي یا پروسیجري موضوع په اړه وي.",
      example: "محکمې د یوې پروسیجري موضوع په اړه قرار صادر کړ."
    },
    fa: {
      term: "قرار",
      definition: "تصمیم رسمی قضایی درباره یک موضوع در جریان رسیدگی.",
      explanation: "قرار می‌تواند مربوط به یک موضوع اجرایی یا شکلی باشد.",
      example: "محکمه درباره موضوع شکلی قرار صادر کرد."
    },
    en: {
      term: "Order",
      definition: "A formal judicial decision concerning a matter during proceedings.",
      explanation: "An order may address a procedural or other legal issue.",
      example: "The court issued a procedural order."
    }
  },

  {
    id: "term-017",
    category: "محکمه",
    ps: {
      term: "محاکمه",
      definition: "د قضیې د اورېدو او حقوقي ارزونې رسمي قضايي بهیر.",
      explanation: "په محاکمه کې اړخونه، شواهد او قانوني استدلال ارزول کېږي.",
      example: "محاکمه د شواهدو له ارزونې سره دوام وکړ."
    },
    fa: {
      term: "محاکمه",
      definition: "روند رسمی رسیدگی قضایی به یک قضیه.",
      explanation: "در محاکمه شواهد و استدلال‌های طرفین بررسی می‌شود.",
      example: "محاکمه با بررسی شواهد ادامه یافت."
    },
    en: {
      term: "Trial",
      definition: "A formal judicial proceeding for determining a case.",
      explanation: "The trial examines evidence and legal arguments.",
      example: "The trial continued with evidence review."
    }
  },

  {
    id: "term-018",
    category: "محکمه",
    ps: {
      term: "دفاع",
      definition: "هغه حقوقي دریځ او اقدامات چې د تورن یا مدعي علیه د حقونو د ساتنې لپاره ترسره کېږي.",
      explanation: "دفاع د شواهدو، قانوني استدلال او اعتراض له لارې ترسره کېدای شي.",
      example: "مدافع د دفاع لپاره قانوني دلایل وړاندې کړل."
    },
    fa: {
      term: "دفاع",
      definition: "اقدامات و استدلال‌های حقوقی برای حمایت از متهم یا مدعی‌علیه.",
      explanation: "دفاع می‌تواند بر اساس شواهد و استدلال قانونی باشد.",
      example: "وکیل دلایل دفاع را ارائه کرد."
    },
    en: {
      term: "Defense",
      definition: "Legal arguments and actions used to protect a defendant's rights.",
      explanation: "Defense may rely on evidence and legal reasoning.",
      example: "The lawyer presented the defense."
    }
  },

  {
    id: "term-019",
    category: "حقوقي اشخاص",
    ps: {
      term: "مدافع وکیل",
      definition: "هغه حقوقي مسلکي شخص چې د خپل موکل د حقوقو او قانوني ګټو دفاع کوي.",
      explanation: "مدافع وکیل د قانون په حدودو کې د موکل استازیتوب کوي.",
      example: "مدافع وکیل د موکل دفاع وړاندې کړه."
    },
    fa: {
      term: "وکیل مدافع",
      definition: "شخص متخصص حقوقی که از حقوق و منافع قانونی موکل دفاع می‌کند.",
      explanation: "وکیل مدافع در حدود قانون از موکل نمایندگی می‌کند.",
      example: "وکیل مدافع دفاع موکل را ارائه کرد."
    },
    en: {
      term: "Defense Lawyer",
      definition: "A legal professional who represents and defends a client.",
      explanation: "The lawyer protects the client's legal interests within the law.",
      example: "The defense lawyer represented the client."
    }
  },

  {
    id: "term-020",
    category: "حقوقي اشخاص",
    ps: {
      term: "څارنوال",
      definition: "هغه قانوني مسلکي شخص چې د قانون له مخې د جرمونو د تعقیب او عامه ګټو د ساتنې دنده لري.",
      explanation: "څارنوال د شواهدو پر بنسټ قانوني دعوه یا نظر وړاندې کوي.",
      example: "څارنوال شواهد محکمې ته وړاندې کړل."
    },
    fa: {
      term: "څارنوال",
      definition: "شخص حقوقی مسئول تعقیب جرایم و حمایت از منافع عمومی در حدود قانون.",
      explanation: "څارنوال بر اساس شواهد اقدام قانونی می‌کند.",
      example: "څارنوال شواهد را به محکمه ارائه کرد."
    },
    en: {
      term: "Prosecutor",
      definition: "A legal officer responsible for prosecuting offenses under the law.",
      explanation: "A prosecutor presents a case based on evidence.",
      example: "The prosecutor presented the evidence."
    }
  },

  {
    id: "term-021",
    category: "حقوقي اشخاص",
    ps: {
      term: "وکیل",
      definition: "هغه شخص چې د قانون له مخې د بل شخص استازیتوب یا وکالت کوي.",
      explanation: "وکیل ممکن د موکل په استازیتوب حقوقي اقدامات ترسره کړي.",
      example: "وکیل د خپل موکل په استازیتوب حاضر شو."
    },
    fa: {
      term: "وکیل",
      definition: "شخصی که از جانب دیگری نمایندگی یا وکالت می‌کند.",
      explanation: "وکیل می‌تواند اقدامات حقوقی را به نمایندگی از موکل انجام دهد.",
      example: "وکیل به نمایندگی از موکل حاضر شد."
    },
    en: {
      term: "Attorney",
      definition: "A person authorized to represent another in legal matters.",
      explanation: "An attorney may act on behalf of a client.",
      example: "The attorney represented the client."
    }
  },

  {
    id: "term-022",
    category: "حقوق جزا",
    ps: {
      term: "جرم",
      definition: "هغه عمل یا ترک عمل چې قانون یې جرم بللی او قانوني جزا ورته ټاکل شوې وي.",
      explanation: "د جرم قانوني عناصر باید د نافذ قانون له مخې موجود وي.",
      example: "د جرم د اثبات لپاره قانوني عناصر باید وڅېړل شي."
    },
    fa: {
      term: "جرم",
      definition: "عمل یا ترک عملی که قانون آن را جرم دانسته و برای آن مجازات تعیین کرده باشد.",
      explanation: "عناصر قانونی جرم باید بررسی شود.",
      example: "عناصر جرم باید اثبات شود."
    },
    en: {
      term: "Crime",
      definition: "An act or omission defined as an offense by law.",
      explanation: "The legal elements of the offense must be established.",
      example: "The elements of the crime must be proven."
    }
  },

  {
    id: "term-023",
    category: "حقوق جزا",
    ps: {
      term: "جزا",
      definition: "هغه قانوني پایله یا مجازات چې د جرم د ارتکاب په صورت کې د قانون له مخې ټاکل کېږي.",
      explanation: "جزا باید د نافذ قانون پر بنسټ وي.",
      example: "محکمه د قانون له مخې جزا وټاکله."
    },
    fa: {
      term: "مجازات",
      definition: "پیامد قانونی که برای ارتکاب جرم توسط قانون تعیین می‌شود.",
      explanation: "مجازات باید بر اساس قانون نافذ تعیین شود.",
      example: "دادگاه مجازات را مطابق قانون تعیین کرد."
    },
    en: {
      term: "Punishment",
      definition: "A legal consequence imposed for an offense.",
      explanation: "Punishment must have a legal basis.",
      example: "The court imposed the punishment according to law."
    }
  },

  {
    id: "term-024",
    category: "حقوق جزا",
    ps: {
      term: "تورن",
      definition: "هغه شخص چې د جرم د ارتکاب په اړه پرې قانوني تور یا ادعا مطرح شوې وي.",
      explanation: "تورن تر هغه مجرم نه ګڼل کېږي څو قانوني پروسه یې مسؤولیت ثابت نه کړي.",
      example: "تورن د خپل وکیل په حضور کې دفاع وکړه."
    },
    fa: {
      term: "متهم",
      definition: "شخصی که ارتکاب جرم به او نسبت داده شده است.",
      explanation: "متهم تا زمان اثبات مسؤولیت طبق روند قانونی مجرم تلقی نمی‌شود.",
      example: "متهم با حضور وکیل دفاع کرد."
    },
    en: {
      term: "Accused",
      definition: "A person alleged to have committed an offense.",
      explanation: "An accused person is subject to legal proceedings before responsibility is established.",
      example: "The accused appeared with a lawyer."
    }
  },

  {
    id: "term-025",
    category: "حقوق جزا",
    ps: {
      term: "مجرم",
      definition: "هغه شخص چې د قانوني پروسې له مخې د جرم مسؤولیت یې ثابت شوی وي.",
      explanation: "د مجرمیت تثبیت باید د قانوني اصولو له رعایت سره ترسره شي.",
      example: "محکمې د قانوني دلایلو له ارزونې وروسته مسؤولیت تثبیت کړ."
    },
    fa: {
      term: "مجرم",
      definition: "شخصی که مسؤولیت او در ارتکاب جرم طبق روند قانونی ثابت شده باشد.",
      explanation: "اثبات مسؤولیت باید مطابق اصول قانونی انجام شود.",
      example: "مسؤولیت شخص پس از بررسی دلایل ثابت شد."
    },
    en: {
      term: "Offender",
      definition: "A person whose responsibility for an offense has been legally established.",
      explanation: "Responsibility must be established through lawful proceedings.",
      example: "The court established responsibility after reviewing evidence."
    }
  },

  {
    id: "term-026",
    category: "حقوق جزا",
    ps: {
      term: "قصد جرمي",
      definition: "هغه ذهني اراده چې د جرم د اړوند عمل د ترسره کولو پر مهال موجوده وي.",
      explanation: "قصد د ځینو جرمونو د قانوني عناصرو برخه کېدای شي.",
      example: "محکمې د تورن قصد د شواهدو له مخې وڅېړه."
    },
    fa: {
      term: "قصد جرمی",
      definition: "اراده ذهنی مرتبط با ارتکاب عمل مجرمانه.",
      explanation: "در برخی جرایم قصد یکی از عناصر قانونی است.",
      example: "دادگاه قصد متهم را بررسی کرد."
    },
    en: {
      term: "Criminal Intent",
      definition: "The mental intention associated with committing an offense.",
      explanation: "Intent can be an element of certain offenses.",
      example: "The court examined the accused's intent."
    }
  },

  {
    id: "term-027",
    category: "حقوق جزا",
    ps: {
      term: "عمد",
      definition: "د یو عمل د ترسره کولو قصدي او ارادي حالت.",
      explanation: "عمد د قانون له مخې په ځینو جرمونو کې مهم عنصر دی.",
      example: "څارنوال باید د عمد اړوند شواهد وارزوي."
    },
    fa: {
      term: "عمد",
      definition: "انجام آگاهانه و ارادی یک عمل.",
      explanation: "عمد در برخی جرایم عنصر مهم قانونی است.",
      example: "شواهد مربوط به عمد بررسی شد."
    },
    en: {
      term: "Intentional Act",
      definition: "A deliberate and voluntary act.",
      explanation: "Intentional conduct may be legally significant in an offense.",
      example: "Evidence of intentional conduct was examined."
    }
  },

  {
    id: "term-028",
    category: "حقوق جزا",
    ps: {
      term: "غفلت",
      definition: "د لازمې پاملرنې نه کول چې د قانوني پایلې یا زیان سبب شي.",
      explanation: "غفلت د ځانګړو قانوني شرایطو له مخې مسؤولیت رامنځته کولی شي.",
      example: "د پېښې علت د غفلت له احتمال سره وڅېړل شو."
    },
    fa: {
      term: "غفلت",
      definition: "خودداری نکردن از مراقبت لازم که موجب پیامد یا زیان شود.",
      explanation: "غفلت در شرایط قانونی مشخص می‌تواند مسؤولیت ایجاد کند.",
      example: "احتمال غفلت بررسی شد."
    },
    en: {
      term: "Negligence",
      definition: "Failure to exercise required care resulting in a legal consequence or harm.",
      explanation: "Negligence may create liability under applicable law.",
      example: "The possibility of negligence was examined."
    }
  },

  {
    id: "term-029",
    category: "حقوق جزا",
    ps: {
      term: "شریک جرم",
      definition: "هغه شخص چې د جرم په ترسره کولو کې له بل کس سره ګډه ونډه ولري.",
      explanation: "د هر شخص مسؤولیت د هغه د قانوني ونډې له مخې ارزول کېږي.",
      example: "د دواړو کسانو ونډه په جلا ډول وڅېړل شوه."
    },
    fa: {
      term: "شریک جرم",
      definition: "شخصی که در ارتکاب جرم همراه شخص دیگر نقش داشته باشد.",
      explanation: "مسؤولیت هر شخص بر اساس نقش قانونی او بررسی می‌شود.",
      example: "نقش هر دو شخص جداگانه بررسی شد."
    },
    en: {
      term: "Co-offender",
      definition: "A person who participates with another in committing an offense.",
      explanation: "Responsibility depends on the person's legally relevant role.",
      example: "Each person's role was separately examined."
    }
  },

  {
    id: "term-030",
    category: "حقوق جزا",
    ps: {
      term: "معاونت",
      definition: "د جرم په ترسره کولو کې د بل شخص مرسته یا اسانتیا برابرول.",
      explanation: "د معاونت قانوني شرایط باید د اړوند قانون له مخې ثابت شي.",
      example: "محکمې د جرم په ترسره کولو کې د مرستې ادعا وڅېړله."
    },
    fa: {
      term: "معاونت",
      definition: "کمک یا فراهم‌کردن تسهیلات برای ارتکاب جرم توسط دیگری.",
      explanation: "شرایط قانونی معاونت باید اثبات شود.",
      example: "دادگاه ادعای کمک در جرم را بررسی کرد."
    },
    en: {
      term: "Aiding",
      definition: "Providing assistance or facilitation for another person's offense.",
      explanation: "Legal requirements for aiding must be established.",
      example: "The court examined the alleged assistance."
    }
  },

  {
    id: "term-031",
    category: "حقوق جزا",
    ps: {
      term: "د جرم هڅه",
      definition: "د جرم د ترسره کولو په لور قصدي قانوني عمل چې جرم بشپړ نه شي.",
      explanation: "د هڅې شرایط د اړوند قانون له مخې ټاکل کېږي.",
      example: "محکمې وڅېړل چې عمل د جرم د هڅې شرایط پوره کوي که نه."
    },
    fa: {
      term: "شروع به جرم",
      definition: "اقدام عمدی برای ارتکاب جرم که جرم به طور کامل تحقق نیابد.",
      explanation: "شرایط آن مطابق قانون تعیین می‌شود.",
      example: "دادگاه بررسی کرد که عمل شرایط شروع به جرم را دارد یا خیر."
    },
    en: {
      term: "Attempt",
      definition: "An intentional act toward committing an offense that is not completed.",
      explanation: "Its legal requirements depend on applicable law.",
      example: "The court examined whether the conduct constituted an attempt."
    }
  },

  {
    id: "term-032",
    category: "حقوق جزا",
    ps: {
      term: "د جرم مادي عنصر",
      definition: "د جرم هغه ښکاره او واقعي برخه چې عمل یا پایله پکې شاملېږي.",
      explanation: "د جرم مادي عنصر د قانوني جرم د جوړښت مهمه برخه ده.",
      example: "څارنوال د جرم مادي عنصر په شواهدو ثابت کړ."
    },
    fa: {
      term: "عنصر مادی جرم",
      definition: "بخش عینی جرم که شامل رفتار یا نتیجه قابل اثبات است.",
      explanation: "عنصر مادی یکی از بخش‌های ساختار جرم است.",
      example: "عنصر مادی با شواهد بررسی شد."
    },
    en: {
      term: "Actus Reus",
      definition: "The objective conduct or result forming part of an offense.",
      explanation: "It is an important component of many crimes.",
      example: "The prosecutor examined the objective conduct."
    }
  },

  {
    id: "term-033",
    category: "حقوق جزا",
    ps: {
      term: "د جرم معنوي عنصر",
      definition: "د جرم هغه ذهني اړخ چې قصد، پوهه یا اړوند ذهني حالت پکې شامل وي.",
      explanation: "د جرم معنوي عنصر د جرم له ډول سره تړاو لري.",
      example: "محکمې د تورن ذهني حالت وڅېړه."
    },
    fa: {
      term: "عنصر معنوی جرم",
      definition: "بخش ذهنی جرم مانند قصد یا آگاهی مرتبط با عمل.",
      explanation: "عنصر معنوی بر اساس نوع جرم بررسی می‌شود.",
      example: "دادگاه وضعیت ذهنی متهم را بررسی کرد."
    },
    en: {
      term: "Mens Rea",
      definition: "The mental element associated with an offense.",
      explanation: "It may include intent, knowledge, or another required mental state.",
      example: "The court examined the accused's mental state."
    }
  },

  {
    id: "term-034",
    category: "حقوق جزا",
    ps: {
      term: "جزايي مسؤولیت",
      definition: "د جرم د قانوني شرایطو د پوره کېدو په صورت کې د شخص قانوني مسؤولیت.",
      explanation: "جزايي مسؤولیت د نافذ قانون او ثابتو عناصرو پر بنسټ ارزول کېږي.",
      example: "محکمې د تورن جزايي مسؤولیت وڅېړه."
    },
    fa: {
      term: "مسؤولیت جزایی",
      definition: "مسؤولیت قانونی شخص در صورت تحقق شرایط جرم.",
      explanation: "مسؤولیت جزایی بر اساس قانون نافذ بررسی می‌شود.",
      example: "دادگاه مسؤولیت جزایی متهم را بررسی کرد."
    },
    en: {
      term: "Criminal Liability",
      definition: "Legal responsibility for an offense when its required elements are established.",
      explanation: "It is determined according to applicable criminal law.",
      example: "The court examined criminal liability."
    }
  },

  {
    id: "term-035",
    category: "حقوق جزا",
    ps: {
      term: "تبرئه",
      definition: "د قانوني پروسې له مخې د تورن د جرم نه ثابتېدل او له مسؤولیت څخه خلاصېدل.",
      explanation: "تبرئه هغه وخت مطرح کېږي چې قانوني معیارونه د مجرمیت لپاره پوره نه شي.",
      example: "د کافي شواهدو د نشتوالي له امله تورن تبرئه شو."
    },
    fa: {
      term: "تبرئه",
      definition: "تصمیم قانونی مبنی بر اثبات‌نشدن جرم یا مسؤولیت متهم.",
      explanation: "وقتی شرایط اثبات مسؤولیت فراهم نشود، تبرئه ممکن است مطرح شود.",
      example: "به دلیل نبود شواهد کافی، متهم تبرئه شد."
    },
    en: {
      term: "Acquittal",
      definition: "A legal determination that criminal responsibility has not been established.",
      explanation: "It may result when the required proof is insufficient.",
      example: "The accused was acquitted for lack of sufficient evidence."
    }
  },

  {
    id: "term-036",
    category: "حقوق جزا",
    ps: {
      term: "محکومیت",
      definition: "د قانوني پروسې له مخې د شخص د مسؤولیت رسمي تثبیت.",
      explanation: "محکومیت باید د قانون او ثابتو شواهدو پر بنسټ وي.",
      example: "محکمې د شواهدو له ارزونې وروسته محکومیت صادر کړ."
    },
    fa: {
      term: "محکومیت",
      definition: "اثبات رسمی مسؤولیت شخص از طریق روند قانونی.",
      explanation: "محکومیت باید بر اساس قانون و شواهد باشد.",
      example: "دادگاه پس از بررسی شواهد حکم محکومیت صادر کرد."
    },
    en: {
      term: "Conviction",
      definition: "A formal legal determination of criminal responsibility.",
      explanation: "A conviction must be based on law and sufficient proof.",
      example: "The court entered a conviction after reviewing the evidence."
    }
  },

  {
    id: "term-037",
    category: "شواهد",
    ps: {
      term: "دلیل",
      definition: "هغه قانوني معلومات یا مواد چې د یوې ادعا یا واقعې د ثابتولو لپاره کارېږي.",
      explanation: "دلیل باید د قانون له مخې د ارزونې وړ وي.",
      example: "څارنوال د خپلې ادعا لپاره دلیل وړاندې کړ."
    },
    fa: {
      term: "دلیل",
      definition: "اطلاعات یا مواد قانونی که برای اثبات ادعا یا واقعیت استفاده می‌شود.",
      explanation: "دلیل باید مطابق قانون قابل ارزیابی باشد.",
      example: "څارنوال دلیل خود را ارائه کرد."
    },
    en: {
      term: "Evidence",
      definition: "Lawful information or material used to prove a fact or claim.",
      explanation: "Evidence must be legally assessable.",
      example: "The prosecutor presented evidence."
    }
  },

  {
    id: "term-038",
    category: "شواهد",
    ps: {
      term: "ثبوت",
      definition: "هغه شواهد او قانوني معلومات چې د یوې ادعا د ثابتولو لپاره بسنه وکړي.",
      explanation: "ثبوت د قضیې د واقعو په ارزونه کې مهم رول لري.",
      example: "محکمې د ثبوت ټول موارد وارزول."
    },
    fa: {
      term: "اثبات",
      definition: "شواهد و اطلاعات قانونی که برای ثابت‌کردن یک ادعا کافی باشد.",
      explanation: "اثبات در تعیین واقعیت قضیه اهمیت دارد.",
      example: "دادگاه دلایل اثبات را بررسی کرد."
    },
    en: {
      term: "Proof",
      definition: "Evidence sufficient to establish a fact or claim.",
      explanation: "Proof helps determine the facts of a case.",
      example: "The court reviewed the proof."
    }
  },

  {
    id: "term-039",
    category: "شواهد",
    ps: {
      term: "شاهد",
      definition: "هغه شخص چې د یوې پېښې یا موضوع په اړه معلومات یا لیدلې واقعه بیانوي.",
      explanation: "د شاهد بیان باید د قضیې له نورو شواهدو سره وارزول شي.",
      example: "شاهد د پېښې په اړه خپل بیان ورکړ."
    },
    fa: {
      term: "شاهد",
      definition: "شخصی که درباره یک واقعه یا موضوع اطلاعات ارائه می‌کند.",
      explanation: "اظهارات شاهد باید با سایر شواهد ارزیابی شود.",
      example: "شاهد درباره حادثه اظهارات خود را بیان کرد."
    },
    en: {
      term: "Witness",
      definition: "A person who provides information about a relevant event or fact.",
      explanation: "Witness testimony should be assessed with other evidence.",
      example: "The witness gave a statement."
    }
  },

  {
    id: "term-040",
    category: "شواهد",
    ps: {
      term: "شهادت",
      definition: "د شاهد هغه بیان چې د قضیې د یوې واقعې یا موضوع په اړه وړاندې کېږي.",
      explanation: "شهادت د قضیې د نورو شواهدو ترڅنګ ارزول کېږي.",
      example: "محکمې د شاهد شهادت واورېد."
    },
    fa: {
      term: "شهادت",
      definition: "اظهارات شاهد درباره یک واقعیت یا موضوع مرتبط با قضیه.",
      explanation: "شهادت همراه با سایر شواهد ارزیابی می‌شود.",
      example: "دادگاه شهادت شاهد را شنید."
    },
    en: {
      term: "Testimony",
      definition: "A witness's statement about a relevant fact or event.",
      explanation: "Testimony is assessed with other evidence.",
      example: "The court heard the witness's testimony."
    }
  },

  {
    id: "term-041",
    category: "شواهد",
    ps: {
      term: "سند",
      definition: "هغه لیکلی یا ثبت شوی مواد چې د یوې حقوقي موضوع د اثبات لپاره کارېږي.",
      explanation: "سند باید د اعتبار او ارتباط له پلوه وارزول شي.",
      example: "قرارداد د قضیې مهم سند و."
    },
    fa: {
      term: "سند",
      definition: "مدرک مکتوب یا ثبت‌شده‌ای که برای اثبات موضوع حقوقی استفاده می‌شود.",
      explanation: "سند باید از نظر اعتبار و ارتباط بررسی شود.",
      example: "قرارداد سند مهم قضیه بود."
    },
    en: {
      term: "Document",
      definition: "A written or recorded item used to establish a legal matter.",
      explanation: "A document should be assessed for authenticity and relevance.",
      example: "The contract was an important document."
    }
  },

  {
    id: "term-042",
    category: "شواهد",
    ps: {
      term: "قرینه",
      definition: "هغه موجوده نښه یا حالت چې د یوې واقعې په اړه منطقي پایلې ته لار هواروي.",
      explanation: "قرینه باید د نورو شواهدو سره یوځای وارزول شي.",
      example: "د ځای نښې د پېښې په اړه قرینه وړاندې کړه."
    },
    fa: {
      term: "قرینه",
      definition: "نشانه یا وضعیتی که می‌تواند به یک نتیجه منطقی درباره واقعیت کمک کند.",
      explanation: "قرینه باید همراه سایر شواهد ارزیابی شود.",
      example: "نشانه‌های محل قرینه‌ای درباره حادثه ایجاد کرد."
    },
    en: {
      term: "Circumstantial Evidence",
      definition: "A fact or circumstance that supports a logical inference about another fact.",
      explanation: "It should be assessed with other evidence.",
      example: "The circumstances supported an inference."
    }
  },

  {
    id: "term-043",
    category: "شواهد",
    ps: {
      term: "اعتراف",
      definition: "د یوه شخص له خوا د یوې موضوع یا عمل په اړه څرګند منل.",
      explanation: "اعتراف باید د قانوني شرایطو له مخې وارزول شي.",
      example: "محکمې د اعتراف قانوني اعتبار وڅېړه."
    },
    fa: {
      term: "اعتراف",
      definition: "پذیرش صریح یک موضوع یا عمل توسط شخص.",
      explanation: "اعتراف باید طبق شرایط قانونی بررسی شود.",
      example: "دادگاه اعتبار قانونی اعتراف را بررسی کرد."
    },
    en: {
      term: "Admission",
      definition: "An explicit acceptance of a fact or conduct by a person.",
      explanation: "An admission must be assessed under applicable legal rules.",
      example: "The court examined the legal value of the admission."
    }
  },

  {
    id: "term-044",
    category: "شواهد",
    ps: {
      term: "بینه",
      definition: "هغه قانوني ثبوت یا شواهد چې د یوې دعوې د اثبات لپاره وړاندې کېږي.",
      explanation: "بینه باید د قضیې له موضوع سره تړاو ولري.",
      example: "مدعي د خپلې دعوې لپاره بینه وړاندې کړه."
    },
    fa: {
      term: "بینه",
      definition: "دلیل یا شواهدی که برای اثبات ادعا ارائه می‌شود.",
      explanation: "بینه باید با موضوع دعوا ارتباط داشته باشد.",
      example: "مدعی برای دعوای خود بینه ارائه کرد."
    },
    en: {
      term: "Proof/Evidence",
      definition: "Evidence presented to establish a legal claim.",
      explanation: "The evidence should be relevant to the claim.",
      example: "The claimant presented evidence."
    }
  },

  {
    id: "term-045",
    category: "شواهد",
    ps: {
      term: "د شواهد ارزونه",
      definition: "د قضیې د شواهدو د اعتبار، ارتباط او قوت حقوقي تحلیل.",
      explanation: "قاضي باید شواهد د منطقي او قانوني معیارونو له مخې وارزوي.",
      example: "قاضي د هر سند اعتبار وڅېړه."
    },
    fa: {
      term: "ارزیابی شواهد",
      definition: "بررسی اعتبار، ارتباط و قوت شواهد در قضیه.",
      explanation: "شواهد باید بر اساس معیارهای قانونی و منطقی ارزیابی شوند.",
      example: "قاضی اعتبار هر سند را بررسی کرد."
    },
    en: {
      term: "Evidence Assessment",
      definition: "Evaluation of the relevance, reliability, and strength of evidence.",
      explanation: "Evidence is assessed using legal and logical standards.",
      example: "The judge assessed each document."
    }
  },

  {
    id: "term-046",
    category: "حقوق مدني",
    ps: {
      term: "قرارداد",
      definition: "د دو یا ډېرو اړخونو ترمنځ هغه قانوني توافق چې حقوق او مکلفیتونه رامنځته کوي.",
      explanation: "قرارداد د قانون له مخې ځانګړي شرایط او آثار لرلی شي.",
      example: "طرفینو د لیکلي قرارداد له مخې معامله وکړه."
    },
    fa: {
      term: "قرارداد",
      definition: "توافق قانونی میان دو یا چند طرف که حقوق و تعهدات ایجاد می‌کند.",
      explanation: "قرارداد دارای شرایط و آثار قانونی است.",
      example: "طرفین بر اساس قرارداد کتبی معامله کردند."
    },
    en: {
      term: "Contract",
      definition: "A legally recognized agreement creating rights and obligations.",
      explanation: "A contract has legal requirements and effects.",
      example: "The parties acted under a written contract."
    }
  },

  {
    id: "term-047",
    category: "حقوق مدني",
    ps: {
      term: "توافق",
      definition: "د دو یا ډېرو کسانو ترمنځ د یوې موضوع په اړه متقابل رضا.",
      explanation: "توافق هغه وخت حقوقي اهمیت پیدا کوي چې قانوني شرایط ولري.",
      example: "د اړخونو توافق په سند کې ثبت شو."
    },
    fa: {
      term: "توافق",
      definition: "رضایت متقابل دو یا چند شخص درباره یک موضوع.",
      explanation: "توافق در صورت داشتن شرایط قانونی می‌تواند اثر حقوقی داشته باشد.",
      example: "توافق طرفین در سند ثبت شد."
    },
    en: {
      term: "Agreement",
      definition: "Mutual understanding or consent between two or more persons.",
      explanation: "An agreement may have legal effect when legal requirements are met.",
      example: "The parties' agreement was recorded."
    }
  },

  {
    id: "term-048",
    category: "حقوق مدني",
    ps: {
      term: "رضا",
      definition: "د یوه قانوني عمل یا قرارداد لپاره د شخص ازاده او څرګنده خوښه.",
      explanation: "رضا باید د قانوني شرایطو له مخې معتبره وي.",
      example: "د قرارداد د اعتبار لپاره د اړخونو رضا مهمه ده."
    },
    fa: {
      term: "رضا",
      definition: "خواست آزاد و آگاهانه شخص برای انجام یک عمل حقوقی.",
      explanation: "رضایت باید مطابق شرایط قانونی باشد.",
      example: "رضایت طرفین در قرارداد اهمیت دارد."
    },
    en: {
      term: "Consent",
      definition: "Free and informed agreement to a legal act.",
      explanation: "Consent must meet applicable legal requirements.",
      example: "The parties' consent was relevant to the contract."
    }
  },

  {
    id: "term-049",
    category: "حقوق مدني",
    ps: {
      term: "اهلیت",
      definition: "د شخص قانوني وړتیا چې حقوق ترلاسه او قانوني اعمال ترسره کړي.",
      explanation: "اهلیت د شخص له حالت او د قانون له شرایطو سره تړاو لري.",
      example: "محکمې د اړخ د اهلیت موضوع وڅېړله."
    },
    fa: {
      term: "اهلیت",
      definition: "توانایی قانونی شخص برای داشتن حق و انجام اعمال حقوقی.",
      explanation: "اهلیت تابع وضعیت شخص و شرایط قانون است.",
      example: "دادگاه اهلیت طرف را بررسی کرد."
    },
    en: {
      term: "Legal Capacity",
      definition: "A person's legal ability to hold rights and perform legal acts.",
      explanation: "Capacity depends on legal requirements and personal status.",
      example: "The court examined the party's legal capacity."
    }
  },

  {
    id: "term-050",
    category: "حقوق مدني",
    ps: {
      term: "ملکیت",
      definition: "پر مال باندې هغه قانوني حق چې شخص ته د قانون په حدودو کې د تصرف او استفادې واک ورکوي.",
      explanation: "ملکیت باید د قانون له مخې ثابت یا ثبت شي.",
      example: "د ملکیت د حق لپاره سند وړاندې شو."
    },
    fa: {
      term: "مالکیت",
      definition: "حق قانونی شخص نسبت به مال در حدود قانون.",
      explanation: "مالکیت ممکن با سند یا سایر دلایل قانونی اثبات شود.",
      example: "برای مالکیت سند ارائه شد."
    },
    en: {
      term: "Ownership",
      definition: "A legal right or interest in property recognized by law.",
      explanation: "Ownership may be established through lawful evidence.",
      example: "A document was submitted to prove ownership."
    }
  },

  {
    id: "term-051",
    category: "حقوق مدني",
    ps: {
      term: "مال",
      definition: "هغه شی یا حق چې قانوني ارزښت ولري او د ملکیت یا استفادې وړ وي.",
      explanation: "مال منقول یا غیرمنقول کېدای شي.",
      example: "ځمکه غیرمنقول مال ګڼل کېږي."
    },
    fa: {
      term: "مال",
      definition: "شی یا حقی که دارای ارزش و قابل تملک یا استفاده باشد.",
      explanation: "مال می‌تواند منقول یا غیرمنقول باشد.",
      example: "زمین مال غیرمنقول است."
    },
    en: {
      term: "Property",
      definition: "An item or legal interest capable of ownership or lawful use.",
      explanation: "Property may be movable or immovable.",
      example: "Land is immovable property."
    }
  },

  {
    id: "term-052",
    category: "حقوق مدني",
    ps: {
      term: "منقول مال",
      definition: "هغه مال چې له یوه ځایه بل ځای ته انتقالېدای شي.",
      explanation: "د انتقال امکان یې د منقول مال مهمه ځانګړنه ده.",
      example: "موټر منقول مال دی."
    },
    fa: {
      term: "مال منقول",
      definition: "مالی که قابلیت انتقال از یک محل به محل دیگر داشته باشد.",
      explanation: "قابلیت انتقال ویژگی اصلی آن است.",
      example: "موتر مال منقول است."
    },
    en: {
      term: "Movable Property",
      definition: "Property capable of being moved from one place to another.",
      explanation: "Mobility is its main characteristic.",
      example: "A vehicle is movable property."
    }
  },

  {
    id: "term-053",
    category: "حقوق مدني",
    ps: {
      term: "غیرمنقول مال",
      definition: "هغه مال چې په ثابت ډول له ځمکې یا ځای سره تړلی وي او انتقال یې د ځای په بدلولو سره ممکن نه وي.",
      explanation: "ځمکه او ودانۍ د غیرمنقول مال عام مثالونه دي.",
      example: "ځمکه غیرمنقول مال دی."
    },
    fa: {
      term: "مال غیرمنقول",
      definition: "مالی که به طور ثابت با زمین یا محل مرتبط باشد.",
      explanation: "زمین و ساختمان از نمونه‌های آن هستند.",
      example: "زمین مال غیرمنقول است."
    },
    en: {
      term: "Immovable Property",
      definition: "Property fixed to land or a particular place.",
      explanation: "Land and buildings are common examples.",
      example: "Land is immovable property."
    }
  },

  {
    id: "term-054",
    category: "حقوق مدني",
    ps: {
      term: "تاوان",
      definition: "هغه مالي جبران چې د زیان یا قانوني مسؤولیت په بدل کې ورکول کېږي.",
      explanation: "د تاوان اندازه د قانون او ثابت شوي زیان له مخې ټاکل کېدای شي.",
      example: "زیانمن شخص د تاوان غوښتنه وکړه."
    },
    fa: {
      term: "خساره",
      definition: "جبران مالی که در برابر زیان یا مسؤولیت قانونی پرداخت می‌شود.",
      explanation: "میزان خساره بر اساس قانون و زیان اثبات‌شده تعیین می‌شود.",
      example: "زیان‌دیده خساره مطالبه کرد."
    },
    en: {
      term: "Damages",
      definition: "Financial compensation for legally recognized harm or loss.",
      explanation: "The amount may depend on law and proven loss.",
      example: "The injured party claimed damages."
    }
  },

  {
    id: "term-055",
    category: "حقوق مدني",
    ps: {
      term: "تاوان جبران",
      definition: "د رامنځته شوي قانوني زیان د اصلاح لپاره د جبران ورکولو بهیر.",
      explanation: "جبران د مالي یا نورو قانوني لارو ترسره کېدای شي.",
      example: "محکمې د زیان د جبران موضوع وڅېړله."
    },
    fa: {
      term: "جبران خسارت",
      definition: "فرآیند جبران زیان قانونی واردشده.",
      explanation: "جبران ممکن به شکل مالی یا سایر روش‌های قانونی باشد.",
      example: "دادگاه موضوع جبران خسارت را بررسی کرد."
    },
    en: {
      term: "Compensation",
      definition: "A remedy intended to address legally recognized harm or loss.",
      explanation: "Compensation may take a financial or other lawful form.",
      example: "The court considered compensation."
    }
  },

  {
    id: "term-056",
    category: "حقوق مدني",
    ps: {
      term: "د قرارداد ماتول",
      definition: "هغه قانوني دنده چې یو اړخ یې د قرارداد له مخې د بل اړخ پر وړاندې لري.",
      explanation: "د قرارداد ماتول د قانون له مخې ځانګړې پایلې لرلی شي.",
      example: "د قرارداد د ماتولو له امله دعوه مطرح شوه."
    },
    fa: {
      term: "نقض قرارداد",
      definition: "عدم انجام تعهد قراردادی توسط یکی از طرفین.",
      explanation: "نقض قرارداد می‌تواند آثار قانونی داشته باشد.",
      example: "به دلیل نقض قرارداد دعوا مطرح شد."
    },
    en: {
      term: "Breach of Contract",
      definition: "Failure to perform a contractual obligation.",
      explanation: "A breach may create legal remedies.",
      example: "A claim was filed for breach of contract."
    }
  },

  {
    id: "term-057",
    category: "حقوق مدني",
    ps: {
      term: "تعهد",
      definition: "هغه قانوني مکلفیت چې شخص یې د ترسره کولو یا نه ترسره کولو مسؤلیت لري.",
      explanation: "تعهد د قرارداد یا بل قانوني بنسټ له مخې رامنځته کېدای شي.",
      example: "پور اخیستونکي د پیسو د بېرته ورکولو تعهد وکړ."
    },
    fa: {
      term: "تعهد",
      definition: "الزام قانونی شخص به انجام یا ترک یک عمل.",
      explanation: "تعهد می‌تواند از قرارداد یا قانون ناشی شود.",
      example: "وام‌گیرنده تعهد به بازپرداخت کرد."
    },
    en: {
      term: "Commitment",
      definition: "A legal obligation to perform or refrain from an act.",
      explanation: "An obligation may arise from a contract or law.",
      example: "The borrower made a repayment commitment."
    }
  },

  {
    id: "term-058",
    category: "حقوق مدني",
    ps: {
      term: "قرض",
      definition: "هغه حقوقي معامله چې یو شخص بل ته مال یا پیسې ورکوي او د بېرته ورکولو تعهد رامنځته کېږي.",
      explanation: "د قرض شرایط د اړوندو قانوني قواعدو له مخې ارزول کېږي.",
      example: "د قرض لپاره لیکلی سند موجود و."
    },
    fa: {
      term: "قرض",
      definition: "معامله‌ای که در آن مال یا پول به دیگری داده و بازپرداخت آن تعهد می‌شود.",
      explanation: "شرایط قرض مطابق قواعد قانونی بررسی می‌شود.",
      example: "برای قرض سند کتبی وجود داشت."
    },
    en: {
      term: "Loan",
      definition: "An arrangement in which money or property is provided with an obligation to repay.",
      explanation: "Loan terms are governed by applicable legal rules.",
      example: "A written loan document existed."
    }
  },

  {
    id: "term-059",
    category: "حقوق مدني",
    ps: {
      term: "ضمانت",
      definition: "هغه قانوني تعهد چې د بل شخص د مکلفیت د اجرا یا د ځانګړې پایلې د تضمین لپاره ورکول کېږي.",
      explanation: "ضمانت د قانون یا قرارداد له مخې رامنځته کېدای شي.",
      example: "د قرارداد په سند کې ضمانت شامل و."
    },
    fa: {
      term: "ضمانت",
      definition: "تعهد قانونی برای تضمین اجرای تعهد یا نتیجه مشخص.",
      explanation: "ضمانت می‌تواند قانونی یا قراردادی باشد.",
      example: "در قرارداد ضمانت درج شده بود."
    },
    en: {
      term: "Guarantee",
      definition: "A legal commitment intended to secure performance or a specified result.",
      explanation: "A guarantee may arise from law or contract.",
      example: "The contract included a guarantee."
    }
  },

  {
    id: "term-060",
    category: "حقوق مدني",
    ps: {
      term: "وکالت",
      definition: "هغه قانوني اړیکه چې یو شخص بل ته د خپلو قانوني چارو د ترسره کولو واک ورکوي.",
      explanation: "وکالت د ورکړل شوي واک په حدودو کې ترسره کېږي.",
      example: "موکل خپل وکیل ته د قضیې د تعقیب وکالت ورکړ."
    },
    fa: {
      term: "وکالت",
      definition: "رابطه‌ای که در آن شخص به دیگری اختیار انجام امور قانونی خود را می‌دهد.",
      explanation: "وکالت در حدود اختیار داده‌شده انجام می‌شود.",
      example: "موکل وکالت پیگیری قضیه را داد."
    },
    en: {
      term: "Power of Attorney",
      definition: "A legal relationship granting another person authority to act on one's behalf.",
      explanation: "Authority is exercised within the granted limits.",
      example: "The client granted authority to pursue the case."
    }
  },

  {
    id: "term-061",
    category: "د دعوې پروسه",
    ps: {
      term: "عریضه",
      definition: "هغه رسمي لیکلی درخواست چې یوې قانوني ادارې یا محکمې ته وړاندې کېږي.",
      explanation: "عریضه باید د اړوندې موضوع او قانوني غوښتنې معلومات ولري.",
      example: "مدعي خپله عریضه محکمې ته وړاندې کړه."
    },
    fa: {
      term: "عریضه",
      definition: "درخواست کتبی رسمی که به محکمه یا مرجع قانونی ارائه می‌شود.",
      explanation: "عریضه باید موضوع و خواسته قانونی را مشخص کند.",
      example: "مدعی عریضه خود را ارائه کرد."
    },
    en: {
      term: "Petition",
      definition: "A formal written request submitted to a court or legal authority.",
      explanation: "A petition states the relevant issue and requested relief.",
      example: "The claimant submitted a petition."
    }
  },

  {
    id: "term-062",
    category: "د دعوې پروسه",
    ps: {
      term: "اعتراض",
      definition: "د یوې پرېکړې، ادعا یا اقدام پر وړاندې رسمي مخالفت یا قانوني غوښتنه.",
      explanation: "اعتراض باید د قانون له ټاکل شوې لارې ترسره شي.",
      example: "اړخ د پرېکړې پر وړاندې اعتراض ثبت کړ."
    },
    fa: {
      term: "اعتراض",
      definition: "مخالفت یا درخواست رسمی نسبت به یک تصمیم، ادعا یا اقدام.",
      explanation: "اعتراض باید از راه قانونی انجام شود.",
      example: "طرف نسبت به تصمیم اعتراض کرد."
    },
    en: {
      term: "Objection",
      definition: "A formal challenge to a decision, claim, or action.",
      explanation: "An objection must follow the applicable legal procedure.",
      example: "The party raised an objection."
    }
  },

  {
    id: "term-063",
    category: "د دعوې پروسه",
    ps: {
      term: "درخواست",
      definition: "هغه رسمي غوښتنه چې د قانوني حق یا خدمت د ترلاسه کولو لپاره وړاندې کېږي.",
      explanation: "درخواست باید د اړوندې ادارې یا محکمې صلاحیت سره تړاو ولري.",
      example: "درخواست محکمې ته وړاندې شو."
    },
    fa: {
      term: "درخواست",
      definition: "تقاضای رسمی برای دریافت حق یا انجام یک اقدام قانونی.",
      explanation: "درخواست باید به مرجع دارای صلاحیت ارائه شود.",
      example: "درخواست به محکمه ارائه شد."
    },
    en: {
      term: "Application",
      definition: "A formal request for a legal right, action, or service.",
      explanation: "It should be submitted to the proper authority.",
      example: "The application was submitted to the court."
    }
  },

  {
    id: "term-064",
    category: "د دعوې پروسه",
    ps: {
      term: "استماع",
      definition: "د قضايي مرجع له خوا د اړخونو، شاهدانو یا نورو اړوندو بیانونو اورېدل.",
      explanation: "استماع د قضیې د واقعو او شواهدو په ارزونه کې مهمه ده.",
      example: "محکمې د شاهدانو استماع ترسره کړه."
    },
    fa: {
      term: "استماع",
      definition: "شنیدن اظهارات طرفین، شاهدان یا سایر افراد مرتبط توسط مرجع قضایی.",
      explanation: "استماع در بررسی وقایع و شواهد اهمیت دارد.",
      example: "دادگاه اظهارات شاهدان را استماع کرد."
    },
    en: {
      term: "Hearing",
      definition: "A judicial proceeding in which statements or arguments are heard.",
      explanation: "Hearings help the court examine relevant issues.",
      example: "The court held a hearing."
    }
  },

  {
    id: "term-065",
    category: "د دعوې پروسه",
    ps: {
      term: "احضاریه",
      definition: "د قانوني مرجع رسمي غوښتنه چې شخص په ټاکلي وخت او ځای کې حاضر شي.",
      explanation: "احضاریه باید د قانون له مخې صادره او ابلاغ شي.",
      example: "شاهد ته احضاریه ولېږل شوه."
    },
    fa: {
      term: "احضاریه",
      definition: "دستور رسمی مرجع قانونی برای حضور شخص در زمان و مکان مشخص.",
      explanation: "احضاریه باید مطابق قانون صادر و ابلاغ شود.",
      example: "برای شاهد احضاریه ارسال شد."
    },
    en: {
      term: "Summons",
      definition: "An official notice requiring a person to appear before a legal authority.",
      explanation: "A summons must follow legal requirements.",
      example: "A summons was sent to the witness."
    }
  },

  {
    id: "term-066",
    category: "د دعوې پروسه",
    ps: {
      term: "ابلاغ",
      definition: "د قانوني سند، پرېکړې یا خبرتیا رسمي رسول اړوند شخص ته.",
      explanation: "ابلاغ د قانوني پروسې د خبرولو مهمه برخه ده.",
      example: "د محکمې پرېکړه اړوند شخص ته ابلاغ شوه."
    },
    fa: {
      term: "ابلاغ",
      definition: "رساندن رسمی سند، تصمیم یا اطلاعیه به شخص مربوط.",
      explanation: "ابلاغ بخشی مهم از روند قانونی است.",
      example: "تصمیم محکمه به شخص ابلاغ شد."
    },
    en: {
      term: "Service",
      definition: "Formal delivery of a legal document or notice to a person.",
      explanation: "Service is an important part of legal procedure.",
      example: "The court decision was formally served."
    }
  },

  {
    id: "term-067",
    category: "د دعوې پروسه",
    ps: {
      term: "استیناف غوښتنه",
      definition: "د ټیټې محکمې د پرېکړې د بیاکتنې لپاره رسمي قانوني غوښتنه.",
      explanation: "استیناف غوښتنه باید د قانون ټاکلي شرایط ولري.",
      example: "اړخ د پرېکړې پر وړاندې استیناف غوښتنه وکړه."
    },
    fa: {
      term: "درخواست تجدیدنظر",
      definition: "درخواست رسمی برای بررسی دوباره تصمیم محکمه پایین‌تر.",
      explanation: "این درخواست باید شرایط قانونی را داشته باشد.",
      example: "طرف درخواست تجدیدنظر ارائه کرد."
    },
    en: {
      term: "Notice of Appeal",
      definition: "A formal request to review a lower court decision.",
      explanation: "It must satisfy applicable legal requirements.",
      example: "The party filed a notice of appeal."
    }
  },

  {
    id: "term-068",
    category: "د دعوې پروسه",
    ps: {
      term: "د قضیې ثبت",
      definition: "د یوې قضیې د معلوماتو رسمي ثبت په قانوني مرجع کې.",
      explanation: "ثبت د قضیې د رسمي پروسې د پیل یا دوام لپاره مهم دی.",
      example: "د دعوې ثبت بشپړ شو."
    },
    fa: {
      term: "ثبت قضیه",
      definition: "ثبت رسمی اطلاعات یک قضیه در مرجع قانونی.",
      explanation: "ثبت برای آغاز یا ادامه روند قضیه اهمیت دارد.",
      example: "ثبت دعوا تکمیل شد."
    },
    en: {
      term: "Case Registration",
      definition: "Official recording of a case with a legal authority.",
      explanation: "Registration supports the formal legal process.",
      example: "The case registration was completed."
    }
  },

  {
    id: "term-069",
    category: "د دعوې پروسه",
    ps: {
      term: "جلسه قضايي",
      definition: "هغه رسمي وخت او ناسته چې قضايي مرجع پکې د قضیې اړوند موضوعات څېړي.",
      explanation: "په جلسه کې اړخونه او اړوند اشخاص د قانون له مخې ګډون کولی شي.",
      example: "د قضیې جلسه نن ترسره شوه."
    },
    fa: {
      term: "جلسه قضایی",
      definition: "نشست رسمی مرجع قضایی برای بررسی موضوعات یک قضیه.",
      explanation: "طرفین و افراد مربوط طبق قانون می‌توانند در جلسه حضور داشته باشند.",
      example: "جلسه قضیه امروز برگزار شد."
    },
    en: {
      term: "Court Session",
      definition: "A formal judicial meeting for considering issues in a case.",
      explanation: "Relevant parties may participate according to law.",
      example: "The court session was held today."
    }
  },

  {
    id: "term-070",
    category: "د دعوې پروسه",
    ps: {
      term: "مذاکره",
      definition: "د شخړې د حل لپاره د اړخونو ترمنځ د خبرو او متقابل بحث بهیر.",
      explanation: "مذاکره د محکمې له پرېکړې پرته د حل لارې په موندلو کې مرسته کولی شي.",
      example: "طرفینو د شخړې د حل لپاره مذاکره وکړه."
    },
    fa: {
      term: "مذاکره",
      definition: "روند گفت‌وگو میان طرفین برای حل یک اختلاف.",
      explanation: "مذاکره می‌تواند به حل اختلاف کمک کند.",
      example: "طرفین برای حل اختلاف مذاکره کردند."
    },
    en: {
      term: "Negotiation",
      definition: "A process of discussion between parties to resolve a dispute.",
      explanation: "Negotiation may help parties reach a resolution.",
      example: "The parties negotiated a solution."
    }
  },

  {
    id: "term-071",
    category: "بدیل حل شخړې",
    ps: {
      term: "روغه جوړه",
      definition: "د شخړې د حل لپاره د اړخونو متقابل توافق.",
      explanation: "روغه جوړه باید د قانون او د اړخونو د حقوقو په حدودو کې وي.",
      example: "طرفینو د شخړې لپاره روغه جوړه وکړه."
    },
    fa: {
      term: "سازش",
      definition: "توافق طرفین برای پایان‌دادن به یک اختلاف.",
      explanation: "سازش باید با قانون و حقوق طرفین سازگار باشد.",
      example: "طرفین درباره اختلاف سازش کردند."
    },
    en: {
      term: "Settlement",
      definition: "An agreement between parties to resolve a dispute.",
      explanation: "A settlement should comply with applicable law.",
      example: "The parties reached a settlement."
    }
  },

  {
    id: "term-072",
    category: "بدیل حل شخړې",
    ps: {
      term: "منځګړیتوب",
      definition: "د بې‌طرفه درېیم شخص له لارې د شخړې د حل هڅه.",
      explanation: "منځګړی عموماً د اړخونو ترمنځ د توافق په رامنځته کولو کې مرسته کوي.",
      example: "منځګړي د دواړو اړخونو خبرې واورېدې."
    },
    fa: {
      term: "میانجی‌گری",
      definition: "تلاش برای حل اختلاف با کمک شخص بی‌طرف سوم.",
      explanation: "میانجی به طرفین برای رسیدن به توافق کمک می‌کند.",
      example: "میانجی سخنان هر دو طرف را شنید."
    },
    en: {
      term: "Mediation",
      definition: "A dispute-resolution process assisted by a neutral third person.",
      explanation: "The mediator helps parties seek an agreement.",
      example: "The mediator heard both sides."
    }
  },

  {
    id: "term-073",
    category: "بدیل حل شخړې",
    ps: {
      term: "حکمیت",
      definition: "د شخړې د حل هغه بهیر چې اړخونه یې یوه ټاکلي حکم ته سپاري.",
      explanation: "حکمیت د اړوندو قانوني شرایطو له مخې ترسره کېږي.",
      example: "طرفینو خپله شخړه حکمیت ته وسپارله."
    },
    fa: {
      term: "داوری",
      definition: "روند حل اختلاف که طرفین آن را به داور یا هیئت داوری می‌سپارند.",
      explanation: "داوری طبق شرایط قانونی انجام می‌شود.",
      example: "طرفین اختلاف را به داوری سپردند."
    },
    en: {
      term: "Arbitration",
      definition: "A dispute-resolution process submitted to an arbitrator or panel.",
      explanation: "Arbitration operates under applicable legal rules.",
      example: "The parties submitted the dispute to arbitration."
    }
  },

  {
    id: "term-074",
    category: "اساسي حقوق",
    ps: {
      term: "اساسي قانون",
      definition: "د دولت د اساسي جوړښت او بنسټیزو حقوقو د تنظیم لوړ حقوقي سند.",
      explanation: "اساسي قانون د دولت د ادارو او بنسټیزو حقوقو چوکاټ ټاکي.",
      example: "د اساسي قانون اصول د دولت د جوړښت په اړه قواعد ټاکي."
    },
    fa: {
      term: "قانون اساسی",
      definition: "سند عالی حقوقی تنظیم‌کننده ساختار دولت و حقوق اساسی.",
      explanation: "قانون اساسی چارچوب نهادهای دولتی و حقوق بنیادین را مشخص می‌کند.",
      example: "قانون اساسی ساختار دولت را تنظیم می‌کند."
    },
    en: {
      term: "Constitution",
      definition: "The fundamental legal framework governing the state and basic rights.",
      explanation: "It establishes the structure of government and fundamental rights.",
      example: "The constitution defines governmental structure."
    }
  },

  {
    id: "term-075",
    category: "اساسي حقوق",
    ps: {
      term: "بنسټیز حقوق",
      definition: "هغه اساسي قانوني حقوق چې د شخص د آزادۍ او قانوني خوندیتوب لپاره پېژندل کېږي.",
      explanation: "بنسټیز حقوق د قانوني نظام مهمه برخه ده.",
      example: "محکمه د شخص بنسټیز حقوق په پام کې ونیول."
    },
    fa: {
      term: "حقوق اساسی",
      definition: "حقوق بنیادینی که برای آزادی و حمایت قانونی اشخاص شناخته می‌شوند.",
      explanation: "حقوق اساسی بخش مهم نظام حقوقی است.",
      example: "دادگاه حقوق اساسی شخص را در نظر گرفت."
    },
    en: {
      term: "Fundamental Rights",
      definition: "Basic legal rights recognized to protect individual freedom and dignity.",
      explanation: "Fundamental rights are an important part of a legal system.",
      example: "The court considered fundamental rights."
    }
  },

  {
    id: "term-076",
    category: "اساسي حقوق",
    ps: {
      term: "مساوات",
      definition: "د قانون په وړاندې د اشخاصو د برابر چلند اصل.",
      explanation: "مساوات د قانوني نظام له مهمو اصولو څخه دی.",
      example: "د قانون تطبیق باید د مساوات اصل رعایت کړي."
    },
    fa: {
      term: "مساوات",
      definition: "اصل رفتار برابر اشخاص در برابر قانون.",
      explanation: "مساوات یکی از اصول مهم نظام حقوقی است.",
      example: "قانون باید اصل مساوات را رعایت کند."
    },
    en: {
      term: "Equality",
      definition: "The principle of equal treatment under the law.",
      explanation: "Equality is a fundamental legal principle.",
      example: "The law should respect equality."
    }
  },

  {
    id: "term-077",
    category: "اساسي حقوق",
    ps: {
      term: "عدالت",
      definition: "د حقوق او مکلفیتونو د عادلانه تنظیم او د حقونو د رعایت اصل.",
      explanation: "عدالت د قضايي او حقوقي نظام له بنسټیزو موخو څخه ده.",
      example: "محکمه د عدالت د تأمین لپاره د شواهدو ارزونه کوي."
    },
    fa: {
      term: "عدالت",
      definition: "اصل رعایت عادلانه حقوق و تکالیف اشخاص.",
      explanation: "عدالت از اهداف اساسی نظام قضایی و حقوقی است.",
      example: "دادگاه برای تأمین عدالت شواهد را بررسی می‌کند."
    },
    en: {
      term: "Justice",
      definition: "The principle of fair treatment and protection of legal rights.",
      explanation: "Justice is a fundamental aim of legal systems.",
      example: "The court evaluates evidence to promote justice."
    }
  },

  {
    id: "term-078",
    category: "اساسي حقوق",
    ps: {
      term: "قانون حاکمیت",
      definition: "هغه اصل چې ټول اشخاص او دولتي ادارې د قانون تابع ګڼي.",
      explanation: "د قانون حاکمیت د قانون د برابر تطبیق او قانوني محدودیتونو اصل پیاوړی کوي.",
      example: "د قانون حاکمیت د قانوني نظام مهم اصل دی."
    },
    fa: {
      term: "حاکمیت قانون",
      definition: "اصلی که همه اشخاص و نهادهای دولتی را تابع قانون می‌داند.",
      explanation: "این اصل بر اجرای قانون و محدودیت قانونی تأکید دارد.",
      example: "حاکمیت قانون اصل مهم نظام حقوقی است."
    },
    en: {
      term: "Rule of Law",
      definition: "The principle that persons and institutions are subject to law.",
      explanation: "It emphasizes lawful government and legal accountability.",
      example: "Rule of law is a core legal principle."
    }
  },

  {
    id: "term-079",
    category: "اداري حقوق",
    ps: {
      term: "اداره",
      definition: "هغه دولتي یا قانوني بنسټ چې د ځانګړو دندو د ترسره کولو لپاره جوړ شوی وي.",
      explanation: "اداره باید د خپل قانوني صلاحیت په حدودو کې عمل وکړي.",
      example: "اداره د قانون له مخې خپل خدمات وړاندې کوي."
    },
    fa: {
      term: "اداره",
      definition: "نهاد دولتی یا قانونی که برای انجام وظایف مشخص ایجاد شده است.",
      explanation: "اداره باید در حدود صلاحیت قانونی خود عمل کند.",
      example: "اداره خدمات خود را طبق قانون ارائه می‌کند."
    },
    en: {
      term: "Administration",
      definition: "A governmental or legal institution established to perform specific functions.",
      explanation: "An administration must act within its legal authority.",
      example: "The administration provides services under the law."
    }
  },

  {
    id: "term-080",
    category: "اداري حقوق",
    ps: {
      term: "اداري پرېکړه",
      definition: "د صلاحیت لرونکې ادارې هغه رسمي تصمیم چې د قانون له مخې صادرېږي.",
      explanation: "اداري پرېکړه باید د ادارې د قانوني صلاحیت او مقرراتو سره سمه وي.",
      example: "شخص د ادارې پر پرېکړه اعتراض وکړ."
    },
    fa: {
      term: "تصمیم اداری",
      definition: "تصمیم رسمی یک اداره دارای صلاحیت که بر اساس قانون صادر می‌شود.",
      explanation: "تصمیم اداری باید در حدود صلاحیت قانونی باشد.",
      example: "شخص نسبت به تصمیم اداری اعتراض کرد."
    },
    en: {
      term: "Administrative Decision",
      definition: "A formal decision issued by a competent administrative authority.",
      explanation: "It must remain within the authority granted by law.",
      example: "The person challenged the administrative decision."
    }
  },

  {
    id: "term-081",
    category: "حقوق جزا",
    ps: {
      term: "تحقیق",
      definition: "د یوې پېښې یا جرم په اړه د معلوماتو، شواهدو او واقعو منظم راټولول او ارزول.",
      explanation: "تحقیق د قضیې د حقیقت موندلو لپاره ترسره کېږي.",
      example: "د جرم په اړه تحقیق پیل شو."
    },
    fa: {
      term: "تحقیق",
      definition: "جمع‌آوری و بررسی منظم اطلاعات، شواهد و وقایع درباره یک موضوع یا جرم.",
      explanation: "تحقیق برای روشن‌شدن واقعیت انجام می‌شود.",
      example: "تحقیق درباره جرم آغاز شد."
    },
    en: {
      term: "Investigation",
      definition: "Systematic collection and examination of facts and evidence.",
      explanation: "Investigation seeks to establish what happened.",
      example: "An investigation into the offense began."
    }
  },

  {
    id: "term-082",
    category: "حقوق جزا",
    ps: {
      term: "د جرم کشف",
      definition: "د جرم د واقع کېدو او اړوندو معلوماتو معلومول.",
      explanation: "کشف جرم د قانوني تحقیق او شواهدو له لارې ترسره کېدای شي.",
      example: "د جرم د کشف لپاره معلومات راټول شول."
    },
    fa: {
      term: "کشف جرم",
      definition: "شناسایی وقوع جرم و اطلاعات مرتبط با آن.",
      explanation: "کشف جرم از طریق تحقیق و شواهد انجام می‌شود.",
      example: "برای کشف جرم اطلاعات جمع‌آوری شد."
    },
    en: {
      term: "Crime Detection",
      definition: "Identifying the occurrence of an offense and relevant information.",
      explanation: "Detection may rely on investigation and evidence.",
      example: "Information was collected to detect the offense."
    }
  },

  {
    id: "term-083",
    category: "حقوق جزا",
    ps: {
      term: "پلټنه",
      definition: "د قانوني صلاحیت له مخې د ځای، شیانو یا اړوندو معلوماتو د موندلو لپاره رسمي تلاشي.",
      explanation: "پلټنه باید د قانوني شرایطو او صلاحیت له مخې ترسره شي.",
      example: "د قانوني اجازې له مخې پلټنه ترسره شوه."
    },
    fa: {
      term: "تفتیش",
      definition: "جست‌وجوی رسمی محل یا اشیا در حدود صلاحیت قانونی.",
      explanation: "تفتیش باید مطابق شرایط قانونی انجام شود.",
      example: "تفتیش طبق مجوز قانونی انجام شد."
    },
    en: {
      term: "Search",
      definition: "A lawful examination of a place, person, or item to find relevant evidence.",
      explanation: "A search must comply with legal requirements.",
      example: "The search was conducted under legal authority."
    }
  },

  {
    id: "term-084",
    category: "حقوق جزا",
    ps: {
      term: "نیول",
      definition: "د قانوني صلاحیت له مخې د یوه شخص د لنډمهاله یا قانوني کنټرول لاندې راوستل.",
      explanation: "نیول باید د قانون له شرایطو سره سم ترسره شي.",
      example: "د تورن نیول د قانوني پروسې له مخې ترسره شو."
    },
    fa: {
      term: "بازداشت",
      definition: "قرار دادن شخص تحت کنترل قانونی مطابق صلاحیت و شرایط قانون.",
      explanation: "بازداشت باید بر اساس قانون انجام شود.",
      example: "بازداشت متهم طبق روند قانونی انجام شد."
    },
    en: {
      term: "Detention",
      definition: "Placing a person under lawful control or custody.",
      explanation: "Detention must comply with legal requirements.",
      example: "The accused was detained according to law."
    }
  },

  {
    id: "term-085",
    category: "حقوق جزا",
    ps: {
      term: "تحقیق کوونکی",
      definition: "هغه مسؤول یا مسلکي شخص چې د قانون له مخې د پېښې او شواهدو تحقیق کوي.",
      explanation: "تحقیق کوونکی معلومات راټولوي او د قانوني پروسې لپاره یې تنظیموي.",
      example: "تحقیق کوونکي د شاهد بیان ثبت کړ."
    },
    fa: {
      term: "بازپرس",
      definition: "شخص مسئول بررسی قانونی رویداد و شواهد.",
      explanation: "بازپرس اطلاعات و دلایل مربوط را جمع‌آوری و بررسی می‌کند.",
      example: "بازپرس اظهارات شاهد را ثبت کرد."
    },
    en: {
      term: "Investigator",
      definition: "A person responsible for conducting a lawful investigation.",
      explanation: "An investigator gathers and examines relevant information.",
      example: "The investigator recorded the witness statement."
    }
  },

  {
    id: "term-086",
    category: "حقوق جزا",
    ps: {
      term: "د جرم صحنه",
      definition: "هغه ځای چې ادعا کېږي جرم یا اړوند مهمه پېښه پکې رامنځته شوې ده.",
      explanation: "د جرم صحنه کېدای شي مهم فزیکي شواهد ولري.",
      example: "د جرم صحنه د شواهدو لپاره وکتل شوه."
    },
    fa: {
      term: "صحنه جرم",
      definition: "محلی که ادعا می‌شود جرم یا رویداد مرتبط در آن رخ داده است.",
      explanation: "صحنه جرم ممکن است دارای شواهد فزیکی باشد.",
      example: "صحنه جرم بررسی شد."
    },
    en: {
      term: "Crime Scene",
      definition: "The place where an alleged offense or related event occurred.",
      explanation: "A crime scene may contain physical evidence.",
      example: "The crime scene was examined."
    }
  },

  {
    id: "term-087",
    category: "حقوق جزا",
    ps: {
      term: "فزیکي شواهد",
      definition: "هغه مادي شیان چې د یوې قضیې له واقعو سره تړاو ولري.",
      explanation: "فزیکي شواهد باید راټول، خوندي او قانوني ډول وارزول شي.",
      example: "د پېښې له ځایه فزیکي شواهد ثبت شول."
    },
    fa: {
      term: "شواهد فزیکی",
      definition: "اشیای مادی مرتبط با وقایع یک قضیه.",
      explanation: "شواهد فزیکی باید جمع‌آوری و به شکل قانونی بررسی شود.",
      example: "شواهد فزیکی از محل ثبت شد."
    },
    en: {
      term: "Physical Evidence",
      definition: "Material objects relevant to the facts of a case.",
      explanation: "Physical evidence should be lawfully collected and assessed.",
      example: "Physical evidence was documented."
    }
  },

  {
    id: "term-088",
    category: "حقوق جزا",
    ps: {
      term: "د شواهد ساتنه",
      definition: "د شواهدو د خرابېدو، بدلون یا له منځه تلو د مخنیوي قانوني بهیر.",
      explanation: "د شواهدو ساتنه د اعتبار لپاره مهمه ده.",
      example: "د سند اصلي بڼه وساتل شوه."
    },
    fa: {
      term: "حفظ شواهد",
      definition: "روند جلوگیری از تغییر، آسیب یا ازبین‌رفتن شواهد.",
      explanation: "حفظ شواهد برای اعتبار آن اهمیت دارد.",
      example: "اصل سند حفظ شد."
    },
    en: {
      term: "Evidence Preservation",
      definition: "Protecting evidence from alteration, damage, or loss.",
      explanation: "Preservation supports evidence reliability.",
      example: "The original document was preserved."
    }
  },

  {
    id: "term-089",
    category: "حقوق جزا",
    ps: {
      term: "قانوني پلټنه",
      definition: "هغه تلاشي چې د قانوني صلاحیت او ټاکلو شرایطو له مخې ترسره کېږي.",
      explanation: "هره پلټنه باید قانوني بنسټ ولري.",
      example: "قانوني پلټنه د اړوندو قواعدو له مخې ترسره شوه."
    },
    fa: {
      term: "تفتیش قانونی",
      definition: "جست‌وجویی که بر اساس صلاحیت و شرایط قانونی انجام می‌شود.",
      explanation: "تفتیش باید دارای مبنای قانونی باشد.",
      example: "تفتیش مطابق قواعد قانونی انجام شد."
    },
    en: {
      term: "Lawful Search",
      definition: "A search conducted under valid legal authority and conditions.",
      explanation: "A search must have a legal basis.",
      example: "The search was conducted lawfully."
    }
  },

  {
    id: "term-090",
    category: "حقوق جزا",
    ps: {
      term: "قانوني پروسه",
      definition: "هغه ټاکل شوی بهیر چې قانوني اداره یا محکمه یې د یوې موضوع د حل لپاره تعقیبوي.",
      explanation: "قانوني پروسه د عادلانه او منظمې رسېدنې لپاره مهمه ده.",
      example: "قضیه د قانوني پروسې له مخې تعقیب شوه."
    },
    fa: {
      term: "روند قانونی",
      definition: "مراحل و تشریفات تعیین‌شده قانونی برای رسیدگی به یک موضوع.",
      explanation: "روند قانونی برای رسیدگی منظم و عادلانه اهمیت دارد.",
      example: "قضیه طبق روند قانونی بررسی شد."
    },
    en: {
      term: "Legal Procedure",
      definition: "The legally prescribed process for handling a legal matter.",
      explanation: "It provides an orderly framework for legal proceedings.",
      example: "The case followed legal procedure."
    }
  },

  {
    id: "term-091",
    category: "حقوق عامه",
    ps: {
      term: "عامه ګټه",
      definition: "هغه ګټه چې د ټولنې یا عامو خلکو له حقوقي او ټولنیزو اړتیاوو سره تړاو ولري.",
      explanation: "عامه ګټه په ځینو قانوني پرېکړو کې مهم معیار کېدای شي.",
      example: "اداره د عامه ګټې موضوع وڅېړله."
    },
    fa: {
      term: "منافع عمومی",
      definition: "منافع مرتبط با نیازها و حقوق عمومی جامعه.",
      explanation: "منافع عمومی در برخی تصمیم‌های قانونی اهمیت دارد.",
      example: "اداره منافع عمومی را بررسی کرد."
    },
    en: {
      term: "Public Interest",
      definition: "An interest concerning the rights and welfare of the public.",
      explanation: "Public interest may be relevant to legal decisions.",
      example: "The authority considered the public interest."
    }
  },

  {
    id: "term-092",
    category: "حقوق عامه",
    ps: {
      term: "عامه نظم",
      definition: "هغه قانوني او ټولنیز حالت چې د ټولنې د امنیت او منظم ژوند لپاره اړین وي.",
      explanation: "قانون د عامه نظم د ساتنې لپاره قواعد ټاکي.",
      example: "د عامه نظم د ساتنې لپاره قانوني اقدامات وشول."
    },
    fa: {
      term: "نظم عمومی",
      definition: "وضعیت قانونی و اجتماعی لازم برای امنیت و نظم جامعه.",
      explanation: "قانون برای حفظ نظم عمومی قواعدی تعیین می‌کند.",
      example: "برای حفظ نظم عمومی اقدام قانونی انجام شد."
    },
    en: {
      term: "Public Order",
      definition: "The lawful and social order necessary for public security and stability.",
      explanation: "Law establishes rules to protect public order.",
      example: "Legal action was taken to protect public order."
    }
  },

  {
    id: "term-093",
    category: "حقوق عامه",
    ps: {
      term: "شخص حقیقي",
      definition: "انفرادي انسان چې د قانون له مخې حقوق او مکلفیتونه لرلی شي.",
      explanation: "هر انسان د قانون له مخې د شخص حقیقي په توګه پېژندل کېدای شي.",
      example: "احمد یو شخص حقیقي دی."
    },
    fa: {
      term: "شخص حقیقی",
      definition: "انسانی که دارای حقوق و تکالیف قانونی است.",
      explanation: "هر فرد می‌تواند شخص حقیقی باشد.",
      example: "احمد یک شخص حقیقی است."
    },
    en: {
      term: "Natural Person",
      definition: "A human individual recognized by law as capable of rights and obligations.",
      explanation: "An individual is a natural person.",
      example: "Ahmad is a natural person."
    }
  },

  {
    id: "term-094",
    category: "حقوق عامه",
    ps: {
      term: "شخص حکمي",
      definition: "هغه سازمان یا اداره چې قانون ورته جلا حقوقي شخصیت ورکوي.",
      explanation: "شخص حکمي کولای شي د قانون په حدودو کې حقوق او مکلفیتونه ولري.",
      example: "ثبت شوې اداره شخص حکمي کېدای شي."
    },
    fa: {
      term: "شخص حقوقی",
      definition: "نهاد یا سازمانی که قانون برای آن شخصیت مستقل حقوقی می‌شناسد.",
      explanation: "شخص حقوقی می‌تواند دارای حقوق و تکالیف باشد.",
      example: "شرکت ثبت‌شده شخص حقوقی است."
    },
    en: {
      term: "Legal Person",
      definition: "An organization or entity recognized by law as a separate legal person.",
      explanation: "It can hold rights and obligations under law.",
      example: "A registered organization may be a legal person."
    }
  },

  {
    id: "term-095",
    category: "حقوق بین الملل",
    ps: {
      term: "معاهده",
      definition: "د دولتونو یا نړیوالو حقوقي اړخونو ترمنځ رسمي نړیوال توافق.",
      explanation: "معاهده د اړوندو قانوني اصولو له مخې حقوقي آثار لرلی شي.",
      example: "دولتونو یوه نړیواله معاهده لاسلیک کړه."
    },
    fa: {
      term: "معاهده",
      definition: "توافق رسمی بین دولت‌ها یا اشخاص حقوقی بین‌المللی.",
      explanation: "معاهده می‌تواند طبق قواعد حقوق بین‌الملل آثار قانونی داشته باشد.",
      example: "دولت‌ها یک معاهده بین‌المللی امضا کردند."
    },
    en: {
      term: "Treaty",
      definition: "A formal international agreement between states or international legal parties.",
      explanation: "Treaties may create legal obligations under international law.",
      example: "The states signed an international treaty."
    }
  },

  {
    id: "term-096",
    category: "حقوق بین الملل",
    ps: {
      term: "نړیوال حقوق",
      definition: "هغه حقوقي قواعد چې د دولتونو او نورو نړیوالو اړخونو اړیکې تنظیموي.",
      explanation: "نړیوال حقوق د دولتونو ترمنځ د اړیکو لپاره قواعد رامنځته کوي.",
      example: "دولتونه د نړیوالو حقوقو اصول مراعاتوي."
    },
    fa: {
      term: "حقوق بین‌الملل",
      definition: "قواعد حقوقی تنظیم‌کننده روابط دولت‌ها و سایر اشخاص بین‌المللی.",
      explanation: "حقوق بین‌الملل روابط میان بازیگران بین‌المللی را تنظیم می‌کند.",
      example: "دولت‌ها اصول حقوق بین‌الملل را رعایت می‌کنند."
    },
    en: {
      term: "International Law",
      definition: "Rules governing relations among states and other international actors.",
      explanation: "It regulates relationships at the international level.",
      example: "States follow principles of international law."
    }
  },

  {
    id: "term-097",
    category: "حقوقي منطق",
    ps: {
      term: "حقوقي استدلال",
      definition: "د واقعو، شواهدو او قانون پر بنسټ د حقوقي پایلې د ترلاسه کولو منطقي بهیر.",
      explanation: "حقوقي استدلال باید له ادعا څخه تر پایلې پورې منطقي اړیکه ولري.",
      example: "قاضي خپله پرېکړه په حقوقي استدلال توجیه کړه."
    },
    fa: {
      term: "استدلال حقوقی",
      definition: "فرآیند منطقی رسیدن به نتیجه حقوقی بر اساس وقایع، شواهد و قانون.",
      explanation: "استدلال باید میان ادعا و نتیجه ارتباط منطقی داشته باشد.",
      example: "قاضی تصمیم خود را با استدلال حقوقی توضیح داد."
    },
    en: {
      term: "Legal Reasoning",
      definition: "A logical process of reaching a legal conclusion from facts, evidence, and law.",
      explanation: "Legal reasoning connects facts and legal rules to a conclusion.",
      example: "The judge explained the decision through legal reasoning."
    }
  },

  {
    id: "term-098",
    category: "حقوقي منطق",
    ps: {
      term: "حقوقي تحلیل",
      definition: "د قانون، واقعو، شواهدو او حقوقي مسئلې منظم او ژور ارزونه.",
      explanation: "حقوقي تحلیل د قضیې د حل لپاره د اړوندو قانوني قواعدو په پېژندلو کې مرسته کوي.",
      example: "محصل د قضیې حقوقي تحلیل وړاندې کړ."
    },
    fa: {
      term: "تحلیل حقوقی",
      definition: "بررسی منظم و عمیق قانون، وقایع، شواهد و مسئله حقوقی.",
      explanation: "تحلیل حقوقی به شناسایی قواعد مربوط و حل قضیه کمک می‌کند.",
      example: "دانشجو تحلیل حقوقی قضیه را ارائه کرد."
    },
    en: {
      term: "Legal Analysis",
      definition: "A systematic examination of law, facts, evidence, and legal issues.",
      explanation: "Legal analysis helps identify applicable rules and solve cases.",
      example: "The student presented a legal analysis."
    }
  },

  {
    id: "term-099",
    category: "حقوقي منطق",
    ps: {
      term: "حقوقي نظر",
      definition: "د قانون او شواهدو پر بنسټ د یوې حقوقي موضوع په اړه مسلکي پایله.",
      explanation: "حقوقي نظر باید پر قانوني بنسټ او منطقي تحلیل ولاړ وي.",
      example: "وکیل د قضیې په اړه حقوقي نظر وړاندې کړ."
    },
    fa: {
      term: "نظر حقوقی",
      definition: "نتیجه یا دیدگاه تخصصی درباره یک موضوع حقوقی بر اساس قانون و شواهد.",
      explanation: "نظر حقوقی باید بر مبنای قانونی و تحلیل منطقی باشد.",
      example: "وکیل درباره قضیه نظر حقوقی ارائه کرد."
    },
    en: {
      term: "Legal Opinion",
      definition: "A professional conclusion on a legal issue based on law and evidence.",
      explanation: "A legal opinion should have a legal and analytical basis.",
      example: "The lawyer provided a legal opinion."
    }
  },

  {
    id: "term-100",
    category: "حقوقي منطق",
    ps: {
      term: "حقوقي مسئله",
      definition: "هغه مشخصه قانوني پوښتنه چې د قضیې د حل لپاره باید وڅېړل شي.",
      explanation: "د حقوقي مسئلې دقیق تشخیص د سم قانوني تحلیل لومړی مهم ګام دی.",
      example: "قاضي لومړی د قضیې حقوقي مسئله مشخصه کړه."
    },
    fa: {
      term: "مسئله حقوقی",
      definition: "پرسش یا موضوع مشخص قانونی که برای حل قضیه باید بررسی شود.",
      explanation: "تشخیص دقیق مسئله حقوقی نخستین گام تحلیل درست است.",
      example: "قاضی ابتدا مسئله حقوقی قضیه را مشخص کرد."
    },
    en: {
      term: "Legal Issue",
      definition: "A specific legal question that must be resolved in a case.",
      explanation: "Identifying the legal issue is a key step in legal analysis.",
      example: "The judge first identified the legal issue."
    }
  }
];

export const terminologyLetters = [
  "ا", "ب", "پ", "ت", "ټ", "ث", "ج", "چ",
  "ح", "خ", "څ", "د", "ډ", "ذ", "ر", "ړ",
  "ز", "ژ", "ږ", "س", "ش", "ښ", "ص", "ض",
  "ط", "ظ", "ع", "غ", "ف", "ق", "ک", "ګ",
  "ل", "م", "ن", "ڼ", "و", "ه", "ی", "ې", "ۍ"
];

function normalizeTerm(value = "") {
  return String(value)
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

export function getTermsByLetter(letter = "", language = "ps") {
  const target = normalizeTerm(letter);

  return terminology.filter((item) => {
    const term = item?.[language]?.term || item?.ps?.term || "";
    return normalizeTerm(term).startsWith(target);
  });
}

export function getTermById(id = "") {
  return terminology.find((item) => item.id === id) || null;
}

export function getTermByName(name = "", language = "ps") {
  const target = normalizeTerm(name);

  return (
    terminology.find((item) => {
      const term = item?.[language]?.term || "";
      return normalizeTerm(term) === target;
    }) || null
  );
}

export function getAllTerminology(language = "ps") {
  return terminology.map((item) => ({
    id: item.id,
    category: item.category,
    ...item[language]
  }));
}

export function validateTerminology() {
  const ids = terminology.map((item) => item.id);
  const normalizedNames = terminology.map((item) =>
    normalizeTerm(item?.ps?.term)
  );

  return {
    total: terminology.length,
    expected: 100,
    isComplete: terminology.length === 100,
    duplicateIds:
      ids.filter((id, index) => ids.indexOf(id) !== index),

    duplicatePashtoTerms:
      normalizedNames.filter(
        (term, index) =>
          normalizedNames.indexOf(term) !== index
      )
  };
}

export default terminology;