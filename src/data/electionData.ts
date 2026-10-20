import { Candidate, NigerianState, GeopoliticalZone, IssuePollOption, QuizQuestion, Comment } from '../types/election';

export const CANDIDATES: Candidate[] = [
  {
    id: 'tinubu',
    name: 'Bola Ahmed Tinubu',
    fullName: 'Asiwaju Bola Ahmed Adekunle Tinubu',
    party: 'APC',
    partyFullName: 'All Progressives Congress',
    partyLogo: 'broom',
    partyColor: '#1d4ed8', // Royal Blue
    secondaryColor: '#f59e0b',
    photoUrl: `${import.meta.env.BASE_URL}candidates/tinubu_bola_apc.jpg`,
    age: 74,
    stateOfOrigin: 'Lagos State',
    zone: 'South West',
    slogan: 'Renewed Hope 2.0: Consolidation & Economic Renaissance',
    bio: 'Incumbent 16th President of Nigeria (elected 2023), former 2-term Governor of Lagos State (1999–2007), and longtime national leader of the All Progressives Congress. Known for masterminding Lagos fiscal modernisation and bold macroeconomic policy shifts.',
    previousOffices: [
      'President, Federal Republic of Nigeria (2023–Present)',
      'Governor of Lagos State (1999–2007)',
      'Senator for Lagos West (1992–1993)'
    ],
    manifestoSummary: 'Focuses on consolidating macroeconomic reforms (FX market stability, revenue generation), completing the landmark 700km Lagos-Calabar Coastal Highway and Sokoto-Badagry corridor, expanding the Nigerian Education Loan Fund (NELFUND), and boosting crude oil & gas output to 2M+ barrels/day.',
    manifestoPillars: [
      {
        title: 'Infrastructure Megaprojects',
        description: 'Accelerate the Lagos-Calabar coastal corridor, national rail expansion, and regional renewable mini-grids.',
        icon: 'Hammer'
      },
      {
        title: 'Fiscal Reform & Tax Modernisation',
        description: 'Simplify corporate and personal taxes to 9% non-oil GDP ratio, curb multiple taxation, and foster FDI.',
        icon: 'TrendingUp'
      },
      {
        title: 'Social Investment & Student Loans',
        description: 'Universal access to zero-interest higher education loans via NELFUND and direct cash transfers to vulnerable households.',
        icon: 'GraduationCap'
      },
      {
        title: 'National Security Consolidation',
        description: 'Modernise armed forces with automated surveillance drones, police welfare upgrades, and inter-agency intelligence synergy.',
        icon: 'ShieldCheck'
      }
    ],
    policyStances: [
      {
        topic: 'Economy & Naira',
        stance: 'Consolidate Market-Driven Floating & Export Diversification',
        details: 'Maintain unified foreign exchange window while boosting non-oil exports and local manufacturing incentives to stabilize the Naira naturally.'
      },
      {
        topic: 'Fuel Subsidy',
        stance: 'No Return to Fuel Subsidy; Invest in CNG Mobility',
        details: 'Direct fuel subsidy savings into Presidential Compressed Natural Gas (Pi-CNG) mass transit, electric buses, and infrastructure.'
      },
      {
        topic: 'Security & Policing',
        stance: 'State Police in Alignment with National Assembly',
        details: 'Supports constitutional amendment for decentralised state police backed by robust federal oversight and forensic training.'
      },
      {
        topic: 'Minimum Wage',
        stance: 'Periodic Living Wage Review (Current ₦70k Baseline)',
        details: 'Phased implementation of tripartite living wage framework with productivity metrics and state capacity alignment.'
      },
      {
        topic: 'Electricity & Grid',
        stance: 'Decentralised Energy Act Implementation',
        details: 'Empower states and private developers to generate, transmit, and distribute electricity off the national grid collapses.'
      }
    ]
  },
  {
    id: 'obi',
    name: 'Obi Peter Gregory',
    fullName: 'Obi Peter Gregory, CON',
    party: 'NDC',
    partyFullName: 'National Democratic Coalition (NDC)',
    partyLogo: 'victory',
    partyColor: '#059669', // Emerald Green & Red of NDC
    secondaryColor: '#dc2626',
    photoUrl: `${import.meta.env.BASE_URL}candidates/obi_peter_ndc.jpg`,
    age: 65,
    stateOfOrigin: 'Anambra State',
    zone: 'South East',
    slogan: 'From Consumption to Production: A New Nigeria is PO-ssible',
    bio: 'Former 2-term Governor of Anambra State (2006–2014), renowned businessman, and 2023 presidential candidate who ignited the youth-led "Obidient" movement. Noted for unprecedented fiscal frugality, leaving zero debt in Anambra, and prioritizing basic education and health.',
    previousOffices: [
      'Governor of Anambra State (2006–2014)',
      'Chairman, Nigerian Security and Exchange Commission (SEC)',
      'Chairman, Fidelity Bank Plc'
    ],
    manifestoSummary: 'Radically slash the cost of governance, channel resources directly into MSME agriculture and technology hubs across the North and South, restore rule of law, and shift Nigeria from an oil-dependent consuming nation to an export-led agrarian and manufacturing powerhouse.',
    manifestoPillars: [
      {
        title: 'Drastic Governance Cost Cuts',
        description: 'Abolish non-essential presidential fleet, legislative extravagance, and redundant agencies (enforce Oronsaye Report).',
        icon: 'Scissors'
      },
      {
        title: 'Agricultural Industrialisation',
        description: 'Cultivate vast arable lands in northern states to feed Africa, generate foreign exchange, and eliminate food inflation.',
        icon: 'Sprout'
      },
      {
        title: 'Human Capital & Education (Budget 15%)',
        description: 'Dedicate at least 15% of national budget to health and STEM education, eradicating out-of-school children.',
        icon: 'BookOpen'
      },
      {
        title: 'Rule of Law & Anti-Corruption',
        description: 'Zero tolerance for graft, transparent treasury monitoring, public contract bidding, and independent judicial reform.',
        icon: 'Scale'
      }
    ],
    policyStances: [
      {
        topic: 'Economy & Naira',
        stance: 'Production-Backed Currency & Zero Waste',
        details: 'Stop arbitrary ways-and-means central bank borrowing; support small enterprises with seed grants to produce exportable goods.'
      },
      {
        topic: 'Fuel Subsidy',
        stance: 'Transparent Subsidy Removal with Immediate Public Safety Nets',
        details: 'Acknowledge organized criminal theft in previous subsidy regimes; redirect all savings transparently into public healthcare and primary schooling.'
      },
      {
        topic: 'Security & Policing',
        stance: 'Community & Multi-Tier Policing',
        details: 'Create state, local council, and community police structures with modern digital biometric tracking and intelligence networks.'
      },
      {
        topic: 'Minimum Wage',
        stance: 'Productivity-Indexed Living Wage with Tax Shield',
        details: 'Raise lowest tier worker income while exempting low-income earners from multiple local taxes and providing subsidized transport.'
      },
      {
        topic: 'Electricity & Grid',
        stance: '20,000MW Generation Target via Solar & Gas',
        details: 'Partner with international green energy funds to build large-scale solar farms in northern desert corridors and gas turbines in Niger Delta.'
      }
    ]
  },
  {
    id: 'atiku',
    name: 'Atiku Abubakar',
    fullName: 'Alhaji Atiku Abubakar, GCON',
    party: 'ADC',
    partyFullName: 'African Democratic Congress (ADC)',
    partyLogo: 'handshake',
    partyColor: '#1e40af', // Deep Blue of ADC
    secondaryColor: '#10b981',
    photoUrl: `${import.meta.env.BASE_URL}candidates/atiku_abubakar_adc.jpg`,
    age: 80,
    stateOfOrigin: 'Adamawa State',
    zone: 'North East',
    slogan: 'A Covenant with Nigerians: Restructuring, Unity & Prosperity',
    bio: 'Former Vice President of the Federal Republic of Nigeria (1999–2007) under President Olusegun Obasanjo. Headed the National Council on Privatization, which spearheaded telecoms deregulation (GSM revolution), banking consolidation, and pension reforms.',
    previousOffices: [
      'Vice President of Nigeria (1999–2007)',
      'Governor-Elect, Adamawa State (1998)',
      'Deputy Director, Nigerian Customs Service (1982–1989)'
    ],
    manifestoSummary: 'Championing comprehensive constitutional devolution of powers to federating states, rapid privatization of idle government assets including NNPC refineries, creating a $10 Billion Economic Stimulus Fund for youth startups, and uniting the nation across ethnic divides.',
    manifestoPillars: [
      {
        title: 'Constitutional Restructuring',
        description: 'Devolve exclusive legislative items (policing, mineral mining, railways) to states for true federalism.',
        icon: 'FileText'
      },
      {
        title: '$10 Billion Youth Stimulus Fund',
        description: 'Provide venture capital, tech incubation, and zero-collateral credit for 5 million young Nigerian entrepreneurs.',
        icon: 'Briefcase'
      },
      {
        title: 'Privatisation of Refineries & Rail',
        description: 'Concession state-owned refineries and rail corridors to world-class private operators to eliminate recurring losses.',
        icon: 'Building2'
      },
      {
        title: 'National Reconciliation & Unity',
        description: 'Equitable federal character representation in all key military, economic, and judicial appointments.',
        icon: 'Users'
      }
    ],
    policyStances: [
      {
        topic: 'Economy & Naira',
        stance: 'Private-Sector Led Deregulation & Capital Inflows',
        details: 'Attract foreign direct investment through policy predictability, privatize unviable public corporations, and expand Diaspora remittances.'
      },
      {
        topic: 'Fuel Subsidy',
        stance: 'Complete Deregulation with Refinery Concessioning',
        details: 'Ensure transparent competition among downstream players and private refineries (e.g., Dangote, BUA) without federal interference.'
      },
      {
        topic: 'Security & Policing',
        stance: 'Immediate Creation of State Police',
        details: 'Full constitutional devolution allowing state governors operational control over local state police services.'
      },
      {
        topic: 'Minimum Wage',
        stance: 'Negotiated Federal & State Tiered Remuneration',
        details: 'Allow sub-nationals to set wages corresponding with state GDP while federal government sets benchmark living standard.'
      },
      {
        topic: 'Electricity & Grid',
        stance: 'Total Power Sector Unbundling & Transmission Concession',
        details: 'Break Transmission Company of Nigeria (TCN) into regional independent system operators to eliminate single-point grid collapses.'
      }
    ]
  },
  {
    id: 'okwori',
    name: 'Ada Elizabeth Fredrick Okwori',
    fullName: 'Chief (Mrs.) Ada Elizabeth Fredrick Okwori',
    party: 'NDP',
    partyFullName: 'National Democratic Party (NDP)',
    partyLogo: 'balance',
    partyColor: '#be185d', // Magenta / Deep Pink
    secondaryColor: '#f59e0b',
    photoUrl: `${import.meta.env.BASE_URL}candidates/ada_okwori_ndp.jpg`,
    age: 52,
    stateOfOrigin: 'Benue State',
    zone: 'North Central',
    slogan: "Inclusion, Compassion & National Renewal: A Mother's Heart for Nigeria",
    bio: "Distinguished agro-industrial entrepreneur, gender equity advocate, and civic leader from the North Central. Renowned for community grassroots development, cooperative credit schemes, maternal healthcare initiatives, and modern agricultural storage across middle-belt agrarian states.",
    previousOffices: [
      'National Chairperson, Women in Agro-Allied Enterprises',
      'Presidential Candidate, NDP',
      'Member, National Advisory Council on Grassroots Development'
    ],
    manifestoSummary: "Driving a middle-belt agro-processing revolution, establishing subsidized micro-credit banks for market women and youth, guaranteeing zero-maternal-mortality healthcare centers in all 774 LGAs, and strengthening agrarian community defense guards.",
    manifestoPillars: [
      {
        title: 'Agro-Allied Industrial Zones',
        description: 'Construct modern cold-chain silos and crop-processing hubs across agrarian belts to eliminate 40% post-harvest loss.',
        icon: 'Sprout'
      },
      {
        title: 'Women & Youth Micro-Credit Bank',
        description: 'Provide single-digit interest loans and digital grants to 10 million female market traders and youth farmers.',
        icon: 'Coins'
      },
      {
        title: 'Free Maternal & Child Healthcare',
        description: 'Zero fees for prenatal, delivery, and pediatric care under age 5 in all primary healthcare centers nationwide.',
        icon: 'HeartPulse'
      },
      {
        title: 'Agrarian Community Forest Guards',
        description: 'Equip vetted local community wardens with modern communication gear to protect agrarian villages and farmers.',
        icon: 'ShieldCheck'
      }
    ],
    policyStances: [
      {
        topic: 'Economy & Naira',
        stance: 'Grassroots Food Sovereignty & Cooperative Export Trade',
        details: 'Halt inflationary food imports by subsidizing domestic mechanized tillage, fertilizer blends, and rural feeder roads.'
      },
      {
        topic: 'Fuel Subsidy',
        stance: 'Transparent Social Cushion for Rural Transport & Farm Inputs',
        details: 'Direct savings from deregulated petroleum into heavily subsidized mass transit buses and CNG conversion for farm trucks.'
      },
      {
        topic: 'Security & Policing',
        stance: 'Decentralized Community Defense & Intelligence Hubs',
        details: 'Integrate traditional rulers and community vigilantes into state police structures for early-warning threat detection.'
      },
      {
        topic: 'Minimum Wage',
        stance: 'Living Wage with Guaranteed Inflation Protection & Child Benefit',
        details: 'Ensure wages keep pace with real market food costs while instituting monthly child nutrition allowances for low-income mothers.'
      },
      {
        topic: 'Electricity & Grid',
        stance: 'Rural Solar Mini-Grids for Farming Communities & Clinics',
        details: 'Deploy decentralized off-grid solar and biomass plants to guarantee 24/7 power to primary health centers and cold-storage facilities.'
      }
    ]
  },
  {
    id: 'sowore',
    name: 'Sowore Omoyele Stephen',
    fullName: 'Sowore Omoyele Stephen',
    party: 'AAC',
    partyFullName: 'African Action Congress (AAC)',
    partyLogo: 'fist',
    partyColor: '#ea580c', // Bright Orange
    secondaryColor: '#000000',
    photoUrl: `${import.meta.env.BASE_URL}candidates/sowore_omoyele_aac.jpg`,
    age: 55,
    stateOfOrigin: 'Ondo State',
    zone: 'South West',
    slogan: 'Take It Back! People-Powered Revolution for Social Justice',
    bio: 'Renowned human rights activist, former UNILAG Student Union President, founder of the whistleblowing investigative platform Sahara Reporters, and convener of the #RevolutionNow movement. An outspoken champion of radical socio-economic transformation.',
    previousOffices: [
      'Presidential Candidate, AAC (2019 & 2023)',
      'National Chairman, African Action Congress (AAC)',
      'President, University of Lagos Students Union Government (1992–1994)'
    ],
    manifestoSummary: 'Instituting a living minimum wage of ₦250,000, free public healthcare and free tertiary education, total recovery of stolen public assets, cancellation of exploitative foreign resource contracts, and criminal prosecution of corrupt political elites.',
    manifestoPillars: [
      {
        title: '₦250k Living Wage & Workers Rights',
        description: 'Direct wealth from natural resources to frontline workers, teachers, nurses, and civil servants.',
        icon: 'Coins'
      },
      {
        title: '100% Free Public Health & Education',
        description: 'Abolish all user fees in federal teaching hospitals and universities funded through elite luxury wealth taxes.',
        icon: 'HeartPulse'
      },
      {
        title: 'Anti-Corruption People\'s Tribunal',
        description: 'Special expedited courts to recover billions stolen by past political rulers and ban looters from public office.',
        icon: 'Gavel'
      },
      {
        title: 'Resource Sovereignty & Self-Reliance',
        description: 'Revoke one-sided multinational oil and solid mineral mining concessions for local community stewardship.',
        icon: 'Flame'
      }
    ],
    policyStances: [
      {
        topic: 'Economy & Naira',
        stance: 'Socialist Industrialization & Currency Sovereignty',
        details: 'Stop IMF/World Bank dictate policies; mandate domestic value addition before any raw solid minerals or oil leave Nigerian soil.'
      },
      {
        topic: 'Fuel Subsidy',
        stance: 'Subsidize Living Essentials; Fix 4 Public Refineries in 12 Months',
        details: 'Refurbish Port Harcourt, Warri, and Kaduna refineries to refine 100% domestic crude at production-cost pricing for all Nigerians.'
      },
      {
        topic: 'Security & Policing',
        stance: 'Democratize Security & High-Tech Citizen Protection',
        details: 'Equip rank-and-file officers with living wages, life insurance, and remove VIP escorts so officers protect ordinary citizens.'
      },
      {
        topic: 'Minimum Wage',
        stance: '₦250,000 Immediate Living Wage Benchmark',
        details: 'Match wages to realistic inflation and cost of food, housing, and transportation.'
      },
      {
        topic: 'Electricity & Grid',
        stance: 'Publicly-Owned National Power Infrastructure',
        details: 'Reverse disastrous DisCo privatization that enriched cronies while citizens suffer persistent blackouts.'
      }
    ]
  },
  {
    id: 'omoaje',
    name: 'Adekunle Rufai Omoaje',
    fullName: 'Chief Adekunle Rufai Omoaje',
    party: 'AA',
    partyFullName: 'Action Alliance (AA)',
    partyLogo: 'zap',
    partyColor: '#1e3a8a', // Royal Navy Blue of Action Alliance
    secondaryColor: '#15803d',
    photoUrl: `${import.meta.env.BASE_URL}candidates/adekunle_omoaje_aa.jpg`,
    age: 68,
    stateOfOrigin: 'Osun State',
    zone: 'South West',
    slogan: 'Action Alliance: Mass Mobilisation, Grassroots Economy & True Federalism',
    bio: 'Veteran political organizer, elder statesman, and National Chairman and leader of the Action Alliance (AA). A lifelong campaigner for mass grassroots participatory democracy, youth inclusion in governance, and self-reliant national industrial development.',
    previousOffices: [
      'National Chairman, Action Alliance (AA)',
      'Civic Rights Convener & Community Elder',
      'Coordinator, Coalition for Grassroots Democracy'
    ],
    manifestoSummary: 'Prioritizing immediate industrialization of local communities, youth agricultural cooperatives, full local government financial autonomy, and free universal vocational schooling across all 774 councils.',
    manifestoPillars: [
      {
        title: 'Local Council Autonomy',
        description: 'Direct federal allocation to all 774 Local Government Areas, stripping state governors of joint-account deductions.',
        icon: 'Building'
      },
      {
        title: 'Youth Agro & Artisan Alliance',
        description: 'Provide interest-free capital and modern machinery to artisanal guilds, technicians, and rural youth farm clusters.',
        icon: 'Users'
      },
      {
        title: 'Free Vocational Education',
        description: 'Transform technical colleges into tuition-free innovation academies focused on industrial manufacturing and engineering.',
        icon: 'GraduationCap'
      },
      {
        title: 'Community-Driven Security',
        description: 'Empower local community defense watches with direct funding, communications, and neighborhood patrol mobility.',
        icon: 'ShieldCheck'
      }
    ],
    policyStances: [
      {
        topic: 'Economy & Naira',
        stance: 'Production-Driven Grassroots Industrialization',
        details: 'Revitalize cottage manufacturing and local textile mills to curb foreign exchange drain on basic goods.'
      },
      {
        topic: 'Fuel Subsidy',
        stance: 'Direct Citizens Dividend from Domestic Crude Refining',
        details: 'Enforce local supply obligations to domestic refineries and channel fuel savings into community mass transit.'
      },
      {
        topic: 'Security & Policing',
        stance: 'True Federalism & Constitutional Community Policing',
        details: 'Devolve police command structures to local government councils for immediate neighborhood vigilance.'
      },
      {
        topic: 'Minimum Wage',
        stance: 'Productivity-Indexed Living Wage with Zero LGA Tax on Workers',
        details: 'Protect frontline workers with automatic inflation adjustments and affordable public housing schemes.'
      },
      {
        topic: 'Electricity & Grid',
        stance: 'Decentralized Municipal Micro-Grids & Solar Co-ops',
        details: 'Permit local councils to partner with clean energy firms to power municipal waterworks, markets, and light industry.'
      }
    ]
  },
  {
    id: 'adenuga',
    name: 'Adenuga Sunday Oluwafemi',
    fullName: 'Adenuga Sunday Oluwafemi',
    party: 'BP',
    partyFullName: 'Boot Party (BP)',
    partyLogo: 'footprints',
    partyColor: '#16a34a', // Emerald Green & Crimson of Boot Party
    secondaryColor: '#dc2626',
    photoUrl: `${import.meta.env.BASE_URL}candidates/adenuga_sunday_bp.jpg`,
    age: 52,
    stateOfOrigin: 'Ogun State',
    zone: 'South West',
    slogan: 'Walk the Talk: Youth Innovation, Technological Renewal & Economic Self-Sufficiency',
    bio: 'Distinguished technology entrepreneur, business consultant, and National Chairman and founder of the Boot Party (BP). An ardent advocate for youth leadership, digitizing public service delivery, fostering local software development, and modernizing Nigeria manufacturing base.',
    previousOffices: [
      'National Chairman, Boot Party (BP)',
      'Presidential Candidate, BP (2023)',
      'Chief Executive Officer & IT Systems Architect'
    ],
    manifestoSummary: 'Rebuilding Nigeria via digital governance, nationwide tech hubs in all 774 LGAs, zero-tariff tax holidays for domestic tech startups, transparent electronic procurement, and comprehensive economic diversification away from crude oil dependence.',
    manifestoPillars: [
      {
        title: 'Nationwide Digital Governance',
        description: 'Digitize all federal government revenue collection, payroll, and procurement to eliminate 90% of bureaucratic graft.',
        icon: 'Cpu'
      },
      {
        title: '774 LGA Youth Innovation Centers',
        description: 'Equip every local government area with high-speed fiber internet, solar-powered tech incubation hubs, and coding bootcamps.',
        icon: 'Laptop'
      },
      {
        title: 'Start-Up Tax Holiday & Angel Fund',
        description: 'Provide 5-year federal tax exemption and $500M seed matching fund for Nigerian software and manufacturing ventures.',
        icon: 'Coins'
      },
      {
        title: 'Smart Border & Digital Defense',
        description: 'Deploy automated drone squadrons and biometric surveillance along national frontiers to suppress terrorism and smuggling.',
        icon: 'ShieldCheck'
      }
    ],
    policyStances: [
      {
        topic: 'Economy & Naira',
        stance: 'Knowledge-Driven Economy & Software Export Revenues',
        details: 'Position Nigeria to generate $50 Billion annually in software, IT outsourcing, and digital engineering exports to strengthen the Naira.'
      },
      {
        topic: 'Fuel Subsidy',
        stance: 'Complete Digital Transparency & Targeted Green Mobility Rebates',
        details: 'Enforce real-time telemetry on domestic oil refining and redirect subsidy savings into student and worker green mobility vouchers.'
      },
      {
        topic: 'Security & Policing',
        stance: 'High-Tech Biometric Policing & State Autonomy',
        details: 'Integrate national database biometrics with rapid-response tactical teams and state police units for predictive crime prevention.'
      },
      {
        topic: 'Minimum Wage',
        stance: 'Tech-Indexed Living Wage with Remote Work Tax Shields',
        details: 'Ensure workers earn a dignity wage matched to inflation, while incentivizing companies adopting flexible and remote work arrangements.'
      },
      {
        topic: 'Electricity & Grid',
        stance: 'Decentralized Clean Solar & Smart-Grid Automation',
        details: 'Replace vulnerable legacy national transmission architecture with automated regional smart grids powered by commercial solar.'
      }
    ]
  },
  {
    id: 'adebayo',
    name: 'Adewole Adebayo',
    fullName: 'Barr. Adewole Adebayo',
    party: 'SDP',
    partyFullName: 'Social Democratic Party (SDP)',
    partyLogo: 'horse',
    partyColor: '#dc2626', // Crimson Red & White of SDP
    secondaryColor: '#16a34a',
    photoUrl: `${import.meta.env.BASE_URL}candidates/adewole_adebayo_sdp.jpg`,
    age: 54,
    stateOfOrigin: 'Ondo State',
    zone: 'South West',
    slogan: 'Hope Again: Constitutional Integrity, Justice, Peace and Progress',
    bio: 'Eminent international legal scholar, media proprietor (founder of KAFTAN TV), and 2023 presidential candidate of the Social Democratic Party (SDP). A staunch defender of Chapter 2 of the Nigerian Constitution (Fundamental Objectives and Directive Principles of State Policy), advocating for socio-economic justice, accountable leadership, and rule of law.',
    previousOffices: [
      'Presidential Candidate, SDP (2023)',
      'Founder & Chairman, KAFTAN TV Network',
      'Principal Partner, Adebayo & Associates Law Firm'
    ],
    manifestoSummary: 'Enforcing constitutional Chapter 2 mandates for free qualitative healthcare and education, executing a 30-million job industrial plan, recovering all looted public petroleum assets, and running a transparent, waste-free administration.',
    manifestoPillars: [
      {
        title: 'Constitutional Chapter 2 Enforcement',
        description: 'Make healthcare, education, shelter, and full employment legally enforceable socioeconomic rights for every Nigerian citizen.',
        icon: 'Scale'
      },
      {
        title: 'National Full Employment Charter',
        description: 'Mobilize $50 Billion into domestic agro-industrial clusters, light manufacturing, and mass civil engineering to create 30 million jobs.',
        icon: 'Briefcase'
      },
      {
        title: 'Zero Tolerance Anti-Graft & Asset Recovery',
        description: 'Establish specialized public integrity commissions to repatriate stolen public treasury assets and eliminate oil bunkering.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Mass Public Housing & Urban Renewal',
        description: 'Construct 2 million affordable social housing units across 36 states with single-digit interest 25-year mortgages.',
        icon: 'Home'
      }
    ],
    policyStances: [
      {
        topic: 'Economy & Naira',
        stance: 'Production-Led Currency Stability & Industrial Credit',
        details: 'End extractive monetary speculation; tie commercial bank credit directly to real-sector factories, food production, and national exports.'
      },
      {
        topic: 'Fuel Subsidy',
        stance: 'Eradicate Organized Corruption in Petroleum Sector & Refine 100% at Home',
        details: 'Audit the NNPC completely, hold past subsidy cartels accountable, and refine Nigerian crude domestically at transparent production prices.'
      },
      {
        topic: 'Security & Policing',
        stance: 'Integrated National Intelligence Command & Welfare Overhaul',
        details: 'Equip rank-and-file armed forces with advanced tactical drones, secure communications, and guaranteed family welfare benefits.'
      },
      {
        topic: 'Minimum Wage',
        stance: 'Constitutional Living Wage Benchmarked to Cost of Living Index',
        details: 'Implement an automatic periodic wage escalator tied to real consumer prices to ensure working families live with dignity.'
      },
      {
        topic: 'Electricity & Grid',
        stance: 'Integrated Regional Gas, Hydro & Solar Power Plants',
        details: 'Construct dedicated regional power generation corridors with guaranteed feedstock supply to achieve 25,000MW stable distribution.'
      }
    ]
  },
  {
    id: 'abbas',
    name: 'Aliyu Bin Abbas',
    fullName: 'Amb. Aliyu Bin Abbas',
    party: 'ADP',
    partyFullName: 'Action Democratic Party (ADP)',
    partyLogo: 'book',
    partyColor: '#1e3a8a', // Deep Blue & Gold of ADP
    secondaryColor: '#eab308',
    photoUrl: `${import.meta.env.BASE_URL}candidates/aliyu_abbas_adp.jpg`,
    age: 44,
    stateOfOrigin: 'Borno State',
    zone: 'North East',
    slogan: 'Birthing a New Nigeria: Nigeria First, Youth Empowerment & Inclusive Governance',
    bio: 'Dynamic youth leader, humanitarian, founder and Youth President of the National Youth Alliance (NYA), and 2027 presidential candidate of the Action Democratic Party (ADP). Championing generational transition, youth entrepreneurship, and bridging regional divides across Nigeria.',
    previousOffices: [
      'Presidential Candidate, ADP (2027)',
      'Founder & Youth President, National Youth Alliance (NYA)',
      'Founder, Aliyu Care Foundation'
    ],
    manifestoSummary: 'Centering a new generational leadership compact: dedicating 40% of federal ministerial appointments to youths and women, establishing a $5 Billion national youth enterprise bank, revitalizing agrarian Northern communities, and comprehensive educational restructuring.',
    manifestoPillars: [
      {
        title: 'Youth & Gender Leadership Quota (40%)',
        description: 'Mandate that at least 40% of federal ministers, agency heads, and board appointments are reserved for women and youth under 45.',
        icon: 'Users'
      },
      {
        title: '$5 Billion Youth Innovation Bank',
        description: 'Single-digit interest capital and grants for youth-led ventures in technology, green energy, fashion, and agro-allied processing.',
        icon: 'Coins'
      },
      {
        title: 'Almajiri & Out-of-School Reform',
        description: 'Integrate secular STEM education with modern vocational craft training to empower 15 million vulnerable northern youths.',
        icon: 'GraduationCap'
      },
      {
        title: 'Food Security & Dry Season Irrigation',
        description: 'Solar irrigation micro-dams along the Lake Chad basin and Sahel corridors to guarantee year-round grain and vegetable harvests.',
        icon: 'Sprout'
      }
    ],
    policyStances: [
      {
        topic: 'Economy & Naira',
        stance: 'Youth Entrepreneurship & Agro-Manufacturing Exports',
        details: 'Channel commercial lending into young entrepreneurs manufacturing local consumer goods to reduce dollar import reliance.'
      },
      {
        topic: 'Fuel Subsidy',
        stance: 'Transparent Reinvestment in Mass Student & Youth Transit',
        details: 'Audit downstream oil supply chains and reinvest subsidy savings into free university commuter buses and vocational school grants.'
      },
      {
        topic: 'Security & Policing',
        stance: 'Community Intelligence & Border Surveillance Drone Fleet',
        details: 'Deploy youth technology corps to operate border surveillance drones alongside community vigilante early-warning networks.'
      },
      {
        topic: 'Minimum Wage',
        stance: 'Living Dignity Wage with Cost-of-Living Protection',
        details: 'Guarantee that minimum wages rise in lockstep with the inflation rate of basic staples like rice, garri, and transportation.'
      },
      {
        topic: 'Electricity & Grid',
        stance: 'Decentralized Northern Solar Corridors & Mini-Grids',
        details: 'Harness the immense solar irradiance of Northern Nigeria with utility-scale solar parks to power industrial processing clusters.'
      }
    ]
  },
  {
    id: 'okereke',
    name: 'Chibuzo Okereke',
    fullName: 'Dr. Chibuzo Okereke',
    party: 'LP',
    partyFullName: 'Labour Party (LP)',
    partyLogo: 'users',
    partyColor: '#059669', // Emerald Green & Crimson of Labour Party
    secondaryColor: '#dc2626',
    photoUrl: '/candidates/chibuzo_okereke_lp.jpg',
    age: 48,
    stateOfOrigin: 'Abia State',
    zone: 'South East',
    slogan: 'Believe Again: Nigerians First, Restoring Trust & Institutional Renewal',
    bio: 'Distinguished governance expert, legislative policy strategist, institutional reform advocate, and ratified 2027 presidential candidate of the Labour Party (LP). Former Regional Director for West Africa under the African Union Agenda 2063 Chapter and Legislative Consultant to the House of Representatives Public Accounts Committee. Convener of the National Political Equity Movement.',
    previousOffices: [
      'Presidential Candidate, Labour Party (LP)',
      'Regional Director for West Africa, AU Agenda 2063 Chapter',
      'Legislative Consultant, House of Representatives Public Accounts Committee',
      'Convener, National Political Equity Movement'
    ],
    manifestoSummary: 'Built on the "Believe Again" blueprint and a "Nigerians First" philosophy: establishing democratic socialism and social justice, revitalizing institutional accountability, expanding youth and artisan livelihoods, securing grassroots agrarian communities, and ensuring qualitative universal public education and healthcare.',
    manifestoPillars: [
      {
        title: 'Democratic Socialism & Social Justice',
        description: 'Re-align national wealth creation with workers rights, fair minimum wage, dignity of labor, and social protection for vulnerable groups.',
        icon: 'Scale'
      },
      {
        title: 'Institutional & Legislative Reform',
        description: 'Overhaul public accountability, strengthen legislative oversight on public expenditure, and eliminate systemic executive leakages.',
        icon: 'Building2'
      },
      {
        title: 'Nigerians First Economic Stabilization',
        description: 'Support local manufacturing, SME cooperatives, and agricultural value chains to create sustainable dignity jobs.',
        icon: 'Coins'
      },
      {
        title: 'Universal Healthcare & Quality Education',
        description: 'Equip primary healthcare centers across all wards and modernize public basic schools through dedicated education intervention funds.',
        icon: 'GraduationCap'
      }
    ],
    policyStances: [
      {
        topic: 'Economy & Naira',
        stance: 'Productive Economy & Workers Purchasing Power',
        details: 'Stabilize the Naira through local productive capacity, targeted credit for artisans and farmers, and curbing speculative currency trading.'
      },
      {
        topic: 'Fuel Subsidy',
        stance: 'Social Democratic Energy Policy with Transport Cushion',
        details: 'Guarantee domestic refining self-sufficiency while deploying extensive publicly subsidized transport and clean energy mass transit for workers.'
      },
      {
        topic: 'Security & Policing',
        stance: 'Multi-Level Community Policing & Institutional Synergy',
        details: 'Establish well-regulated community and state police units equipped with modern intelligence tools and adequate welfare for frontline personnel.'
      },
      {
        topic: 'Minimum Wage',
        stance: 'Living Dignity Wage Indexed to Cost of Living',
        details: 'Enforce a living wage that guarantees workers can afford decent shelter, food, healthcare, and schooling for their families.'
      },
      {
        topic: 'Electricity & Grid',
        stance: 'Decentralized Clean Energy & Regional Grid Modernization',
        details: 'Invest in off-grid solar, hydro, and natural gas plants to ensure stable 24/7 power for cottage industries, hospitals, and households.'
      }
    ]
  },
  {
    id: 'duke',
    name: 'Donald Duke',
    fullName: 'Donald Duke, CON',
    party: 'PRP',
    partyFullName: 'People\'s Redemption Party (PRP)',
    partyLogo: 'key',
    partyColor: '#dc2626', // Red, White & Black of PRP
    secondaryColor: '#000000',
    photoUrl: '/candidates/donald_duke_prp.jpg',
    age: 64,
    stateOfOrigin: 'Cross River State',
    zone: 'South South',
    slogan: 'Everyone Matters: Creative Economy, Eco-Tourism & Industrial Renaissance',
    bio: 'Former 2-term Governor of Cross River State (1999–2007) and celebrated visionary leader who transformed Calabar into Nigeria\'s premier tourist and cultural destination. Architect of the landmark Tinapa Business and Leisure Resort, the Obudu Cattle Ranch upgrade, and the Calabar Carnival. Long-standing champion of democratic socialism, human-centered governance, and environmental sustainability under the People\'s Redemption Party.',
    previousOffices: [
      'Governor of Cross River State (1999–2007)',
      'Presidential Candidate, SDP/PRP',
      'Commissioner for Finance, Cross River State (1992–1993)'
    ],
    manifestoSummary: 'Re-engineering Nigeria\'s revenue base through high-value eco-tourism, creative industries, clean agricultural logistics, fiscal devolution, and democratic socialist welfare rooted in Mallam Aminu Kano\'s founding PRP philosophy.',
    manifestoPillars: [
      {
        title: 'Eco-Tourism & Creative Economy',
        description: 'Unleash Nigeria\'s $30B tourism and entertainment potential through world-class hospitality corridors and visa-on-arrival reforms.',
        icon: 'Sparkles'
      },
      {
        title: 'Democratic Socialist Welfare',
        description: 'Implement Mallam Aminu Kano\'s foundational PRP charter: universal public schooling, free emergency healthcare, and affordable urban housing.',
        icon: 'HeartHandshake'
      },
      {
        title: 'Agro-Logistics & Export Ports',
        description: 'Connect deep-sea ports with agricultural riverine arteries to position Nigerian produce competitively across global supply chains.',
        icon: 'Ship'
      },
      {
        title: 'Fiscal Decentralization & Clean Cities',
        description: 'Reward sub-nationals based on internally generated economic productivity and nationwide municipal sanitation benchmarks.',
        icon: 'Building'
      }
    ],
    policyStances: [
      {
        topic: 'Economy & Naira',
        stance: 'Diversified Creative & Non-Oil Export Economy',
        details: 'Harness creative services, intellectual property exports, agricultural processing, and international tourism receipts to build deep foreign reserves.'
      },
      {
        topic: 'Fuel Subsidy',
        stance: 'Domestic Energy Processing & Clean Transit Subsidies',
        details: 'Guarantee fair domestic feedstock supplies for all local modular and industrial refineries, redirecting savings into clean urban mass transit.'
      },
      {
        topic: 'Security & Policing',
        stance: 'Community-Based Modern Homeland Policing',
        details: 'Modernize policing command structures with decentralized municipal branches, forensics laboratories, and robust human rights training.'
      },
      {
        topic: 'Minimum Wage',
        stance: 'Living Wage Tied to Municipal Cost of Living Index',
        details: 'Institute living remuneration that guarantees workers purchasing power against inflation while lowering municipal living costs.'
      },
      {
        topic: 'Electricity & Grid',
        stance: 'Decentralized Clean Hydro & Natural Gas Independent Power',
        details: 'Establish state and regional independent power plants (IPPs) drawing on localized hydro, natural gas, and biomass resources.'
      }
    ]
  },
  {
    id: 'esther_okereke',
    name: 'Esther Nkem Okereke',
    fullName: 'Amb. (Dr.) Esther Nkem Okereke',
    party: 'NRM',
    partyFullName: 'National Rescue Movement (NRM)',
    partyLogo: 'lifebuoy',
    partyColor: '#2563eb', // Royal Blue & Gold of NRM
    secondaryColor: '#eab308',
    photoUrl: '/candidates/esther_okereke_nrm.jpg',
    age: 42,
    stateOfOrigin: 'Delta State',
    zone: 'South South',
    slogan: 'The ESTHER Agenda: Rescuing Nigeria through Compassion, Enterprise & Inclusivity',
    bio: 'Dynamic businesswoman, creative media producer, humanitarian philanthropist, and 2027 presidential candidate of the National Rescue Movement (NRM). Widely known as "Dr. NEO", she is the convener of the ESTHER Agenda—a comprehensive socio-economic manifesto designed to rescue Nigeria from economic stagnation, champion female and youth entrepreneurship, revitalize creative industries, and guarantee grassroots social welfare.',
    previousOffices: [
      'Presidential Candidate, National Rescue Movement (NRM)',
      'Convener, The ESTHER Agenda for National Rescue',
      'Founder, NEO Humanitarian Foundation',
      'Creative Executive & Business Leader'
    ],
    manifestoSummary: 'Executing the ESTHER Agenda: Economic stabilization through SME grants, Security through tech surveillance and community trust, Transparent governance, Healthcare access with zero maternal fees, Education for all children, and Regional agrarian revitalization.',
    manifestoPillars: [
      {
        title: 'The ESTHER Economic Compass',
        description: 'Empower 10 million female entrepreneurs, market women, and tech innovators with interest-free revolving credit.',
        icon: 'Coins'
      },
      {
        title: 'Zero Maternal Mortality Healthcare',
        description: 'Guarantee 100% free prenatal, delivery, and pediatric health coverage across all 774 local government primary clinics.',
        icon: 'HeartPulse'
      },
      {
        title: 'Creative Industries & Youth Hubs',
        description: 'Invest $2 Billion into Nigeria\'s booming Nollywood film, music, animation, and digital media production corridors.',
        icon: 'Film'
      },
      {
        title: 'National Rescue & Anti-Leakage Governance',
        description: 'Automate federal contracting, eliminate ghost workers, and enforce transparent open budgeting.',
        icon: 'ShieldCheck'
      }
    ],
    policyStances: [
      {
        topic: 'Economy & Naira',
        stance: 'Grassroots Entrepreneurship & Value-Added Exports',
        details: 'Support domestic small businesses and light manufacturing to curb import dependence and stabilize the foreign exchange market.'
      },
      {
        topic: 'Fuel Subsidy',
        stance: 'Targeted Citizens Relief & Mass Transit Subsidies',
        details: 'Reinvest petroleum deregulated funds into subsidized commuter electric buses and direct transport vouchers for students and workers.'
      },
      {
        topic: 'Security & Policing',
        stance: 'Tech-Driven Homeland Security & Community Defense',
        details: 'Integrate drone border reconnaissance with vetted community vigilantes and state police oversight.'
      },
      {
        topic: 'Minimum Wage',
        stance: 'Dignity Living Wage with Family Nutrition Supplements',
        details: 'Ensure wages adjust automatically with consumer food indices while providing monthly nutrition supplements for nursing mothers.'
      },
      {
        topic: 'Electricity & Grid',
        stance: 'Decentralized Clean Solar & Rural Mini-Grids',
        details: 'Partner with international green climate funds to install solar mini-grids for primary healthcare centers, markets, and cottage processing mills.'
      }
    ]
  },
  {
    id: 'kabiru_yusuf',
    name: 'Kabiru Yusuf',
    fullName: 'Alh. Kabiru Yusuf',
    party: 'APP',
    partyFullName: 'Action Peoples Party (APP)',
    partyLogo: 'users',
    partyColor: '#0284c7', // Sky Blue & Orange of Action Peoples Party
    secondaryColor: '#f97316',
    photoUrl: '/candidates/kabiru_yusuf_app.jpg',
    age: 51,
    stateOfOrigin: 'Bauchi State',
    zone: 'North East',
    slogan: 'Action for All: Grassroots Agro-Industrialization, Security & Mass Prosperity',
    bio: 'Seasoned grassroots political organizer, public administrator, community development champion, and 2027 presidential candidate of the Action Peoples Party (APP). A vocal advocate for agrarian revitalisation, rural youth economic inclusion, pastoral security resolution, and direct local government autonomy across Nigeria.',
    previousOffices: [
      'Presidential Candidate, Action Peoples Party (APP)',
      'National Executive Committee Member, APP',
      'Community Development Coordinator & Civic Leader'
    ],
    manifestoSummary: 'Mobilizing mass grassroots development through nationwide irrigation micro-dams, localized food grain reserves, local council fiscal independence, guaranteed farm security corps, and vocational entrepreneurship credit.',
    manifestoPillars: [
      {
        title: 'Dry-Season Agro-Industrialization',
        description: 'Build 500 solar-powered irrigation boreholes and earth dams across the Sahel and middle-belt to guarantee two harvest cycles annually.',
        icon: 'Sprout'
      },
      {
        title: 'Agrarian Rural Security Corps',
        description: 'Deploy community defense wardens to protect farmers, harvest transport corridors, and rural grazing reserves.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Total Local Council Autonomy',
        description: 'Enforce direct allocations to all 774 Local Government Areas, revoking state-joint account deductions.',
        icon: 'Building'
      },
      {
        title: 'Youth Artisanal & Enterprise Grants',
        description: 'Provide seed capital and modern equipment to 3 million youth technicians, builders, and agro-processors.',
        icon: 'Coins'
      }
    ],
    policyStances: [
      {
        topic: 'Economy & Naira',
        stance: 'Food Sovereignty & Rural Commodity Value Addition',
        details: 'Curtail food import dependency by guaranteeing price floors for domestic grain farmers and processing local produce at source.'
      },
      {
        topic: 'Fuel Subsidy',
        stance: 'Domestic Energy Supply & Agricultural Transport Cushion',
        details: 'Mandate domestic crude delivery to local refiners and channel fuel savings into rural agrarian logistics and tractor subsidies.'
      },
      {
        topic: 'Security & Policing',
        stance: 'Grassroots Community Policing with Local Accountability',
        details: 'Establish neighborhood and village police commands subordinate to local government councils and vetted by community elders.'
      },
      {
        topic: 'Minimum Wage',
        stance: 'Living Wage Matched with Rural Food Price Subsidies',
        details: 'Protect workers living standards while investing in municipal grain reserves to drive down retail food prices nationwide.'
      },
      {
        topic: 'Electricity & Grid',
        stance: 'Northern Commercial Solar Corridors & Off-Grid Mini-Grids',
        details: 'Exploit Northern Nigeria\'s abundant sunshine through decentralized solar farm clusters to power cold rooms and agro-mills.'
      }
    ]
  },
  {
    id: 'makinde',
    name: 'Makinde Oluseyi Abiodun',
    fullName: 'Engr. Oluseyi Abiodun Makinde, FNSE',
    party: 'APM',
    partyFullName: 'Allied People\'s Movement (APM)',
    partyLogo: 'compass',
    partyColor: '#2563eb', // Royal Blue & Forest Green of APM
    secondaryColor: '#16a34a',
    photoUrl: '/candidates/seyi_makinde_apm.jpg',
    age: 58,
    stateOfOrigin: 'Oyo State',
    zone: 'South West',
    slogan: 'Omituntun 2027: Engineering Modern Nigeria, Sustainable Development & Fiscal Federalism',
    bio: 'Incumbent 2-term Governor of Oyo State (elected 2019, re-elected 2023), accomplished electrical engineer, oil & gas entrepreneur, and 2027 presidential candidate of the Allied People\'s Movement (APM). Celebrated for the "Omituntun" governance blueprint that revitalized Oyo State\'s infrastructure, maintained prompt monthly 25th-day civil servant salaries, retrieved sole ownership of LAUTECH, constructed the landmark Ibadan circular road, and transformed rural agribusiness.',
    previousOffices: [
      'Governor of Oyo State (2019–Present)',
      'Group Managing Director, Makon Engineering & Technical Services',
      'Chairman, Omituntun Foundation'
    ],
    manifestoSummary: 'Scaling the proven "Omituntun" sustainable development framework nationwide across four core pillars: qualitative education (15-20% budget allocation), accessible healthcare, agricultural expansion through rural farm estates, and engineering-driven critical infrastructure.',
    manifestoPillars: [
      {
        title: 'Engineering Infrastructure Corridors',
        description: 'Connect agricultural basins to industrial hubs with modern arterial expressways and regional rail networks modeled after the Oyo circular corridor.',
        icon: 'Hammer'
      },
      {
        title: 'Agribusiness & Farm Estates',
        description: 'Replicate the Fashola and Eruwa Agribusiness Industrial Hubs across Nigeria to achieve food security and export agro-commodities.',
        icon: 'Sprout'
      },
      {
        title: 'Human Capital & Education (20% Budget)',
        description: 'Dedicate up to 20% of federal budget to tuition-free STEM education, teacher welfare, and modern vocational institutes.',
        icon: 'GraduationCap'
      },
      {
        title: 'Fiscal Federalism & Devolution',
        description: 'Devolve solid minerals and policing powers to states while strengthening sub-national internally generated revenue (IGR).',
        icon: 'Scale'
      }
    ],
    policyStances: [
      {
        topic: 'Economy & Naira',
        stance: 'Production-Led Export Diversification & IGR Modernization',
        details: 'Drive real sector manufacturing and non-oil agro exports while curbing speculative borrowing to strengthen the Naira fundamentally.'
      },
      {
        topic: 'Fuel Subsidy',
        stance: 'Transparent Energy Transition & Mass Transit Expansion',
        details: 'Ensure domestic refining output meets national demand and redirect downstream savings into electric/CNG mass transit buses.'
      },
      {
        topic: 'Security & Policing',
        stance: 'Decentralized State & Regional Policing (Amotekun Model)',
        details: 'Champion constitutional amendments for state police, drawing on the successful collaborative community security model of Amotekun.'
      },
      {
        topic: 'Minimum Wage',
        stance: 'Guaranteed Living Wage Paid Promptly',
        details: 'Enforce timely living wages benchmarked to economic realities, maintaining a spotless record of prompt worker compensation.'
      },
      {
        topic: 'Electricity & Grid',
        stance: 'State Electricity Markets & Independent Power Projects',
        details: 'Empower states to establish independent electricity regulatory commissions and off-grid gas-fired power generation plants.'
      }
    ]
  },
  {
    id: 'adebisi',
    name: 'Moses Olusoji Adebisi',
    fullName: 'Moses Olusoji Adebisi',
    party: 'DLA',
    partyFullName: 'Democratic Leadership Alliance (DLA)',
    partyLogo: 'award',
    partyColor: '#4338ca', // Indigo & Crimson of DLA
    secondaryColor: '#dc2626',
    photoUrl: '/candidates/moses_adebisi_dla.jpg',
    age: 35,
    stateOfOrigin: 'Osun State',
    zone: 'South West',
    slogan: 'Generational Shift: Technology, Ethical Governance & Economic Transformation',
    bio: 'Global development strategist, US-based serial entrepreneur, author, and 2027 presidential candidate of the Democratic Leadership Alliance (DLA). At 35 years old, he is the youngest presidential candidate on the official INEC ballot, campaigning on generational change, ethical digital governance, youth inclusion, and transitioning Nigeria from consumption to high-tech production.',
    previousOffices: [
      'Presidential Candidate, Democratic Leadership Alliance (DLA)',
      'Founder & CEO, Global Enterprise Innovations',
      'Author & Youth Leadership Convener'
    ],
    manifestoSummary: 'Driving a generational shift in leadership: modernizing public governance through AI and digital telemetry, building a $15 Billion tech and software venture fund, establishing zero-tariff technology zones across 36 states, and providing interest-free tuition and seed grants for youth startups.',
    manifestoPillars: [
      {
        title: 'Youth Generational Transition',
        description: 'Dismantle outdated political patronage and institute 50% youth and women representation across federal boards and ministries.',
        icon: 'Users'
      },
      {
        title: 'Digital & Tech-Driven Economy',
        description: 'Create 5 million digital jobs in AI, software engineering, fintech, and renewable energy through nationwide LGA tech incubators.',
        icon: 'Laptop'
      },
      {
        title: 'Ethical & Transparent Governance',
        description: 'Deploy blockchain-verified federal treasury tracking to eliminate corruption and waste in public procurement.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Venture Capital & Innovation Fund',
        description: 'Establish a $15 Billion public-private innovation fund offering non-collateral capital for young founders and manufacturers.',
        icon: 'Coins'
      }
    ],
    policyStances: [
      {
        topic: 'Economy & Naira',
        stance: 'Tech Export & Modern Knowledge Economy',
        details: 'Position Nigeria as the digital engineering and software capital of Africa, generating $30B+ in digital service export receipts to strengthen the Naira.'
      },
      {
        topic: 'Fuel Subsidy',
        stance: 'Clean Tech Transition & Direct Citizens Digital Rebates',
        details: 'Audit downstream energy completely and distribute direct digital transportation vouchers to students, workers, and gig-economy drivers.'
      },
      {
        topic: 'Security & Policing',
        stance: 'Autonomous Drone Surveillance & Modern Tactical Police',
        details: 'Deploy aerial drone surveillance across forest reserves and establish high-tech, well-paid municipal rapid-response units.'
      },
      {
        topic: 'Minimum Wage',
        stance: 'Living Dignity Wage with Youth Tax Exemptions',
        details: 'Raise entry-level worker compensation while exempting youth-led micro-enterprises and workers under 30 from federal income tax.'
      },
      {
        topic: 'Electricity & Grid',
        stance: 'Modular Solar Micro-Grids & Decentralized Clean Energy',
        details: 'Enable private green utility companies to power university campuses, hospitals, and industrial parks without federal grid bottlenecks.'
      }
    ]
  },
  {
    id: 'nwanyanwu',
    name: 'Nwanyanwu Daniel Daberechukwu',
    fullName: 'Chief (Barr.) Daniel Daberechukwu Nwanyanwu, OFR',
    party: 'ZLP',
    partyFullName: 'Zenith Labour Party (ZLP)',
    partyLogo: 'briefcase',
    partyColor: '#dc2626', // Crimson Red & Forest Green of ZLP
    secondaryColor: '#16a34a',
    photoUrl: '/candidates/dan_nwanyanwu_zlp.jpg',
    age: 66,
    stateOfOrigin: 'Imo State',
    zone: 'South East',
    slogan: 'Reclaim Nigeria: Labor Dignity, Production Economy & Rule of Law',
    bio: 'Distinguished legal practitioner, veteran labor unionist in the banking sector (former National President of NUBIFIE), pioneer founding National Chairman of the Labour Party (2004–2014), and National Chairman and 2027 presidential candidate of the Zenith Labour Party (ZLP). An Officer of the Federal Republic (OFR) and lifelong campaigner for worker rights, judicial independence, and transparent governance.',
    previousOffices: [
      'National Chairman, Zenith Labour Party (ZLP)',
      'Presidential Candidate, ZLP (2023 & 2027)',
      'Pioneer National Chairman, Labour Party (2004–2014)',
      'National President, NUBIFIE'
    ],
    manifestoSummary: 'Rooted in authentic labor ideology and industrial democracy: implementing a living wage with automatic quarterly inflation adjustments, revamping national rail corridors and state-owned refineries, safeguarding public pensions, and instituting strict criminal accountability for public treasury looters.',
    manifestoPillars: [
      {
        title: 'Frontline Workers Living Dignity',
        description: 'Guarantee an inflation-indexed living minimum wage, timely pension payments, and worker safety nets across all tiers of government.',
        icon: 'Briefcase'
      },
      {
        title: 'Industrial & Domestic Refining Sovereignty',
        description: 'Refurbish Nigeria\'s domestic refineries to 100% capacity and ban export of unprocessed raw solid minerals.',
        icon: 'Flame'
      },
      {
        title: 'Judicial Integrity & Anti-Corruption',
        description: 'Establish special fast-track anti-corruption tribunals and remove executive interference from judicial appointments.',
        icon: 'Scale'
      },
      {
        title: 'National Security & Border Shield',
        description: 'Upgrade welfare and life insurance for frontline military and police personnel, deploying cutting-edge drone surveillance on international frontiers.',
        icon: 'ShieldCheck'
      }
    ],
    policyStances: [
      {
        topic: 'Economy & Naira',
        stance: 'Production-Led Industrialization & Local Currency Protection',
        details: 'Mandate local raw material substitution in factories and end unbacked currency printing to stabilize the purchasing power of working families.'
      },
      {
        topic: 'Fuel Subsidy',
        stance: 'Refine 100% at Home & Eradicate Import Cartels',
        details: 'Refine Nigeria\'s crude oil domestically at audited production cost, eliminating the fraudulent cycle of petroleum subsidy imports.'
      },
      {
        topic: 'Security & Policing',
        stance: 'Integrated Federal-State Multi-Tier Policing',
        details: 'Support state police structures governed by independent oversight boards to protect local communities from banditry and kidnapping.'
      },
      {
        topic: 'Minimum Wage',
        stance: 'Living Wage with Guaranteed Pension Integrity',
        details: 'Ensure monthly wages automatically rise with food inflation and enforce criminal penalties for governors delaying worker pensions.'
      },
      {
        topic: 'Electricity & Grid',
        stance: 'Public-Private Hybrid Clean Power Corridors',
        details: 'Decentralize national transmission and concession mini-grids to supply 24/7 dedicated electricity to manufacturing and textile hubs.'
      }
    ]
  },
  {
    id: 'sandy_onor',
    name: 'Onor Sandy Ojang',
    fullName: 'Prof. Sandy Ojang Onor',
    party: 'PDP',
    partyFullName: 'Peoples Democratic Party (PDP)',
    partyLogo: 'umbrella',
    partyColor: '#15803d', // Green, White & Red of PDP
    secondaryColor: '#dc2626',
    photoUrl: '/candidates/onor_sandy_ojang_pdp.jpg',
    age: 61,
    stateOfOrigin: 'Cross River State',
    zone: 'South South',
    slogan: 'The Caterpillar Revolution: Academic Excellence, Grassroots Autonomy & Sovereign Prosperity',
    bio: 'Distinguished Professor of African History, former Senator representing Cross River Central Senatorial District in the 9th National Assembly (2019–2023), former Commissioner for Agriculture and Commissioner for Environment in Cross River State, and 2027 presidential standard-bearer of the Peoples Democratic Party (PDP). Celebrated across the nation as "The Caterpillar" for his irresistible grassroots mobilization, parliamentary acumen, and visionary commitment to LGA fiscal autonomy.',
    previousOffices: [
      'Senator of the Federal Republic of Nigeria (Cross River Central, 2019–2023)',
      'Hon. Commissioner for Environment, Cross River State',
      'Hon. Commissioner for Agriculture, Cross River State',
      'Executive Chairman, Etung Local Government Council & National Chairman, ALGON'
    ],
    manifestoSummary: 'Rebuilding Nigeria from the grassroots upward: enacting 100% financial and operational autonomy for all 774 Local Government Areas, directing 20% of national expenditure to education and university research, reviving cocoa, palm oil, and agro-allied export corridors, and executing comprehensive environmental restoration across resource-bearing communities.',
    manifestoPillars: [
      {
        title: 'Grassroots & LGA Constitutional Autonomy',
        description: 'Enforce direct federation account funding to all 774 LGAs, dismantling State-Joint-Local-Government account deductions to power rural infrastructure and grassroots security.',
        icon: 'Landmark'
      },
      {
        title: 'Agro-Allied Export Revolution',
        description: 'Establish modern agro-processing hubs along cocoa, oil palm, cassava, and grain belts to create 4 million direct jobs and displace imported foods.',
        icon: 'Sprout'
      },
      {
        title: 'Education Sovereignty & Academic Welfare',
        description: 'Dedicate 20% of the federal budget to basic and tertiary education, guaranteeing competitive academic salaries, modern labs, and zero strikes.',
        icon: 'GraduationCap'
      },
      {
        title: 'Environmental Justice & Delta Restoration',
        description: 'Enforce stringent ecological cleanups, remediation funds, and fair resource equity for the Niger Delta and mining communities nationwide.',
        icon: 'ShieldCheck'
      }
    ],
    policyStances: [
      {
        topic: 'Economy & Naira',
        stance: 'Agro-Industrial Value Addition & Fiscal Devolution',
        details: 'End raw agricultural resource exports; mandate domestic processing for cocoa, cashew, and oil palm to build strong foreign exchange reserves and protect the Naira.'
      },
      {
        topic: 'Fuel Subsidy',
        stance: 'Modular Refining Expansion & Direct Commuter Relief',
        details: 'Grant sovereign guarantees to modular and private refineries while investing downstream savings directly into interstate CNG mass transit and agro-haulage rebates.'
      },
      {
        topic: 'Security & Policing',
        stance: 'Community Multi-Tier Policing & Forest Ranger Shield',
        details: 'Decentralize police command to state and local levels, partnered with specialized well-armed forest ranger units to purge criminal gangs from rural farming corridors.'
      },
      {
        topic: 'Minimum Wage',
        stance: 'Living Dignity Wage with Direct LGA Execution',
        details: 'Implement an inflation-indexed living wage backed by direct treasury disbursements to ensure local council civil servants receive dignified, uninterrupted pay.'
      },
      {
        topic: 'Electricity & Grid',
        stance: 'Regional Clean Energy Corridors & Hydro Turbines',
        details: 'License state-backed private generation consortia to build hydro, gas, and solar mini-grids, ending total reliance on the fragile single national grid.'
      }
    ]
  },
  {
    id: 'agada',
    name: 'Peter Ada Agada',
    fullName: 'Arc. (Dr.) Peter Ada Agada, fnia',
    party: 'YPP',
    partyFullName: 'Young Progressives Party (YPP)',
    partyLogo: 'sprout',
    partyColor: '#2563eb', // Royal Blue & Gold of YPP
    secondaryColor: '#f59e0b',
    photoUrl: '/candidates/peter_ada_agada_ypp.jpg',
    age: 55,
    stateOfOrigin: 'Benue State',
    zone: 'North Central',
    slogan: 'Nigeria As A Project Site: Precision Architecture, Direct Labor & Transparent Governance',
    bio: 'Renowned architect, infrastructure policy strategist, acoustic design specialist, and 2027 presidential standard-bearer of the Young Progressives Party (YPP). Hailing from Ogbadibo Local Government Area of Benue State with degrees from the University of Jos and advanced doctorate credentials in Acoustics & C4ISR Spectrum Management, he previously served as Director of Finance of the Obidient Movement and lead economic policy writer for the 2023 Consumption-to-Production agenda. He champions "Governance with GPS"—managing Nigeria\'s public works with rigorous engineering milestones, direct labor, and citizen-accessible transparency.',
    previousOffices: [
      'Presidential Candidate, Young Progressives Party (YPP)',
      'Principal Partner & Lead Architect, APEX Architecture & Design Consortium',
      'Director of Finance, Obidient Movement & Lead Economic Policy Drafter (2023)',
      'National Policy Consultant on Direct Labor Public Works & LGA Infrastructure'
    ],
    manifestoSummary: 'Transforming Nigeria into a high-performance national project site: executing capital infrastructure through direct labor to employ millions of youth artisans, deploying geospatial GPS and drone telemetry to eliminate ghost contracts, retaining downstream energy deregulation while channeling savings into domestic refining and mass transit, and building decentralized renewable micro-grids across agro-industrial corridors.',
    manifestoPillars: [
      {
        title: 'Direct Labor Infrastructure Revolution',
        description: 'Bypass parasitic contract kickbacks by deploying direct labor on federal roads, clinics, and schools, paying dignified wages directly to local artisans and engineers.',
        icon: 'Hammer'
      },
      {
        title: '"Governance with GPS" Milestone Telemetry',
        description: 'Institute open-source satellite and drone telemetry for all public capital allocations, giving every citizen real-time project delivery dashboards.',
        icon: 'Compass'
      },
      {
        title: 'Benue-Niger Basin Agro-Industrial Architecture',
        description: 'Construct state-of-the-art cold-chain logistics hubs and food processing parks across Benue, Middle Belt, and northern agricultural basins.',
        icon: 'Sprout'
      },
      {
        title: 'C4ISR Technology-Driven Border Defense',
        description: 'Deploy electronic spectrum surveillance, automated sensor towers, and tactical drones to secure agricultural farmlands and highways from terrorists.',
        icon: 'ShieldCheck'
      }
    ],
    policyStances: [
      {
        topic: 'Economy & Naira',
        stance: 'Direct Labor Capital Works & Import-Substitution',
        details: 'Slash public procurement inflation by 40% using direct labor engineering, directing foreign exchange savings into domestic machinery and agrarian export production to strengthen the Naira.'
      },
      {
        topic: 'Fuel Subsidy',
        stance: 'Deregulation with Local Refining & Direct Commuter Rebates',
        details: 'Retain deregulated downstream pricing while mandating local crude sales to private and modular refineries in Naira, accompanied by nationwide direct CNG commuter vouchers.'
      },
      {
        topic: 'Security & Policing',
        stance: 'C4ISR Sensor Networks & Decentralized Community Guards',
        details: 'Leverage electromagnetic spectrum management, drone perimeter sensors, and decentralized community policing to secure agricultural belts and transport highways from bandits.'
      },
      {
        topic: 'Minimum Wage',
        stance: 'Productivity-Linked Living Wage & Artisan Dignity Pay',
        details: 'Institute an enforceable living minimum wage with standardized daily-wage protections for construction artisans and gig workers across the federation.'
      },
      {
        topic: 'Electricity & Grid',
        stance: 'Decentralized Architecture & Regional Smart Micro-Grids',
        details: 'Treat electric power as localized infrastructure: build solar-gas hybrid micro-grids for industrial clusters, cutting reliance on the vulnerable national grid.'
      }
    ]
  }
];

