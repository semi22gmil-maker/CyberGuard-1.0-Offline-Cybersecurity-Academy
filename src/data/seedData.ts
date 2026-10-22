import { Category, Lesson, QuizQuestion, Challenge, Achievement } from '../types';

export const SEED_CATEGORIES: Category[] = [
  {
    id: 1,
    titleEn: 'Cybersecurity Fundamentals',
    titleAr: 'أساسيات الأمن السيبراني',
    descriptionEn: 'The CIA Triad, attack surfaces, threat modeling, and defense-in-depth principles.',
    descriptionAr: 'ثالوث أمن المعلومات، نماذج التهديدات، ومبادئ الدفاع متعدد الطبقات.',
    iconName: 'ShieldCheck',
    difficulty: 'Beginner',
    sortOrder: 1,
  },
  {
    id: 2,
    titleEn: 'Networking Basics & Protocols',
    titleAr: 'أساسيات الشبكات والبروتوكولات',
    descriptionEn: 'TCP/IP stack, packet headers, port mapping, firewalls, and Wi-Fi security.',
    descriptionAr: 'حزم TCP/IP، ترويسات الحزم، فحص المنافذ، والجدران النارية وأمان الواي فاي.',
    iconName: 'Network',
    difficulty: 'Beginner',
    sortOrder: 2,
  },
  {
    id: 3,
    titleEn: 'Operating System Security',
    titleAr: 'أمان أنظمة التشغيل',
    descriptionEn: 'Access control lists, kernel protection, process isolation, and privilege escalation.',
    descriptionAr: 'قوائم التحكم بالوصول، أمان النواة، عزل العمليات، وتصعيد الصلاحيات.',
    iconName: 'Terminal',
    difficulty: 'Intermediate',
    sortOrder: 3,
  },
  {
    id: 4,
    titleEn: 'Web Application Security',
    titleAr: 'أمان تطبيقات الويب',
    descriptionEn: 'OWASP Top 10 vulnerabilities: SQL Injection, XSS, CSRF, and secure cookies.',
    descriptionAr: 'أبرز ثغرات تطبيقات الويب: حقن SQL، هجمات XSS، وتزوير الطلبات CSRF.',
    iconName: 'Globe',
    difficulty: 'Intermediate',
    sortOrder: 4,
  },
  {
    id: 5,
    titleEn: 'Password Security & Entropy',
    titleAr: 'أمان كلمات المرور والإنتروبيا',
    descriptionEn: 'Mathematical Shannon entropy, brute force math, salted hashing, and managers.',
    descriptionAr: 'حساب الإنتروبيا الرياضية، مقاومة القوة الغاشمة، وأملاح التشفير.',
    iconName: 'Key',
    difficulty: 'Beginner',
    sortOrder: 5,
  },
  {
    id: 6,
    titleEn: 'Authentication & Authorization',
    titleAr: 'المصادقة والتفويض',
    descriptionEn: 'Multi-Factor Authentication (MFA), FIDO2/WebAuthn, biometric tokens, and RBAC.',
    descriptionAr: 'المصادقة متعددة العوامل، معايير FIDO2، الأمان الحيوي، والتحكم بالصلاحيات.',
    iconName: 'Lock',
    difficulty: 'Intermediate',
    sortOrder: 6,
  },
  {
    id: 7,
    titleEn: 'Cryptography Fundamentals',
    titleAr: 'أساسيات علم التشفير',
    descriptionEn: 'Symmetric (AES) vs Asymmetric (RSA/ECC), cryptographic hashes, and signatures.',
    descriptionAr: 'التشفير المتماثل وغير المتماثل، دوال التجزئة، والتوقيعات الرقمية.',
    iconName: 'Cpu',
    difficulty: 'Advanced',
    sortOrder: 7,
  },
  {
    id: 8,
    titleEn: 'Malware Awareness & Analysis',
    titleAr: 'التوعية بالبرمجيات الخبيثة وتحليلها',
    descriptionEn: 'Ransomware, trojans, worms, rootkits, polymorphic loaders, and sandbox triage.',
    descriptionAr: 'برمجيات الفدية، أحصنة طروادة، الديدان، وطرق عزل الساندبوكس الآمن.',
    iconName: 'AlertTriangle',
    difficulty: 'Beginner',
    sortOrder: 8,
  },
  {
    id: 9,
    titleEn: 'Phishing & Social Engineering',
    titleAr: 'التصيد الاحتيالي والهندسة الاجتماعية',
    descriptionEn: 'Spear phishing, homograph deception, psychological urgency, and credential harvesting.',
    descriptionAr: 'التصيد الموجه، النطاقات المخادعة، استغلال التسرع، وسرقة بيانات الاعتماد.',
    iconName: 'Mail',
    difficulty: 'Beginner',
    sortOrder: 9,
  },
  {
    id: 10,
    titleEn: 'Digital Privacy & Anonymity',
    titleAr: 'الخصوصية الرقمية وإخفاء الهوية',
    descriptionEn: 'Metadata leaks, browser fingerprinting, VPNs, Tor onion routing, and data hygiene.',
    descriptionAr: 'تسريب البيانات الوصفية، بصمة المتصفح، شبكات VPN، وشبكة Tor لتصفح مجهول.',
    iconName: 'EyeOff',
    difficulty: 'Beginner',
    sortOrder: 10,
  },
  {
    id: 11,
    titleEn: 'Incident Response & Triage',
    titleAr: 'الاستجابة للحوادث والتحقيق الرقمي',
    descriptionEn: 'NIST SP 800-61 lifecycle: Preparation, Detection, Containment, and Eradication.',
    descriptionAr: 'دورة الاستجابة للحوادث وفق معايير NIST: الاحتواء، الاستئصال، والدروس المستفادة.',
    iconName: 'Radio',
    difficulty: 'Advanced',
    sortOrder: 11,
  },
  {
    id: 12,
    titleEn: 'Internet of Things (IoT) Security',
    titleAr: 'أمان إنترنت الأشياء (IoT)',
    descriptionEn: 'Embedded firmware vulnerabilities, default credentials, MQTT protocol, and isolation.',
    descriptionAr: 'ثغرات البرمجيات المضمنة، كلمات المرور المصنعية، بروتوكول MQTT، وعزل الشبكات.',
    iconName: 'Wifi',
    difficulty: 'Intermediate',
    sortOrder: 12,
  },
];

