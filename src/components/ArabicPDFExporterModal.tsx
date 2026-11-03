import React, { useState, useRef, useEffect } from 'react';
import { X, Download, BookOpen, RefreshCw, Code, CheckCircle, Printer } from 'lucide-react';
import { ALL_CHAPTERS } from '../data/novelData';

interface ArabicPDFExporterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ImageResource {
  local: string;
  url: string;
}

const CHAPTER_IMAGE_MAP: Record<string, ImageResource> = {
  '1': { local: '/assets/images/ch1_illustration.jpg', url: 'https://imgdb.io/i/fj45rec.jpg' },
  '2': { local: '/assets/images/ch2_illustration.jpg', url: 'https://imgdb.io/i/BUwFaD4.jpg' },
  '3': { local: '/assets/images/ch3_illustration.jpg', url: 'https://imgdb.io/i/79Ql7dw.jpg' },
  '4': { local: '/assets/images/ch4_illustration.jpg', url: 'https://imgdb.io/i/xDi5MCI.jpg' },
  '5': { local: '/assets/images/ch5_illustration.jpg', url: 'https://imgdb.io/i/EXYpNDw.jpg' },
  '6': { local: '/assets/images/ch6_illustration.jpg', url: 'https://imgdb.io/i/-hJuoHQ.jpg' },
  '7': { local: '/assets/images/ch7_illustration.jpg', url: 'https://imgdb.io/i/w2p2pAo.jpg' },
  '8': { local: '/assets/images/ch8_illustration.jpg', url: 'https://imgdb.io/i/HZGZQtU.jpg' },
  '9': { local: '/assets/images/ch9_illustration.jpg', url: 'https://imgdb.io/i/egFPHMs.jpg' },
  '10': { local: '/assets/images/ch10_illustration.jpg', url: 'https://imgdb.io/i/a2wkI-g.jpg' },
  '11': { local: '/assets/images/ch11_illustration.jpg', url: 'https://imgdb.io/i/NCpy4vA.jpg' },
  '12': { local: '/assets/images/ch12_illustration.jpg', url: 'https://imgdb.io/i/0IgZ238.jpg' },
  '13': { local: '/assets/images/ch13_illustration.jpg', url: 'https://imgdb.io/i/rnsyUzc.jpg' },
  '14': { local: '/assets/images/ch14_illustration.jpg', url: 'https://imgdb.io/i/9kvyNH4.jpg' },
  '15': { local: '/assets/images/ch15_illustration.jpg', url: 'https://imgdb.io/i/e1SFlZI.jpg' },
  '16': { local: '/assets/images/ch16_illustration.jpg', url: 'https://imgdb.io/i/5rY0h68.jpg' },
  '17': { local: '/assets/images/ch17_illustration.jpg', url: 'https://imgdb.io/i/3m6R9O8.jpg' },
  '18': { local: '/assets/images/ch18_illustration.jpg', url: 'https://imgdb.io/i/7Mu3gdI.jpg' },
  '19': { local: '/assets/images/ch19_illustration.jpg', url: 'https://imgdb.io/i/QnuQ4y0.jpg' },
  '20': { local: '/assets/images/ch20_illustration.jpg', url: 'https://imgdb.io/i/64j6vaA.jpg' },
  '21': { local: '/assets/images/ch21_illustration.jpg', url: 'https://imgdb.io/i/WbLCNDI.jpg' },
  '22': { local: '/assets/images/ch22_illustration.jpg', url: 'https://imgdb.io/i/dGS-PSE.jpg' },
  '23': { local: '/assets/images/ch23_illustration.jpg', url: 'https://imgdb.io/i/1MfU30U.jpg' },
  '24': { local: '/assets/images/ch24_illustration.jpg', url: 'https://imgdb.io/i/qZlx_mM.jpg' },
  '25': { local: '/assets/images/ch25_illustration.jpg', url: 'https://imgdb.io/i/i9az1cE.jpg' },
  '26': { local: '/assets/images/ch26_illustration.jpg', url: 'https://imgdb.io/i/QeJUVQg.jpg' },
  '27': { local: '/assets/images/ch27_illustration.jpg', url: 'https://imgdb.io/i/GK8QKOE.jpg' },
  '28': { local: '/assets/images/ch28_illustration.jpg', url: 'https://imgdb.io/i/9PiRDkg.jpg' },
  '29': { local: '/assets/images/ch29_illustration.jpg', url: 'https://imgdb.io/i/WDo4nos.jpg' },
  '30': { local: '/assets/images/ch30_illustration.jpg', url: 'https://imgdb.io/i/pPCOwxc.jpg' },
  '31': { local: '/assets/images/ch31_illustration.jpg', url: 'https://imgdb.io/i/RHhhyMw.jpg' },
  '32': { local: '/assets/images/ch32_illustration.jpg', url: 'https://imgdb.io/i/rRzCAPQ.jpg' },
  '33': { local: '/assets/images/ch33_illustration.jpg', url: '/assets/images/ch33_illustration.jpg' },
  '34': { local: '/assets/images/ch34_illustration.jpg', url: 'https://imgdb.io/i/IOvzjC4.jpg' },
  '35': { local: '/assets/images/ch35_illustration.jpg', url: 'https://imgdb.io/i/QZ4nCMs.jpg' },
  '36': { local: '/assets/images/ch36_illustration.jpg', url: 'https://imgdb.io/i/oTJXpFk.jpg' },
  '37': { local: '/assets/images/ch37_illustration.jpg', url: 'https://imgdb.io/i/6Y_klMU.jpg' },
  '38': { local: '/assets/images/ch38_illustration.jpg', url: 'https://imgdb.io/i/A6kZNCA.jpg' },
  '39': { local: '/assets/images/ch39_illustration.jpg', url: 'https://imgdb.io/i/e2FzgSc.jpg' },
  '40': { local: '/assets/images/ch40_illustration.jpg', url: 'https://imgdb.io/i/cZrZxz8.jpg' },
  '41': { local: '/assets/images/epilogue_illustration.jpg', url: 'https://imgdb.io/i/tDphWr4.jpg' },
  'epilogue': { local: '/assets/images/epilogue_illustration.jpg', url: 'https://imgdb.io/i/tDphWr4.jpg' }
};

const FRONT_IMAGES_CONFIG = [
  { name: 'cover', alt: 'غلاف الرواية', local: '/assets/images/cover.png', url: 'https://imgdb.io/i/3usPsYo.png' },
  { name: 'title', alt: 'أغنية الملح والظلال', local: '/assets/images/title_art.png', url: 'https://imgdb.io/i/9eqYDnc.png' },
  { name: 'map1', alt: 'خريطة العالم - الجزء الأول', local: '/assets/images/map_1.png', url: 'https://imgdb.io/i/yGd1xr8.png' },
  { name: 'map2', alt: 'خريطة العالم - الجزء الثاني', local: '/assets/images/map_2.png', url: 'https://imgdb.io/i/8Z-skAU.png' },
  { name: 'quote', alt: 'اقتباس مميز', local: '/assets/images/quote_art.png', url: 'https://imgdb.io/i/9gDziwI.png' },
  { name: 'ship', alt: 'سفينة نوكتيس', local: '/assets/images/ship_divider.png', url: 'https://imgdb.io/i/OvuCLaY.png' },
];

// STRICTLY 5 MOTIFS: سفينة (Ship), وردة (Rose), خطاف بحر (Sea hook/Anchor), حورية بحر (Mermaid/Siren), قبطان (Captain)
// User request: Ship, Mermaid/Siren, and Captain as EMOJIS (not shapes)
const SVGS = {
  // 1. سفينة (Sailing Ship Emoji)
  ship: `<span class="emoji-icon">⛵</span>`,
  
  // 2. وردة (Rose Emoji)
  rose: `<span class="emoji-icon">🌹</span>`,

  // 3. خطاف بحر / مرساة (Sea Hook / Anchor Emoji)
  hook: `<span class="emoji-icon">⚓</span>`,

  // 4. حورية بحر (Mermaid / Siren Emoji)
  siren: `<span class="emoji-icon">🧜‍♀️</span>`,

  // 5. قبطان (Captain Emoji)
  captain: `<span class="emoji-icon">👨‍✈️</span>`,

  // Miniature corner icons: Ship on top right, Rose on top left
  shipMini: `<span class="corner-emoji">⛵</span>`,
  roseMini: `<span class="corner-emoji">🌹</span>`,

  // Pink versions for dedication / last page
  shipMiniPink: `<span class="corner-emoji">⛵</span>`,
  roseMiniPink: `<span class="corner-emoji">🌹</span>`,

  // Bottom divider (removed)
  bottomDivider: ''
};