export const NIGERIAN_STATES: NigerianState[] = [
  // North Central
  { code: 'BE', name: 'Benue', zone: 'North Central', capital: 'Makurdi', registeredVotersEst: 2.7, lgaCount: 23 },
  { code: 'FC', name: 'FCT Abuja', zone: 'North Central', capital: 'Abuja', registeredVotersEst: 1.6, lgaCount: 6 },
  { code: 'KO', name: 'Kogi', zone: 'North Central', capital: 'Lokoja', registeredVotersEst: 2.0, lgaCount: 21 },
  { code: 'KW', name: 'Kwara', zone: 'North Central', capital: 'Ilorin', registeredVotersEst: 1.7, lgaCount: 16 },
  { code: 'NA', name: 'Nasarawa', zone: 'North Central', capital: 'Lafia', registeredVotersEst: 1.9, lgaCount: 13 },
  { code: 'NI', name: 'Niger', zone: 'North Central', capital: 'Minna', registeredVotersEst: 2.7, lgaCount: 25 },
  { code: 'PL', name: 'Plateau', zone: 'North Central', capital: 'Jos', registeredVotersEst: 2.8, lgaCount: 17 },

  // North East
  { code: 'AD', name: 'Adamawa', zone: 'North East', capital: 'Yola', registeredVotersEst: 2.2, lgaCount: 21 },
  { code: 'BA', name: 'Bauchi', zone: 'North East', capital: 'Bauchi', registeredVotersEst: 2.7, lgaCount: 20 },
  { code: 'BO', name: 'Borno', zone: 'North East', capital: 'Maiduguri', registeredVotersEst: 2.5, lgaCount: 27 },
  { code: 'GO', name: 'Gombe', zone: 'North East', capital: 'Gombe', registeredVotersEst: 1.6, lgaCount: 11 },
  { code: 'TA', name: 'Taraba', zone: 'North East', capital: 'Jalingo', registeredVotersEst: 2.0, lgaCount: 16 },
  { code: 'YO', name: 'Yobe', zone: 'North East', capital: 'Damaturu', registeredVotersEst: 1.5, lgaCount: 17 },

  // North West
  { code: 'JI', name: 'Jigawa', zone: 'North West', capital: 'Dutse', registeredVotersEst: 2.4, lgaCount: 27 },
  { code: 'KD', name: 'Kaduna', zone: 'North West', capital: 'Kaduna', registeredVotersEst: 4.3, lgaCount: 23 },
  { code: 'KN', name: 'Kano', zone: 'North West', capital: 'Kano', registeredVotersEst: 5.9, lgaCount: 44 },
  { code: 'KT', name: 'Katsina', zone: 'North West', capital: 'Katsina', registeredVotersEst: 3.5, lgaCount: 34 },
  { code: 'KE', name: 'Kebbi', zone: 'North West', capital: 'Birnin Kebbi', registeredVotersEst: 2.1, lgaCount: 21 },
  { code: 'SO', name: 'Sokoto', zone: 'North West', capital: 'Sokoto', registeredVotersEst: 2.2, lgaCount: 23 },
  { code: 'ZA', name: 'Zamfara', zone: 'North West', capital: 'Gusau', registeredVotersEst: 1.9, lgaCount: 14 },

  // South East
  { code: 'AB', name: 'Abia', zone: 'South East', capital: 'Umuahia', registeredVotersEst: 2.1, lgaCount: 17 },
  { code: 'AN', name: 'Anambra', zone: 'South East', capital: 'Awka', registeredVotersEst: 2.6, lgaCount: 21 },
  { code: 'EB', name: 'Ebonyi', zone: 'South East', capital: 'Abakaliki', registeredVotersEst: 1.6, lgaCount: 13 },
  { code: 'EN', name: 'Enugu', zone: 'South East', capital: 'Enugu', registeredVotersEst: 2.1, lgaCount: 17 },
  { code: 'IM', name: 'Imo', zone: 'South East', capital: 'Owerri', registeredVotersEst: 2.4, lgaCount: 27 },

  // South South
  { code: 'AK', name: 'Akwa Ibom', zone: 'South South', capital: 'Uyo', registeredVotersEst: 2.4, lgaCount: 31 },
  { code: 'BY', name: 'Bayelsa', zone: 'South South', capital: 'Yenagoa', registeredVotersEst: 1.1, lgaCount: 8 },
  { code: 'CR', name: 'Cross River', zone: 'South South', capital: 'Calabar', registeredVotersEst: 1.8, lgaCount: 18 },
  { code: 'DE', name: 'Delta', zone: 'South South', capital: 'Asaba', registeredVotersEst: 3.2, lgaCount: 25 },
  { code: 'ED', name: 'Edo', zone: 'South South', capital: 'Benin City', registeredVotersEst: 2.5, lgaCount: 18 },
  { code: 'RI', name: 'Rivers', zone: 'South South', capital: 'Port Harcourt', registeredVotersEst: 3.5, lgaCount: 23 },

  // South West
  { code: 'EK', name: 'Ekiti', zone: 'South West', capital: 'Ado Ekiti', registeredVotersEst: 1.0, lgaCount: 16 },
  { code: 'LA', name: 'Lagos', zone: 'South West', capital: 'Ikeja', registeredVotersEst: 7.1, lgaCount: 20 },
  { code: 'OG', name: 'Ogun', zone: 'South West', capital: 'Abeokuta', registeredVotersEst: 2.7, lgaCount: 20 },
  { code: 'ON', name: 'Ondo', zone: 'South West', capital: 'Akure', registeredVotersEst: 2.0, lgaCount: 18 },
  { code: 'OS', name: 'Osun', zone: 'South West', capital: 'Osogbo', registeredVotersEst: 2.0, lgaCount: 30 },
  { code: 'OY', name: 'Oyo', zone: 'South West', capital: 'Ibadan', registeredVotersEst: 3.3, lgaCount: 33 },

  // Diaspora
  { code: 'DI', name: 'Diaspora Voters', zone: 'Diaspora', capital: 'Global (UK, US, Canada, etc.)', registeredVotersEst: 1.5, lgaCount: 10 }
];