export const SEED_LESSONS: Lesson[] = [
  {
    id: 101,
    categoryId: 1,
    titleEn: 'The CIA Triad: Confidentiality, Integrity, Availability',
    titleAr: 'ثالوث أمن المعلومات: السرية والسلامة والتوافر',
    descriptionEn: 'The foundational model guiding every cybersecurity policy, audit, and defensive posture.',
    descriptionAr: 'النموذج التأسيسي الموجه لكل سياسات أمن المعلومات وتقييم المخاطر.',
    contentEn: `### 1. Learning Objectives
- Define the three core pillars of information security: Confidentiality, Integrity, and Availability.
- Analyze real-world breach scenarios to identify which pillar was compromised.
- Formulate practical defensive controls for each pillar.

### 2. Confidentiality (السرية)
Confidentiality ensures that sensitive information is accessible solely to authorized users, processes, and systems.
- Threats: Eavesdropping, man-in-the-middle sniffing, credential dumping, unauthorized database queries.
- Defenses: AES-256 encryption at rest, TLS 1.3 in transit, strict Least-Privilege access control, and Multi-Factor Authentication.
- Example Scenario: An attacker intercepts unencrypted hospital records transmitted over open public Wi-Fi.

### 3. Integrity (سلامة البيانات)
Integrity guarantees that data remains accurate, complete, and uncorrupted throughout its entire lifecycle.
- Threats: Unauthorized modifications, SQL injection updates, malicious tampering with financial transaction amounts.
- Defenses: Cryptographic hashing (SHA-256), HMAC message authentication codes, digital signatures, and write-once immutable audit logs.
- Example Scenario: A malicious actor alters the IBAN routing number in an automated wire transfer batch.

### 4. Availability (توافر الخدمات)
Availability guarantees that systems, networks, and data are consistently accessible to legitimate users when needed.
- Threats: Distributed Denial of Service (DDoS) floods, ransomware encryption, hardware failures, power outages.
- Defenses: Geographic load balancing, redundant failover nodes, automated immutable backups, and DDoS mitigation scrubbing centers.

### 5. Key Terminology
- Attack Surface: The total sum of reachable entry points that a threat actor can attempt to exploit.
- Zero Trust: A security architecture that operates on the premise that no entity is trusted by default, regardless of perimeter.`,
    contentAr: `### 1. أهداف التعلم
- استيعاب ركائز أمن المعلومات الثلاث: السرية (Confidentiality)، السلامة (Integrity)، والتوافر (Availability).
- تحليل سيناريوهات الاختراق الواقعية وتحديد الركن الذي تعرض للانتهاك.
- صياغة ضوابط أمنية دفاعية لحماية كل ركن من أركان الثالوث.

### 2. السرية (Confidentiality)
ضمان أن البيانات الحساسة لا يمكن الوصول إليها أو قراءتها إلا من قبل الأشخاص والأنظمة المصرح لها فقط.
- التهديدات: التنصت على الشبكات، هجمات الوسيط (MitM)، وسرقة بيانات الاعتماد.
- خطوط الدفاع: التشفير القوي AES-256، بروتوكول TLS 1.3، وتطبيق سياسة الحد الأدنى من الصلاحيات.
- سيناريو واقعي: اعتراض ملفات طبية غير مشفرة أثناء نقلها عبر شبكة واي فاي عامة في مقهى.

### 3. السلامة (Integrity)
ضمان بقاء البيانات دقيقة وكاملة وغير قابلة للتعديل أو التلاعب غير المصرح به أثناء تخزينها أو نقلها.
- التهديدات: تعديل السجلات البرمجية، حقن قواعد البيانات، والتلاعب بأرقام الحسابات المالية.
- خطوط الدفاع: دوال التجزئة الرياضية SHA-256، التوقيع الرقمي، وسجلات المراقبة غير القابلة للتعديل.
- سيناريو واقعي: قيام مهاجم بتغيير رقم الحساب البنكي المستلم في تحويل مالي مؤتمت.

### 4. التوافر (Availability)
ضمان إمكانية وصول المستخدمين المصرح لهم إلى الخدمات والبيانات والأنظمة في أي وقت ودون انقطاع.
- التهديدات: هجمات الحرمان من الخدمة الموزعة (DDoS)، برمجيات الفدية، والأعطال الفيزيائية.
- خطوط الدفاع: الخوادم الموزعة جغرافياً، النسخ الاحتياطية المعزولة، ومراكز تنقية حركة البيانات.

### 5. مصطلحات أساسية
- سطح الهجوم (Attack Surface): مجموع الثغرات ونقاط الاتصال التي يمكن للمخترق استغلالها.
- انعدام الثقة (Zero Trust): نموذج أمني يرفض الثقة الافتراضية ويفرض التحقق المستمر من كل طلب.`,
    estimatedMinutes: 8,
    difficulty: 'Beginner',
    sortOrder: 1,
  },
  {
    id: 102,
    categoryId: 1,
    titleEn: 'Defense-in-Depth & The Zero Trust Architecture',
    titleAr: 'الدفاع في العمق وبنية انعدام الثقة (Zero Trust)',
    descriptionEn: 'Layered defensive perimeters: why relying on a single firewall guarantees failure.',
    descriptionAr: 'طبقات الدفاع المتسلسلة: لماذا يؤدي الاعتماد على جدار ناري وحيد إلى كارثة حتمية.',
    contentEn: `### 1. The Death of the Castle-and-Moat Model
Traditional security assumed everything inside the local network was trustworthy ("The Castle") and everything outside was untrusted ("The Wild"). Modern attackers easily bypass perimeter firewalls using compromised VPN credentials, phishing, or insider threats.

### 2. The 3 Core Tenets of Zero Trust
1. Verify Explicitly: Authenticate and authorize based on all available data points (identity, device health, geolocation, anomalies).
2. Use Least-Privilege Access: Limit user access with Just-In-Time (JIT) and Just-Enough-Access (JEA) models.
3. Assume Breach: Segment access, inspect all internal traffic, and encrypt everything end-to-end.

### 3. Layers in Defense-in-Depth
- Physical: Biometric data center locks, CCTV.
- Network: Micro-segmentation, VLANs, IDS/IPS.
- Endpoint: Next-Gen Antivirus (EDR), disk encryption.
- Application: Strict input sanitization, WAF.
- Data: Encryption at rest with client-side keys.`,
    contentAr: `### 1. سقوط نموذج القلعة والخندق القديم
كانت الحماية التقليدية تفترض أن كل ما بداخل الشبكة المحلية موثوق بالكامل، بينما كل ما هو خارجها غير موثوق. ولكن في عالم اليوم، يخترق المهاجمون الحدود بسهولة عبر التصيد الاحتيالي أو بيانات VPN المسروقة.

### 2. ركائز بنية انعدام الثقة (Zero Trust)
1. التحقق الصريح والمستمر: فحص هوية المستخدم، سلامة الجهاز، والموقع الجغرافي لكل طلب دون استثناء.
2. صلاحيات الحد الأدنى: منح المستخدم الصلاحيات الضرورية فقط للقيام بمهمته الحالية ولفترة زمنية محددة.
3. افتراض حدوث الاختراق مسبقاً: عزل أجزاء الشبكة وتشفير كافة الاتصالات حتى داخل الخوادم الداخلية.

### 3. طبقات الدفاع في العمق
- الطبقة الفيزيائية: الأقفال الحيوية وكاميرات المراقبة.
- طبقة الشبكة: تقسيم الشبكات الافتراضية وأنظمة كشف التسلل (IDS/IPS).
- طبقة الأجهزة: أنظمة الحماية والاستجابة EDR وتشفير الأقراص.
- طبقة التطبيقات: فحص المدخلات وجدران حماية تطبيقات الويب WAF.
- طبقة البيانات: التشفير الشامل للمعلومات أثناء التخزين والنقل.`,
    estimatedMinutes: 10,
    difficulty: 'Beginner',
    sortOrder: 2,
  },
  {
    id: 201,
    categoryId: 2,
    titleEn: 'TCP/IP vs OSI: Ports, Packets, and Encapsulation',
    titleAr: 'نموذج TCP/IP مقابل OSI: المنافذ والحزم وتغليف البيانات',
    descriptionEn: 'How data travels across networks and where security controls intercept malicious packets.',
    descriptionAr: 'مسار انتقال البيانات عبر الشبكات ونقاط فحص الحزم واعتراض الهجمات.',
    contentEn: `### 1. The TCP 3-Way Handshake
1. SYN: Client sends a Synchronize packet with an initial sequence number.
2. SYN-ACK: Server acknowledges and responds with its own sequence number.
3. ACK: Client acknowledges receipt. Connection is officially ESTABLISHED.

### 2. Common Security Ports to Know
- Port 22: SSH (Secure Shell) — Must never be exposed to public internet without key-based auth or VPN.
- Port 53: DNS (Domain Name System) — Vulnerable to cache poisoning and DNS tunneling.
- Port 80 / 443: HTTP / HTTPS — The standard web traffic ports.
- Port 3389: RDP (Remote Desktop Protocol) — High-value target for ransomware gangs.

### 3. Packet Inspection
- Packet Filtering (L3/L4): Checks source/destination IP and port. Fast but blind to malicious payloads.
- Deep Packet Inspection (DPI / L7): Decodes and inspects the actual application payload for malware signatures or exploit strings.`,
    contentAr: `### 1. مصافحة TCP الثلاثية (3-Way Handshake)
1. SYN: العميل يرسل طلب بدء الاتصال برقم تسلسلي محدد.
2. SYN-ACK: الخادم يوافق ويرسل رقمه التسلسلي الخاص للتأكيد.
3. ACK: العميل يؤكد الاستلام، ويتم إنشاء قناة الاتصال الآمنة.

### 2. أهم المنافذ الأمنية التي يجب حفظها
- المنفذ 22 (SSH): بروتوكول التحكم عن بعد المشفر. يجب عدم كشفه للإنترنت العام مباشرة.
- المنفذ 53 (DNS): ترجمة أسماء النطاقات. عرضة لهجمات التسميم والأنفاق الخبيثة.
- المنفذين 80 و 443: بروتوكولات الويب (HTTP و HTTPS المشفر).
- المنفذ 3389 (RDP): سطح المكتب البعيد في ويندوز، وهو الهدف الأول لعصابات الفدية.

### 3. فحص حزم الشبكة
- فلترة الحزم التقليدية: تفحص عناوين IP والمنافذ فقط بسرعة ولكن دون فحص المحتوى.
- الفحص العميق للحزم (DPI): يفكك الحزمة ويفحص المحتوى البرمجي الداخلي لكشف الأكواد الخبيثة.`,
    estimatedMinutes: 9,
    difficulty: 'Beginner',
    sortOrder: 1,
  },
  {
    id: 501,
    categoryId: 5,
    titleEn: 'Password Entropy, Hashing, and Salt Mechanics',
    titleAr: 'إنتروبيا كلمات المرور والتجزئة وأملاح التشفير (Salts)',
    descriptionEn: 'Mathematical complexity calculation, dictionary attacks, and bcrypt/Argon2 hashing.',
    descriptionAr: 'الحساب الرياضي لتعقيد الكلمات، هجمات القواميس، وخوارزميات التجزئة الحديثة.',
    contentEn: `### 1. Shannon Password Entropy
Entropy measures the unpredictability of a password in mathematical bits:
E = L * log2(R)
Where:
- L is the length of the password.
- R is the size of the character pool (lowercase = 26, mixed alphanumeric = 62, full ASCII = 94).

### 2. Entropy Benchmarks
- < 40 bits: Trivially cracked in seconds by modern GPU clusters (e.g. password123).
- 60–80 bits: Good for everyday consumer accounts.
- > 85 bits: Cryptographically resilient against offline brute force for decades.

### 3. The Role of Cryptographic Salt
A Salt is a cryptographically random unique string appended to each password prior to hashing:
- Prevents identical passwords from having identical hashes.
- Completely neutralizes precomputed Rainbow Table lookup databases.`,
    contentAr: `### 1. إنتروبيا شانون لكلمات المرور (Entropy)
الإنتروبيا مقياس رياضي بالبتات لمدى عشوائية وصعوبة تخمين كلمة المرور:
E = L * log2(R)
حيث:
- L: طول كلمة المرور.
- R: حجم مجموعة الحروف المستخدمة (26 للحروف الصغيرة، 62 مع الأرقام، 94 مع الرموز).

### 2. مقاييس قوة الإنتروبيا
- أقل من 40 بت: تُكسر في ثوانٍ معدودة عبر بطاقات الرسوميات الحديثة.
- من 60 إلى 80 بت: مستوى حماية جيد جداً للحسابات الشخصية.
- أكثر من 85 بت: مناعة تشفيرية فائقة ضد هجمات القوة الغاشمة لعدة عقود.

### 3. وظيفة الملح المشفر (Cryptographic Salt)
الملح هو سلسلة عشوائية فريدة تُضاف لكل كلمة مرور قبل إدخالها في دالة التجزئة:
- يمنع تطابق التجزئة لكلمات المرور المتشابهة.
- يعطل تماماً هجمات الجداول مسبقة الحساب (Rainbow Tables).`,
    estimatedMinutes: 11,
    difficulty: 'Intermediate',
    sortOrder: 1,
  },
  {
    id: 701,
    categoryId: 7,
    titleEn: 'Symmetric vs Asymmetric Encryption & Hashes',
    titleAr: 'التشفير المتماثل وغير المتماثل ودوال التجزئة',
    descriptionEn: 'AES-GCM, RSA key pairs, Diffie-Hellman key exchange, and SHA-256 properties.',
    descriptionAr: 'خوارزمية AES، أزواج مفاتيح RSA، تبادل المفاتيح، وخصائص دالة SHA-256.',
    contentEn: `### 1. Symmetric Encryption (Secret Key)
Uses the single identical shared secret key for both encryption and decryption.
- Algorithms: AES-256-GCM, ChaCha20.
- Speed: Extremely fast, hardware-accelerated via AES-NI CPU instructions.
- Challenge: Secure key distribution across untrusted channels.

### 2. Asymmetric Encryption (Public / Private Key Pair)
Uses mathematically linked key pairs: the Public Key encrypts; only the matching Private Key decrypts.
- Algorithms: RSA-4096, ECC (Elliptic Curve Cryptography: Curve25519).
- Use Case: Secure key exchange, digital signatures, TLS handshakes.

### 3. Cryptographic Hashes (One-Way Functions)
A deterministic mathematical function that takes any input size and produces a fixed-size digest (e.g., 256 bits for SHA-256).
- Pre-image resistance: Impossible to reverse-calculate the input from the hash.
- Avalanche effect: Changing even a single bit in the input radically alters more than 50% of the output bits.`,
    contentAr: `### 1. التشفير المتماثل (المفتاح السري المشترك)
يستخدم نفس المفتاح السري للتشفير وفك التشفير معاً.
- الخوارزميات: AES-256-GCM و ChaCha20.
- السرعة: فائق السرعة ومدعوم بالعتاد المباشر في معالجات الحواسيب.
- التحدي الأكبر: كيفية إيصال المفتاح السري بأمان للطرف الآخر دون اعتراضه.

### 2. التشفير غير المتماثل (زوج المفاتيح العام والخاص)
يعتمد على زوج مفاتيح مرتبط رياضياً: المفتاح العام يُوزع للجميع لتشفير الرسائل، بينما المفتاح الخاص وحده يفك التشفير.
- الخوارزميات: RSA-4096 والمنحنيات الإهليلجية (ECC).
- الاستخدام: تبادل مفاتيح التشفير بأمان، التوقيع الرقمي، ومصافحة TLS في المواقع.

### 3. دوال التجزئة الرياضية (دوال الاتجاه الواحد)
دوال تحول أي مدخل بأي حجم إلى بصمة رقمية بطول ثابت ومحدد (256 بت في SHA-256).
- استحالة العكس: لا يمكن رياضياً معرفة النص الأصلي من ناتج التجزئة.
- تأثير الانهيار الثلجي (Avalanche Effect): تغيير حرف واحد أو فاصلة يبدل أكثر من 50% من ناتج البصمة بالكامل!`,
    estimatedMinutes: 12,
    difficulty: 'Advanced',
    sortOrder: 1,
  },
];

