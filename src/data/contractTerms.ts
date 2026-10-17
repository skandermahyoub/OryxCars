export const DEFAULT_OFFICIAL_CONTRACT_CLAUSES: string[] = [
  'البند الأول (الاستخدام المسموح): يقر المستأجر باستلام المركبة في حالة فنية وميكانيكية ممتازة، ويتعهد باستخدامها وفقاً للقوانين المرورية المعمول بها في الجمهورية اليمنية، وعدم استخدامها في نقل الممنوعات أو السباقات أو سحب مركبات أخرى، أو القيادة في الطرق الوعرة غير المخصصة للمركبة.',
  'البند الثاني (حصرية القيادة): يحظر قيادة المركبة من قبل أي شخص آخر غير المستأجر المصرح له والمدرج اسمه ورقم رخصته في هذا العقد، ويتحمل المستأجر المسؤولية الجنائية والمدنية الكاملة في حال تسليمها للغير دون إذن خطي مسبق من المؤجر.',
  'البند الثالث (الوقود والعداد والإرجاع): يلتزم المستأجر بإعادة المركبة في الوقت والمكان المحددين بالعقد، بنفس مستوى الوقود المسجل عند التسليم وبحالة نظيفة، وفي حال التأخير عن موعد الإرجاع بما يزيد عن ساعتين دون موافقة المؤجر يُحتسب يوم إيجار إضافي.',
  'البند الرابع (المخالفات والغرامات المرورية): المستأجر مسؤول مسؤولية قانونية ومالية مباشرة عن أي مخالفات مرورية، رسوم مواقف، مخالفات موازين، أو حجز للمركبة صادر عن شرطة السير أو الجهات الأمنية خلال فترة سريان العقد حتى لحظة استلامها الفعلي بموجب محضر فحص العودة.',
  'البند الخامس (الحوادث والأضرار والتأمين): في حال وقوع حادث مروري لا قدر الله، يلتزم المستأجر بعدم تحريك السيارة من موقع الحادث، وإبلاغ شرطة المرور فوراً، وإشعار إدارة المكتب، واستخراج المخطط والتقرير المروري الرسمي وتقديمه للشركة خلال مدة لا تتجاوز 12 ساعة كشرط لسريان التغطية التأمينية.',
  'البند السادس (الوديعة والتأمين النقدي): يحتجز المؤجر مبلغ التأمين النقدي المتفق عليه كضمان لأي مستحقات ناجمة عن مخالفات أو أضرار لم يغطها التأمين أو نقص بالوقود، وتتم تصفية الوديعة وإرجاع الصافي للعميل بموجب سند إخلاء طرف فوري عند الفحص النهائي.',
  'البند السابع (التأجير بين المحافظات وتصاريح المرور): في حال كان العقد بين المحافظات، يلتزم المستأجر بخط السير والمحافظات المحددة في تصريح المرور الرسمي، وعدم الدخول في أي مناطق اشتباك أو طرق غير آمنة أو منافذ غير مصرح بها.',
  'البند الثامن (السند التنفيذي والاختصاص القضائي): يُعتبر هذا العقد الإلكتروني الموثق سنداً تنفيذياً ملزماً لطرفيه بموجب قانون التجارة والمعاملات المدنية، وتختص المحكمة التجارية الابتدائية بأمانة العاصمة صنعاء في الفصل في أي نزاع ينشأ عن تنفيذ هذا العقد.'
];

export const DEFAULT_SPECIAL_TERMS = 'تخضع المركبة لنظام التتبع الملاحي الذكي والصيانة الدورية لضمان أمان الراكب والوفد.';