export const GEOPOLITICAL_ZONES: { name: GeopoliticalZone; states: string[]; color: string }[] = [
  { name: 'North Central', states: ['Benue', 'FCT Abuja', 'Kogi', 'Kwara', 'Nasarawa', 'Niger', 'Plateau'], color: '#f59e0b' },
  { name: 'North East', states: ['Adamawa', 'Bauchi', 'Borno', 'Gombe', 'Taraba', 'Yobe'], color: '#ec4899' },
  { name: 'North West', states: ['Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Sokoto', 'Zamfara'], color: '#3b82f6' },
  { name: 'South East', states: ['Abia', 'Anambra', 'Ebonyi', 'Enugu', 'Imo'], color: '#10b981' },
  { name: 'South South', states: ['Akwa Ibom', 'Bayelsa', 'Cross River', 'Delta', 'Edo', 'Rivers'], color: '#06b6d4' },
  { name: 'South West', states: ['Ekiti', 'Lagos', 'Ogun', 'Ondo', 'Osun', 'Oyo'], color: '#8b5cf6' },
  { name: 'Diaspora', states: ['Diaspora Voters'], color: '#6366f1' }
];

// Baseline vote tallies strictly start from zero across all Nigerian states and candidates
export const INITIAL_STATE_VOTES: Record<string, Record<string, number>> = NIGERIAN_STATES.reduce((acc, state) => {
  acc[state.name] = CANDIDATES.reduce((cAcc, cand) => {
    cAcc[cand.id] = 0;
    return cAcc;
  }, {} as Record<string, number>);
  return acc;
}, {} as Record<string, Record<string, number>>);