export const SEED_QUIZZES: QuizQuestion[] = [
  {
    id: 1001,
    lessonId: 101,
    questionEn: 'A financial system database was altered in transit so account recipient numbers were changed. Which pillar of the CIA Triad was compromised?',
    questionAr: 'تم اعتراض وتعديل بيانات تحويل مالي في بنك وتبديل أرقام الحسابات أثناء الإرسال. أي ركن من ثالوث أمن المعلومات تم انتهاكه؟',
    optionsEn: ['Confidentiality', 'Integrity', 'Availability', 'Non-repudiation'],
    optionsAr: ['السرية (Confidentiality)', 'السلامة (Integrity)', 'التوافر (Availability)', 'عدم الإنكار (Non-repudiation)'],
    correctOptionIndex: 1,
    explanationEn: 'Integrity guarantees that data has not been modified or tampered with by unauthorized parties.',
    explanationAr: 'ركن السلامة (Integrity) هو الذي يضمن عدم التلاعب بالبيانات أو تعديلها من قبل أطراف غير مصرح لها أثناء النقل أو التخزين.',
    points: 25,
    questionType: 'SCENARIO',
  },
  {
    id: 1002,
    lessonId: 101,
    questionEn: 'True or False: A robust firewall at the network perimeter is sufficient to protect an organization from modern cyber attacks.',
    questionAr: 'صح أم خطأ: وضع جدار ناري قوي على حدود الشبكة يعد كافياً لحماية المؤسسة من الهجمات الحديثة.',
    optionsEn: ['True', 'False'],
    optionsAr: ['صح', 'خطأ'],
    correctOptionIndex: 1,
    explanationEn: 'False. The modern threat landscape requires Defense-in-Depth and Zero Trust architectures. Perimeter firewalls cannot prevent insider threats, compromised credentials, or phishing.',
    explanationAr: 'خطأ. الهجمات الحديثة تتطلب تطبيق الدفاع في العمق وانعدام الثقة (Zero Trust) لأن الجدار الناري الخارجي لا يمنع هجمات التصيد، ولا التهديدات الداخلية، ولا سرقة بيانات الدخول.',
    points: 20,
    questionType: 'TRUE_FALSE',
  },
  {
    id: 1003,
    lessonId: 501,
    questionEn: 'Why is it critical to add a cryptographically random Salt to passwords before hashing them into a database?',
    questionAr: 'لماذا يُعد إضافة الملح المشفر (Salt) أمراً جوهرياً قبل تجزئة كلمات المرور في قواعد البيانات؟',
    optionsEn: [
      'It compresses long passwords to save database disk space',
      'It ensures identical passwords produce distinct hashes and neutralizes Rainbow Table lookup attacks',
      'It allows the administrator to decrypt the password when the user forgets it',
      'It verifies that the password does not contain dictionary words',
    ],
    optionsAr: [
      'ضغط كلمات المرور لتوفير مساحة القرص في قاعدة البيانات',
      'ضمان إنتاج تجزئة فريدة حتى لكلمات المرور المتطابقة وتعطيل هجمات جداول قوس قزح (Rainbow Tables)',
      'السماح لمدير النظام بفك تشفير كلمة المرور في حال نسيانها من قبل المستخدم',
      'التأكد من أن كلمة المرور خالية من الكلمات الشائعة في القواميس',
    ],
    correctOptionIndex: 1,
    explanationEn: 'Salting prevents identical passwords from producing the same hash value, making precomputed rainbow tables completely ineffective against stolen password dumps.',
    explanationAr: 'يضمن الملح المشفر إنتاج قيم تجزئة فريدة ومختلفة تماماً لكل مستخدم حتى وإن تطابقت كلمات المرور، مما يحبط هجمات جداول قوس قزح مسبقة الإعداد.',
    points: 30,
    questionType: 'MULTIPLE_CHOICE',
  },
];

