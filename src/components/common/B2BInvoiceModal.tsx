import React from 'react';
import { B2BMonthlyInvoice, Currency, Language } from '../../types';
import { X, Printer, Building2, Shield, FileCheck, CheckCircle2 } from 'lucide-react';

interface B2BInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: B2BMonthlyInvoice;
  companyName?: string;
  whatsappNumber?: string;
}

export const B2BInvoiceModal: React.FC<B2BInvoiceModalProps> = ({
  isOpen,
  onClose,
  invoice,
  companyName = 'الشركة المتحدة لتأجير السيارات — صنعاء',
  whatsappNumber = '967771234567'
}) => {
  if (!isOpen || !invoice) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-3xl bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-slate-300">
        {/* Top Control Bar */}
        <div className="print:hidden flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm sm:text-base font-black">
                فاتورة ضريبية رسمية مجمعة (B2B Tax Invoice)
              </h3>
              <p className="text-[11px] text-slate-400">
                رقم الفاتورة: <span className="font-mono text-amber-400 font-bold">#{invoice.id}</span> · أمر الشراء: <span className="font-mono text-slate-300 font-bold">{invoice.lpoNumber}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة الفاتورة (A4)</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto text-xs leading-relaxed text-slate-800">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-slate-900 pb-4 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-600 font-black text-lg">
                <Shield className="w-6 h-6 text-amber-600" />
                <span>{companyName}</span>
              </div>
              <p className="text-[11px] text-slate-500">
                إدارة كبار العملاء والمنظمات الدولية (UN & Corporate Relations) · هاتف: {whatsappNumber}
              </p>
              <p className="text-[10px] text-slate-400">
                الرقم الضريبي الموحد: 400192831 · صنعاء — شارع حدة
              </p>
            </div>

            <div className="text-left bg-slate-100 p-3 rounded-2xl border border-slate-300 shrink-0">
              <div className="font-mono text-xs font-bold text-slate-900">
                TAX INVOICE: <span className="text-amber-600 font-black">#{invoice.id}</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                تاريخ الإصدار: {invoice.dueDate}
              </div>
              <div className="text-[10px] font-mono font-bold text-slate-700 mt-0.5">
                LPO: {invoice.lpoNumber}
              </div>
            </div>
          </div>

          {/* Client Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[10px] text-slate-500 block font-bold">الجهة المستفيدة (Bill To):</span>
              <div className="font-bold text-slate-950 text-sm">{invoice.organizationName}</div>
              <div className="text-slate-600">المسؤول المخول: {invoice.contactPerson}</div>
              <div className="text-slate-600">شهر الاستحقاق: {invoice.billingMonth}</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[10px] text-slate-500 block font-bold">شروط الدفع والتسوية:</span>
              <div>طريقة السداد: تحويل مصرفي مباشر (IBAN / حساب الشركات)</div>
              <div>تاريخ استحقاق السداد: <strong className="font-mono">{invoice.dueDate}</strong></div>
              <div>
                الحالة: <span className="font-bold text-emerald-700">معتمدة وجاهزة للصرف</span>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">بيان المركبات والخدمات</th>
                  <th className="p-3">العدد</th>
                  <th className="p-3">إجمالي الأيام</th>
                  <th className="p-3">السعر اليومي (USD)</th>
                  <th className="p-3">الإجمالي (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-bold">
                    أسطول سيارات دفع رباعي وميدانية مخصصة للمنظمة ({invoice.billingMonth})
                    <div className="text-[10px] text-slate-500 font-normal">
                      شامل التأمين الشامل والصيانة الدورية وسيارات بديلة فورية
                    </div>
                  </td>
                  <td className="p-3 font-mono">{invoice.vehiclesCount} مركبات</td>
                  <td className="p-3 font-mono">{invoice.totalDaysBilled} يوم</td>
                  <td className="p-3 font-mono">
                    ${Math.round(invoice.subtotalUsd / invoice.totalDaysBilled)}
                  </td>
                  <td className="p-3 font-mono font-bold">${invoice.subtotalUsd.toLocaleString()}</td>
                </tr>
                {invoice.taxOrCustomsUsd > 0 && (
                  <tr>
                    <td className="p-3 text-slate-600" colSpan={4}>
                      ضريبة القيمة المضافة / الرسوم الرسمية (VAT 5%)
                    </td>
                    <td className="p-3 font-mono font-bold">${invoice.taxOrCustomsUsd.toLocaleString()}</td>
                  </tr>
                )}
              </tbody>
              <tfoot className="bg-slate-50 font-bold border-t-2 border-slate-300">
                <tr>
                  <td className="p-3 text-base text-slate-900" colSpan={4}>
                    صافي المبلغ الإجمالي المستحق:
                  </td>
                  <td className="p-3 font-mono text-base text-amber-600 font-black">
                    ${invoice.totalAmountUsd.toLocaleString()}
                    <span className="text-xs block text-slate-500 font-normal">
                      ({invoice.totalAmountYer.toLocaleString()} ر.ي)
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Footer & Signature */}
          <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-4 items-center text-slate-600">
            <div>
              <div className="font-bold text-slate-900">بيانات الحساب المصرفي للتحويل:</div>
              <div>بنك الكريمي الإسلامي - حساب الشركات: 3024881903</div>
              <div>بنك اليمن والكويت (YKB): 777002911</div>
            </div>
            <div className="text-left space-y-1">
              <div className="font-bold text-slate-900">المصادقة والختم المالي:</div>
              <div className="text-xs text-amber-700 font-black">✓ إدارة الحسابات والتدقيق المالي</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