export const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'c1',
    author: 'Chidubem Eze',
    state: 'Anambra',
    candidateId: 'obi',
    content: 'Obi Peter Gregory represents fiscal prudence and genuine production. His track record in Anambra speaks for itself—no pension arrears, left billions in reserves. NDC all the way!',
    timestamp: '15 mins ago',
    likes: 0,
    isVerifiedVoter: true
  },
  {
    id: 'c2',
    author: 'Grace Ngbede',
    state: 'Benue',
    candidateId: 'okwori',
    content: 'Ada Elizabeth Fredrick Okwori represents true grassroots compassion, agro-allied innovation, and women empowerment. Her plans for cold-storage hubs and maternal healthcare will revitalize middle-belt farming families. NDP all the way!',
    timestamp: '28 mins ago',
    likes: 0,
    isVerifiedVoter: true
  },
  {
    id: 'c3',
    author: 'Babatunde Adebayo',
    state: 'Lagos',
    candidateId: 'tinubu',
    content: 'President Tinubu took the tough, bold decisions that previous leaders dodged for 30 years (subsidy removal and FX unification). The Lagos-Calabar coastal road and NELFUND student loans show long-term vision. Let him consolidate.',
    timestamp: '42 mins ago',
    likes: 0,
    isVerifiedVoter: true
  },
  {
    id: 'c4',
    author: 'Fatima Mohammed',
    state: 'Adamawa',
    candidateId: 'atiku',
    content: 'Atiku has always championed restructuring and private enterprise. The federal government has too much power concentrated in Abuja. Devolution to states and state police is the only lasting solution to our security and economic woes.',
    timestamp: '1 hour ago',
    likes: 0,
    isVerifiedVoter: true
  },
  {
    id: 'c5',
    author: 'Kemi Sowemimo',
    state: 'Diaspora Voters',
    candidateId: 'sowore',
    content: 'Sowore is the only one who consistently stands with ordinary workers and student unions without compromising with the political elite. ₦250k minimum wage and free healthcare is what true democracy looks like!',
    timestamp: '2 hours ago',
    likes: 0,
    isVerifiedVoter: true
  },
  {
    id: 'c6',
    author: 'Alhaji Rasheed Adeleke',
    state: 'Osun',
    candidateId: 'omoaje',
    content: 'Adekunle Rufai Omoaje has championed grassroots democracy and local government autonomy for decades. The Action Alliance platform for youth vocational skills and cottage industrialization will transform our communities!',
    timestamp: '3 hours ago',
    likes: 0,
    isVerifiedVoter: true
  },
  {
    id: 'c7',
    author: 'Ngozi Okoli',
    state: 'Abia',
    candidateId: 'okereke',
    content: 'Dr. Chibuzo Okereke brings deep legislative governance and institutional integrity to the table. His "Believe Again" blueprint prioritizes workers rights, educational investment, and real accountability. Labour Party (LP) forward!',
    timestamp: '15 mins ago',
    likes: 0,
    isVerifiedVoter: true
  },
  {
    id: 'c8',
    author: 'Effiom Bassey',
    state: 'Cross River',
    candidateId: 'duke',
    content: 'Donald Duke proved what good governance looks like in Cross River: clean cities, the Calabar Carnival, and Tinapa. Under the historic People\'s Redemption Party (PRP), he brings the exact visionary, creative leadership Nigeria needs to diversify from oil!',
    timestamp: '8 mins ago',
    likes: 0,
    isVerifiedVoter: true
  },
  {
    id: 'c9',
    author: 'Blessing Efe',
    state: 'Delta',
    candidateId: 'esther_okereke',
    content: 'Amb. Esther Nkem Okereke ("Dr. NEO") represents real female leadership and compassion. Her ESTHER Agenda for maternal healthcare, creative industry investment, and micro-loans for market women is inspiring grassroots Nigerians nationwide under NRM!',
    timestamp: '5 mins ago',
    likes: 0,
    isVerifiedVoter: true
  },
  {
    id: 'c10',
    author: 'Usman Danladi',
    state: 'Bauchi',
    candidateId: 'kabiru_yusuf',
    content: 'Alhaji Kabiru Yusuf is a true grassroots champion of the masses. His Action Peoples Party (APP) blueprint for solar irrigation dams and farmer security will restore food security and prosperity to Northern communities and across the federation!',
    timestamp: '2 mins ago',
    likes: 0,
    isVerifiedVoter: true
  },
  {
    id: 'c11',
    author: 'Engr. Taiwo Ogundipe',
    state: 'Oyo',
    candidateId: 'makinde',
    content: 'Governor Seyi Makinde has proven what engineering precision and financial prudence can do in governance. From prompt 25th salary dates and sole LAUTECH ownership to the Ibadan Circular road and agribusiness hubs, his APM candidacy offers Nigeria tested administrative brilliance!',
    timestamp: 'Just now',
    likes: 0,
    isVerifiedVoter: true
  },
  {
    id: 'c12',
    author: 'Olamide Adeleke',
    state: 'Lagos',
    candidateId: 'adebisi',
    content: 'At 35, Moses Olusoji Adebisi represents the authentic energy and tech-forward mind of Nigeria\'s youth population. His Democratic Leadership Alliance (DLA) agenda for digital venture capital, ethical AI governance, and youth leadership quotas is the generational shift Nigeria desperately needs!',
    timestamp: 'Just now',
    likes: 0,
    isVerifiedVoter: true
  },
  {
    id: 'c13',
    author: 'Emeka Onyekwelu',
    state: 'Imo',
    candidateId: 'nwanyanwu',
    content: 'Chief Dan Nwanyanwu has fought on the frontline for workers\' rights and pension dignity his entire life. From pioneer leadership in the labor movement to the Zenith Labour Party (ZLP), his commitment to domestic refining, honest judiciary, and industrial democracy is unwavering!',
    timestamp: 'Just now',
    likes: 0,
    isVerifiedVoter: true
  },
  {
    id: 'c14',
    author: 'Ntufam Ntui Etta',
    state: 'Cross River',
    candidateId: 'sandy_onor',
    content: 'Prof. Sandy Ojang Onor ("The Caterpillar") represents authentic grassroots power and academic brilliance. As former Senator, ALGON leader, and Commissioner, his fight for 100% LGA autonomy and agro-allied export corridors under PDP will rebuild Nigeria from the local councils up!',
    timestamp: 'Just now',
    likes: 0,
    isVerifiedVoter: true
  },
  {
    id: 'c15',
    author: 'Oche Godwin',
    state: 'Benue',
    candidateId: 'agada',
    content: 'Arc. Peter Ada Agada is an infrastructure visionary! His "Nigeria As A Project Site" blueprint and direct labor methodology will put government project funds directly into the pockets of youth artisans and engineers, while cutting out corrupt middlemen under the YPP banner.',
    timestamp: 'Just now',
    likes: 0,
    isVerifiedVoter: true
  }
];