export const SEED_CHALLENGES: Challenge[] = [
  {
    id: 1,
    titleEn: 'Spear Phishing Email Detection',
    titleAr: 'اكتشاف وتفكيك رسالة تصيد موجهة',
    descriptionEn: 'Inspect suspicious headers, sender addresses, and hidden links in an executive invoice email.',
    descriptionAr: 'افحص الترويسات المشبوهة، عنوان المرسل الحقيقي، والروابط المخفية في فاتورة عاجلة.',
    type: 'PHISHING_EMAIL',
    difficulty: 'Beginner',
    instructionsEn: 'Review the simulated email below. Identify red flags: urgency, domain homoglyphs, and attachment extensions.',
    instructionsAr: 'راجع البريد المحاكى أدناه، واكتشف المؤشرات التحذيرية: الإلحاح الزائف، النطاق المزور، وامتداد الملف المرفق.',
    xpReward: 50,
    payload: {
      fromName: 'Finance Department',
      fromEmail: 'billing@paypa1-security-invoice.com',
      subject: 'URGENT: Outstanding Overdue Invoice #8921 - Action Required Within 2 Hours',
      attachment: 'invoice_march_statement.pdf.exe',
      body: 'Dear Valued Client,\n\nOur automated audit detected an unpaid balance on your account. Failure to settle within 2 hours will result in legal referral.\n\nPlease inspect the attached invoice and verify via the emergency portal below:\n\n[Verify Account & Pay Now](http://192.168.1.105/auth/secure-pay)',
      flags: [
        'PayPa1 with numeral 1 instead of lowercase L',
        'Double file extension: .pdf.exe indicates executable trojan',
        'Artificial 2-hour panic urgency tactic',
        'Generic greeting instead of personalized name',
        'Raw IP address destination URL instead of official domain',
      ],
    },
  },
  {
    id: 2,
    titleEn: 'URL Anatomy & Deception Scanner',
    titleAr: 'تحليل الروابط الخادعة والانتحال البصري',
    descriptionEn: 'Deconstruct four banking login URLs to identify the authentic domain vs phishing clones.',
    descriptionAr: 'حلل 4 روابط بنكية مختلفة للتمييز بين الرابط الرسمي الشرعي والنسخ الانتحالية المزورة.',
    type: 'URL_ANATOMY',
    difficulty: 'Intermediate',
    instructionsEn: 'Examine subdomains, path deception, and top-level domain manipulation. Click the genuine URL.',
    instructionsAr: 'دقق في النطاقات الفرعية، مسارات الخداع، وتلاعب النطاق الأعلى TLD. اختر الرابط الشرعي الوحيد.',
    xpReward: 60,
    payload: {
      options: [
        { url: 'https://secure-login.chasebank.com.auth-gateway.top/portal', isLegit: false, reason: 'Actual domain is auth-gateway.top; chasebank.com is merely an attacker-controlled subdomain.' },
        { url: 'https://www.chase.com/personal/banking/login', isLegit: true, reason: 'Legitimate chase.com domain using official secure HTTPS certificate and standard path.' },
        { url: 'http://www.chαse.com/auth/login', isLegit: false, reason: 'Homoglyph attack: uses Greek alpha character (α) instead of Latin (a). Insecure plain HTTP.' },
        { url: 'https://chase-bank-verify-security.org/login', isLegit: false, reason: 'Deceptive typosquatting domain designed to mimic legitimate financial institutions.' },
      ],
    },
  },
  {
    id: 3,
    titleEn: 'Shannon Password Entropy Builder',
    titleAr: 'بناء عبارة مرور بإنتروبيا فائقة',
    descriptionEn: 'Construct a passphrase achieving at least 80 bits of mathematical Shannon entropy.',
    descriptionAr: 'أنشئ عبارة مرور تحقق أكثر من 80 بت من الإنتروبيا الرياضية لمقاومة هجمات التخمين.',
    type: 'PASSWORD_STRENGTH',
    difficulty: 'Beginner',
    instructionsEn: 'Combine multiple random words, mixed casing, numbers, and symbols until the live entropy gauge surpasses 80 bits.',
    instructionsAr: 'ادمج عدة كلمات عشوائية مع حروف متباينة وأرقام ورموز خاصة حتى يتجاوز مقياس الإنتروبيا 80 بت.',
    xpReward: 50,
    payload: {
      targetEntropy: 80,
    },
  },
];

