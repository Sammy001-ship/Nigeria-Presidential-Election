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

// Realistic baseline vote tallies simulating broad national sample (approx ~185,000 total baseline votes)
export const INITIAL_STATE_VOTES: Record<string, Record<string, number>> = {
  // South West (Tinubu strong, Obi competitive in Lagos urban, Atiku secondary)
  'Lagos': { tinubu: 4620, obi: 4190, atiku: 920, okwori: 380, sowore: 540, omoaje: 610 },
  'Oyo': { tinubu: 3100, obi: 1650, atiku: 1200, okwori: 240, sowore: 310, omoaje: 280 },
  'Ogun': { tinubu: 2850, obi: 1420, atiku: 880, okwori: 180, sowore: 220, omoaje: 260 },
  'Osun': { tinubu: 2410, obi: 1390, atiku: 1620, okwori: 130, sowore: 190, omoaje: 210 },
  'Ondo': { tinubu: 2530, obi: 1280, atiku: 890, okwori: 140, sowore: 810, omoaje: 190 },
  'Ekiti': { tinubu: 2180, obi: 980, atiku: 720, okwori: 90, sowore: 140, omoaje: 160 },

  // South East (Obi overwhelmingly dominant)
  'Anambra': { tinubu: 410, obi: 6850, atiku: 380, okwori: 70, sowore: 110, omoaje: 450 },
  'Enugu': { tinubu: 380, obi: 5420, atiku: 420, okwori: 60, sowore: 90, omoaje: 390 },
  'Imo': { tinubu: 620, obi: 4980, atiku: 510, okwori: 90, sowore: 120, omoaje: 380 },
  'Abia': { tinubu: 490, obi: 5110, atiku: 440, okwori: 70, sowore: 80, omoaje: 340 },
  'Ebonyi': { tinubu: 890, obi: 3820, atiku: 610, okwori: 80, sowore: 70, omoaje: 290 },

  // South South (Obi, Atiku, and Tinubu competitive, Okonjo-Iweala high respect)
  'Rivers': { tinubu: 2750, obi: 3920, atiku: 1820, okwori: 210, sowore: 310, omoaje: 780 },
  'Delta': { tinubu: 1840, obi: 3610, atiku: 2790, okwori: 160, sowore: 250, omoaje: 920 },
  'Edo': { tinubu: 2210, obi: 3450, atiku: 1920, okwori: 140, sowore: 280, omoaje: 510 },
  'Akwa Ibom': { tinubu: 1620, obi: 2890, atiku: 2650, okwori: 110, sowore: 170, omoaje: 460 },
  'Cross River': { tinubu: 1890, obi: 2710, atiku: 1780, okwori: 90, sowore: 160, omoaje: 410 },
  'Bayelsa': { tinubu: 1210, obi: 1950, atiku: 1890, okwori: 80, sowore: 110, omoaje: 310 },

  // North West (Kwankwaso dominant in Kano, Tinubu strong in Katsina/Kaduna/Jigawa, Atiku competitive)
  'Kano': { tinubu: 2840, obi: 980, atiku: 1920, okwori: 6720, sowore: 150, omoaje: 290 },
  'Kaduna': { tinubu: 2980, obi: 3120, atiku: 3250, okwori: 1890, sowore: 210, omoaje: 380 },
  'Katsina': { tinubu: 3820, obi: 410, atiku: 3450, okwori: 1640, sowore: 90, omoaje: 140 },
  'Jigawa': { tinubu: 3120, obi: 320, atiku: 2680, okwori: 1420, sowore: 70, omoaje: 110 },
  'Sokoto': { tinubu: 2850, obi: 340, atiku: 2980, okwori: 780, sowore: 60, omoaje: 120 },
  'Kebbi': { tinubu: 2740, obi: 280, atiku: 2610, okwori: 650, sowore: 50, omoaje: 140 },
  'Zamfara': { tinubu: 2610, obi: 240, atiku: 2540, okwori: 590, sowore: 40, omoaje: 90 },

  // North East (Atiku strong home base, Tinubu strong in Borno/Yobe via Shettima)
  'Adamawa': { tinubu: 1420, obi: 890, atiku: 4890, okwori: 480, sowore: 110, omoaje: 260 },
  'Borno': { tinubu: 4520, obi: 410, atiku: 1890, okwori: 520, sowore: 90, omoaje: 180 },
  'Bauchi': { tinubu: 2420, obi: 620, atiku: 3510, okwori: 1210, sowore: 80, omoaje: 160 },
  'Yobe': { tinubu: 3280, obi: 290, atiku: 1650, okwori: 410, sowore: 60, omoaje: 110 },
  'Taraba': { tinubu: 1410, obi: 1980, atiku: 2840, okwori: 390, sowore: 90, omoaje: 220 },
  'Gombe': { tinubu: 2120, obi: 540, atiku: 2690, okwori: 810, sowore: 70, omoaje: 130 },

  // North Central (Battleground: Obi, Tinubu, Atiku all strong)
  'FCT Abuja': { tinubu: 2310, obi: 4620, atiku: 1420, okwori: 480, sowore: 420, omoaje: 890 },
  'Plateau': { tinubu: 1720, obi: 3840, atiku: 2110, okwori: 310, sowore: 180, omoaje: 410 },
  'Benue': { tinubu: 2410, obi: 2980, atiku: 1840, okwori: 210, sowore: 140, omoaje: 290 },
  'Nasarawa': { tinubu: 1980, obi: 2820, atiku: 1890, okwori: 420, sowore: 120, omoaje: 240 },
  'Kogi': { tinubu: 2950, obi: 1640, atiku: 1810, okwori: 260, sowore: 130, omoaje: 210 },
  'Kwara': { tinubu: 2820, obi: 1410, atiku: 2010, okwori: 240, sowore: 160, omoaje: 250 },
  'Niger': { tinubu: 3210, obi: 1120, atiku: 2240, okwori: 620, sowore: 110, omoaje: 190 },

  // Diaspora (Obi, Okonjo-Iweala, Sowore prominent)
  'Diaspora Voters': { tinubu: 1450, obi: 6420, atiku: 1120, okwori: 310, sowore: 1280, omoaje: 1940 }
};