// All 10 characters mapped STRICTLY to the 5 allowed shapes
const CHARACTERS_PART_1 = [
  {
    iconSvg: SVGS.captain,
    nameAr: 'القبطان سابل كرو',
    nameEn: 'Captain Sable Crowe',
    role: 'قبطان سفينة "نوكتيس"',
    desc: 'قائد بحري مهيب رمادي النظرات، محارب باسل يخفي لعنة تفصل ظله عن جسده وتسلبه ذكرياته وإنسانيته شيئاً فشيئاً.'
  },
  {
    iconSvg: SVGS.siren,
    nameAr: 'إيريس',
    nameEn: 'Eryse',
    role: 'حورية البحر الهجين (البطلة)',
    desc: 'فتاة هجين تجمع بين دم الحوريات والبشر، تهرب من صيادي الحوريات وتتسلل لسفينة نوكتيس، تملك ترنيمة ساحرة تروّض الأمواج.'
  },
  {
    iconSvg: SVGS.hook,
    nameAr: 'غريم',
    nameEn: 'Grim',
    role: 'النائب الأول للقبطان',
    desc: 'ذراع سابل الأيمن ورجل المهمات الصعبة، حازم ذو شعر أحمر وندوب عتيقة، يمثل صوت العدل والانضباط الصارم على السفينة.'
  },
  {
    iconSvg: SVGS.rose,
    nameAr: 'كايليا',
    nameEn: 'Cailia',
    role: 'ساحرة البحر العتيقة',
    desc: 'شقيقة القبطان سابل، حكيمة تسكن جروف المرجان وتملك أسرار التمائم السحرية وتاريخ البحار ولعنة الظلال الدفينة.'
  },
  {
    iconSvg: SVGS.ship,
    nameAr: 'لارك',
    nameEn: 'Lark',
    role: 'فتى المقصورة',
    desc: 'صبي ذكي وشجاع في الثانية عشرة من عمره، ابن المرقاب نايتغلاس، أول من اكتشف إيريس وساعدها سراً على النجاة.'
  }
];

const CHARACTERS_PART_2 = [
  {
    iconSvg: SVGS.captain,
    nameAr: 'نايتغلاس',
    nameEn: 'Nightglass',
    role: 'مستكشف السفينة والمرقاب',
    desc: 'والد لارك وعيون السفينة الساهرة في عش الغراب، يمتلك بصراً ثاقباً وقدرة نادرة على تتبع خيط "الغليم" الفضي وكشف التيارات.'
  },
  {
    iconSvg: SVGS.hook,
    nameAr: 'هارو',
    nameEn: 'Harrow',
    role: 'جراح السفينة ومجبر العظام',
    desc: 'حكيم طاعن في السن ذو أسنان ذهبية وخبرة واسعة في طب القراصنة ومداواة الجروح والخلطات العشبية المنقذة للحياة.'
  },
  {
    iconSvg: SVGS.ship,
    nameAr: 'سينت',
    nameEn: 'Saint',
    role: 'نجار السفينة وصانع الصواري',
    desc: 'الحارس الصامت لصلابة الهيكل، مسؤول عن صيانة الألواح الخشبية وسد الشقوق وضمان تماسك السفينة وسط الأعاصير.'
  },
  {
    iconSvg: SVGS.rose,
    nameAr: 'ماتش',
    nameEn: 'Match',
    role: 'فتى البارود والمدافع',
    desc: 'فتى سريع الخطى وجريء القلب، يحمل البارود بين المدافع تحت وابل النيران، ويحمل قلباً نقياً ورأفة تجاه إيريس.'
  },
  {
    iconSvg: SVGS.hook,
    nameAr: 'رات',
    nameEn: 'Rat',
    role: 'المدفعي المتربص',
    desc: 'قرصان فظ غليظ المشاعر يضمر حقداً دفيناً على الحوريات، يسعى لأطماعه الخاصة ويتربص بكل خطوة تخطوها إيريس للإيقاع بها.'
  }
];