export const SEED_ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    code: 'FIRST_LESSON',
    titleEn: 'First Steps in Defense',
    titleAr: 'الخطوة الأولى في الدفاع',
    descriptionEn: 'Complete your first cybersecurity lesson.',
    descriptionAr: 'إتمام الدرس الأول في مسارات الأمن السيبراني.',
    iconName: 'Shield',
    unlockCondition: 'LESSONS >= 1',
    xpReward: 50,
  },
  {
    id: 2,
    code: 'FIRST_QUIZ',
    titleEn: 'Knowledge Verified',
    titleAr: 'إثبات المعرفة',
    descriptionEn: 'Pass your first knowledge check quiz.',
    descriptionAr: 'اجتياز الاختبار المعرفي الأول بنجاح.',
    iconName: 'CheckCircle',
    unlockCondition: 'QUIZZES >= 1',
    xpReward: 50,
  },
  {
    id: 3,
    code: 'FIVE_LESSONS',
    titleEn: 'Security Apprentice',
    titleAr: 'متدرب أمن المعلومات',
    descriptionEn: 'Complete 5 educational cybersecurity lessons.',
    descriptionAr: 'إتمام 5 دروس تعليمية متنوعة بنجاح.',
    iconName: 'Award',
    unlockCondition: 'LESSONS >= 5',
    xpReward: 100,
  },
  {
    id: 4,
    code: 'TEN_CORRECT',
    titleEn: 'Sharp Defender',
    titleAr: 'المدافع اليقظ',
    descriptionEn: 'Answer 10 quiz questions correctly without errors.',
    descriptionAr: 'الإجابة الصحيحة عن 10 أسئلة في الاختبارات.',
    iconName: 'Target',
    unlockCondition: 'CORRECT >= 10',
    xpReward: 100,
  },
  {
    id: 5,
    code: 'FIRST_CHALLENGE',
    titleEn: 'Hands-On Operator',
    titleAr: 'خبير الميدان العملي',
    descriptionEn: 'Successfully solve your first offline security challenge.',
    descriptionAr: 'حل أول تحدٍ عملي بنجاح دون اتصال بالإنترنت.',
    iconName: 'Tool',
    unlockCondition: 'CHALLENGES >= 1',
    xpReward: 75,
  },
  {
    id: 6,
    code: 'SEVEN_STREAK',
    titleEn: 'Relentless Vigilance',
    titleAr: 'يقظة مستمرة',
    descriptionEn: 'Maintain a 7-day continuous learning streak.',
    descriptionAr: 'الحفاظ على سجل تعلم مستمر لمدة 7 أيام متتالية.',
    iconName: 'Flame',
    unlockCondition: 'STREAK >= 7',
    xpReward: 150,
  },
];