export interface PrintableContractData {
  bookingId: string;
  contractDate: string;
  pickupCode?: string;
  companyName: string;
  companyLogoUrl?: string;
  slogan?: string;
  address?: string;
  phone?: string;
  whatsapp?: string;
  crNumber?: string;
  taxNumber?: string;
  customerName: string;
  customerPhone: string;
  customerIdType: string;
  customerIdNumber: string;
  organizationName?: string;
  guarantorName?: string;
  guarantorPhone?: string;
  carName: string;
  carPlate: string;
  carModelYear?: number;
  startDate: string;
  endDate: string;
  days: number;
  pickupLocation: string;
  destination: string;
  rentalTypeLabel: string;
  insuranceLabel: string;
  dailyKmLabel: string;
  fuelLevelLabel: string;
  totalYer: number;
  totalUsd?: number;
  paidYer: number;
  depositYer: number;
  walletName: string;
  clauses: string[];
  specialTerms?: string;
  signatureDataUrl?: string;
}

export function generatePrintableContractHtml(data: PrintableContractData): string {
  const clausesHtml = data.clauses
    .map(
      (c, i) =>
        `<div style="margin-bottom: 8px; font-size: 11px; line-height: 1.6; text-align: justify;">
          <strong style="color: #92400e;">${i + 1}.</strong> ${c}
        </div>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>عقد إيجار مركبة رسمي #${data.bookingId} - ${data.companyName}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 10mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    body {
      background-color: #ffffff;
      color: #1e293b;
      padding: 20px;
      direction: rtl;
    }
    .contract-sheet {
      max-width: 820px;
      margin: 0 auto;
      border: 2px solid #0f172a;
      padding: 24px;
      background: #ffffff;
      position: relative;
    }
    .header-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 16px;
      margin-bottom: 16px;
    }
    .header-info h1 {
      font-size: 18px;
      color: #0f172a;
      margin-bottom: 4px;
    }
    .header-info p {
      font-size: 11px;
      color: #475569;
      line-height: 1.4;
    }
    .contract-badge {
      text-align: left;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 8px 12px;
    }
    .contract-badge .no {
      font-size: 13px;
      font-weight: 900;
      color: #b45309;
      font-family: monospace;
    }
    .section-title {
      font-size: 12px;
      font-weight: 800;
      background: #f1f5f9;
      color: #0f172a;
      padding: 4px 8px;
      border-right: 4px solid #b45309;
      margin-top: 12px;
      margin-bottom: 8px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      font-size: 11px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 10px;
    }
    .info-item {
      display: flex;
      gap: 6px;
    }
    .info-item .label {
      color: #64748b;
      font-weight: 600;
      min-width: 105px;
    }
    .info-item .value {
      color: #0f172a;
      font-weight: 700;
    }
    .clauses-container {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 10px 14px;
      margin-top: 6px;
    }
    .signatures-box {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
      margin-top: 20px;
      border-top: 1px solid #cbd5e1;
      padding-top: 14px;
      font-size: 11px;
      text-align: center;
    }
    .sig-block {
      border: 1px dashed #cbd5e1;
      border-radius: 6px;
      padding: 8px;
      min-height: 85px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .footer-credentials {
      margin-top: 18px;
      border-top: 2px solid #0f172a;
      padding-top: 8px;
      font-size: 10px;
      color: #64748b;
      text-align: center;
      line-height: 1.5;
    }
    @media print {
      body { padding: 0; }
      .contract-sheet { border: 1.5px solid #000000; padding: 15px; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="no-print" style="max-width: 820px; margin: 0 auto 12px; display: flex; justify-content: space-between; align-items: center; background: #0f172a; color: white; padding: 10px 16px; border-radius: 8px;">
    <div style="font-size: 12px; font-weight: bold;">
      وثيقة عقد الإيجار الرسمي المعتمد جاهزة للطباعة أو الحفظ كـ PDF
    </div>
    <div style="display: flex; gap: 8px;">
      <button onclick="window.print()" style="background: #f59e0b; color: #000; border: none; padding: 6px 14px; border-radius: 6px; font-weight: 800; cursor: pointer; font-size: 12px;">
        🖨️ طباعة A4 فورية
      </button>
      <button onclick="window.close()" style="background: #334155; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">
        إغلاق
      </button>
    </div>
  </div>

  <div class="contract-sheet">
    <div class="header-box">
      <div class="header-info">
        <h1>${data.companyName}</h1>
        <p>${data.slogan || 'خدمات تأجير السيارات المعتمدة للمنظمات الدولية وقطاع الأعمال والأفراد'}</p>
        <p>المركز الرئيسي: ${data.address || 'صنعاء — شارع حدة / السبعين'} · هاتف: ${data.phone || '+967 771 234 567'}</p>
        <p>سجل تجاري رقم: ${data.crNumber || '10492'} · ترخيص وزارة النقل والهيئة العامة لتنظيم شؤون النقل</p>
      </div>
      <div class="contract-badge">
        <div style="font-size: 10px; color: #64748b;">رقم العقد الرسمي:</div>
        <div class="no">#${data.bookingId}</div>
        <div style="font-size: 10px; color: #64748b; margin-top: 4px;">تاريخ التحرير:</div>
        <div style="font-size: 11px; font-weight: bold;">${data.contractDate}</div>
        ${data.pickupCode ? `<div style="margin-top: 4px; background: #ecfdf5; color: #065f46; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold;">كود الاستلام: ${data.pickupCode}</div>` : ''}
      </div>
    </div>

    <!-- Section 1: Parties Information -->
    <div class="section-title">أولاً: بيانات أطراف العقد والضمانة القانونية</div>
    <div class="info-grid">
      <div class="info-item">
        <span class="label">الطرف الأول (المؤجر):</span>
        <span class="value">${data.companyName}</span>
      </div>
      <div class="info-item">
        <span class="label">هاتف المؤجر / واتساب:</span>
        <span class="value">${data.whatsapp || data.phone || '+967 771 234 567'}</span>
      </div>
      <div class="info-item">
        <span class="label">الطرف الثاني (المستأجر):</span>
        <span class="value">${data.customerName} ${data.organizationName ? `(${data.organizationName})` : ''}</span>
      </div>
      <div class="info-item">
        <span class="label">هاتف المستأجر:</span>
        <span class="value">${data.customerPhone}</span>
      </div>
      <div class="info-item">
        <span class="label">إثبات الهوية:</span>
        <span class="value">${data.customerIdType} — رقم: ${data.customerIdNumber}</span>
      </div>
      <div class="info-item">
        <span class="label">الكفيل التجاري / الضمانة:</span>
        <span class="value">${data.guarantorName || 'ضمانة تجارية معتمدة'} ${data.guarantorPhone ? `(${data.guarantorPhone})` : ''}</span>
      </div>
    </div>

    <!-- Section 2: Vehicle & Operational Terms -->
    <div class="section-title">ثانياً: مواصفات المركبة وشروط التشغيل والتأمين</div>
    <div class="info-grid">
      <div class="info-item">
        <span class="label">المركبة المستأجرة:</span>
        <span class="value">${data.carName}</span>
      </div>
      <div class="info-item">
        <span class="label">رقم اللوحة والمدينة:</span>
        <span class="value">${data.carPlate}</span>
      </div>
      <div class="info-item">
        <span class="label">تاريخ بدء العقد:</span>
        <span class="value">${data.startDate}</span>
      </div>
      <div class="info-item">
        <span class="label">تاريخ ووقت الإرجاع:</span>
        <span class="value">${data.endDate} (${data.days} أيام)</span>
      </div>
      <div class="info-item">
        <span class="label">نطاق الاستخدام:</span>
        <span class="value">${data.rentalTypeLabel} — ${data.destination}</span>
      </div>
      <div class="info-item">
        <span class="label">موقع التسليم:</span>
        <span class="value">${data.pickupLocation}</span>
      </div>
      <div class="info-item">
        <span class="label">التغطية التأمينية:</span>
        <span class="value">${data.insuranceLabel}</span>
      </div>
      <div class="info-item">
        <span class="label">الكيلومترات المسموحة:</span>
        <span class="value">${data.dailyKmLabel}</span>
      </div>
      <div class="info-item">
        <span class="label">مستوى الوقود عند التسليم:</span>
        <span class="value">${data.fuelLevelLabel}</span>
      </div>
      <div class="info-item">
        <span class="label">عداد البداية المسجل:</span>
        <span class="value">مسجل بمحضر الفحص الفني المرفق</span>
      </div>
    </div>

    <!-- Section 3: Financial Settlement -->
    <div class="section-title">ثالثاً: المقابل المالي والوديعة التأمينية</div>
    <div class="info-grid">
      <div class="info-item">
        <span class="label">إجمالي قيمة الإيجار:</span>
        <span class="value" style="color: #b45309; font-size: 12px;">${data.totalYer.toLocaleString()} ر.ي ${data.totalUsd ? `($${data.totalUsd.toLocaleString()})` : ''}</span>
      </div>
      <div class="info-item">
        <span class="label">طريقة السداد المعتمدة:</span>
        <span class="value">محفظة ${data.walletName} الإلكترونية</span>
      </div>
      <div class="info-item">
        <span class="label">المبلغ المسدد مقدماً:</span>
        <span class="value" style="color: #065f46;">${data.paidYer.toLocaleString()} ر.ي (مدفوع بالكامل)</span>
      </div>
      <div class="info-item">
        <span class="label">الوديعة النقدية المحتجزة:</span>
        <span class="value">${data.depositYer.toLocaleString()} ر.ي (مستردة بالكامل عند الفحص السليم)</span>
      </div>
    </div>

    <!-- Section 4: Official Contract Clauses -->
    <div class="section-title">رابعاً: بنود وشروط العقد القانونية المعتمدة</div>
    <div class="clauses-container">
      ${clausesHtml}
      ${data.specialTerms ? `<div style="margin-top: 6px; padding: 6px; background: #fffbeb; border-radius: 4px; font-size: 11px; color: #92400e;"><strong>شروط خاصة إضافية:</strong> ${data.specialTerms}</div>` : ''}
    </div>

    <!-- Signatures & Official Seal -->
    <div class="signatures-box">
      <div class="sig-block">
        <strong>توقيع المستأجر الإلكتروني المعتمد</strong>
        ${data.signatureDataUrl ? `<img src="${data.signatureDataUrl}" style="max-height: 40px; margin: 0 auto; object-fit: contain;" alt="Signature" />` : '<div style="height: 35px;"></div>'}
        <span style="color: #64748b; font-size: 10px;">أوافق على كافة بنود وشروط العقد</span>
      </div>
      <div class="sig-block">
        <strong>مصادقة إدارة الحركة والتشغيل</strong>
        <div style="font-weight: 800; color: #065f46; margin-top: 8px;">✓ تم التحقق والفحص</div>
        <span style="color: #64748b; font-size: 10px;">إخلاء طرف وسند استلام رقمي</span>
      </div>
      <div class="sig-block">
        <strong>الختم الرسمي للمؤسسة</strong>
        <div style="margin: 4px auto; border: 2px double #b45309; border-radius: 50%; width: 55px; height: 55px; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 900; color: #b45309; transform: rotate(-5deg);">
          مكتب معتمد<br>صنعاء
        </div>
        <span style="color: #64748b; font-size: 10px;">سند رسمي ملزم قانوناً</span>
      </div>
    </div>

    <!-- Footer Credentials -->
    <div class="footer-credentials">
      ${data.companyName} · المركز الرئيسي: ${data.address || 'صنعاء — شارع حدة'} · هاتف: ${data.phone || '+967 771 234 567'} · واتساب: ${data.whatsapp || '+967 771 234 567'}<br>
      عقد إلكتروني معتمد لدى الغرفة التجارية الصناعية بأمانة العاصمة والجهات الرسمية ذات العلاقة · حرر على أصل إلكتروني موثق برقم #${data.bookingId}
    </div>
  </div>
</body>
</html>`;
}
