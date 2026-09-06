import { Injectable, signal } from '@angular/core';

export type SiteLanguage = 'en' | 'hi';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly storageKey = 'bharat-foundation-language';
  readonly language = signal<SiteLanguage>(this.readLanguage());
  private readonly dictionary: Record<string, string> = {
    'Home': 'होम', 'About Us': 'बारे में', 'Our Work': 'हमारा कार्य', 'Donate': 'दान', 'Donate Now': 'अभी दान करें', 'Impact': 'प्रभाव', 'Contact': 'संपर्क', 'Login': 'लॉगिन', 'Health': 'स्वास्थ्य', 'Bharat Foundation Trust': 'भारत फाउंडेशन ट्रस्ट',
    'About Us / बारे में': 'बारे में', 'Our Work / हमारे काम': 'हमारा कार्य', 'Donate Now / दान करें': 'अभी दान करें', 'Home Page / मुख पृष्ठ': 'होम',
    'Small Contributions Create Big Changes': 'छोटा योगदान, बड़ा बदलाव', 'Support our mission to build a healthier, educated and more inclusive future for everyone in need.': 'जरूरतमंद लोगों के लिए स्वस्थ, शिक्षित और समावेशी भविष्य बनाने के हमारे मिशन का साथ दें।',
    'Watch Video': 'वीडियो देखें', 'Our Focus Areas': 'हमारे प्रमुख क्षेत्र', 'We work where the need is greatest': 'जहाँ जरूरत सबसे अधिक है, हम वहाँ काम करते हैं', 'Programs that combine dignity, continuity and measurable outcomes across communities.': 'ऐसे कार्यक्रम जो समुदायों में गरिमा, निरंतरता और मापने योग्य परिणाम लाते हैं।', 'Be a Part of the Change': 'बदलाव का हिस्सा बनें', 'One donation can bring education, care and hope to a family.': 'एक दान किसी परिवार तक शिक्षा, देखभाल और उम्मीद पहुँचा सकता है।', 'Join us with a secure contribution and make your support visible in the lives we serve.': 'सुरक्षित योगदान के साथ जुड़ें और जिन लोगों की हम सेवा करते हैं, उनके जीवन में अपना सहयोग देखें।',
    'Education': 'शिक्षा', 'Healthcare': 'स्वास्थ्य सेवा', 'Women & Child Welfare': 'महिला एवं बाल कल्याण', 'Community Support': 'सामुदायिक सहयोग', 'Learn More': 'और जानें', 'Learning support, school essentials and access to digital resources for brighter futures.': 'बेहतर भविष्य के लिए पढ़ाई में सहयोग, स्कूल सामग्री और डिजिटल संसाधन।', 'Medical aid, health camps and support for vulnerable communities and families.': 'चिकित्सा सहायता, स्वास्थ्य शिविर और जरूरतमंद परिवारों के लिए सहयोग।', 'Nutrition, safety, dignity and empowerment for women, girls and children.': 'महिलाओं, लड़कियों और बच्चों के लिए पोषण, सुरक्षा, सम्मान और सशक्तिकरण।', 'Relief, volunteer outreach and support during emergencies and local challenges.': 'आपात स्थिति और स्थानीय समस्याओं में राहत, स्वयंसेवी सहायता और सहयोग।', 'Total Donations': 'कुल दान', 'Happy Beneficiaries': 'लाभान्वित लोग', 'Registered Donors': 'पंजीकृत दाता', 'Active Projects': 'सक्रिय परियोजनाएँ', 'Community support across education and care initiatives': 'शिक्षा और देखभाल की पहलों में सामुदायिक सहयोग', 'Children, families, women and seniors reached': 'बच्चों, परिवारों, महिलाओं और वरिष्ठों तक पहुँचे', 'Supporters who trust our transparency': 'हमारी पारदर्शिता पर भरोसा करने वाले सहयोगी', 'Focus areas in motion with measurable impact': 'मापने योग्य प्रभाव वाले कार्य क्षेत्र',
    'Our Story / हमारी कहानी': 'हमारी कहानी', 'Working with trust, care and accountability': 'विश्वास, देखभाल और जवाबदेही के साथ कार्य', 'Our approach keeps donations visible, programs focused and beneficiaries at the center of every decision. We work with volunteers, local partners and donors who want to see transparent outcomes.': 'हमारी कार्यप्रणाली में दान पारदर्शी, कार्यक्रम केंद्रित और हर निर्णय में लाभार्थी सबसे महत्वपूर्ण होते हैं। हम स्वयंसेवकों, स्थानीय भागीदारों और पारदर्शी परिणाम चाहने वाले दाताओं के साथ काम करते हैं।', 'Our Mission': 'हमारा मिशन', 'Our Vision': 'हमारा दृष्टिकोण', 'Our Values': 'हमारे मूल्य', 'Meet Our Trustees': 'हमारे ट्रस्टी', 'The people guiding the trust': 'ट्रस्ट का मार्गदर्शन करने वाले लोग', 'To empower individuals and communities through education, healthcare and support.': 'शिक्षा, स्वास्थ्य सेवा और सहयोग के माध्यम से व्यक्तियों और समुदायों को सशक्त बनाना।', 'A society where every individual has equal opportunities to live a dignified life.': 'ऐसा समाज जहाँ हर व्यक्ति को सम्मानजनक जीवन जीने के समान अवसर मिलें।', 'Compassion, transparency, integrity and community participation guide our work.': 'करुणा, पारदर्शिता, ईमानदारी और सामुदायिक भागीदारी हमारे कार्य का मार्गदर्शन करते हैं।',
    'Our Key Areas of Impact': 'हमारे प्रमुख प्रभाव क्षेत्र', 'Focused causes with long-term support': 'दीर्घकालिक सहयोग वाले केंद्रित कार्य', 'Each initiative is designed to feel tangible, local and easy to support.': 'हर पहल को प्रभावी, स्थानीय और सहयोग के लिए आसान बनाया गया है।', 'Scholarships, classroom support, books and digital learning for children who need it most.': 'जरूरतमंद बच्चों के लिए छात्रवृत्ति, कक्षा सहयोग, किताबें और डिजिटल शिक्षा।', 'Health camps, medicines, preventive care and reliable support for local families.': 'स्वास्थ्य शिविर, दवाइयाँ, बचाव देखभाल और स्थानीय परिवारों के लिए भरोसेमंद सहयोग।', 'Nutrition, dignity, safety and skills development for women and children.': 'महिलाओं और बच्चों के लिए पोषण, सम्मान, सुरक्षा और कौशल विकास।', 'Relief kits, volunteer drives and help during difficult moments and emergencies.': 'राहत सामग्री, स्वयंसेवी अभियान और कठिन समय व आपात स्थिति में सहायता।', 'Support This Cause': 'इस कार्य में सहयोग करें',
    'A transparent trust working on education, healthcare, women & child welfare, and community support.': 'शिक्षा, स्वास्थ्य, महिला एवं बाल कल्याण और सामुदायिक सहयोग के लिए कार्यरत एक पारदर्शी ट्रस्ट।', 'Clean, focused initiatives that create practical change in education, healthcare and community life.': 'शिक्षा, स्वास्थ्य और सामुदायिक जीवन में व्यावहारिक बदलाव लाने वाली केंद्रित पहल।', 'Select Amount': 'राशि चुनें', 'Choose how you want to support': 'आप कितना सहयोग करना चाहते हैं', 'Custom Amount': 'अपनी राशि', 'Enter donation amount': 'दान की राशि दर्ज करें', 'Donor Details': 'दाता का विवरण', 'Please share your details': 'कृपया अपना विवरण साझा करें', 'Full Name *': 'पूरा नाम *', 'Enter full name': 'पूरा नाम दर्ज करें', 'Mobile Number *': 'मोबाइल नंबर *', 'Enter mobile number': 'मोबाइल नंबर दर्ज करें', 'Email Address': 'ईमेल पता', 'Enter email address': 'ईमेल पता दर्ज करें', 'Proceed to Pay': 'भुगतान करें', 'Trusted checkout': 'सुरक्षित भुगतान', 'We Accept Multiple Payment Methods': 'हम कई भुगतान माध्यम स्वीकार करते हैं', 'Why this is secure': 'यह सुरक्षित क्यों है', 'UPI': 'यूपीआई', 'Cards': 'कार्ड', 'Net Banking': 'नेट बैंकिंग', 'Wallets': 'वॉलेट',
    'Donation / Impact': 'दान / प्रभाव', 'Donation Impact': 'दान का प्रभाव', 'See the outcome of your support in a public, transparent way.': 'अपने सहयोग का परिणाम सार्वजनिक और पारदर्शी रूप से देखें।', 'Recent Successful Donations': 'हाल के सफल दान', 'Public impact snapshot': 'सार्वजनिक प्रभाव की झलक', 'Only masked donor names and safe public data are shown here.': 'यहाँ केवल छुपे हुए दाता नाम और सुरक्षित सार्वजनिक जानकारी दिखाई जाती है।', 'Payment Unsuccessful': 'भुगतान सफल नहीं हुआ', 'Your payment could not be completed. Please try again.': 'आपका भुगतान पूरा नहीं हो सका। कृपया फिर प्रयास करें।', 'Try Again': 'फिर प्रयास करें', 'Back to Home': 'होम पर जाएँ', 'Donation Successful': 'दान सफल रहा', 'Thank you for supporting our cause.': 'हमारे कार्य का सहयोग करने के लिए धन्यवाद।', 'Download Receipt': 'रसीद डाउनलोड करें',
    'Secure Access': 'सुरक्षित प्रवेश', 'Admin only access for authorized trust personnel.': 'केवल अधिकृत ट्रस्ट कर्मचारियों के लिए प्रवेश।', 'Username / Email': 'यूज़रनेम / ईमेल', 'Password': 'पासवर्ड', 'Enter email or username': 'ईमेल या यूज़रनेम दर्ज करें', 'Enter password': 'पासवर्ड दर्ज करें', 'Only authorized personnel can access this area. No public registration is available.': 'इस क्षेत्र में केवल अधिकृत कर्मचारी प्रवेश कर सकते हैं। सार्वजनिक पंजीकरण उपलब्ध नहीं है।', 'This dashboard is for authorized users only. Please log in to continue.': 'यह डैशबोर्ड केवल अधिकृत उपयोगकर्ताओं के लिए है। जारी रखने के लिए लॉगिन करें।',
    'Dashboard': 'डैशबोर्ड', 'Recent Donations': 'हाल के दान', 'A simple donation dashboard for authorized trust personnel.': 'अधिकृत ट्रस्ट कर्मचारियों के लिए सरल दान डैशबोर्ड।', 'Open Public Donate Page': 'सार्वजनिक दान पेज खोलें', 'Search': 'खोजें', 'Name, email, payment ID': 'नाम, ईमेल, भुगतान आईडी', 'Status': 'स्थिति', 'All': 'सभी', 'Pending': 'लंबित', 'Success': 'सफल', 'Failed': 'विफल', 'Refunded': 'वापस किया गया', 'Apply Filters': 'फ़िल्टर लगाएँ', 'Reset': 'रीसेट', 'Export CSV': 'CSV निर्यात करें', 'Logout': 'लॉगआउट', 'Date': 'तारीख', 'Amount': 'राशि', 'Payment ID': 'भुगतान आईडी', 'Prev': 'पिछला', 'Next': 'अगला', 'Page': 'पृष्ठ',
    'Quick Links': 'त्वरित लिंक', 'Connect': 'हमसे जुड़ें', 'Address': 'पता', 'Phone': 'फोन', 'Office Hours': 'कार्यालय समय', 'Send a Message': 'संदेश भेजें', 'Tell us how we can help': 'बताइए हम आपकी कैसे मदद कर सकते हैं', 'Name': 'नाम', 'Message': 'संदेश', 'Submit': 'जमा करें', 'Privacy Policy': 'गोपनीयता नीति', 'Terms & Conditions': 'नियम एवं शर्तें', '© 2026 Bharat Foundation Trust': '© 2026 भारत फाउंडेशन ट्रस्ट'
  };
  private readonly workDictionary: Record<string, string> = {
    'Donation Amount': 'दान की राशि',
    'Enter the amount you wish to donate': 'अपनी इच्छित दान राशि दर्ज करें',
    'Address *': 'पता *',
    'Enter your address': 'अपना पता दर्ज करें',
    'Free School for Special Children': 'विशेष बच्चों के लिए निःशुल्क विद्यालय',
    'Free Stitching Centre': 'निःशुल्क सिलाई केंद्र',
    'Free Medical Camps': 'निःशुल्क चिकित्सा शिविर',
    'Support for Needy Families': 'गरीब एवं जरूरतमंद लोगों की सहायता',
    'Support for Poor and Needy People': 'गरीब एवं जरूरतमंद लोगों की सहायता',
    'Support for Needy Daughters’ Marriages': 'जरूरतमंद बेटियों के विवाह में सहयोग',
    'Education, learning support and opportunities for special children to grow with confidence.': 'विशेष बच्चों के लिए शिक्षा, सीखने और आत्मविश्वास के साथ आगे बढ़ने के अवसर।',
    'Stitching skills and practical support for women and people working towards self-reliance.': 'महिलाओं और आत्मनिर्भर बनने की दिशा में काम कर रहे लोगों के लिए सिलाई कौशल और व्यावहारिक सहयोग।',
    'Free medical camps to help make basic health and medical support accessible to those in need.': 'जरूरतमंद लोगों तक बुनियादी स्वास्थ्य और चिकित्सा सहायता पहुँचाने के लिए निःशुल्क चिकित्सा शिविर।',
    'An effort to support poor and needy people and families according to their circumstances.': 'गरीब और जरूरतमंद लोगों तथा परिवारों को उनकी परिस्थितियों के अनुसार सहयोग देने का प्रयास।',
    'Support, as far as possible, for marriages of daughters from families facing hardship.': 'कठिन परिस्थितियों से गुजर रहे परिवारों की बेटियों के विवाह में यथासंभव सहयोग।',
    'Working to provide special children with education, learning and opportunities to move forward.': 'विशेष बच्चों को शिक्षा, सीखने और आगे बढ़ने के अवसर प्रदान करने की दिशा में कार्य।',
    'Supporting women and needy people to learn stitching skills and move towards self-reliance.': 'महिलाओं और जरूरतमंद लोगों को सिलाई का कौशल सीखने तथा आत्मनिर्भर बनने की दिशा में सहयोग।',
    'Organising free medical camps to make health and medical support accessible to needy people.': 'जरूरतमंद लोगों तक स्वास्थ्य एवं चिकित्सा सहायता पहुँचाने के उद्देश्य से निःशुल्क चिकित्सा शिविरों का आयोजन।',
    'An effort to provide economic and social support to people and families according to their needs.': 'गरीब एवं जरूरतमंद लोगों और परिवारों को उनकी आवश्यकता के अनुसार आर्थिक एवं सामाजिक सहायता प्रदान करने का प्रयास।',
    'An effort to provide possible support for the marriages of daughters from families in need.': 'जरूरतमंद परिवारों की बेटियों के विवाह में यथासंभव सहयोग प्रदान करने का प्रयास।',
    'Bharat Foundation Trust is a non-profit organization working for the upliftment of underserved communities. हमारी संस्था शिक्षा, स्वास्थ्य, महिला एवं बाल कल्याण और जरूरतमंद परिवारों के लिए सहयोग करती है।': 'भारत फाउंडेशन ट्रस्ट का उद्देश्य समाज के उन लोगों तक सहायता और अवसर पहुँचाना है जिन्हें इसकी सबसे अधिक आवश्यकता है। ट्रस्ट शिक्षा, स्वास्थ्य, कौशल विकास और सामाजिक सहायता के माध्यम से सकारात्मक बदलाव लाने का प्रयास करता है।',
    'Bharat Foundation Trust is a non-profit organization working for the upliftment of underserved communities.': 'भारत फाउंडेशन ट्रस्ट का उद्देश्य समाज के उन लोगों तक सहायता और अवसर पहुँचाना है जिन्हें इसकी सबसे अधिक आवश्यकता है।',
    'Reach out to learn more, coordinate support or ask about donations.': 'हमारे कार्य, सहयोग या दान के बारे में जानकारी के लिए हमसे संपर्क करें।',
    'We are here to help': 'हम सहायता के लिए यहाँ हैं',
    'Google Maps embed area': 'गूगल मैप क्षेत्र',
    'WhatsApp / Contact CTA': 'व्हाट्सऐप / संपर्क करें',
    'Unable to submit right now. Please try again soon.': 'अभी भेजना संभव नहीं है। कृपया थोड़ी देर बाद फिर प्रयास करें।',
    'Your contribution can change a life. Secure payments through UPI, cards, net banking and wallets.': 'आपका सहयोग किसी का जीवन बदल सकता है। यूपीआई, कार्ड, नेट बैंकिंग और वॉलेट से सुरक्षित भुगतान करें।',
    'Minimum donation: ₹100. Custom amounts will override preset values.': 'न्यूनतम दान: ₹100। अपनी राशि चुनने पर निर्धारित राशि बदल जाएगी।',
    'Please complete all required fields.': 'कृपया सभी आवश्यक जानकारी भरें।',
    'Order created on Laravel backend': 'ऑर्डर सुरक्षित सर्वर पर बनाया जाता है',
    'Payment signature verified on server': 'भुगतान हस्ताक्षर सर्वर पर सत्यापित होता है',
    'Webhook handled for duplicate safety': 'डुप्लीकेट भुगतान से सुरक्षा के लिए वेबहुक संभाला जाता है',
    'No secret keys exposed to Angular': 'गुप्त कुंजियाँ Angular में उजागर नहीं होतीं',
    'Please fill the required donor details and a valid amount.': 'कृपया दाता की सभी आवश्यक जानकारी और सही राशि भरें।',
    'Unable to prepare Razorpay checkout. Please try again in a moment.': 'Razorpay भुगतान तैयार नहीं हो सका। कृपया थोड़ी देर बाद फिर प्रयास करें।',
    'Razorpay checkout script could not be loaded.': 'Razorpay भुगतान स्क्रिप्ट लोड नहीं हो सकी।',
  };

  constructor() {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = this.language();
      queueMicrotask(() => this.translateDocument());
      new MutationObserver(() => this.translateDocument()).observe(document.body, { childList: true, subtree: true });
    }
  }

  toggle(): void {
    this.language.update((current) => current === 'en' ? 'hi' : 'en');
    localStorage.setItem(this.storageKey, this.language());
    document.documentElement.lang = this.language();
    this.translateDocument();
  }

  label(english: string, hindi: string): string {
    return this.language() === 'hi' ? hindi : english;
  }

  private readLanguage(): SiteLanguage {
    if (typeof localStorage === 'undefined') return 'hi';
    return localStorage.getItem(this.storageKey) === 'en' ? 'en' : 'hi';
  }

  private translateDocument(): void {
    if (typeof document === 'undefined') return;
    const englishMode = this.language() === 'en';
    const translations = { ...this.dictionary, ...this.workDictionary };
    const reverse = Object.fromEntries(Object.entries(translations).map(([en, hi]) => [hi, en]));
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];
    while (walker.nextNode()) nodes.push(walker.currentNode as Text);
    for (const node of nodes) {
      if (!node.parentElement || ['SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA'].includes(node.parentElement.tagName)) continue;
      const source = node.textContent ?? '';
      const trimmed = source.trim();
      const translated = englishMode ? reverse[trimmed] : translations[trimmed];
      if (translated) node.textContent = source.replace(trimmed, translated);
    }
    document.querySelectorAll<HTMLElement>('[placeholder], [aria-label]').forEach((element) => {
      for (const attribute of ['placeholder', 'aria-label']) {
        const value = element.getAttribute(attribute);
        if (!value) continue;
        const translated = englishMode ? reverse[value] : translations[value];
        if (translated) element.setAttribute(attribute, translated);
      }
    });
  }
}
