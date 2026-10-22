package com.cyberguard.academy.data.database

import com.cyberguard.academy.data.entities.*

object SeedData {

    suspend fun populateInitialData(database: AppDatabase) {
        val learningDao = database.learningDao()
        val quizDao = database.quizDao()
        val challengeDao = database.challengeDao()
        val achievementDao = database.achievementDao()
        val userDao = database.userDao()
        val statsDao = database.statsDao()

        // 1. Initial User Profile & Stats
        userDao.insertOrUpdateProfile(
            UserProfile(
                id = 1L,
                displayName = "Cyber Cadet",
                preferredLanguage = "en",
                themeMode = "dark",
                dailyGoalMinutes = 15
            )
        )

        statsDao.insertOrUpdateStats(
            UserStatsEntity(
                id = 1L,
                totalXp = 0,
                currentLevel = 1,
                completedLessons = 0,
                completedChallenges = 0,
                correctAnswers = 0,
                totalAnswers = 0,
                currentStreak = 1,
                lastActivityDate = ""
            )
        )

        // 2. 12 Categories
        val categories = listOf(
            CategoryEntity(
                id = 1L,
                titleEn = "Cybersecurity Fundamentals",
                titleAr = "أساسيات الأمن السيبراني",
                descriptionEn = "Core security principles: CIA Triad, threat landscape, attack surfaces, and defense-in-depth.",
                descriptionAr = "المبادئ الأمنية الجوهرية: ثالوث CIA، مشهد التهديدات، ومفهوم الدفاع في العمق.",
                iconName = "shield_lock",
                difficulty = "Beginner",
                sortOrder = 1
            ),
            CategoryEntity(
                id = 2L,
                titleEn = "Networking Basics",
                titleAr = "أساسيات الشبكات",
                descriptionEn = "TCP/IP, OSI model, ports, protocols, firewalls, and packet analysis principles.",
                descriptionAr = "حزم TCP/IP، نموذج OSI، المنافذ، البروتوكولات، الجدران النارية، وتحليل الحزم.",
                iconName = "network_check",
                difficulty = "Beginner",
                sortOrder = 2
            ),
            CategoryEntity(
                id = 3L,
                titleEn = "Operating System Security",
                titleAr = "أمان أنظمة التشغيل",
                descriptionEn = "Access control lists (ACLs), kernel security, patch management, and privilege escalation.",
                descriptionAr = "قوائم التحكم بالوصول، أمان النواة، إدارة التحديثات، والتصعيد غير المصرح للصلاحيات.",
                iconName = "terminal",
                difficulty = "Intermediate",
                sortOrder = 3
            ),
            CategoryEntity(
                id = 4L,
                titleEn = "Web Application Security",
                titleAr = "أمان تطبيقات الويب",
                descriptionEn = "OWASP Top 10: SQL injection, Cross-Site Scripting (XSS), CSRF, and secure cookies.",
                descriptionAr = "أهم 10 ثغرات ويب حسب OWASP: حقن SQL، هجمات XSS، وتزوير الطلبات CSRF.",
                iconName = "web",
                difficulty = "Intermediate",
                sortOrder = 4
            ),
            CategoryEntity(
                id = 5L,
                titleEn = "Password Security",
                titleAr = "أمان كلمات المرور",
                descriptionEn = "Password entropy, brute force defenses, credential stuffing, and modern password managers.",
                descriptionAr = "الإنتروبيا العشوائية، التصدي لهجمات القوة الغاشمة، وحشو بيانات الاعتماد.",
                iconName = "key",
                difficulty = "Beginner",
                sortOrder = 5
            ),
            CategoryEntity(
                id = 6L,
                titleEn = "Authentication & Authorization",
                titleAr = "المصادقة والتفويض",
                descriptionEn = "MFA/2FA mechanisms, biometric security, OAuth2 tokens, and Role-Based Access Control (RBAC).",
                descriptionAr = "المصادقة متعددة العوامل MFA، الأمان الحيوي، ورموز OAuth2 والتحكم المبني على الأدوار.",
                iconName = "verified_user",
                difficulty = "Intermediate",
                sortOrder = 6
            ),
            CategoryEntity(
                id = 7L,
                titleEn = "Cryptography Fundamentals",
                titleAr = "أساسيات علم التشفير",
                descriptionEn = "Symmetric (AES) vs Asymmetric (RSA), cryptographic hash functions (SHA-256), and digital signatures.",
                descriptionAr = "التشفير المتماثل وغير المتماثل، دوال التجزئة الرياضية SHA-256، والتوقيع الرقمي.",
                iconName = "lock",
                difficulty = "Advanced",
                sortOrder = 7
            ),
            CategoryEntity(
                id = 8L,
                titleEn = "Malware Awareness",
                titleAr = "التوعية بالبرمجيات الخبيثة",
                descriptionEn = "Viruses, worms, ransomware, rootkits, trojans, and sandbox analysis methodologies.",
                descriptionAr = "الفيروسات، الديدان، برمجيات الفدية، برمجيات التجسس، وطرق عزل الساندبوكس.",
                iconName = "bug_report",
                difficulty = "Beginner",
                sortOrder = 8
            ),
            CategoryEntity(
                id = 9L,
                titleEn = "Phishing & Social Engineering",
                titleAr = "التصيد الاحتيالي والهندسة الاجتماعية",
                descriptionEn = "Spear phishing, pretexting, water-holing, visual spoofing, and cognitive bias manipulation.",
                descriptionAr = "التصيد الموجه، انتحال الشخصيات، والتلاعب بالنواحي النفسية والمعرفية للضحايا.",
                iconName = "mail_lock",
                difficulty = "Beginner",
                sortOrder = 9
            ),
            CategoryEntity(
                id = 10L,
                titleEn = "Digital Privacy",
                titleAr = "الخصوصية الرقمية",
                descriptionEn = "Metadata tracking, browser fingerprinting, VPNs, Tor onion routing, and data minimization.",
                descriptionAr = "تتبع البيانات الوصفية، بصمة المتصفح، شبكات VPN، وشبكة Tor وتقليل جمع البيانات.",
                iconName = "visibility_off",
                difficulty = "Beginner",
                sortOrder = 10
            ),
            CategoryEntity(
                id = 11L,
                titleEn = "Incident Response",
                titleAr = "الاستجابة للحوادث السيبرانية",
                descriptionEn = "NIST SP 800-61 lifecycle: Preparation, Detection, Containment, Eradication, and Lessons Learned.",
                descriptionAr = "دورة حياة الاستجابة لحوادث الأمن السيبراني وفق معيار NIST: الاحتواء، الاستئصال والتعافي.",
                iconName = "emergency",
                difficulty = "Advanced",
                sortOrder = 11
            ),
            CategoryEntity(
                id = 12L,
                titleEn = "Internet of Things (IoT) Security",
                titleAr = "أمان إنترنت الأشياء",
                descriptionEn = "Firmware vulnerabilities, insecure default credentials, MQTT protocol, and micro-segmentation.",
                descriptionAr = "ثغرات البرمجيات الثابتة، كلمات المرور الافتراضية، بروتوكول MQTT، وعزل الشبكات.",
                iconName = "devices_other",
                difficulty = "Intermediate",
                sortOrder = 12
            )
        )
        learningDao.insertCategories(categories)

        // 3. Lessons for Categories
        val lessons = listOf(
            LessonEntity(
                id = 101L,
                categoryId = 1L,
                titleEn = "The CIA Triad: Confidentiality, Integrity, Availability",
                titleAr = "ثالوث أمن المعلومات: السرية والسلامة والتوافر",
                descriptionEn = "The bedrock foundation of all information security architecture and risk assessment.",
                descriptionAr = "العمود الفقري وحجر الأساس لكل معمارية أمن معلومات وتقييم المخاطر الرقمية.",
                contentEn = """
                    ## Learning Objectives
                    - Understand the three foundational pillars of information security.
                    - Distinguish between Confidentiality breaches, Integrity tampering, and Availability denial.
                    - Apply the Triad to evaluate modern security architectures.

                    ## 1. Confidentiality (السرية)
                    Confidentiality guarantees that data is accessible strictly to authorized entities, processes, and individuals. 
                    - **Countermeasures**: Strong encryption (AES-256), multi-factor access control, strict least-privilege policies.
                    - **Example Breach**: An attacker intercepts an unencrypted email containing user bank statements via Wi-Fi eavesdropping.

                    ## 2. Integrity (سلامة البيانات)
                    Integrity ensures information remains accurate, authentic, and untampered throughout its lifecycle.
                    - **Countermeasures**: Cryptographic checksums (SHA-256), digital signatures, file integrity monitoring (FIM).
                    - **Example Breach**: A Man-in-the-Middle (MitM) altering the recipient routing code in a financial transaction payload.

                    ## 3. Availability (التوافر)
                    Availability guarantees authorized users have timely, reliable access to critical services and data.
                    - **Countermeasures**: Redundant failover clusters, Distributed Denial of Service (DDoS) mitigation, offline cold backups.
                    - **Example Breach**: A volumetric botnet flooding an authentication server with 100 Gbps of junk packets.

                    ## Key Terminology
                    - **Attack Surface**: The total sum of vulnerabilities that an attacker can exploit.
                    - **Zero Trust**: Never trust, always verify every request regardless of perimeter location.
                """.trimIndent(),
                contentAr = """
                    ## أهداف التعلم
                    - فهم الركائز الثلاث الأساسية لأمن المعلومات الرقمية.
                    - التمييز بين انتهاك السرية، التلاعب بالسلامة، وتعطيل التوافر.
                    - تطبيق نموذج CIA في تقييم المخاطر المعاصرة.

                    ## 1. السرية (Confidentiality)
                    ضمان وصول البيانات فقط للأشخاص والأنظمة المصرح لها قانونياً وتقنياً.
                    - **وسائل الدفاع**: التشفير القوي AES-256، سياسة الحد الأدنى من الصلاحيات، والتحكم بالوصول.
                    - **مثال الانتهاك**: تنصت مهاجم على رسالة غير مشفرة تحتوي على كشوف حسابات بنكية عبر شبكة عامة.

                    ## 2. السلامة (Integrity)
                    ضمان بقاء البيانات صحيحة ودقيقة دون أي تعديل أو تلاعب غير مصرح به أثناء التخزين أو النقل.
                    - **وسائل الدفاع**: دوال التجزئة الرياضية SHA-256، التوقيع الرقمي، ومراقبة سلامة الملفات.
                    - **مثال الانتهاك**: تعديل رقم الحساب المستفيد في تحويلة بنكية أثناء انتقالها عبر الشبكة.

                    ## 3. التوافر (Availability)
                    ضمان إتاحة الخدمات والبيانات للمستخدمين المصرح لهم في أي وقت دون انقطاع.
                    - **وسائل الدفاع**: السيرفرات الاحتياطية الموزعة، الحماية من هجمات الحرمان من الخدمة DDoS، والنسخ الاحتياطي.
                    - **مثال الانتهاك**: إغراق خادم تسجيل الدخول بمليارات الطلبات المزيفة لإسقاطه.

                    ## مصطلحات رئيسية
                    - **سطح الهجوم (Attack Surface)**: مجموع الثغرات ونقاط الاتصال التي يمكن للمخترق استغلالها.
                    - **انعدام الثقة (Zero Trust)**: مبدأ أمني يفرض التحقق من كل طلب ولا يثق بأي جهة مسبقاً.
                """.trimIndent(),
                estimatedMinutes = 8,
                difficulty = "Beginner",
                sortOrder = 1
            ),
            LessonEntity(
                id = 102L,
                categoryId = 1L,
                titleEn = "Defense-in-Depth & The Zero Trust Architecture",
                titleAr = "الدفاع في العمق وبنية انعدام الثقة (Zero Trust)",
                descriptionEn = "Layered defensive perimeters: why relying on a single firewall guarantees failure.",
                descriptionAr = "طبقات الدفاع المتعددة: لماذا يؤدي الاعتماد على جدار ناري وحيد إلى الفشل المحتوم.",
                contentEn = """
                    ## Learning Objectives
                    - Understand why perimeter security alone is obsolete.
                    - Implement layered controls across physical, network, host, and application tiers.
                    - Master the 3 core tenets of Zero Trust: verify explicitly, least privilege, assume breach.

                    ## Layered Defense
                    1. **Perimeter Layer**: Firewalls, WAFs, DDoS scrubbing.
                    2. **Network Layer**: VLANs, micro-segmentation, zero-trust network access.
                    3. **Host Layer**: Endpoint detection & response (EDR), OS hardening.
                    4. **Application Layer**: Input validation, secure API gateways.
                    5. **Data Layer**: Field-level encryption, tokenization, DLP.
                """.trimIndent(),
                contentAr = """
                    ## أهداف التعلم
                    - فهم سبب عدم كفاية حماية الحدود الشبكية التقليدية وحدها.
                    - تطبيق عناصر الأمان متعددة الطبقات (فيزيائية، شبكية، نظام، وتطبيق).
                    - إتقان مبادئ Zero Trust الثلاثة: التحقق الصريح، أقل صلاحية، وافتراض حدوث الاختراق دائماً.

                    ## طبقات الدفاع المتسلسلة
                    1. **طبقة الحدود**: الجدران النارية وفلاتر تطبيقات الويب WAF.
                    2. **طبقة الشبكة**: تقسيم الشبكات الافتراضية وعزل الأجهزة الحساسة.
                    3. **طبقة المضيف**: أنظمة الحماية والاستجابة على الأجهزة EDR وتقوية النظام.
                    4. **طبقة التطبيقات**: فحص المدخلات البرمجية وبوابات واجهات البرمجة الآمنة.
                    5. **طبقة البيانات**: تشفير الحقول الحساسة ومنع تسريب البيانات DLP.
                """.trimIndent(),
                estimatedMinutes = 10,
                difficulty = "Beginner",
                sortOrder = 2
            ),
            LessonEntity(
                id = 201L,
                categoryId = 2L,
                titleEn = "TCP/IP vs OSI: Ports, Packets, and Encapsulation",
                titleAr = "نموذج TCP/IP مقابل OSI: المنافذ، الحزم وتغليف البيانات",
                descriptionEn = "How data travels across networks and where security controls intercept malicious packets.",
                descriptionAr = "كيف تنتقل البيانات عبر الشبكات وأين تتدخل ضوابط الأمان لفحص الحزم الخبيثة.",
                contentEn = """
                    ## Learning Objectives
                    - Trace a packet from Layer 7 (Application) down to Layer 1 (Physical).
                    - Identify critical port numbers (22, 53, 80, 443, 3389).
                    - Understand packet header sniffing and TCP 3-way handshake mechanics.

                    ## The 3-Way Handshake
                    1. **SYN**: Client sends synchronizing sequence number.
                    2. **SYN-ACK**: Server acknowledges and sends its own sequence.
                    3. **ACK**: Client acknowledges. Connection established!
                    - *Attack Vector*: SYN flood attacks exhaust server connection tables.
                """.trimIndent(),
                contentAr = """
                    ## أهداف التعلم
                    - تتبع مسار حزمة البيانات من طبقة التطبيقات وحتى الطبقة الفيزيائية.
                    - حفظ المنافذ الأكثر أهمية (22 SSH، 53 DNS، 80 HTTP، 443 HTTPS).
                    - فهم مصافحة TCP الثلاثية (3-Way Handshake) وكيف يستغلها المهاجمون.

                    ## المصافحة الثلاثية TCP Handshake
                    1. **SYN**: العميل يرسل إشارة طلب المزامنة.
                    2. **SYN-ACK**: الخادم يرد بالموافقة ومزامنة رقمه الخاص.
                    3. **ACK**: العميل يؤكد الاتصال، ويبدأ نقل البيانات الآمن.
                    - *هجوم شائع*: هجوم إغراق SYN Flood يستهلك موارد الخادم حتى يعجز عن الاستجابة.
                """.trimIndent(),
                estimatedMinutes = 9,
                difficulty = "Beginner",
                sortOrder = 1
            ),
            LessonEntity(
                id = 501L,
                categoryId = 5L,
                titleEn = "Password Entropy, Hashing, and Salt Mechanics",
                titleAr = "إنتروبيا كلمات المرور، دوال التجزئة، وأملاح التشفير (Salts)",
                descriptionEn = "Mathematical complexity calculation, dictionary attacks, and bcrypt/Argon2 hashing.",
                descriptionAr = "الحساب الرياضي لتعقيد الكلمات، هجمات القواميس، وخوارزميات التجزئة الحديثة Argon2.",
                contentEn = """
                    ## Learning Objectives
                    - Calculate bits of entropy: $E = L \times \log_2(R)$.
                    - Understand why plain MD5 and SHA-256 are unacceptable for password storage.
                    - Understand cryptographic Salt and Key Derivation Functions (KDFs).

                    ## Entropy Formula
                    Where $L$ is password length, and $R$ is pool size (e.g., 94 printable ASCII characters):
                    - 8 lowercase letters: $8 \times \log_2(26) \approx 37.6\text{ bits}$ (Cracked in milliseconds).
                    - 16 mixed characters: $16 \times \log_2(94) \approx 104.9\text{ bits}$ (Centuries to brute-force).
                """.trimIndent(),
                contentAr = """
                    ## أهداف التعلم
                    - حساب عدد بتات الإنتروبيا العشوائية رياضياً: $E = L \times \log_2(R)$.
                    - فهم خطورة تخزين كلمات المرور باستخدام MD5 أو SHA-256 دون أملاح.
                    - إتقان وظيفة Salt في تعطيل هجمات جداول قوس قزح (Rainbow Tables).

                    ## معادلة الإنتروبيا الرياضية
                    حيث $L$ طول الكلمة، و$R$ عدد الحروف المتاحة في المجموعة:
                    - 8 أحرف صغيرة فقط: تعطي حوالي 37.6 بت (تُكسر في أجزاء من الثانية).
                    - 16 حرفاً مختلطاً ورموز: تعطي أكثر من 104 بت (تتطلب قروناً من المحاولات).
                """.trimIndent(),
                estimatedMinutes = 11,
                difficulty = "Intermediate",
                sortOrder = 1
            ),
            LessonEntity(
                id = 901L,
                categoryId = 9L,
                titleEn = "Phishing Psychology: Deconstructing Malicious Emails",
                titleAr = "سيكولوجيا التصيد: تشريح وتحليل رسائل البريد الخبيثة",
                descriptionEn = "Urgency triggers, homograph domain spoofing, and inspecting raw email headers.",
                descriptionAr = "محفزات التسرع والخوف، انتحال النطاقات المتشابهة، وتدقيق الترويسات Headers.",
                contentEn = """
                    ## Indicators of Phishing
                    1. **Artificial Urgency**: "Account suspended within 2 hours unless confirmed."
                    2. **Mismatched Sender Domains**: Display name says "IT Support" but actual email is `@support-cloud-verify.com`.
                    3. **Embedded Hyperlinks**: Anchor text shows `bank.com` while hyperlink points to `bit.ly` or IP address.
                    4. **Generic Salutations**: "Dear Valued Customer" instead of your actual registered name.
                """.trimIndent(),
                contentAr = """
                    ## أهم مؤشرات رسائل التصيد الاحتيالي
                    1. **خلق شعور وهمي بالاستعجال والخوف**: "سيتم إغلاق حسابك خلال ساعتين إذا لم تؤكد بياناتك الآن".
                    2. **عدم تطابق نطاق المرسل الحقيقي**: الاسم الظاهر "دعم البنك"، بينما العنوان الفعلي من خادم عشوائي مشبوه.
                    3. **الروابط المخادعة**: النص المعروض يبدو رسمياً، بينما الرابط الفعلي يوجه لصفحة ملغومة.
                    4. **التحية المبهمة**: استخدام "عزيزي العميل" بدلاً من الاسم الحقيقي المسجل في الخدمة.
                """.trimIndent(),
                estimatedMinutes = 8,
                difficulty = "Beginner",
                sortOrder = 1
            )
        )
        learningDao.insertLessons(lessons)

        // 4. Quizzes
        val quizzes = listOf(
            QuizQuestionEntity(
                id = 1001L,
                lessonId = 101L,
                questionEn = "A banking system database was altered during transit so account numbers were switched. Which pillar of the CIA Triad was violated?",
                questionAr = "تم اعتراض وتعديل بيانات تحويل مالي في بنك وتبديل أرقام الحسابات أثناء الإرسال. أي ركن من ثالوث CIA تم انتهاكه؟",
                optionsEnJson = "[\"Confidentiality\", \"Integrity\", \"Availability\", \"Non-repudiation\"]",
                optionsArJson = "[\"السرية\", \"السلامة\", \"التوافر\", \"عدم الإنكار\"]",
                correctOptionIndex = 1,
                explanationEn = "Integrity is violated because the data was altered without authorization during transit.",
                explanationAr = "تم انتهاك ركن السلامة (Integrity) لأن البيانات تم التلاعب بها وتعديلها دون تصريح أثناء انتقالها.",
                points = 25,
                questionType = "SCENARIO"
            ),
            QuizQuestionEntity(
                id = 1002L,
                lessonId = 101L,
                questionEn = "True or False: Using HTTPS guarantees both Confidentiality and Server Authenticity for web traffic.",
                questionAr = "صح أم خطأ: استخدام بروتوكول HTTPS يضمن السرية وموثوقية هوية الخادم في حركة الويب.",
                optionsEnJson = "[\"True\", \"False\"]",
                optionsArJson = "[\"صح\", \"خطأ\"]",
                correctOptionIndex = 0,
                explanationEn = "True. HTTPS uses TLS certificates to verify server identity and encrypt traffic to provide confidentiality.",
                explanationAr = "صح. يستخدم HTTPS شهادات TLS الرقمية لإثبات هوية الخادم وتشفير البيانات لحفظ سريتها.",
                points = 20,
                questionType = "TRUE_FALSE"
            ),
            QuizQuestionEntity(
                id = 1003L,
                lessonId = 501L,
                questionEn = "What is the primary cryptographic purpose of adding a random Salt before hashing a password?",
                questionAr = "ما هو الهدف الأمني الرئيسي من إضافة الملح (Salt) العشوائي قبل تجزئة كلمة المرور؟",
                optionsEnJson = "[\"It compresses the password to a shorter length\", \"It prevents identical passwords from producing identical hashes and stops Rainbow Table attacks\", \"It allows the password to be decrypted later\", \"It makes the password impossible to mistype\"]",
                optionsArJson = "[\"ضغط كلمة المرور لتوفير مساحة التخزين\", \"منع إنتاج نفس التجزئة لكلمات المرور المتطابقة وتعطيل جداول قوس قزح\", \"السماح بفك تشفير كلمة المرور واسترجاعها لاحقاً\", \"منع المستخدم من ارتكاب أخطاء إملائية\"]",
                correctOptionIndex = 1,
                explanationEn = "A unique salt ensures that two users with the exact same password will have completely different hashes, neutralizing precomputed rainbow tables.",
                explanationAr = "يضمن الملح العشوائي إنتاج تجزئة فريدة ومختلفة تماماً حتى وإن تطابقت كلمات المرور، مما يعطل هجمات الجداول مسبقة الحساب Rainbow Tables.",
                points = 30,
                questionType = "MULTIPLE_CHOICE"
            )
        )
        quizDao.insertQuizzes(quizzes)

        // 5. Challenges
        val challenges = listOf(
            ChallengeEntity(
                id = 1L,
                titleEn = "Spear Phishing Email Detection",
                titleAr = "اكتشاف رسالة تصيد احتيالي موجهة",
                descriptionEn = "Inspect an urgent invoice email from accounting and flag suspicious indicators.",
                descriptionAr = "افحص فاتورة مشبوهة واردة من قسم المحاسبة واكتشف مؤشرات الخطر الأمنية.",
                type = "PHISHING_EMAIL",
                difficulty = "Beginner",
                instructionsEn = "Review the sender address, subject line, attachment extension, and URL link. Identify if this email is legitimate or phishing.",
                instructionsAr = "راجع عنوان المرسل، موضوع الرسالة، امتداد المرفق، والروابط المتضمنة وحدد ما إذا كانت الرسالة سليمة أم تصيداً احتيالياً.",
                xpReward = 50,
                payloadJson = "{\"sender\":\"billing@paypa1-security-verify.com\",\"subject\":\"URGENT: Outstanding Invoice #9842 OVERDUE\",\"attachment\":\"invoice_scan.pdf.exe\",\"targetUrl\":\"http://185.220.101.5/login\"}"
            ),
            ChallengeEntity(
                id = 2L,
                titleEn = "URL Deception & Homograph Analysis",
                titleAr = "تحليل الروابط الخادعة والانتحال البصري",
                descriptionEn = "Analyze four URLs and select the single legitimate banking portal URL.",
                descriptionAr = "حلل أربعة روابط مختلفة وحدد الرابط الحقيقي الآمن الوحيد لبوابة البنك.",
                type = "URL_ANATOMY",
                difficulty = "Intermediate",
                instructionsEn = "Examine domain endings, subdomains, and punycode obfuscation tactics.",
                instructionsAr = "دقق في امتداد النطاق، النطاقات الفرعية، وتقنيات التعمية البصرية.",
                xpReward = 60,
                payloadJson = "{\"options\":[\"https://www.mybank.com.login-portal.net/secure\",\"https://www.mybank.com/auth/login\",\"http://www.mybαnk.com/login\",\"https://mybank.com-verify.security/auth\"],\"correctIndex\":1}"
            ),
            ChallengeEntity(
                id = 3L,
                titleEn = "Password Entropy Calculator",
                titleAr = "حساب إنتروبيا وقوة كلمة المرور",
                descriptionEn = "Construct a passphrase with over 80 bits of mathematical entropy.",
                descriptionAr = "كوّن عبارة مرور تحقق أكثر من 80 بت من الإنتروبيا والتعقيد الرياضي.",
                type = "PASSWORD_STRENGTH",
                difficulty = "Beginner",
                instructionsEn = "Combine random dictionary words with mixed casing and symbols to achieve high entropy resistant to offline hash cracking.",
                instructionsAr = "ادمج كلمات عشوائية مع حروف متباينة ورموز لتحقيق أقصى مقاومة لاختراق القوة الغاشمة.",
                xpReward = 50,
                payloadJson = "{\"targetEntropy\":80}"
            )
        )
        challengeDao.insertChallenges(challenges)

        // 6. Achievements
        val achievements = listOf(
            AchievementEntity(
                id = 1L,
                code = "FIRST_LESSON",
                titleEn = "First Steps in Defense",
                titleAr = "الخطوة الأولى في الدفاع",
                descriptionEn = "Complete your first cybersecurity lesson.",
                descriptionAr = "أكمل درسك الأول في الأمن السيبراني.",
                iconName = "school",
                unlockCondition = "LESSONS_COMPLETED >= 1",
                xpReward = 50
            ),
            AchievementEntity(
                id = 2L,
                code = "FIRST_QUIZ",
                titleEn = "Knowledge Verified",
                titleAr = "إثبات المعرفة",
                descriptionEn = "Pass your first knowledge check quiz.",
                descriptionAr = "اجتز اختبار المعرفة الأول بنجاح.",
                iconName = "check_circle",
                unlockCondition = "QUIZZES_PASSED >= 1",
                xpReward = 50
            ),
            AchievementEntity(
                id = 3L,
                code = "FIVE_LESSONS",
                titleEn = "Security Apprentice",
                titleAr = "متدرب أمن المعلومات",
                descriptionEn = "Successfully complete 5 educational lessons.",
                descriptionAr = "أتمم دراسة 5 دروس بنجاح.",
                iconName = "military_tech",
                unlockCondition = "LESSONS_COMPLETED >= 5",
                xpReward = 100
            ),
            AchievementEntity(
                id = 4L,
                code = "TEN_CORRECT",
                titleEn = "Sharp Defender",
                titleAr = "المدافع اليقظ",
                descriptionEn = "Answer 10 quiz questions correctly.",
                descriptionAr = "أجب عن 10 أسئلة بشكل صحيح.",
                iconName = "psychology",
                unlockCondition = "CORRECT_ANSWERS >= 10",
                xpReward = 100
            ),
            AchievementEntity(
                id = 5L,
                code = "FIRST_CHALLENGE",
                titleEn = "Hands-On Operator",
                titleAr = "خبير الميدان العملي",
                descriptionEn = "Solve your first offline security challenge.",
                descriptionAr = "حل أول تحدٍ عملي دون اتصال بالإنترنت.",
                iconName = "build",
                unlockCondition = "CHALLENGES_COMPLETED >= 1",
                xpReward = 75
            ),
            AchievementEntity(
                id = 6L,
                code = "SEVEN_STREAK",
                titleEn = "Relentless Vigilance",
                titleAr = "يقظة مستمرة",
                descriptionEn = "Maintain a 7-day learning streak.",
                descriptionAr = "حافظ على سجل تعلم مستمر لمدة 7 أيام متتالية.",
                iconName = "local_fire_department",
                unlockCondition = "STREAK >= 7",
                xpReward = 150
            )
        )
        achievementDao.insertAchievements(achievements)
    }
}
