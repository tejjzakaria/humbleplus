import type { Locale } from "@/i18n/config";

export interface LocalizedText {
  fr: string;
  ar: string;
}

export interface UsageStep {
  title: LocalizedText;
  description: LocalizedText;
}

export interface ProductFact {
  name: LocalizedText;
  value: LocalizedText;
}

export interface ProductReview {
  name: string;
  location: LocalizedText;
  rating: number;
  quote: LocalizedText;
  /** True when the quote was translated to French/Arabic from the customer's original language (e.g. Darija). */
  translated?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  /** Primary benefit pillar, used for the "shop by concern" filter. */
  category: "beauty" | "energy" | "heart";
  badge?: LocalizedText;
  name: LocalizedText;
  tagline: LocalizedText;
  /** Multi-paragraph product story shown in the "Description" section. */
  description: LocalizedText[];
  highlights: LocalizedText[];
  /** Real product photography. First image is used as the card/gallery main shot. */
  images: string[];
  imageAlt: LocalizedText;
  usageSteps: UsageStep[];
  facts: ProductFact[];
  reviews: ProductReview[];
  /** Price in Moroccan Dirhams (MAD). */
  price: number;
  compareAtPrice?: number;
}

export const products: Product[] = [
  {
    id: "collagene-marin",
    slug: "collagene-marin-ultra-concentre",
    category: "beauty",
    badge: { fr: "Best-seller", ar: "الأكثر مبيعًا" },
    name: {
      fr: "Collagène Marin Ultra-Concentré",
      ar: "كولاجين بحري مركّز",
    },
    tagline: {
      fr: "Beauté & corps — 1 gélule par jour",
      ar: "الجمال والجسم — كبسولة واحدة يوميًا",
    },
    description: [
      {
        fr: "Notre collagène marin ultra-concentré se présente en gélules faciles à avaler, sans rien à mélanger ni à doser. Chaque cure de 30 gélules couvre un mois complet à raison d'une seule gélule par jour, avec des peptides de collagène marin d'origine tracée, du bateau jusqu'à la gélule.",
        ar: "يأتي كولاجيننا البحري المركّز على شكل كبسولات سهلة الابتلاع، دون أي خلط أو قياس. تغطي كل كورة من 30 كبسولة شهرًا كاملاً بمعدل كبسولة واحدة يوميًا، مع ببتيدات كولاجين بحري موثّقة المصدر من القارب إلى الكبسولة.",
      },
      {
        fr: "Avec l'âge, la production naturelle de collagène ralentit, ce qui peut se traduire par un relâchement cutané, une peau moins hydratée et des articulations plus sensibles à l'effort. Une supplémentation régulière accompagne la fermeté, l'élasticité et l'hydratation de la peau, tout en soutenant la mobilité et le confort articulaire au quotidien.",
        ar: "مع التقدم في العمر، يتباطأ الإنتاج الطبيعي للكولاجين، مما قد يؤدي إلى ترهل الجلد وقلة ترطيب البشرة وزيادة حساسية المفاصل عند المجهود. يرافق التزوّد المنتظم بالكولاجين تماسك البشرة ومرونتها وترطيبها، مع دعم حركية المفاصل وراحتها يوميًا.",
      },
      {
        fr: "Formulé et conditionné au Maroc dans un laboratoire certifié ONSSA, ISO 22000 et cGMP, sans arômes artificiels ni additifs superflus. Une cure simple, pensée pour s'intégrer facilement à votre routine matinale, quel que soit votre âge.",
        ar: "تُصاغ وتُعبّأ التركيبة في المغرب داخل مختبر معتمد من ONSSA وISO 22000 وcGMP، دون نكهات صناعية أو إضافات غير ضرورية. كورة بسيطة، مصممة لتندمج بسهولة في روتينك الصباحي، مهما كان عمرك.",
      },
    ],
    highlights: [
      { fr: "30 gélules — 1 mois de cure", ar: "30 كبسولة — كورة لمدة شهر" },
      { fr: "1 gélule par jour", ar: "كبسولة واحدة يوميًا" },
      { fr: "Soutient peau et corps", ar: "يدعم البشرة والجسم" },
      {
        fr: "Peptides de collagène marin tracés du bateau à la gélule",
        ar: "ببتيدات كولاجين بحري موثّقة من القارب إلى الكبسولة",
      },
      {
        fr: "Sans gluten, sans OGM — 100% halal",
        ar: "بدون غلوتين، بدون OGM — حلال 100%",
      },
    ],
    images: [
      "/products/collagene-marin-bottle.jpg",
      "/products/collagene-marin-2.jpg",
      "/products/collagene-marin-3.jpg",
      "/products/collagene-marin-4.jpg",
      "/ad_creatives/collagene-marin-campaign-hero.jpg",
      "/ad_creatives/collagene-marin-campaign-lifestyle.jpg",
      "/ad_creatives/collagene-marin-campaign-trust.jpg",
      "/ad_creatives/bundle-campaign-routine.jpg",
    ],
    imageAlt: {
      fr: "Flacon Collagène Marin Ultra-Concentré Humble+",
      ar: "عبوة كولاجين بحري مركّز من Humble+",
    },
    usageSteps: [
      {
        title: { fr: "Dosez", ar: "قيسي" },
        description: {
          fr: "Prenez 1 gélule par jour, de préférence au même moment.",
          ar: "تناولي كبسولة واحدة يوميًا، ويُفضّل في نفس التوقيت.",
        },
      },
      {
        title: { fr: "Avalez", ar: "ابتلعي" },
        description: {
          fr: "Avec un grand verre d'eau, au petit-déjeuner ou avant un repas.",
          ar: "مع كأس كبير من الماء، في الفطور أو قبل وجبة.",
        },
      },
      {
        title: { fr: "Restez régulière", ar: "حافظي على الانتظام" },
        description: {
          fr: "Une cure de 30 jours pour des résultats visibles sur la durée.",
          ar: "كورة لمدة 30 يومًا للحصول على نتائج ملحوظة مع الوقت.",
        },
      },
    ],
    facts: [
      {
        name: { fr: "Ingrédient principal", ar: "المكوّن الرئيسي" },
        value: { fr: "Collagène marin ultra-concentré", ar: "كولاجين بحري مركّز" },
      },
      {
        name: { fr: "Format", ar: "الحجم" },
        value: { fr: "30 gélules (cure de 30 jours)", ar: "30 كبسولة (كورة 30 يومًا)" },
      },
      {
        name: { fr: "Posologie", ar: "الجرعة" },
        value: { fr: "1 gélule / jour", ar: "كبسولة واحدة / يوم" },
      },
      {
        name: { fr: "Origine du collagène", ar: "مصدر الكولاجين" },
        value: { fr: "Poisson, pêche tracée", ar: "سمك، صيد موثّق المصدر" },
      },
      {
        name: { fr: "Convient à", ar: "مناسب لـ" },
        value: { fr: "Halal, sans gluten, sans lactose", ar: "حلال، بدون غلوتين، بدون لاكتوز" },
      },
      {
        name: { fr: "Conservation", ar: "طريقة الحفظ" },
        value: {
          fr: "À l'abri de la lumière et de l'humidité, < 25°C",
          ar: "بعيدًا عن الضوء والرطوبة، أقل من 25°م",
        },
      },
      {
        name: { fr: "Fabrication", ar: "التصنيع" },
        value: {
          fr: "Maroc — laboratoire certifié ONSSA, ISO 22000, cGMP",
          ar: "المغرب — مختبر معتمد من ONSSA وISO 22000 وcGMP",
        },
      },
    ],
    reviews: [
      {
        name: "Khadija",
        location: { fr: "Fès", ar: "فاس" },
        rating: 5,
        quote: {
          fr: "Faciles à avaler, aucune odeur ni goût. Après un mois je vois déjà la différence sur ma peau.",
          ar: "سهلة الابتلاع، بدون رائحة أو طعم. بعد شهر واحد لاحظت فرقًا في بشرتي.",
        },
      },
      {
        name: "Hanane",
        location: { fr: "Agadir", ar: "أكادير" },
        rating: 5,
        quote: {
          fr: "Une seule gélule par jour, c'est simple à ne pas oublier, et le pot de 30 tient exactement le mois.",
          ar: "كبسولة واحدة فقط يوميًا، سهلة عدم النسيان، والعبوة من 30 كبسولة تكفي الشهر بالضبط.",
        },
        translated: true,
      },
      {
        name: "Fatima-Zahra",
        location: { fr: "Kénitra", ar: "القنيطرة" },
        rating: 5,
        quote: {
          fr: "Ma dermatologue m'a conseillé le collagène marin, et celui-ci est vraiment simple à prendre au quotidien. Le paiement à la livraison m'a rassurée pour la première commande.",
          ar: "نصحتني طبيبة الجلدية بالكولاجين البحري، وهذا فعلاً سهل التناول يوميًا. الدفع عند الاستلام طمأنني للطلبية الأولى.",
        },
      },
    ],
    price: 379,
    compareAtPrice: 449,
  },
  {
    id: "magnesium-bisglycinate",
    slug: "magnesium-bisglycinate-age-well",
    category: "energy",
    badge: { fr: "Nouveau", ar: "جديد" },
    name: {
      fr: "Magnésium Bisglycinate AGE-WELL®",
      ar: "مغنيزيوم بيسجليسينات AGE-WELL®",
    },
    tagline: {
      fr: "Fatigue, nervosité, énergie — avec vitamines D3, B6 & B12",
      ar: "التعب، التوتر، الطاقة — مع فيتامينات D3 وB6 وB12",
    },
    description: [
      {
        fr: "Notre magnésium bisglycinate associe une forme de magnésium hautement assimilable à trois vitamines complémentaires — D3, B6 et B12 — dans une formule pensée pour les femmes actives confrontées à la fatigue et à la nervosité du quotidien.",
        ar: "يجمع مغنيزيوم بيسجليسينات لدينا بين شكل من المغنيزيوم عالي الامتصاص وثلاث فيتامينات مكمّلة — D3 وB6 وB12 — في تركيبة مصممة للمرأة النشيطة التي تواجه التعب والتوتر اليومي.",
      },
      {
        fr: "Contrairement aux formes courantes comme l'oxyde de magnésium, le bisglycinate est lié à un acide aminé (la glycine), ce qui facilite son absorption et limite l'inconfort digestif. La vitamine B6 contribue à réduire la fatigue et à réguler l'activité nerveuse, la B12 soutient la production d'énergie, et la D3 accompagne l'immunité et le tonus général.",
        ar: "على عكس الأشكال الشائعة مثل أكسيد المغنيزيوم، يرتبط البيسجليسينات بحمض أميني (الغليسين)، مما يسهّل امتصاصه ويقلل من الانزعاج الهضمي. تساهم فيتامين B6 في تقليل التعب وتنظيم النشاط العصبي، بينما تدعم B12 إنتاج الطاقة، وتساهم D3 في المناعة والحيوية العامة.",
      },
      {
        fr: "Une cure de 30 gélules pour un mois complet, à raison d'une seule gélule par jour, idéalement le soir pour accompagner un sommeil plus réparateur. Formulé et conditionné au Maroc dans un laboratoire certifié ONSSA, ISO 22000 et cGMP.",
        ar: "كورة من 30 كبسولة لشهر كامل، بمعدل كبسولة واحدة يوميًا، ويُفضّل مساءً لمرافقة نوم أكثر هدوءًا. تُصاغ وتُعبّأ التركيبة في المغرب داخل مختبر معتمد من ONSSA وISO 22000 وcGMP.",
      },
    ],
    highlights: [
      { fr: "30 gélules — 1 mois de cure", ar: "30 كبسولة — كورة لمدة شهر" },
      { fr: "1 gélule par jour", ar: "كبسولة واحدة يوميًا" },
      { fr: "Avec vitamines D3, B6 & B12", ar: "مع فيتامينات D3 وB6 وB12" },
      {
        fr: "Magnésium bisglycinate, hautement assimilable",
        ar: "مغنيزيوم بيسجليسينات، عالي الامتصاص",
      },
      { fr: "Sans gluten — 100% halal", ar: "بدون غلوتين — حلال 100%" },
    ],
    images: [
      "/products/magnesium-bisglycinate-bottle.jpg",
      "/products/magnesium-bisglycinate-2.jpg",
      "/products/magnesium-bisglycinate-3.jpg",
      "/products/magnesium-bisglycinate-4.jpg",
      "/ad_creatives/magnesium-bisglycinate-campaign-hero.jpg",
      "/ad_creatives/magnesium-bisglycinate-campaign-lifestyle.jpg",
      "/ad_creatives/magnesium-bisglycinate-campaign-testimonial.jpg",
      "/ad_creatives/bundle-campaign-routine.jpg",
    ],
    imageAlt: {
      fr: "Flacon Magnésium Bisglycinate AGE-WELL® Humble+",
      ar: "عبوة مغنيزيوم بيسجليسينات AGE-WELL® من Humble+",
    },
    usageSteps: [
      {
        title: { fr: "Dosez", ar: "قيسي" },
        description: {
          fr: "Prenez 1 gélule par jour, de préférence à heure fixe.",
          ar: "تناولي كبسولة واحدة يوميًا، ويُفضّل في وقت ثابت.",
        },
      },
      {
        title: { fr: "Avalez", ar: "ابتلعي" },
        description: {
          fr: "Avec un grand verre d'eau, idéalement le soir au dîner.",
          ar: "مع كأس كبير من الماء، ويُفضّل مساءً مع العشاء.",
        },
      },
      {
        title: { fr: "Restez régulière", ar: "حافظي على الانتظام" },
        description: {
          fr: "Une cure de 30 jours pour accompagner votre énergie durablement.",
          ar: "كورة لمدة 30 يومًا لمرافقة طاقتك بشكل مستدام.",
        },
      },
    ],
    facts: [
      {
        name: { fr: "Ingrédient principal", ar: "المكوّن الرئيسي" },
        value: { fr: "Magnésium bisglycinate", ar: "مغنيزيوم بيسجليسينات" },
      },
      {
        name: { fr: "Vitamines associées", ar: "الفيتامينات المرافقة" },
        value: { fr: "D3, B6 & B12", ar: "D3 وB6 وB12" },
      },
      {
        name: { fr: "Format", ar: "الحجم" },
        value: { fr: "30 gélules (cure de 30 jours)", ar: "30 كبسولة (كورة 30 يومًا)" },
      },
      {
        name: { fr: "Posologie", ar: "الجرعة" },
        value: { fr: "1 gélule / jour", ar: "كبسولة واحدة / يوم" },
      },
      {
        name: { fr: "Moment conseillé", ar: "الوقت المنصوح به" },
        value: { fr: "Le soir, au dîner", ar: "مساءً، مع العشاء" },
      },
      {
        name: { fr: "Convient à", ar: "مناسب لـ" },
        value: { fr: "Halal, sans gluten", ar: "حلال، بدون غلوتين" },
      },
      {
        name: { fr: "Fabrication", ar: "التصنيع" },
        value: {
          fr: "Maroc — laboratoire certifié ONSSA, ISO 22000, cGMP",
          ar: "المغرب — مختبر معتمد من ONSSA وISO 22000 وcGMP",
        },
      },
    ],
    reviews: [
      {
        name: "Zineb",
        location: { fr: "Rabat", ar: "الرباط" },
        rating: 5,
        quote: {
          fr: "Je dors mieux et je suis beaucoup moins irritable depuis que j'en prends le soir.",
          ar: "أنام بشكل أفضل وأصبحت أقل توترًا منذ أن بدأت تناوله مساءً.",
        },
      },
      {
        name: "Ouiam",
        location: { fr: "Marrakech", ar: "مراكش" },
        rating: 5,
        quote: {
          fr: "Une gélule le soir, facile à retenir, et le pot de 30 correspond exactement au mois.",
          ar: "كبسولة واحدة مساءً، سهلة التذكر، والعبوة من 30 كبسولة تكفي الشهر بالضبط.",
        },
        translated: true,
      },
      {
        name: "Meryem",
        location: { fr: "Oujda", ar: "وجدة" },
        rating: 4,
        quote: {
          fr: "Prise en soirée, elle m'aide vraiment à décompresser après une journée chargée. Je recommande la formule en abonnement pour ne jamais en manquer.",
          ar: "أتناولها مساءً وتساعدني فعلاً على الاسترخاء بعد يوم مليء بالعمل. أنصح بصيغة الاشتراك حتى لا تنفد أبدًا.",
        },
      },
    ],
    price: 249,
    compareAtPrice: 299,
  },
  {
    id: "omega3-age-well",
    slug: "omega3-age-well",
    category: "heart",
    name: {
      fr: "Oméga 3 AGE-WELL®",
      ar: "أوميغا 3 AGE-WELL®",
    },
    tagline: {
      fr: "Cœur, cerveau, vision — 1 capsule par jour",
      ar: "القلب، الدماغ، النظر — كبسولة واحدة يوميًا",
    },
    description: [
      {
        fr: "Notre oméga 3 AGE-WELL® associe deux acides gras essentiels, l'EPA et le DHA, dans une formule concentrée pensée pour soutenir la santé cardiovasculaire, les fonctions cognitives et la vision, dans le cadre d'une routine bien-être globale et durable.",
        ar: "تجمع تركيبة أوميغا 3 AGE-WELL® لدينا بين حمضين دهنيين أساسيين، EPA وDHA، في تركيبة مركّزة مصممة لدعم صحة القلب والأوعية الدموية والوظائف الإدراكية والنظر، ضمن روتين عافية شامل ومستدام.",
      },
      {
        fr: "Le corps ne produit pas naturellement ces acides gras : ils doivent provenir de l'alimentation ou d'une supplémentation. L'EPA participe au maintien d'une fonction cardiaque normale, tandis que le DHA contribue au maintien d'une vision et d'une fonction cérébrale normales, deux apports particulièrement utiles dans le cadre d'une alimentation moderne souvent pauvre en poisson gras.",
        ar: "لا يُنتج الجسم هذه الأحماض الدهنية بشكل طبيعي: يجب أن تأتي من الغذاء أو من مكمل غذائي. يساهم EPA في الحفاظ على وظيفة قلبية طبيعية، بينما يساهم DHA في الحفاظ على الرؤية والوظيفة الدماغية الطبيعية، وهما مساهمتان مفيدتان بشكل خاص ضمن نظام غذائي حديث غالبًا ما يكون فقيرًا بالأسماك الدهنية.",
      },
      {
        fr: "Capsules purifiées, sans goût de poisson persistant, à raison d'une seule par jour au cours d'un repas pour une meilleure assimilation. Formulé et conditionné au Maroc dans un laboratoire certifié ONSSA, ISO 22000 et cGMP.",
        ar: "كبسولات نقية، بدون طعم سمك مزعج، بمعدل كبسولة واحدة يوميًا مع إحدى الوجبات لامتصاص أفضل. تُصاغ وتُعبّأ التركيبة في المغرب داخل مختبر معتمد من ONSSA وISO 22000 وcGMP.",
      },
    ],
    highlights: [
      { fr: "30 capsules — 1 mois de cure", ar: "30 كبسولة — كورة لمدة شهر" },
      { fr: "1 capsule par jour", ar: "كبسولة واحدة يوميًا" },
      { fr: "Cœur, cerveau et vision", ar: "القلب والدماغ والنظر" },
      {
        fr: "EPA/DHA hautement dosés et purifiés",
        ar: "EPA/DHA بجرعات عالية ونقاء عالي",
      },
      { fr: "Sans goût de poisson — 100% halal", ar: "بدون طعم السمك — حلال 100%" },
    ],
    images: [
      "/products/omega3-age-well-bottle.jpg",
      "/products/omega3-age-well-2.jpg",
      "/products/omega3-age-well-3.jpg",
      "/products/omega3-age-well-4.jpg",
      "/ad_creatives/omega3-age-well-campaign-hero.jpg",
      "/ad_creatives/omega3-age-well-campaign-science.jpg",
      "/ad_creatives/bundle-campaign-routine.jpg",
    ],
    imageAlt: {
      fr: "Flacon Oméga 3 AGE-WELL® Humble+",
      ar: "عبوة أوميغا 3 AGE-WELL® من Humble+",
    },
    usageSteps: [
      {
        title: { fr: "Dosez", ar: "قيسي" },
        description: {
          fr: "Prenez 1 capsule par jour, de préférence au cours d'un repas.",
          ar: "تناولي كبسولة واحدة يوميًا، ويُفضّل مع إحدى الوجبات.",
        },
      },
      {
        title: { fr: "Avalez", ar: "ابتلعي" },
        description: {
          fr: "Avec un grand verre d'eau, pour une meilleure assimilation.",
          ar: "مع كأس كبير من الماء، لامتصاص أفضل.",
        },
      },
      {
        title: { fr: "Restez régulière", ar: "حافظي على الانتظام" },
        description: {
          fr: "Une cure de 30 jours à intégrer à votre routine bien-être.",
          ar: "كورة لمدة 30 يومًا تُدمج في روتين عافيتك.",
        },
      },
    ],
    facts: [
      {
        name: { fr: "Ingrédient principal", ar: "المكوّن الرئيسي" },
        value: { fr: "Oméga 3 (EPA/DHA)", ar: "أوميغا 3 (EPA/DHA)" },
      },
      {
        name: { fr: "Format", ar: "الحجم" },
        value: { fr: "30 capsules (cure de 30 jours)", ar: "30 كبسولة (كورة 30 يومًا)" },
      },
      {
        name: { fr: "Posologie", ar: "الجرعة" },
        value: { fr: "1 capsule / jour", ar: "كبسولة واحدة / يوم" },
      },
      {
        name: { fr: "Moment conseillé", ar: "الوقت المنصوح به" },
        value: { fr: "Au cours d'un repas", ar: "مع إحدى الوجبات" },
      },
      {
        name: { fr: "Origine", ar: "المصدر" },
        value: { fr: "Huile de poisson purifiée", ar: "زيت سمك نقي" },
      },
      {
        name: { fr: "Convient à", ar: "مناسب لـ" },
        value: { fr: "Halal", ar: "حلال" },
      },
      {
        name: { fr: "Fabrication", ar: "التصنيع" },
        value: {
          fr: "Maroc — laboratoire certifié ONSSA, ISO 22000, cGMP",
          ar: "المغرب — مختبر معتمد من ONSSA وISO 22000 وcGMP",
        },
      },
    ],
    reviews: [
      {
        name: "Samira",
        location: { fr: "Tanger", ar: "طنجة" },
        rating: 5,
        quote: {
          fr: "Capsules faciles à avaler, sans le goût de poisson que je redoutais.",
          ar: "كبسولات سهلة الابتلاع، بدون طعم السمك الذي كنت أخشاه.",
        },
      },
      {
        name: "Btissam",
        location: { fr: "Casablanca", ar: "الدار البيضاء" },
        rating: 4,
        quote: {
          fr: "Je la prends en complément du collagène, ça s'intègre bien à ma routine du matin.",
          ar: "أتناوله مع الكولاجين، ويندمج جيدًا في روتيني الصباحي.",
        },
        translated: true,
      },
      {
        name: "Asmaa",
        location: { fr: "Meknès", ar: "مكناس" },
        rating: 5,
        quote: {
          fr: "Mon médecin m'avait parlé des oméga 3 pour le cœur, j'ai choisi cette marque pour la traçabilité et le fait que ce soit fabriqué au Maroc.",
          ar: "تحدث لي طبيبي عن فوائد أوميغا 3 للقلب، اخترت هذه العلامة لموثوقية المصدر ولأنها مُصنّعة في المغرب.",
        },
      },
    ],
    price: 229,
    compareAtPrice: 279,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(amount: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "ar" ? "ar-MA" : "fr-MA", {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 0,
  }).format(amount);
}