export const TOP_ISSUES_POLL: IssuePollOption[] = [
  { id: 'economy', title: 'Naira Stability & Inflation', description: 'Tackling hyper-inflation, food prices, and stabilizing exchange rates.', votes: 0, icon: 'TrendingDown' },
  { id: 'security', title: 'Security & Banditry / State Police', description: 'Halting kidnapping, farmer-herder clashes, and securing agrarian belts.', votes: 0, icon: 'Shield' },
  { id: 'jobs', title: 'Youth Unemployment & Living Wage', description: 'Creating tech/industrial jobs and paying a fair living wage.', votes: 0, icon: 'Briefcase' },
  { id: 'power', title: '24/7 Electricity & Refineries', description: 'Ending national grid collapse and refining crude oil locally.', votes: 0, icon: 'Zap' },
  { id: 'corruption', title: 'Cost of Governance & Corruption', description: 'Cutting wasteful elite spending, luxury convoys, and looting.', votes: 0, icon: 'DollarSign' }
];

export const MATCHMAKER_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is your top priority for reviving the Nigerian economy?',
    options: [
      { text: 'Aggressive infrastructure spending (coastal highways, ports) and expanding federal tax revenue.', weights: { tinubu: 4, atiku: 1, obi: 0, kwankwaso: 1, sowore: 0, technocrat: 2 } },
      { text: 'Slashing cost of governance, stopping borrowing, and funding small agro-exporters.', weights: { obi: 4, technocrat: 2, sowore: 2, tinubu: 0, atiku: 1, kwankwaso: 1 } },
      { text: 'Concessioning state-owned refineries and creating private-sector free trade zones.', weights: { atiku: 4, technocrat: 3, tinubu: 2, obi: 1, kwankwaso: 0, sowore: 0 } },
      { text: 'State-led mass education, technical training, and agricultural input subsidies.', weights: { kwankwaso: 4, obi: 2, sowore: 2, tinubu: 1, atiku: 1, technocrat: 1 } },
      { text: 'Abolishing billionaire tax waivers, paying ₦250k living wage, and nationalizing critical resources.', weights: { sowore: 4, obi: 1, kwankwaso: 1, tinubu: 0, atiku: 0, technocrat: 0 } }
    ]
  },
  {
    id: 2,
    question: 'How should Nigeria address the ongoing security challenges and banditry?',
    options: [
      { text: 'Amend the 1999 Constitution to establish decentralized State and Community Police.', weights: { atiku: 4, obi: 3, tinubu: 2, technocrat: 2, kwankwaso: 1, sowore: 2 } },
      { text: 'Mass recruitment of 500k+ boots-on-the-ground troops and direct kinetic clearance of all forest hideouts.', weights: { kwankwaso: 4, tinubu: 2, atiku: 1, obi: 1, sowore: 1, technocrat: 1 } },
      { text: 'Biometric tracking, drone border surveillance, inter-agency tech intelligence, and anti-corruption in defense procurement.', weights: { obi: 4, technocrat: 3, tinubu: 2, atiku: 2, kwankwaso: 1, sowore: 1 } },
      { text: 'Disarm VIP private police escorts, upgrade frontline soldier/police welfare, and tackle root poverty.', weights: { sowore: 4, obi: 2, kwankwaso: 2, tinubu: 1, atiku: 1, technocrat: 2 } }
    ]
  },
  {
    id: 3,
    question: 'What is your stance on the Petrol (PMS) Subsidy & Energy Sector?',
    options: [
      { text: 'Never return to fuel subsidies; expand CNG mass transit and implement decentralized State Electricity Acts.', weights: { tinubu: 4, atiku: 2, obi: 1, technocrat: 3, kwankwaso: 0, sowore: 0 } },
      { text: 'Ensure full transparency in oil production, end crude oil theft, and channel savings strictly to health/education.', weights: { obi: 4, technocrat: 3, sowore: 1, tinubu: 1, atiku: 2, kwankwaso: 1 } },
      { text: 'Privatize all federal refineries and break up the national power grid into private regional grids.', weights: { atiku: 4, technocrat: 3, tinubu: 2, obi: 1, kwankwaso: 0, sowore: 0 } },
      { text: 'Revamp public refineries immediately, supply local crude at Naira production cost, and protect common citizens from high transport tariffs.', weights: { sowore: 4, kwankwaso: 3, obi: 2, tinubu: 0, atiku: 0, technocrat: 1 } }
    ]
  },
  {
    id: 4,
    question: 'Which educational reform do you believe will yield the highest return for Nigerian youths?',
    options: [
      { text: 'Federal Student Loan Fund (NELFUND) giving interest-free tuition loans to all tertiary students.', weights: { tinubu: 4, atiku: 1, technocrat: 2, obi: 1, kwankwaso: 1, sowore: 0 } },
      { text: 'Allocate 15%+ of national budget to basic education and vocational STEM training.', weights: { obi: 4, technocrat: 3, kwankwaso: 2, sowore: 2, tinubu: 1, atiku: 1 } },
      { text: 'Universal free basic & tertiary education plus sponsored foreign postgraduate STEM scholarships.', weights: { kwankwaso: 4, sowore: 3, obi: 1, atiku: 1, tinubu: 0, technocrat: 1 } },
      { text: 'A $10 Billion Youth Technology & Entrepreneurship Venture Capital Innovation Fund.', weights: { atiku: 4, technocrat: 3, tinubu: 2, obi: 2, kwankwaso: 1, sowore: 1 } }
    ]
  },
  {
    id: 5,
    question: 'What leadership style does Nigeria most desperately need in 2027?',
    options: [
      { text: 'An experienced political strategist capable of managing coalitions and executing bold structural shifts.', weights: { tinubu: 4, atiku: 3, kwankwaso: 2, obi: 0, sowore: 0, technocrat: 1 } },
      { text: 'A prudent, frugal manager who detests ostentation and prioritizes human capital over luxury convoys.', weights: { obi: 4, sowore: 2, kwankwaso: 2, technocrat: 2, tinubu: 0, atiku: 0 } },
      { text: 'A grassroots mobilizer who directly understands ordinary northern and rural families with empathy.', weights: { kwankwaso: 4, obi: 2, sowore: 2, tinubu: 1, atiku: 2, technocrat: 0 } },
      { text: 'An unapologetic activist ready to dismantle corrupt elite structures and return sovereignty to the people.', weights: { sowore: 4, obi: 1, kwankwaso: 1, atiku: 0, tinubu: 0, technocrat: 0 } },
      { text: 'A world-class technocrat with international prestige to attract foreign investment and modernize institutions.', weights: { technocrat: 4, atiku: 2, obi: 2, tinubu: 1, kwankwaso: 0, sowore: 0 } }
    ]
  }
];