export const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'c1',
    author: 'Chidubem Eze',
    state: 'Anambra',
    candidateId: 'obi',
    content: 'Obi Peter Gregory represents fiscal prudence and genuine production. His track record in Anambra speaks for itself—no pension arrears, left billions in reserves. NDC all the way!',
    timestamp: '15 mins ago',
    likes: 42,
    isVerifiedVoter: true
  },
  {
    id: 'c2',
    author: 'Grace Ngbede',
    state: 'Benue',
    candidateId: 'okwori',
    content: 'Ada Elizabeth Fredrick Okwori represents true grassroots compassion, agro-allied innovation, and women empowerment. Her plans for cold-storage hubs and maternal healthcare will revitalize middle-belt farming families. NDP all the way!',
    timestamp: '28 mins ago',
    likes: 31,
    isVerifiedVoter: true
  },
  {
    id: 'c3',
    author: 'Babatunde Adebayo',
    state: 'Lagos',
    candidateId: 'tinubu',
    content: 'President Tinubu took the tough, bold decisions that previous leaders dodged for 30 years (subsidy removal and FX unification). The Lagos-Calabar coastal road and NELFUND student loans show long-term vision. Let him consolidate.',
    timestamp: '42 mins ago',
    likes: 27,
    isVerifiedVoter: true
  },
  {
    id: 'c4',
    author: 'Fatima Mohammed',
    state: 'Adamawa',
    candidateId: 'atiku',
    content: 'Atiku has always championed restructuring and private enterprise. The federal government has too much power concentrated in Abuja. Devolution to states and state police is the only lasting solution to our security and economic woes.',
    timestamp: '1 hour ago',
    likes: 19,
    isVerifiedVoter: true
  },
  {
    id: 'c5',
    author: 'Kemi Sowemimo',
    state: 'Diaspora Voters',
    candidateId: 'sowore',
    content: 'Sowore is the only one who consistently stands with ordinary workers and student unions without compromising with the political elite. ₦250k minimum wage and free healthcare is what true democracy looks like!',
    timestamp: '2 hours ago',
    likes: 24,
    isVerifiedVoter: true
  },
  {
    id: 'c6',
    author: 'Alhaji Rasheed Adeleke',
    state: 'Osun',
    candidateId: 'omoaje',
    content: 'Adekunle Rufai Omoaje has championed grassroots democracy and local government autonomy for decades. The Action Alliance platform for youth vocational skills and cottage industrialization will transform our communities!',
    timestamp: '3 hours ago',
    likes: 38,
    isVerifiedVoter: true
  }
];

export const TOP_ISSUES_POLL: IssuePollOption[] = [
  { id: 'economy', title: 'Naira Stability & Inflation', description: 'Tackling hyper-inflation, food prices, and stabilizing exchange rates.', votes: 4120, icon: 'TrendingDown' },
  { id: 'security', title: 'Security & Banditry / State Police', description: 'Halting kidnapping, farmer-herder clashes, and securing agrarian belts.', votes: 3680, icon: 'Shield' },
  { id: 'jobs', title: 'Youth Unemployment & Living Wage', description: 'Creating tech/industrial jobs and paying a fair living wage.', votes: 2940, icon: 'Briefcase' },
  { id: 'power', title: '24/7 Electricity & Refineries', description: 'Ending national grid collapse and refining crude oil locally.', votes: 2510, icon: 'Zap' },
  { id: 'corruption', title: 'Cost of Governance & Corruption', description: 'Cutting wasteful elite spending, luxury convoys, and looting.', votes: 3190, icon: 'DollarSign' }
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