export default function ArabicPDFExporterModal({ isOpen, onClose }: ArabicPDFExporterModalProps) {
  const [downloadScope, setDownloadScope] = useState<'full' | 'p1' | 'p2' | 'p3' | 'p4'>('full');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');
  const [resumeData, setResumeData] = useState<number | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedProgress = localStorage.getItem('novel_pdf_progress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        if (parsed && parsed.timestamp && Date.now() - parsed.timestamp < 3600000) {
          setResumeData(parsed.lastPageIndex);
        }
      } catch {
        // ignore
      }
    }
  }, []);

  if (!isOpen) return null;

  const getSelectedChapters = () => {
    if (downloadScope === 'p1') return ALL_CHAPTERS.slice(0, 10);
    if (downloadScope === 'p2') return ALL_CHAPTERS.slice(10, 20);
    if (downloadScope === 'p3') return ALL_CHAPTERS.slice(20, 30);
    if (downloadScope === 'p4') return ALL_CHAPTERS.slice(30);
    return ALL_CHAPTERS;
  };

  const activeChapters = getSelectedChapters();

  // Helper to split text into lines of ~12 to 14 words, with max 15 lines per page
  const paginateText = (textArray: string[], linesPerPage: number = 15) => {
    const allLines: string[] = [];
    const TARGET_WORDS_PER_LINE = 12;
    const MAX_WORDS_PER_LINE = 14;

    textArray.forEach(paragraph => {
      let cleaned = paragraph
        // 1. Remove angle brackets, chevrons, and unwanted symbols (< > « » ‹ › ` " ' ~ ^ _)
        .replace(/[<>«»‹›`'"״„“”—_~^]/g, '')
        // 2. Normalize commas and punctuation to Arabic standards
        .replace(/,/g, '،')
        .replace(/;/g, '؛')
        .replace(/\?/g, '؟')
        // 3. Collapse multiple consecutive commas
        .replace(/[،]{2,}/g, '،')
        // 4. Grammar rule: In Arabic, conjunctions (و، أو، ثم، بل، أم) must NOT have a preceding comma
        .replace(/[،]\s*(و|أو|ثم|أم|بل)\b/g, ' $1')
        // 5. Remove comma before sentence-ending punctuation (. ؟ ! ؛ :)
        .replace(/[،]\s*([.؛:!؟])/g, '$1')
        // 6. Remove commas at start or end of text
        .replace(/^[،\s]+/, '')
        .replace(/[،\s]+$/, '.')
        // 7. Orthography rule: Attach proclitic particles (و، ف، ب، ل، ك) to the following word
        .replace(/(^|\s)و\s+([ء-ي])/g, '$1و$2')
        .replace(/(^|\s)ف\s+([ء-ي])/g, '$1ف$2')
        .replace(/(^|\s)ب\s+([ء-ي])/g, '$1ب$2')
        .replace(/(^|\s)ل\s+([ء-ي])/g, '$1ل$2')
        .replace(/(^|\s)ك\s+([ء-ي])/g, '$1ك$2')
        // 8. Punctuation spacing: no space before punctuation, exactly one space after
        .replace(/\s+([،؛:!؟\.])/g, '$1')
        .replace(/([،؛:!؟\.])(?=[^\s،؛:!؟\.])/g, '$1 ')
        // 9. Collapse multiple spaces into a single space
        .replace(/\s{2,}/g, ' ')
        .trim();

      if (!cleaned) return;

      // 10. Thin out excessive commas: if two commas appear less than 5 words apart, remove the second one
      const rawTokens = cleaned.split(' ');
      const thinnedTokens: string[] = [];
      let wordsSinceLastComma = 999;
      for (const token of rawTokens) {
        if (token.endsWith('،')) {
          if (wordsSinceLastComma < 5) {
            thinnedTokens.push(token.slice(0, -1));
          } else {
            thinnedTokens.push(token);
            wordsSinceLastComma = 0;
          }
        } else {
          thinnedTokens.push(token);
          wordsSinceLastComma++;
        }
      }

      const words = thinnedTokens.filter(Boolean);
      let currentWords: string[] = [];

      for (let i = 0; i < words.length; i++) {
        currentWords.push(words[i]);
        const count = currentWords.length;
        const remainingInPara = words.length - (i + 1);

        if (count >= MAX_WORDS_PER_LINE) {
          allLines.push(currentWords.join(' '));
          currentWords = [];
        } else if (count >= TARGET_WORDS_PER_LINE) {
          const lastWord = words[i];
          const endsWithPunct = /[،؛:.!؟]$/.test(lastWord);
          if (endsWithPunct || remainingInPara === 0 || remainingInPara >= 10 || remainingInPara <= 3) {
            allLines.push(currentWords.join(' '));
            currentWords = [];
          }
        }
      }

      if (currentWords.length > 0) {
        allLines.push(currentWords.join(' '));
      }
    });

    const pages: string[][] = [];
    for (let i = 0; i < allLines.length; i += linesPerPage) {
      pages.push(allLines.slice(i, i + linesPerPage));
    }
    return pages;
  };

  const handleDownloadPDF = async (startIndex: number = 0) => {
    setIsGenerating(true);
    setDownloadSuccess(false);
    setProgressMsg('جاري تجهيز وثيقة الرواية (15 سطراً للصفحة كحد أقصى، ضبط المسافات الإملائية والنحوية)...');

    await new Promise(resolve => setTimeout(resolve, 600));

    try {
      if (!printRef.current) return;
      
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();

      const sections = Array.from(printRef.current.children) as HTMLElement[];
      const totalSections = sections.length;
      
      let startI = startIndex;
      if (startI > 0 && startI < totalSections) {
        startI = 0;
      }

      for (let i = startI; i < totalSections; i++) {
        const section = sections[i];
        const progress = Math.round(((i + 1) / totalSections) * 100);
        setProgressMsg(`جاري معالجة الصفحة ${i + 1} من ${totalSections} (${progress}%)...`);

        try {
          localStorage.setItem('novel_pdf_progress', JSON.stringify({
            lastPageIndex: i,
            timestamp: Date.now()
          }));
        } catch {
          // ignore
        }

        const canvas = await html2canvas(section, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: '#FFFFFF',
          windowWidth: 595,
          onclone: (clonedDoc) => {
            // Keep all original styles intact for 100% exact fidelity with the preview
            const printAdjust = clonedDoc.createElement('style');
            printAdjust.innerHTML = `
              *, *::before, *::after { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
              body { background: #ffffff !important; color: #1e293b; font-family: 'Amiri', serif !important; margin: 0; padding: 0; direction: rtl; }
              .page { margin: 0 !important; box-shadow: none !important; width: 595px !important; height: 842px !important; }
            `;
            clonedDoc.head.appendChild(printAdjust);
          }
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.98);
        const margin = 0;
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', margin, margin, imgWidth, imgHeight);
      }

      localStorage.removeItem('novel_pdf_progress');
      setResumeData(null);
      setDownloadSuccess(true);

      pdf.save(downloadScope === 'full' ? 'أغنية_الملح_والظلال_الفاخرة.pdf' : `أغنية_الملح_والظلال_جزء_${downloadScope}.pdf`);
    } catch (err) {
      console.error('PDF Generation failed:', err);
      alert('حدث خطأ أثناء التصدير. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsGenerating(false);
      setProgressMsg('');
    }
  };

  const generateBookHTML = () => {
    let pageNum = 0;
    const pagesHTML: string[] = [];

    const renderFooterHTML = (currPage: number, customRights?: string) => {
      const rightsText = customRights || '♡SM♡Sama♡Mohamed Abu AlSaud♡';
      return `
        <div class="page-footer">
          <span class="footer-rights">${rightsText}</span>
          <span class="footer-page-num">صفحة ${currPage}</span>
        </div>`;
    };

    // Front 6 full bleed pages
    if (downloadScope === 'full') {
      FRONT_IMAGES_CONFIG.forEach(img => {
        pagesHTML.push(`
        <div class="page full-bleed-page">
          <img src="${img.url}" alt="${img.alt}" referrerpolicy="no-referrer" onerror="if(this.src!=='${img.local}'){this.src='${img.local}';}" />
        </div>`);
      });

      // Page 7: Sama Dedication
      pageNum++;
      pagesHTML.push(`
      <div class="page dedication-page">
        <div class="dedication-inner">
          <div class="corner-mark-tr">${SVGS.shipMiniPink}</div>
          <div class="corner-mark-tl">${SVGS.roseMiniPink}</div>
          <div class="dedication-body">
            <h2 class="dedication-title">إهداء خاص وعشق لابنتي</h2>
            <p class="dedication-p bold">صُنعت ورُتبت وصُممت لأجلكِ يا سما</p>
            <p class="dedication-p">ذكرى من القلب وحبيب القلب محمد أبو السعود</p>
            <p class="dedication-p">يا أجمل نعمة في حياتي، استمتعي وابتسمي فهي مصنوعة لأجلكِ يا سمسمتي وحدكِ.</p>
            <p class="dedication-p italic">يا قمر البحار ودرة القلوب، يا من ملكتِ الروح والنبض.. أهدي إليكِ بحار العشق وغيمات الغزل، فأنتِ الرواية الأبدية التي تكتمل بابتسامتكِ ووجودكِ الساحر في حياتي.</p>
            <div class="dedication-signature">♡SM♡Sama♡Mohamed Abu AlSaud♡</div>
          </div>
          ${renderFooterHTML(pageNum, '♡SM♡Sama♡Mohamed Abu AlSaud♡')}
        </div>
      </div>`);

      // Page 8: Character Page 1 (Circular Badges, strictly 5 allowed shapes)
      pageNum++;
      pagesHTML.push(`
      <div class="page front-text-page">
        <div class="inner-border front-inner-border">
          <div class="corner-mark-tr">${SVGS.shipMini}</div>
          <div class="corner-mark-tl">${SVGS.roseMini}</div>
          <div class="corner corner-bl"></div>
          <div class="corner corner-br"></div>
          <div class="front-page-header">
            <h2 class="front-page-title">شخصيات الرواية (الجزء الأول)</h2>
            <p class="front-page-subtitle">طاقم سفينة "نوكتيس" وأبطال المغامرة البحرية</p>
          </div>
          <div class="character-list">
            ${CHARACTERS_PART_1.map(c => `
              <div class="character-card">
                <div class="char-header">
                  <span class="char-icon-badge">${c.iconSvg}</span>
                  <div class="char-title-wrap">
                    <span class="char-name">${c.nameAr}</span>
                    <span class="char-role">${c.role}</span>
                  </div>
                </div>
                <p class="char-desc">${c.desc}</p>
              </div>
            `).join('')}
          </div>
          ${renderFooterHTML(pageNum)}
        </div>
      </div>`);

      // Page 9: Character Page 2 (Circular Badges, strictly 5 allowed shapes)
      pageNum++;
      pagesHTML.push(`
      <div class="page front-text-page">
        <div class="inner-border front-inner-border">
          <div class="corner-mark-tr">${SVGS.shipMini}</div>
          <div class="corner-mark-tl">${SVGS.roseMini}</div>
          <div class="corner corner-bl"></div>
          <div class="corner corner-br"></div>
          <div class="front-page-header">
            <h2 class="front-page-title">شخصيات الرواية (الجزء الثاني)</h2>
            <p class="front-page-subtitle">بحارة السفينة الملعونة وحراس أسرار الأمواج</p>
          </div>
          <div class="character-list">
            ${CHARACTERS_PART_2.map(c => `
              <div class="character-card">
                <div class="char-header">
                  <span class="char-icon-badge">${c.iconSvg}</span>
                  <div class="char-title-wrap">
                    <span class="char-name">${c.nameAr}</span>
                    <span class="char-role">${c.role}</span>
                  </div>
                </div>
                <p class="char-desc">${c.desc}</p>
              </div>
            `).join('')}
          </div>
          ${renderFooterHTML(pageNum)}
        </div>
      </div>`);

      // Page 10: Synopsis & Chapter Count
      pageNum++;
      pagesHTML.push(`
      <div class="page front-text-page">
        <div class="inner-border front-inner-border">
          <div class="corner-mark-tr">${SVGS.shipMini}</div>
          <div class="corner-mark-tl">${SVGS.roseMini}</div>
          <div class="corner corner-bl"></div>
          <div class="corner corner-br"></div>
          <div class="front-page-header">
            <h2 class="front-page-title">نبذة وفكرة الرواية</h2>
            <p class="front-page-subtitle">The Song of Salt and Shadow • ملحمة الفانتازيا والأمواج</p>
          </div>
          <div class="synopsis-content">
            <div class="synopsis-box">
              <h3 class="synopsis-box-title">فكرة الرواية (بدون حرق الأحداث)</h3>
              <p class="synopsis-p">في عالمٍ بحري فسيح تحكمه أساطير المحيطات وتغشاه لعنات غامضة، تفر <strong>إيريس</strong>—الفتاة الهجين التي تحمل دماء الحوريات والبشر—من شباك الصيادين وأسواق العبيد، لتلجأ في لحظة يأس إلى أحشاء السفينة الأسطورية الملعونة <strong>نوكتيس</strong>.</p>
              <p class="synopsis-p">هناك تتقاطع أقدارها مع القبطان الصارم <strong>سابل كرو</strong>، القائد المهيب الذي يخفي بدوره لعنة تفصل ظله عن جسده وتسلب ذكرياته شيئاً فشيئاً. ومع تلاطم أمواج البحار وتكشف خيوط البريق الفضي الساحر، تنشأ بينهما رابطة استثنائية تقودهما في رحلة ملحمية عبر عوالم الملح والظلال بحثاً عن الخلاص والهوية والحقيقة.</p>
            </div>
            <div class="chapters-count-box">
              <h3 class="synopsis-box-title">عدد الفصول وأقسام العمل</h3>
              <p class="chapters-count-badge">تتكون الرواية من <strong>40 فصلاً كاملاً</strong> بالإضافة إلى <strong>الخاتمة (الإبيلوج)</strong>، مقسمة على أربعة أجزاء:</p>
              <ul class="parts-list">
                <li><strong>الجزء الأول:</strong> بحر التيجان (Sea of Crowns) — الفصول 1 إلى 10</li>
                <li><strong>الجزء الثاني:</strong> بين البحار وبحر التجدد (Intermaria & Renewal) — الفصول 11 إلى 20</li>
                <li><strong>الجزء الثالث:</strong> بحر العظام وبحر الظلال (Sea of Bones & Shadows) — الفصول 21 إلى 30</li>
                <li><strong>الجزء الرابع:</strong> بحر الأحلام وبحر الأغنية الأولى — الفصول 31 إلى 40 + الخاتمة</li>
              </ul>
            </div>
          </div>
          ${renderFooterHTML(pageNum)}
        </div>
      </div>`);
    }

    // Chapters
    activeChapters.forEach(ch => {
      const imgResource = CHAPTER_IMAGE_MAP[String(ch.id)] || CHAPTER_IMAGE_MAP['1'];
      const textPages = paginateText(ch.contentAr, 15);

      // Chapter title page (Lifted titles with top corners Ship & Rose)
      pageNum++;
      pagesHTML.push(`
      <div class="page">
        <div class="inner-border inner-border-chapter">
          <div class="corner-mark-tr">${SVGS.shipMini}</div>
          <div class="corner-mark-tl">${SVGS.roseMini}</div>
          <div class="corner corner-bl"></div>
          <div class="corner corner-br"></div>
          <div class="chapter-header-box">
            <span class="chapter-subtitle">${ch.titleEn}</span>
            <h1 class="chapter-title">${ch.titleAr}</h1>
            <div class="chapter-img-box">
              <img src="${imgResource.url}" alt="${ch.titleAr}" referrerpolicy="no-referrer" onerror="if(this.src!=='${imgResource.local}'){this.src='${imgResource.local}';}" />
            </div>
            <p class="chapter-location">الموقع البحري: ${ch.seaLocation}</p>
          </div>
          ${renderFooterHTML(pageNum)}
        </div>
      </div>`);

      // Text pages (12-14 words per line, max 15 lines per page, balanced & centered)
      textPages.forEach(lines => {
        pageNum++;
        const linesFormatted = lines.map(line => `          <p class="novel-line">${line}</p>`).join('\n');
        pagesHTML.push(`
      <div class="page">
        <div class="inner-border">
          <div class="corner-mark-tr">${SVGS.shipMini}</div>
          <div class="corner-mark-tl">${SVGS.roseMini}</div>
          <div class="corner corner-bl"></div>
          <div class="corner corner-br"></div>
          <div class="novel-lines-container">
${linesFormatted}
          </div>
          ${renderFooterHTML(pageNum)}
        </div>
      </div>`);
      });
    });

    // End Page: Author Copyrights (No publication date)
    pageNum++;
    pagesHTML.push(`
    <div class="page front-text-page">
      <div class="inner-border front-inner-border">
        <div class="corner-mark-tr">${SVGS.shipMini}</div>
        <div class="corner-mark-tl">${SVGS.roseMini}</div>
        <div class="corner corner-bl"></div>
        <div class="corner corner-br"></div>
        <div class="front-page-header">
          <h2 class="front-page-title">حقوق الملكية الفكرية والأدبية للكاتب</h2>
          <p class="front-page-subtitle">Original Author Intellectual Property & Copyright</p>
        </div>
        <div class="copyright-body">
          <div class="copyright-card">
            <div class="copyright-row">
              <span class="cp-label">عنوان الرواية الأصلي:</span>
              <span class="cp-val">The Song of Salt and Shadow</span>
            </div>
            <div class="copyright-row">
              <span class="cp-label">المؤلفة الأصلية:</span>
              <span class="cp-val">سيرين روز (Seren Rose)</span>
            </div>
            <div class="copyright-divider"></div>
            <p class="copyright-statement">
              جميع الحقوق الأدبية والفكرية لهذا المصنف محفوظة بالكامل للكاتبة <strong>Seren Rose</strong>.
            </p>
            <p class="copyright-statement">
              تعتبر أحداث هذه الرواية وشخصياتها وعوالمها الخيالية ابتكاراً أدبياً أصيلاً محمياً بموجب قوانين حماية حق المؤلف والملكية الفكرية الدولية. لا يجوز نسخ أو اقتباس أو إعادة إنتاج النص الأصلي أو أجزاء منه تجارياً بأي وسيلة دون إذن خطي مسبق من المؤلفة والناشر الأصلي.
            </p>
          </div>
          <div class="author-blurb">
            <p class="author-blurb-text">
              "تحية تقدير وإعجاب للمؤلفة سيرين روز التي نسجت هذه الملحمة الخالدة وأهدت العالم خيوط البريق الفضي الساحر."
            </p>
          </div>
        </div>
        ${renderFooterHTML(pageNum)}
      </div>
    </div>`);

    // Final Page: Translator & Designer Copyrights (Badge removed near rights completely)
    pageNum++;
    pagesHTML.push(`
    <div class="page front-text-page" style="background-color: #fffbfa !important;">
      <div class="inner-border front-inner-border" style="border-color: #fbcfe8 !important;">
        <div class="corner-mark-tr">${SVGS.shipMiniPink}</div>
        <div class="corner-mark-tl">${SVGS.roseMiniPink}</div>
        <div class="corner corner-bl" style="border-color: #db2777 !important;"></div>
        <div class="corner corner-br" style="border-color: #db2777 !important;"></div>
        <div class="front-page-header">
          <h2 class="front-page-title" style="color: #9d174d !important;">حقوق الترجمة العربية والإخراج الفني</h2>
          <p class="front-page-subtitle" style="color: #be185d !important;">♡SM♡Sama♡Mohamed Abu AlSaud♡</p>
        </div>
        <div class="copyright-body">
          <div class="translator-special-card">
            <h3 class="trans-title">إهداء وصناعة فنية خاصة</h3>
            <p class="trans-p">
              صُنعت ورُتبت وزُينت هذه الطبعة العربية الفاخرة بأدق تفاصيلها خصيصاً كإهداء عشق ووفاء للغالية <strong>سما (Sama)</strong> من حبيب القلب <strong>محمد أبو السعود</strong>.
            </p>
            <div class="trans-roles-grid">
              <div class="role-box">
                <span class="role-label">التعريب والصياغة الأدبية:</span>
                <span class="role-name">محمد أبو السعود</span>
              </div>
              <div class="role-box">
                <span class="role-label">الإخراج الفني والتنسيق الطباعي:</span>
                <span class="role-name">محمد أبو السعود</span>
              </div>
              <div class="role-box">
                <span class="role-label">التطوير البرمجي والتصدير:</span>
                <span class="role-name">محمد أبو السعود</span>
              </div>
              <div class="role-box">
                <span class="role-label">الإهداء والرمز الحصري:</span>
                <span class="role-name">♡SM♡Sama♡Mohamed Abu AlSaud♡</span>
              </div>
            </div>
            <p class="trans-copyright-note">
              جميع حقوق الترجمة العربية، وتنسيق الأسطر والخطوط والصفحات، والرسوم والأعمال البصرية محفوظة لمحمد أبو السعود.
            </p>
          </div>
        </div>
        ${renderFooterHTML(pageNum)}
      </div>
    </div>`);

    const fullHTML = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="referrer" content="no-referrer">
  <title>أغنية الملح والظلال - النسخة العربية الفاخرة</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after {
      box-sizing: border-box !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    html {
      direction: rtl;
      background-color: #0b0f19;
      margin: 0;
      padding: 0;
    }
    body {
      background-color: #0b0f19;
      color: #1e293b;
      margin: 0;
      padding: 40px 10px;
      font-family: 'Amiri', serif;
      direction: rtl;
      text-align: center;
      min-width: 630px;
      overflow-x: auto;
    }
    .book-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      gap: 35px;
      width: 595px;
      max-width: 595px;
    }
    .page {
      width: 595px !important;
      height: 842px !important;
      max-width: 595px !important;
      background-color: #ffffff;
      box-sizing: border-box !important;
      position: relative;
      overflow: hidden;
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.45);
      margin: 0 auto 35px auto !important;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 24px;
    }
    .full-bleed-page {
      padding: 0 !important;
    }
    .full-bleed-page img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .dedication-page {
      background-color: #fef2f2 !important;
    }
    .dedication-inner {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 35px 20px;
      position: relative;
    }
    .dedication-body {
      text-align: center;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 16px;
    }
    .dedication-title {
      font-size: 24px;
      font-weight: bold;
      color: #dc2626;
      font-family: 'Amiri', serif;
      margin: 0 0 6px 0;
    }
    .dedication-p {
      font-size: 15.5px;
      line-height: 1.95;
      color: #991b1b;
      font-family: 'Amiri', serif;
      margin: 0;
    }
    .dedication-p.bold {
      font-size: 18.5px;
      line-height: 2.0;
      font-weight: bold;
    }
    .dedication-p.italic {
      color: #b91c1c;
      font-style: italic;
    }
    .dedication-signature {
      margin-top: 16px;
      padding: 8px 18px;
      border: 1px solid #fecaca;
      border-radius: 12px;
      background-color: #fee2e2;
      color: #991b1b;
      font-size: 14px;
      font-family: sans-serif;
      font-weight: bold;
    }
    .inner-border {
      border: 1.5px solid #cbd5e1;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 26px 28px 48px 28px;
      position: relative;
      background-color: #ffffff;
      overflow: hidden;
    }
    .front-inner-border {
      justify-content: flex-start !important;
      padding: 26px 24px 48px 24px !important;
      overflow: hidden;
    }
    .inner-border-chapter {
      justify-content: flex-start !important;
      padding: 22px 24px 48px 24px !important;
      overflow: hidden;
    }
    /* Miniature Top Corner Marks: Ship on Right, Rose on Left */
    .corner-mark-tr {
      position: absolute;
      top: 10px;
      right: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      font-size: 13px;
      line-height: 1;
      z-index: 10;
    }
    .corner-mark-tl {
      position: absolute;
      top: 10px;
      left: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      font-size: 13px;
      line-height: 1;
      z-index: 10;
    }
    .emoji-icon {
      font-size: 19px;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .corner-emoji {
      font-size: 13px;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .corner {
      position: absolute;
      width: 16px;
      height: 16px;
      border: 1.5px solid #0f766e;
    }
    .corner-bl { bottom: -1px; left: -1px; border-right: 0; border-top: 0; }
    .corner-br { bottom: -1px; right: -1px; border-left: 0; border-top: 0; }
    
    /* Lifted Chapter Header */
    .chapter-header-box {
      text-align: center;
      width: 100%;
      margin-top: 0;
    }
    .chapter-subtitle {
      font-size: 12px;
      color: #0d9488;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-family: serif;
      display: block;
      margin-top: 0;
      margin-bottom: 2px;
    }
    .chapter-title {
      font-size: 26px;
      font-weight: 900;
      color: #0f172a;
      font-family: 'Amiri', serif;
      margin-top: 0;
      margin-bottom: 10px;
      line-height: 1.25;
    }
    .chapter-img-box {
      width: 100%;
      height: 385px;
      background-color: #f8fafc;
      border-radius: 14px;
      overflow: hidden;
      border: 2px solid #cbd5e1;
      margin-bottom: 8px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.08);
      box-sizing: border-box;
    }
    .chapter-location {
      font-size: 12.5px;
      color: #0f766e;
      font-weight: bold;
      margin: 0;
    }
    /* Footer: Fixed at bottom with safe clearance */
    .page-footer {
      position: absolute;
      bottom: 12px;
      right: 26px;
      left: 26px;
      width: auto;
      height: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      direction: rtl;
      z-index: 30;
      pointer-events: none;
    }
    .footer-rights {
      color: #64748b;
      font-size: 10px;
      font-family: 'Amiri', serif;
      font-weight: 600;
      text-align: right;
    }
    .footer-page-num {
      color: #f472b6 !important;
      font-size: 9.5px;
      font-weight: 700;
      font-family: 'Amiri', serif;
      letter-spacing: 0.5px;
      text-align: left;
    }
    /* Text Pages: max 15 lines per page, 12-14 words per line, balanced Arabic spacing */
    .novel-lines-container {
      width: 100%;
      max-width: 486px;
      margin: 0 auto;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 3.5px;
      padding: 0;
      box-sizing: border-box;
    }
    .novel-line {
      font-size: 16.5px;
      line-height: 1.82;
      color: #1e293b;
      text-align: justify;
      text-justify: inter-word;
      text-align-last: center;
      font-family: 'Amiri', serif;
      margin: 0;
      width: 100%;
      min-height: 28px;
      letter-spacing: 0;
      word-spacing: 1px;
    }
    /* Front Pages & Copyright Pages */
    .front-page-header {
      text-align: center;
      margin-bottom: 14px;
      width: 100%;
      border-bottom: 1px dashed #cbd5e1;
      padding-bottom: 8px;
    }
    .front-page-title {
      font-size: 22px;
      font-weight: 900;
      color: #0f766e;
      margin: 0 0 4px 0;
      font-family: 'Amiri', serif;
    }
    .front-page-subtitle {
      font-size: 12px;
      color: #64748b;
      margin: 0;
      font-family: 'Amiri', serif;
    }
    .character-list {
      display: flex;
      flex-direction: column;
      gap: 7px;
      width: 100%;
      text-align: right;
    }
    .character-card {
      padding: 8px 12px;
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
    }
    .char-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 3px;
    }
    /* Circular Character Icon Badge */
    .char-icon-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      min-width: 36px;
      background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%);
      border: 1.5px solid #0d9488;
      border-radius: 50% !important;
      color: #0f766e;
      box-shadow: 0 2px 5px rgba(13, 148, 136, 0.15);
    }
    .char-title-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .char-name {
      font-size: 15.5px;
      font-weight: bold;
      color: #0f172a;
    }
    .char-role {
      font-size: 11px;
      background-color: #ccfbf1;
      color: #0f766e;
      padding: 1px 8px;
      border-radius: 9999px;
      font-weight: bold;
    }
    .char-desc {
      font-size: 13px;
      line-height: 1.7;
      color: #475569;
      margin: 0;
    }
    /* Synopsis Page */
    .synopsis-content {
      display: flex;
      flex-direction: column;
      gap: 14px;
      text-align: right;
      width: 100%;
    }
    .synopsis-box {
      background-color: #f0fdfa;
      border: 1px solid #99f6e4;
      border-radius: 12px;
      padding: 14px;
    }
    .synopsis-box-title {
      font-size: 16px;
      font-weight: bold;
      color: #0f766e;
      margin: 0 0 6px 0;
    }
    .synopsis-p {
      font-size: 14px;
      line-height: 1.85;
      color: #1e293b;
      margin: 0 0 8px 0;
    }
    .chapters-count-box {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 14px;
    }
    .chapters-count-badge {
      font-size: 13px;
      color: #0f172a;
      margin: 0 0 8px 0;
    }
    .parts-list {
      list-style: none;
      padding: 0;
      margin: 0;
      font-size: 12.5px;
      color: #475569;
      line-height: 1.9;
    }
    /* Copyright Styles */
    .copyright-body {
      width: 100%;
      text-align: right;
    }
    .copyright-card {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 20px;
      margin-bottom: 16px;
    }
    .copyright-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      font-size: 13px;
    }
    .cp-label {
      color: #64748b;
      font-weight: bold;
    }
    .cp-val {
      color: #0f172a;
      font-weight: bold;
    }
    .copyright-divider {
      height: 1px;
      background-color: #e2e8f0;
      margin: 14px 0;
    }
    .copyright-statement {
      font-size: 13px;
      line-height: 1.8;
      color: #475569;
      margin: 0 0 10px 0;
    }
    .author-blurb {
      text-align: center;
      padding: 14px;
      background-color: #f0fdfa;
      border: 1px dashed #99f6e4;
      border-radius: 12px;
    }
    .author-blurb-text {
      font-size: 13px;
      color: #0f766e;
      font-style: italic;
      margin: 0;
    }
    .translator-special-card {
      background: linear-gradient(135deg, #fff5f7 0%, #ffffff 100%);
      border: 1.5px solid #fbcfe8;
      border-radius: 14px;
      padding: 20px;
      text-align: center;
    }
    .trans-title {
      font-size: 18px;
      font-weight: bold;
      color: #be185d;
      margin: 0 0 10px 0;
    }
    .trans-p {
      font-size: 14.5px;
      line-height: 1.85;
      color: #831843;
      margin: 0 0 16px 0;
    }
    .trans-roles-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      text-align: right;
      margin-bottom: 16px;
    }
    .role-box {
      background: #ffffff;
      border: 1px solid #fce7f3;
      border-radius: 10px;
      padding: 8px 10px;
    }
    .role-label {
      display: block;
      font-size: 10.5px;
      color: #9d174d;
      font-weight: bold;
    }
    .role-name {
      display: block;
      font-size: 12px;
      color: #475569;
      font-weight: bold;
    }
    .trans-copyright-note {
      font-size: 12.5px;
      line-height: 1.7;
      color: #9d174d;
      margin: 0;
    }
    img {
      max-width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }
    @media print {
      body {
        background: transparent !important;
        padding: 0 !important;
        margin: 0 !important;
        min-width: auto !important;
      }
      .book-wrapper {
        gap: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
      }
      .page {
        box-shadow: none !important;
        margin: 0 !important;
        page-break-after: always !important;
        page-break-inside: avoid !important;
        width: 100% !important;
        height: 100vh !important;
      }
    }
  </style>
</head>
<body>
  <div class="book-wrapper">
${pagesHTML.join('\n')}
  </div>
</body>
</html>`;

    return fullHTML;
  };

  const handleDownloadHTML = () => {
    const fullHTML = generateBookHTML();
    const blob = new Blob([fullHTML], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = downloadScope === 'full' ? 'أغنية_الملح_والظلال_الفاخرة.html' : `أغنية_الملح_والظلال_جزء_${downloadScope}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 60000);
  };

  const handleDirectPrint = () => {
    setIsGenerating(true);
    setProgressMsg('جاري تحضير أمر الطباعة المباشرة ومطابقة تفاصيل الكتاب بالكامل...');
    try {
      const existingFrame = document.getElementById('novel-print-iframe');
      if (existingFrame) existingFrame.remove();

      const printFrame = document.createElement('iframe');
      printFrame.id = 'novel-print-iframe';
      printFrame.style.position = 'fixed';
      printFrame.style.right = '0';
      printFrame.style.bottom = '0';
      printFrame.style.width = '0';
      printFrame.style.height = '0';
      printFrame.style.border = '0';
      printFrame.style.opacity = '0';
      printFrame.style.pointerEvents = 'none';
      document.body.appendChild(printFrame);

      const htmlContent = generateBookHTML();
      const frameDoc = printFrame.contentWindow?.document || printFrame.contentDocument;
      if (frameDoc) {
        frameDoc.open();
        frameDoc.write(htmlContent);
        frameDoc.close();
        setTimeout(() => {
          setIsGenerating(false);
          setProgressMsg('');
          printFrame.contentWindow?.focus();
          printFrame.contentWindow?.print();
        }, 800);
      }
    } catch (err) {
      console.error('Print error:', err);
      setIsGenerating(false);
      setProgressMsg('');
    }
  };

  let globalPageCounter = 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/95 backdrop-blur-xl" dir="rtl">
      <div className="relative w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[96vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white font-['Amiri']">تصدير الرواية الفاخرة (سفينة ووردة في الزوايا، أشكال حصرية)</h2>
              <p className="text-sm text-slate-400">أشكال حصرية (سفينة، وردة، خطاف، حورية، قبطان) وأيقونات دائرية وأشكال مصغرة بالأركان</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {resumeData !== null && !isGenerating && (
              <button
                onClick={() => handleDownloadPDF(resumeData)}
                className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg animate-bounce"
              >
                <RefreshCw className="w-4 h-4" /> استئناف التصدير السابق
              </button>
            )}
            <button
              onClick={handleDownloadHTML}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-sm font-bold transition-all flex items-center gap-2 shadow-lg hover:shadow-blue-500/25"
            >
              <Code className="w-5 h-5" /> تنزيل HTML
            </button>
            <button
              onClick={handleDirectPrint}
              disabled={isGenerating}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl text-sm font-bold transition-all flex items-center gap-2 shadow-lg disabled:opacity-50 hover:shadow-purple-500/25"
              title="طباعة مباشرة أو حفظ بتنسيق PDF بكامل تفاصيل المعاينة وجودة فيكتور فائقة"
            >
              <Printer className="w-5 h-5" /> طباعة / حفظ PDF
            </button>
            <button
              onClick={() => handleDownloadPDF(0)}
              disabled={isGenerating}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-sm font-bold transition-all flex items-center gap-2 shadow-lg disabled:opacity-50 hover:shadow-emerald-500/25"
            >
              <Download className="w-5 h-5" /> {isGenerating ? 'جاري التحميل...' : 'تنزيل PDF'}
            </button>
            <button
              onClick={onClose}
              className="p-2.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Progress Msg */}
        {isGenerating && (
          <div className="bg-emerald-900/50 px-8 py-2 text-center border-b border-emerald-800/30">
            <p className="text-emerald-400 text-xs font-bold animate-pulse">{progressMsg}</p>
          </div>
        )}

        {downloadSuccess && (
          <div className="bg-emerald-950 px-8 py-2 text-center border-b border-emerald-800 flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <p className="text-emerald-300 text-xs font-bold">تم إنشاء وتنزيل الملف بنجاح!</p>
          </div>
        )}

        {/* Preview Scroll Area */}
        <div className="flex-1 overflow-y-auto p-10 bg-slate-950 flex flex-col items-center gap-12 scroll-smooth custom-scrollbar">
          <div ref={printRef} style={{ width: '595px', margin: '0 auto' }}>
            {/* Front 6 Full Bleed Image Pages */}
            {downloadScope === 'full' && (
              <>
                {FRONT_IMAGES_CONFIG.map((img, idx) => (
                  <div key={`full-bleed-${idx}`} className="page" style={{
                    width: '595px',
                    height: '842px',
                    backgroundColor: '#ffffff',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    margin: '0 auto 35px auto',
                    padding: 0
                  }}>
                    <img 
                      src={img.local} 
                      alt={img.alt}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = img.url;
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                ))}

                {/* Page 7: Sama Dedication & Romance Page */}
                {(() => {
                  globalPageCounter++;
                  const currP = globalPageCounter;
                  return (
                    <div className="page" style={{
                      padding: '24px',
                      backgroundColor: '#fef2f2',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '842px',
                      width: '595px',
                      boxSizing: 'border-box',
                      position: 'relative',
                      margin: '0 auto 35px auto',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: '100%',
                        height: '100%',
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '35px 20px',
                        position: 'relative'
                      }}>
                        <div className="corner-mark-tr" dangerouslySetInnerHTML={{ __html: SVGS.shipMiniPink }} />
                        <div className="corner-mark-tl" dangerouslySetInnerHTML={{ __html: SVGS.roseMiniPink }} />

                        <div style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
                          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626', fontFamily: 'Amiri', marginBottom: '6px' }}>
                            إهداء خاص وعشق لابنتي
                          </div>
                          <p style={{ fontSize: '18.5px', lineHeight: '2.0', color: '#991b1b', fontFamily: 'Amiri', margin: 0, fontWeight: 'bold' }}>
                            صُنعت ورُتبت وصُممت لأجلكِ يا سما
                          </p>
                          <p style={{ fontSize: '16px', lineHeight: '1.95', color: '#7f1d1d', fontFamily: 'Amiri', margin: 0 }}>
                            ذكرى من القلب وحبيب القلب محمد أبو السعود
                          </p>
                          <p style={{ fontSize: '15.5px', lineHeight: '1.95', color: '#991b1b', fontFamily: 'Amiri', margin: 0 }}>
                            يا أجمل نعمة في حياتي، استمتعي وابتسمي فهي مصنوعة لأجلكِ يا سمسمتي وحدكِ.
                          </p>
                          <p style={{ fontSize: '15px', lineHeight: '1.95', color: '#b91c1c', fontFamily: 'Amiri', fontStyle: 'italic', margin: 0 }}>
                            يا قمر البحار ودرة القلوب، يا من ملكتِ الروح والنبض.. أهدي إليكِ بحار العشق وغيمات الغزل، فأنتِ الرواية الأبدية التي تكتمل بابتسامتكِ ووجودكِ الساحر في حياتي.
                          </p>

                          <div style={{ marginTop: '16px', padding: '8px 18px', border: '1px solid #fecaca', borderRadius: '12px', backgroundColor: '#fee2e2', color: '#991b1b', fontSize: '14px', fontFamily: 'sans-serif', fontWeight: 'bold' }}>
                            ♡SM♡Sama♡Mohamed Abu AlSaud♡
                          </div>
                        </div>
                        
                        <div className="page-footer">
                          <span className="footer-rights">♡SM♡Sama♡Mohamed Abu AlSaud♡</span>
                          <span className="footer-page-num">صفحة {currP}</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Page 8: Character Page 1 (Circular Badges, strictly 5 allowed shapes) */}
                {(() => {
                  globalPageCounter++;
                  const currP = globalPageCounter;
                  return (
                    <div className="page front-text-page" style={{
                      padding: '24px',
                      backgroundColor: '#ffffff',
                      height: '842px',
                      width: '595px',
                      boxSizing: 'border-box',
                      position: 'relative',
                      margin: '0 auto 35px auto',
                      overflow: 'hidden'
                    }}>
                      <div className="inner-border front-inner-border">
                        <div className="corner-mark-tr" dangerouslySetInnerHTML={{ __html: SVGS.shipMini }} />
                        <div className="corner-mark-tl" dangerouslySetInnerHTML={{ __html: SVGS.roseMini }} />
                        <div className="corner corner-bl"></div>
                        <div className="corner corner-br"></div>

                        <div className="front-page-header">
                          <h2 className="front-page-title">شخصيات الرواية (الجزء الأول)</h2>
                          <p className="front-page-subtitle">طاقم سفينة "نوكتيس" وأبطال المغامرة البحرية</p>
                        </div>

                        <div className="character-list">
                          {CHARACTERS_PART_1.map((c, i) => (
                            <div key={i} className="character-card">
                              <div className="char-header">
                                <span className="char-icon-badge" dangerouslySetInnerHTML={{ __html: c.iconSvg }} />
                                <div className="char-title-wrap">
                                  <span className="char-name">{c.nameAr}</span>
                                  <span className="char-role">{c.role}</span>
                                </div>
                              </div>
                              <p className="char-desc">{c.desc}</p>
                            </div>
                          ))}
                        </div>

                        <div className="page-footer">
                          <span className="footer-rights">♡SM♡Sama♡Mohamed Abu AlSaud♡</span>
                          <span className="footer-page-num">صفحة {currP}</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Page 9: Character Page 2 (Circular Badges, strictly 5 allowed shapes) */}
                {(() => {
                  globalPageCounter++;
                  const currP = globalPageCounter;
                  return (
                    <div className="page front-text-page" style={{
                      padding: '24px',
                      backgroundColor: '#ffffff',
                      height: '842px',
                      width: '595px',
                      boxSizing: 'border-box',
                      position: 'relative',
                      margin: '0 auto 35px auto',
                      overflow: 'hidden'
                    }}>
                      <div className="inner-border front-inner-border">
                        <div className="corner-mark-tr" dangerouslySetInnerHTML={{ __html: SVGS.shipMini }} />
                        <div className="corner-mark-tl" dangerouslySetInnerHTML={{ __html: SVGS.roseMini }} />
                        <div className="corner corner-bl"></div>
                        <div className="corner corner-br"></div>

                        <div className="front-page-header">
                          <h2 className="front-page-title">شخصيات الرواية (الجزء الثاني)</h2>
                          <p className="front-page-subtitle">بحارة السفينة الملعونة وحراس أسرار الأمواج</p>
                        </div>

                        <div className="character-list">
                          {CHARACTERS_PART_2.map((c, i) => (
                            <div key={i} className="character-card">
                              <div className="char-header">
                                <span className="char-icon-badge" dangerouslySetInnerHTML={{ __html: c.iconSvg }} />
                                <div className="char-title-wrap">
                                  <span className="char-name">{c.nameAr}</span>
                                  <span className="char-role">{c.role}</span>
                                </div>
                              </div>
                              <p className="char-desc">{c.desc}</p>
                            </div>
                          ))}
                        </div>

                        <div className="page-footer">
                          <span className="footer-rights">♡SM♡Sama♡Mohamed Abu AlSaud♡</span>
                          <span className="footer-page-num">صفحة {currP}</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Page 10: Synopsis & Novel Overview Page */}
                {(() => {
                  globalPageCounter++;
                  const currP = globalPageCounter;
                  return (
                    <div className="page front-text-page" style={{
                      padding: '24px',
                      backgroundColor: '#ffffff',
                      height: '842px',
                      width: '595px',
                      boxSizing: 'border-box',
                      position: 'relative',
                      margin: '0 auto 35px auto',
                      overflow: 'hidden'
                    }}>
                      <div className="inner-border front-inner-border">
                        <div className="corner-mark-tr" dangerouslySetInnerHTML={{ __html: SVGS.shipMini }} />
                        <div className="corner-mark-tl" dangerouslySetInnerHTML={{ __html: SVGS.roseMini }} />
                        <div className="corner corner-bl"></div>
                        <div className="corner corner-br"></div>

                        <div className="front-page-header">
                          <h2 className="front-page-title">نبذة وفكرة الرواية</h2>
                          <p className="front-page-subtitle">The Song of Salt and Shadow • ملحمة الفانتازيا والأمواج</p>
                        </div>

                        <div className="synopsis-content">
                          <div className="synopsis-box">
                            <h3 className="synopsis-box-title">فكرة الرواية (بدون حرق الأحداث)</h3>
                            <p className="synopsis-p">
                              في عالمٍ بحري فسيح تحكمه أساطير المحيطات وتغشاه لعنات غامضة، تفر <strong>إيريس</strong>—الفتاة الهجين التي تحمل دماء الحوريات والبشر—من شباك الصيادين وأسواق العبيد، لتلجأ في لحظة يأس إلى أحشاء السفينة الأسطورية الملعونة <strong>نوكتيس</strong>.
                            </p>
                            <p className="synopsis-p">
                              هناك تتقاطع أقدارها مع القبطان الصارم <strong>سابل كرو</strong>، القائد المهيب الذي يخفي بدوره لعنة تفصل ظله عن جسده وتسلب ذكرياته شيئاً فشيئاً. ومع تلاطم أمواج البحار وتكشف خيوط البريق الفضي الساحر، تنشأ بينهما رابطة استثنائية تقودهما في رحلة ملحمية عبر عوالم الملح والظلال بحثاً عن الخلاص والهوية والحقيقة.
                            </p>
                          </div>

                          <div className="chapters-count-box">
                            <h3 className="synopsis-box-title">عدد الفصول وأقسام العمل</h3>
                            <p className="chapters-count-badge">
                              تتكون الرواية من <strong>40 فصلاً كاملاً</strong> بالإضافة إلى <strong>الخاتمة (الإبيلوج)</strong>، مقسمة على أربعة أجزاء:
                            </p>
                            <ul className="parts-list">
                              <li><strong>الجزء الأول:</strong> بحر التيجان (Sea of Crowns) — الفصول 1 إلى 10</li>
                              <li><strong>الجزء الثاني:</strong> بين البحار وبحر التجدد (Intermaria & Renewal) — الفصول 11 إلى 20</li>
                              <li><strong>الجزء الثالث:</strong> بحر العظام وبحر الظلال (Sea of Bones & Shadows) — الفصول 21 إلى 30</li>
                              <li><strong>الجزء الرابع:</strong> بحر الأحلام وبحر الأغنية الأولى — الفصول 31 إلى 40 + الخاتمة</li>
                            </ul>
                          </div>
                        </div>

                        <div className="page-footer">
                          <span className="footer-rights">♡SM♡Sama♡Mohamed Abu AlSaud♡</span>
                          <span className="footer-page-num">صفحة {currP}</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </>
            )}

            {activeChapters.map((ch) => {
              const pages = paginateText(ch.contentAr, 15);
              const imgResource = CHAPTER_IMAGE_MAP[String(ch.id)] || CHAPTER_IMAGE_MAP['1'];
              return (
                <React.Fragment key={ch.id}>
                  {/* Chapter Header Page (Titles raised upwards with miniature Ship & Rose at corners) */}
                  {(() => {
                    globalPageCounter++;
                    const currP = globalPageCounter;
                    return (
                      <div className="page" style={{
                        padding: '24px',
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '842px',
                        width: '595px',
                        boxSizing: 'border-box',
                        position: 'relative',
                        margin: '0 auto 35px auto',
                        overflow: 'hidden'
                      }}>
                        <div className="inner-border inner-border-chapter">
                          <div className="corner-mark-tr" dangerouslySetInnerHTML={{ __html: SVGS.shipMini }} />
                          <div className="corner-mark-tl" dangerouslySetInnerHTML={{ __html: SVGS.roseMini }} />
                          <div className="corner corner-bl"></div>
                          <div className="corner corner-br"></div>

                          <div className="chapter-header-box">
                            <span className="chapter-subtitle">{ch.titleEn}</span>
                            <h1 className="chapter-title">{ch.titleAr}</h1>
                            
                            <div className="chapter-img-box">
                              <img 
                                src={imgResource.local} 
                                alt=""
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = imgResource.url;
                                }}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.04) brightness(1.01)' }} 
                              />
                            </div>
                            
                            <p className="chapter-location">الموقع البحري: {ch.seaLocation}</p>
                          </div>
                          
                          <div className="page-footer">
                            <span className="footer-rights">♡SM♡Sama♡Mohamed Abu AlSaud♡</span>
                            <span className="footer-page-num">صفحة {currP}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Text Pages: 13 to 15 words per line, 17 lines, centered inside frame */}
                  {pages.map((lines, pIdx) => {
                    globalPageCounter++;
                    const currP = globalPageCounter;
                    return (
                      <div className="page" key={`${ch.id}-p${pIdx}`} style={{
                        padding: '24px',
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '842px',
                        width: '595px',
                        boxSizing: 'border-box',
                        position: 'relative',
                        margin: '0 auto 35px auto',
                        overflow: 'hidden'
                      }}>
                        <div className="inner-border">
                          <div className="corner-mark-tr" dangerouslySetInnerHTML={{ __html: SVGS.shipMini }} />
                          <div className="corner-mark-tl" dangerouslySetInnerHTML={{ __html: SVGS.roseMini }} />
                          <div className="corner corner-bl"></div>
                          <div className="corner corner-br"></div>

                          <div className="novel-lines-container">
                            {lines.map((line, lIdx) => (
                              <p key={lIdx} className="novel-line">
                                {line}
                              </p>
                            ))}
                          </div>

                          <div className="page-footer">
                            <span className="footer-rights">♡SM♡Sama♡Mohamed Abu AlSaud♡</span>
                            <span className="footer-page-num">صفحة {currP}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </React.Fragment>
              );
            })}

            {/* End Page: Author Copyrights (No publication date) */}
            {(() => {
              globalPageCounter++;
              const currP = globalPageCounter;
              return (
                <div className="page front-text-page" style={{
                  padding: '24px',
                  backgroundColor: '#ffffff',
                  height: '842px',
                  width: '595px',
                  boxSizing: 'border-box',
                  position: 'relative',
                  margin: '0 auto 35px auto',
                  overflow: 'hidden'
                }}>
                  <div className="inner-border front-inner-border">
                    <div className="corner-mark-tr" dangerouslySetInnerHTML={{ __html: SVGS.shipMini }} />
                    <div className="corner-mark-tl" dangerouslySetInnerHTML={{ __html: SVGS.roseMini }} />
                    <div className="corner corner-bl"></div>
                    <div className="corner corner-br"></div>

                    <div className="front-page-header">
                      <h2 className="front-page-title">حقوق الملكية الفكرية والأدبية للكاتب</h2>
                      <p className="front-page-subtitle">Original Author Intellectual Property & Copyright</p>
                    </div>

                    <div className="copyright-body">
                      <div className="copyright-card">
                        <div className="copyright-row">
                          <span className="cp-label">عنوان الرواية الأصلي:</span>
                          <span className="cp-val">The Song of Salt and Shadow</span>
                        </div>
                        <div className="copyright-row">
                          <span className="cp-label">المؤلفة الأصلية:</span>
                          <span className="cp-val">سيرين روز (Seren Rose)</span>
                        </div>
                        <div className="copyright-divider"></div>
                        <p className="copyright-statement">
                          جميع الحقوق الأدبية والفكرية لهذا المصنف محفوظة بالكامل للكاتبة <strong>Seren Rose</strong>.
                        </p>
                        <p className="copyright-statement">
                          تعتبر أحداث هذه الرواية وشخصياتها وعوالمها الخيالية ابتكاراً أدبياً أصيلاً محمياً بموجب قوانين حماية حق المؤلف والملكية الفكرية الدولية. لا يجوز نسخ أو اقتباس أو إعادة إنتاج النص الأصلي أو أجزاء منه تجارياً بأي وسيلة دون إذن خطي مسبق من المؤلفة والناشر الأصلي.
                        </p>
                      </div>

                      <div className="author-blurb">
                        <p className="author-blurb-text">
                          "تحية تقدير وإعجاب للمؤلفة سيرين روز التي نسجت هذه الملحمة الخالدة وأهدت العالم خيوط البريق الفضي الساحر."
                        </p>
                      </div>
                    </div>

                    <div className="page-footer">
                      <span className="footer-rights">♡SM♡Sama♡Mohamed Abu AlSaud♡</span>
                      <span className="footer-page-num">صفحة {currP}</span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* End Page: Translator & Designer Copyrights (Badge removed near rights completely) */}
            {(() => {
              globalPageCounter++;
              const currP = globalPageCounter;
              return (
                <div className="page front-text-page" style={{
                  padding: '24px',
                  backgroundColor: '#fffbfa',
                  height: '842px',
                  width: '595px',
                  boxSizing: 'border-box',
                  position: 'relative',
                  margin: '0 auto 35px auto',
                  overflow: 'hidden'
                }}>
                  <div className="inner-border front-inner-border" style={{ borderColor: '#fbcfe8' }}>
                    <div className="corner-mark-tr" dangerouslySetInnerHTML={{ __html: SVGS.shipMiniPink }} />
                    <div className="corner-mark-tl" dangerouslySetInnerHTML={{ __html: SVGS.roseMiniPink }} />
                    <div className="corner corner-bl" style={{ borderColor: '#db2777' }}></div>
                    <div className="corner corner-br" style={{ borderColor: '#db2777' }}></div>

                    <div className="front-page-header">
                      <h2 className="front-page-title" style={{ color: '#9d174d' }}>حقوق الترجمة العربية والإخراج الفني</h2>
                      <p className="front-page-subtitle" style={{ color: '#be185d' }}>♡SM♡Sama♡Mohamed Abu AlSaud♡</p>
                    </div>

                    <div className="copyright-body">
                      <div className="translator-special-card">
                        <h3 className="trans-title">إهداء وصناعة فنية خاصة</h3>
                        <p className="trans-p">
                          صُنعت ورُتبت وزُينت هذه الطبعة العربية الفاخرة بأدق تفاصيلها خصيصاً كإهداء عشق ووفاء للغالية <strong>سما (Sama)</strong> من حبيب القلب <strong>محمد أبو السعود</strong>.
                        </p>
                        
                        <div className="trans-roles-grid">
                          <div className="role-box">
                            <span className="role-label">التعريب والصياغة الأدبية:</span>
                            <span className="role-name">محمد أبو السعود</span>
                          </div>
                          <div className="role-box">
                            <span className="role-label">الإخراج الفني والتنسيق الطباعي:</span>
                            <span className="role-name">محمد أبو السعود</span>
                          </div>
                          <div className="role-box">
                            <span className="role-label">التطوير البرمجي والتصدير:</span>
                            <span className="role-name">محمد أبو السعود</span>
                          </div>
                          <div className="role-box">
                            <span className="role-label">الإهداء والرمز الحصري:</span>
                            <span className="role-name">♡SM♡Sama♡Mohamed Abu AlSaud♡</span>
                          </div>
                        </div>

                        <p className="trans-copyright-note">
                          جميع حقوق الترجمة العربية، وتنسيق الأسطر والخطوط والصفحات، والرسوم والأعمال البصرية محفوظة لمحمد أبو السعود.
                        </p>
                      </div>
                    </div>

                    <div className="page-footer">
                      <span className="footer-rights">♡SM♡Sama♡Mohamed Abu AlSaud♡</span>
                      <span className="footer-page-num">صفحة {currP}</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      <style>{`
        .inner-border {
          border: 1.5px solid #cbd5e1;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 26px 28px 48px 28px;
          position: relative;
          background-color: #ffffff;
          overflow: hidden;
        }
        .front-inner-border {
          justify-content: flex-start !important;
          padding: 26px 24px 48px 24px !important;
          overflow: hidden;
        }
        .inner-border-chapter {
          justify-content: flex-start !important;
          padding: 22px 24px 48px 24px !important;
          overflow: hidden;
        }
        /* Miniature Top Corner Marks: Ship on Right, Rose on Left */
        .corner-mark-tr {
          position: absolute;
          top: 10px;
          right: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          font-size: 13px;
          line-height: 1;
          z-index: 10;
        }
        .corner-mark-tl {
          position: absolute;
          top: 10px;
          left: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          font-size: 13px;
          line-height: 1;
          z-index: 10;
        }
        .emoji-icon {
          font-size: 19px;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .corner-emoji {
          font-size: 13px;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .corner {
          position: absolute;
          width: 16px;
          height: 16px;
          border: 1.5px solid #0f766e;
        }
        .corner-bl { bottom: -1px; left: -1px; border-right: 0; border-top: 0; }
        .corner-br { bottom: -1px; right: -1px; border-left: 0; border-top: 0; }
        
        .chapter-header-box {
          text-align: center;
          width: 100%;
          margin-top: 0;
        }
        .chapter-subtitle {
          font-size: 12px;
          color: #0d9488;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-family: serif;
          display: block;
          margin-top: 0;
          margin-bottom: 2px;
        }
        .chapter-title {
          font-size: 26px;
          font-weight: 900;
          color: #0f172a;
          font-family: 'Amiri', serif;
          margin-top: 0;
          margin-bottom: 10px;
          line-height: 1.25;
        }
        .chapter-img-box {
          width: 100%;
          height: 385px;
          background-color: #f8fafc;
          border-radius: 14px;
          overflow: hidden;
          border: 2px solid #cbd5e1;
          margin-bottom: 8px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          box-sizing: border-box;
        }
        .chapter-location {
          font-size: 12.5px;
          color: #0f766e;
          font-weight: bold;
          margin: 0;
        }

        /* Footer: Fixed at bottom with safe clearance */
        .page-footer {
          position: absolute;
          bottom: 12px;
          right: 26px;
          left: 26px;
          width: auto;
          height: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          direction: rtl;
          z-index: 30;
          pointer-events: none;
        }
        .footer-rights {
          color: #64748b;
          font-size: 10px;
          font-family: 'Amiri', serif;
          font-weight: 600;
          text-align: right;
        }
        .footer-page-num {
          color: #f472b6 !important;
          font-size: 9.5px;
          font-weight: 700;
          font-family: 'Amiri', serif;
          letter-spacing: 0.5px;
          text-align: left;
        }

        /* Text Pages: max 15 lines per page, 12-14 words per line, balanced Arabic spacing */
        .novel-lines-container {
          width: 100%;
          max-width: 486px;
          margin: 0 auto;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 3.5px;
          padding: 0;
          box-sizing: border-box;
        }
        .novel-line {
          font-size: 16.5px;
          line-height: 1.82;
          color: #1e293b;
          text-align: justify;
          text-justify: inter-word;
          text-align-last: center;
          font-family: 'Amiri', serif;
          margin: 0;
          width: 100%;
          min-height: 28px;
          letter-spacing: 0;
          word-spacing: 1px;
        }

        .front-page-header {
          text-align: center;
          margin-bottom: 14px;
          width: 100%;
          border-bottom: 1px dashed #cbd5e1;
          padding-bottom: 8px;
        }
        .front-page-title {
          font-size: 22px;
          font-weight: 900;
          color: #0f766e;
          margin: 0 0 4px 0;
          font-family: 'Amiri', serif;
        }
        .front-page-subtitle {
          font-size: 12px;
          color: #64748b;
          margin: 0;
          font-family: 'Amiri', serif;
        }
        .character-list {
          display: flex;
          flex-direction: column;
          gap: 7px;
          width: 100%;
          text-align: right;
        }
        .character-card {
          padding: 8px 12px;
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
        }
        .char-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 3px;
        }
        /* Circular Character Icon Badge */
        .char-icon-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          min-width: 36px;
          background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%);
          border: 1.5px solid #0d9488;
          border-radius: 50% !important;
          color: #0f766e;
          box-shadow: 0 2px 5px rgba(13, 148, 136, 0.15);
        }
        .char-title-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .char-name {
          font-size: 15.5px;
          font-weight: bold;
          color: #0f172a;
        }
        .char-role {
          font-size: 11px;
          background-color: #ccfbf1;
          color: #0f766e;
          padding: 1px 8px;
          border-radius: 9999px;
          font-weight: bold;
        }
        .char-desc {
          font-size: 13px;
          line-height: 1.7;
          color: #475569;
          margin: 0;
        }
        /* Synopsis Page */
        .synopsis-content {
          display: flex;
          flex-direction: column;
          gap: 14px;
          text-align: right;
          width: 100%;
        }
        .synopsis-box {
          background-color: #f0fdfa;
          border: 1px solid #99f6e4;
          border-radius: 12px;
          padding: 14px;
        }
        .synopsis-box-title {
          font-size: 16px;
          font-weight: bold;
          color: #0f766e;
          margin: 0 0 6px 0;
        }
        .synopsis-p {
          font-size: 14px;
          line-height: 1.85;
          color: #1e293b;
          margin: 0 0 8px 0;
        }
        .chapters-count-box {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 14px;
        }
        .chapters-count-badge {
          font-size: 13px;
          color: #0f172a;
          margin: 0 0 8px 0;
        }
        .parts-list {
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 12.5px;
          color: #475569;
          line-height: 1.9;
        }
        /* Copyright Styles */
        .copyright-body {
          width: 100%;
          text-align: right;
        }
        .copyright-card {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 20px;
          margin-bottom: 16px;
        }
        .copyright-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          font-size: 13px;
        }
        .cp-label {
          color: #64748b;
          font-weight: bold;
        }
        .cp-val {
          color: #0f172a;
          font-weight: bold;
        }
        .copyright-divider {
          height: 1px;
          background-color: #e2e8f0;
          margin: 14px 0;
        }
        .copyright-statement {
          font-size: 13px;
          line-height: 1.8;
          color: #475569;
          margin: 0 0 10px 0;
        }
        .author-blurb {
          text-align: center;
          padding: 14px;
          background-color: #f0fdfa;
          border: 1px dashed #99f6e4;
          border-radius: 12px;
        }
        .author-blurb-text {
          font-size: 13px;
          color: #0f766e;
          font-style: italic;
          margin: 0;
        }
        .translator-special-card {
          background: linear-gradient(135deg, #fff5f7 0%, #ffffff 100%);
          border: 1.5px solid #fbcfe8;
          border-radius: 14px;
          padding: 20px;
          text-align: center;
        }
        .trans-title {
          font-size: 18px;
          font-weight: bold;
          color: #be185d;
          margin: 0 0 10px 0;
        }
        .trans-p {
          font-size: 14.5px;
          line-height: 1.85;
          color: #831843;
          margin: 0 0 16px 0;
        }
        .trans-roles-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          text-align: right;
          margin-bottom: 16px;
        }
        .role-box {
          background: #ffffff;
          border: 1px solid #fce7f3;
          border-radius: 10px;
          padding: 8px 10px;
        }
        .role-label {
          display: block;
          font-size: 10.5px;
          color: #9d174d;
          font-weight: bold;
        }
        .role-name {
          display: block;
          font-size: 12px;
          color: #475569;
          font-weight: bold;
        }
        .trans-copyright-note {
          font-size: 12.5px;
          line-height: 1.7;
          color: #9d174d;
          margin: 0;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 20px; }
      `}</style>
    </div>
  );
}
