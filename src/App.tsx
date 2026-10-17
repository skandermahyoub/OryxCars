import React, { useState, useEffect } from 'react';
import {
  Language,
  Currency,
  UserRole,
  Car,
  Booking,
  Driver,
  FinancialTransaction,
  RfqRequest,
  ClientProfile,
  VehicleInspectionRecord,
  MaintenanceRecord,
  AdminModuleId,
  AdminAccessRole
} from './types';
import { HomepageCmsConfig } from './types/cms';
import { DEFAULT_CMS_CONFIG } from './data/defaultCmsData';
import {
  INITIAL_CARS,
  INITIAL_DRIVERS,
  INITIAL_BOOKINGS,
  INITIAL_TRANSACTIONS,
  INITIAL_RFQS,
  INITIAL_CLIENTS,
  INITIAL_INSPECTIONS,
  INITIAL_MAINTENANCE
} from './data/mockData';
import { Header, AppViewMode } from './components/Header';
import { CustomerPortal } from './components/customer/CustomerPortal';
import { BookingModal } from './components/customer/BookingModal';
import { VehicleLandingPage } from './components/customer/VehicleLandingPage';
import { DriverPortal } from './components/driver/DriverPortal';
import { AdminPortal } from './components/admin/AdminPortal';
import { DynamicBrandStyleEngine } from './components/admin/AgencyBrandStudio';
import { ModularLandingPage } from './components/landing/ModularLandingPage';
import { HomepageCmsManager } from './components/cms/HomepageCmsManager';
import { ConciergeDrawer } from './components/common/ConciergeDrawer';
import { IconOnlyBottomDock } from './components/common/LuxuryNavigationUI';

const CMS_STORAGE_KEY = 'sanaa_united_car_rental_cms_v6';
const THEME_STORAGE_KEY = 'sanaa_luxury_theme_v1';

export function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [viewMode, setViewMode] = useState<AppViewMode>('landing');
  const [activeAdminModule, setActiveAdminModule] =
    useState<AdminModuleId>('overview');
  const [adminAccessRole, setAdminAccessRole] =
    useState<AdminAccessRole>('general_manager');
  const [exchangeRate, setExchangeRate] = useState<number>(535);
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') {
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('light-mode', saved === 'light');
        }
        return saved;
      }
    } catch {
      // ignore
    }
    return 'dark';
  });

  const [cars, setCars] = useState<Car[]>(INITIAL_CARS);
  const [drivers, setDrivers] = useState<Driver[]>(INITIAL_DRIVERS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [clients, setClients] = useState<ClientProfile[]>(INITIAL_CLIENTS);
  const [inspections, setInspections] =
    useState<VehicleInspectionRecord[]>(INITIAL_INSPECTIONS);
  const [maintenanceRecords, setMaintenanceRecords] =
    useState<MaintenanceRecord[]>(INITIAL_MAINTENANCE);
  const [transactions, setTransactions] =
    useState<FinancialTransaction[]>(INITIAL_TRANSACTIONS);
  const [rfqRequests, setRfqRequests] = useState<RfqRequest[]>(INITIAL_RFQS);

  const [selectedCarForBooking, setSelectedCarForBooking] = useState<Car | null>(null);
  const [selectedCarForLanding, setSelectedCarForLanding] = useState<Car | null>(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);

  // Dynamic Homepage CMS State
  const [cmsConfig, setCmsConfig] = useState<HomepageCmsConfig>(() => {
    try {
      const saved = localStorage.getItem(CMS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load CMS config from storage', e);
    }
    return DEFAULT_CMS_CONFIG;
  });

  useEffect(() => {
    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(cmsConfig));
    } catch (e) {
      console.error('Failed to save CMS config', e);
    }
  }, [cmsConfig]);

  // Critical: Sync html.light-mode class on document.documentElement for index.css High-Contrast Light Mode engine
  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'light') {
      root.classList.add('light-mode');
    } else {
      root.classList.remove('light-mode');
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    } catch {
      // ignore
    }
  }, [themeMode]);

  const handleToggleTheme = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleToggleAdminAccessRole = () => {
    setAdminAccessRole((prev) => {
      const next = prev === 'general_manager' ? 'reception_staff' : 'general_manager';
      if (
        next === 'reception_staff' &&
        (activeAdminModule === 'roi_analytics' ||
          activeAdminModule === 'investors' ||
          activeAdminModule === 'agency_identity')
      ) {
        setActiveAdminModule('overview');
      }
      return next;
    });
  };


  const handleSwitchRole = (newRole: UserRole) => {
    if (newRole === 'customer') setViewMode('customer');
    else if (newRole === 'driver') setViewMode('driver');
    else if (newRole === 'admin') setViewMode('admin');
  };

  const handleCreateBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);

    // 1. Automatically record payment inflow in the Accounting Ledger
    const newTx: FinancialTransaction = {
      id: `VCH-${Math.floor(5000 + Math.random() * 4999)}`,
      date: new Date().toISOString().split('T')[0],
      type: 'receipt',
      bookingId: newBooking.id,
      partyName: newBooking.organizationName
        ? `${newBooking.customerName} (${newBooking.organizationName})`
        : newBooking.customerName,
      description: `سند قبض عقد إيجار مركبة (${newBooking.carName}) — #${newBooking.id}`,
      amountYer: newBooking.paidAmountYer || newBooking.totalAmountYer,
      amountUsd: Math.round(
        (newBooking.paidAmountYer || newBooking.totalAmountYer) / exchangeRate
      ),
      wallet: newBooking.walletUsed,
      referenceNo: newBooking.transactionRef,
      status: 'completed'
    };
    setTransactions((prev) => [newTx, ...prev]);

    // 2. Automatically sync or create Client CRM Dossier
    setClients((prev) => {
      const existingIdx = prev.findIndex(
        (c) =>
          c.phone === newBooking.customerPhone ||
          c.name.trim() === newBooking.customerName.trim()
      );
      if (existingIdx > -1) {
        return prev.map((c, idx) =>
          idx === existingIdx
            ? {
                ...c,
                totalBookingsCount: c.totalBookingsCount + 1,
                activeBookingsCount: c.activeBookingsCount + 1,
                totalSpentYer: c.totalSpentYer + newBooking.totalAmountYer,
                totalSpentUsd: c.totalSpentUsd + newBooking.totalAmountUsd
              }
            : c
        );
      }

      const newClientProfile: ClientProfile = {
        id: `CRM-${Math.floor(1020 + Math.random() * 880)}`,
        clientType: newBooking.clientCategory || 'individual',
        name: newBooking.customerName,
        organizationName: newBooking.organizationName,
        phone: newBooking.customerPhone,
        email: 'verified.client@sanaa-rental.ye',
        address: newBooking.pickupLocation,
        nationalIdOrPassport: newBooking.customerIdNumber,
        licenseNumber: newBooking.customerLicenseNumber,
        guarantorName: newBooking.guaranteeDetails,
        guarantorType: newBooking.guaranteeType,
        guarantorDocumentRef: `REF-${newBooking.id}`,
        guarantorPhone: newBooking.customerPhone,
        verificationStatus:
          newBooking.guaranteeStatus === 'approved' ? 'verified' : 'pending',
        riskScore: 'low',
        creditLimitUsd: newBooking.clientCategory === 'un_ngo' ? 50000 : 10000,
        totalBookingsCount: 1,
        activeBookingsCount: 1,
        totalSpentYer: newBooking.totalAmountYer,
        totalSpentUsd: newBooking.totalAmountUsd,
        heldDepositYer: 150000,
        idDocumentUrl: newBooking.idDocumentUrl,
        licenseDocumentUrl: newBooking.licenseDocumentUrl,
        guaranteeDocumentUrl: newBooking.guaranteeDocumentUrl,
        notes: `تم إنشاء ملف العميل آلياً عند إصدار العقد #${newBooking.id} (${newBooking.carName}).`,
        createdAt: new Date().toISOString().split('T')[0]
      };
      return [newClientProfile, ...prev];
    });
  };

  const handleSaveClient = (client: ClientProfile) => {
    setClients((prev) => {
      const exists = prev.some((c) => c.id === client.id);
      if (exists) {
        return prev.map((c) => (c.id === client.id ? client : c));
      }
      return [client, ...prev];
    });
  };

  const handleDeleteClient = (clientId: string) => {
    setClients((prev) => prev.filter((c) => c.id !== clientId));
  };

  const handleUpdateClientStatus = (
    clientId: string,
    verificationStatus: ClientProfile['verificationStatus']
  ) => {
    setClients((prev) =>
      prev.map((c) =>
        c.id === clientId
          ? {
              ...c,
              verificationStatus,
              riskScore: verificationStatus === 'blacklisted' ? 'high' : 'low'
            }
          : c
      )
    );
  };

  const handleAddInspection = (record: VehicleInspectionRecord) => {
    setInspections((prev) => [record, ...prev]);

    if (record.inspectionType === 'check_in') {
      // Mark booking completed
      setBookings((prev) =>
        prev.map((b) =>
          b.id === record.bookingId
            ? { ...b, bookingStatus: 'completed', tripProgressPct: 100 }
            : b
        )
      );
      // Mark car available
      setCars((prev) =>
        prev.map((c) => (c.id === record.carId ? { ...c, available: true } : c))
      );
      // Record deposit refund voucher if netDepositRefundYer > 0
      if (record.netDepositRefundYer > 0) {
        const refundTx: FinancialTransaction = {
          id: `VCH-${Math.floor(5000 + Math.random() * 4999)}`,
          date: new Date().toISOString().split('T')[0],
          type: 'refund',
          bookingId: record.bookingId,
          partyName: record.customerName,
          amountYer: record.netDepositRefundYer,
          amountUsd: Math.round(record.netDepositRefundYer / exchangeRate),
          wallet: 'kuraimi',
          referenceNo: record.clearanceCertificateNo || `CLR-${record.id}`,
          description: `سند صرف ورد صافي مبلغ التأمين بعد فحص المركبة (${record.carName}) — شهادة إخلاء طرف ${record.clearanceCertificateNo || record.id}`,
          status: 'completed'
        };
        setTransactions((prev) => [refundTx, ...prev]);
      }
    }
  };

  const handleSaveInspection = (record: VehicleInspectionRecord) => {
    const exists = inspections.some((i) => i.id === record.id);
    if (exists) {
      setInspections((prev) =>
        prev.map((i) => (i.id === record.id ? record : i))
      );
    } else {
      handleAddInspection(record);
    }
  };

  const handleDeleteInspection = (id: string) => {
    setInspections((prev) => prev.filter((i) => i.id !== id));
  };

  const handleSaveMaintenance = (record: MaintenanceRecord) => {
    setMaintenanceRecords((prev) => {
      const exists = prev.some((m) => m.id === record.id);
      if (exists) {
        return prev.map((m) => (m.id === record.id ? record : m));
      }
      return [record, ...prev];
    });
    if (record.status === 'in_service') {
      setCars((prev) =>
        prev.map((c) => (c.id === record.carId ? { ...c, available: false } : c))
      );
    } else if (record.status === 'completed') {
      setCars((prev) =>
        prev.map((c) => (c.id === record.carId ? { ...c, available: true } : c))
      );
    }
  };

  const handleDeleteMaintenance = (id: string) => {
    setMaintenanceRecords((prev) => prev.filter((m) => m.id !== id));
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, bookingStatus: 'cancelled' } : b))
    );
  };

  const handleSaveBooking = (booking: Booking) => {
    const exists = bookings.some((b) => b.id === booking.id);
    if (exists) {
      setBookings((prev) =>
        prev.map((b) => (b.id === booking.id ? booking : b))
      );
    } else {
      handleCreateBooking(booking);
    }
  };

  const handleDeleteBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  const handleUpdateBookingStatus = (
    bookingId: string,
    bookingStatus: Booking['bookingStatus']
  ) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, bookingStatus } : b))
    );
  };

  const handleVerifyGuarantee = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, guaranteeStatus: 'approved', bookingStatus: 'confirmed' }
          : b
      )
    );
  };

  const handleAssignDriver = (bookingId: string, driverId: string) => {
    const drv = drivers.find((d) => d.id === driverId);
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              driverId: driverId || undefined,
              driverName: drv?.name,
              driverPhone: drv?.phone
            }
          : b
      )
    );
  };

  const handleUpdateBookingObject = (updatedBooking: Booking) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === updatedBooking.id ? updatedBooking : b))
    );
  };

  const handleAcceptCounterOffer = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        const agreedYer = b.counterOfferTotalYer || b.proposedTotalYer || b.totalAmountYer;
        return {
          ...b,
          totalAmountYer: agreedYer,
          totalAmountUsd: Math.round(agreedYer / exchangeRate),
          negotiationStatus: 'approved',
          bookingStatus: 'confirmed'
        };
      })
    );
  };

  const handleExtendBooking = (bookingId: string, additionalDays: number, additionalAmountYer: number) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        const currentEnd = new Date(b.endDate);
        const newEnd = new Date(currentEnd.getTime() + additionalDays * 86400000).toISOString().split('T')[0];
        const newDays = b.days + additionalDays;
        const newTotalYer = b.totalAmountYer + additionalAmountYer;
        const newTotalUsd = Math.round(newTotalYer / exchangeRate);
        return {
          ...b,
          days: newDays,
          endDate: newEnd,
          totalAmountYer: newTotalYer,
          totalAmountUsd: newTotalUsd,
          extensionsCount: (b.extensionsCount || 0) + 1,
          lastExtendedAt: new Date().toISOString()
        };
      })
    );
  };

  const handleReleaseDeposit = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              depositStatus: 'released',
              depositRefundRef: `REF-${Math.floor(100000 + Math.random() * 900000)}`
            }
          : b
      )
    );
  };

  const handleToggleCarAvailability = (carId: string) => {
    setCars((prev) =>
      prev.map((c) => (c.id === carId ? { ...c, available: !c.available } : c))
    );
  };

  const handleSaveCar = (savedCar: Car) => {
    setCars((prev) => {
      const exists = prev.some((c) => c.id === savedCar.id);
      if (exists) {
        return prev.map((c) => (c.id === savedCar.id ? savedCar : c));
      }
      return [savedCar, ...prev];
    });
  };

  const handleDeleteCar = (carId: string) => {
    setCars((prev) => prev.filter((c) => c.id !== carId));
  };

  const handleSaveDriver = (drv: Driver) => {
    setDrivers((prev) => {
      const exists = prev.some((d) => d.id === drv.id);
      if (exists) {
        return prev.map((d) => (d.id === drv.id ? drv : d));
      }
      return [drv, ...prev];
    });
  };

  const handleDeleteDriver = (driverId: string) => {
    setDrivers((prev) => prev.filter((d) => d.id !== driverId));
  };

  const handleAddTransaction = (txData: Omit<FinancialTransaction, 'id' | 'date'>) => {
    const newTx: FinancialTransaction = {
      ...txData,
      id: `VCH-${Math.floor(5000 + Math.random() * 4999)}`,
      date: new Date().toISOString().split('T')[0]
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleSaveTransaction = (tx: FinancialTransaction) => {
    setTransactions((prev) => {
      const exists = prev.some((t) => t.id === tx.id);
      if (exists) {
        return prev.map((t) => (t.id === tx.id ? tx : t));
      }
      return [tx, ...prev];
    });
  };

  const handleDeleteTransaction = (txId: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== txId));
  };

  const handleSubmitRfq = (rfqData: Omit<RfqRequest, 'id' | 'createdAt' | 'status'>) => {
    const newRfq: RfqRequest = {
      ...rfqData,
      id: `RFQ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 899)}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'new'
    };
    setRfqRequests((prev) => [newRfq, ...prev]);
  };

  const handleSaveRfq = (rfq: RfqRequest) => {
    setRfqRequests((prev) => {
      const exists = prev.some((r) => r.id === rfq.id);
      if (exists) {
        return prev.map((r) => (r.id === rfq.id ? rfq : r));
      }
      return [rfq, ...prev];
    });
  };

  const handleDeleteRfq = (id: string) => {
    setRfqRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handleUpdateRfqStatus = (id: string, status: RfqRequest['status']) => {
    setRfqRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const activeDriverBooking =
    bookings.find(
      (b) =>
        b.bookingStatus === 'in_progress' ||
        b.bookingStatus === 'driver_en_route' ||
        b.bookingStatus === 'confirmed'
    ) || bookings[0];

  const isCrimson = cmsConfig.themePalette === 'carbon-crimson';
  const accentBg = isCrimson
    ? 'bg-red-600 hover:bg-red-500 text-white'
    : 'bg-amber-500 hover:bg-amber-400 text-slate-950';
  const accentText = isCrimson ? 'text-red-500' : 'text-amber-400';

  return (
    <div
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className={`app-root-shell min-h-screen transition-colors duration-300 ${
        themeMode === 'light'
          ? 'light-mode bg-slate-100 text-slate-950'
          : 'bg-slate-950 text-slate-100'
      } selection:bg-amber-500 selection:text-slate-950`}
    >
      {/* Global Dynamic Brand Color & Corner Style Engine */}
      <DynamicBrandStyleEngine cms={cmsConfig} />

      {viewMode !== 'landing' && (
        <Header
          currentView={viewMode}
          onChangeView={setViewMode}
          activeAdminModule={activeAdminModule}
          onSelectAdminModule={setActiveAdminModule}
          adminAccessRole={adminAccessRole}
          onToggleAdminAccessRole={handleToggleAdminAccessRole}
          lang={lang}
          onToggleLang={() => setLang((prev) => (prev === 'ar' ? 'en' : 'ar'))}
          currency={currency}
          onToggleCurrency={() => setCurrency((prev) => (prev === 'USD' ? 'YER' : 'USD'))}
          themeMode={themeMode}
          onToggleTheme={handleToggleTheme}
          onOpenConcierge={() => setIsAssistantOpen(true)}
          onOpenBooking={() => setSelectedCarForBooking(cars[0])}
          activeTripsCount={bookings.filter((b) => b.bookingStatus !== 'completed').length}
          pendingOrdersCount={bookings.length}
          clientsCount={clients.length}
          carsCount={cars.length}
          driversCount={drivers.length}
          rfqsCount={rfqRequests.length}
          inspectionsCount={inspections.length}
          maintenanceCount={maintenanceRecords.length}
          transactionsCount={transactions.length}
          investorsCount={3}
          finesCount={3}
          pricingCount={4}
          alertsCount={
            bookings.filter((b) => b.bookingStatus === 'pending_approval').length +
            maintenanceRecords.filter((m) => m.status !== 'completed').length +
            cars.filter((c) => !c.available).length
          }
          companyName={cmsConfig.header.companyName}
          slogan={cmsConfig.header.slogan}
          logoUrl={cmsConfig.header.logoUrl}
          logoText={cmsConfig.header.logoText}
        />
      )}

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {viewMode === 'landing' && (
          <ModularLandingPage
            cms={cmsConfig}
            onUpdateCms={setCmsConfig}
            cars={cars}
            currency={currency}
            onToggleCurrency={() => setCurrency((prev) => (prev === 'USD' ? 'YER' : 'USD'))}
            lang={lang}
            onToggleLang={() => setLang((prev) => (prev === 'ar' ? 'en' : 'ar'))}
            themeMode={themeMode}
            onToggleTheme={handleToggleTheme}
            onOpenBookingModal={(car) => setSelectedCarForBooking(car || cars[0])}
            onSelectCarForLanding={(car) => setSelectedCarForLanding(car)}
            onOpenConcierge={() => setIsAssistantOpen(true)}
            onOpenCmsEditor={() => setViewMode('cms_builder')}
            onSwitchRole={handleSwitchRole}
            onChangeView={setViewMode}
          />
        )}

        {viewMode === 'cms_builder' && (
          <HomepageCmsManager
            cms={cmsConfig}
            onUpdateCms={setCmsConfig}
            onResetDefaultCms={() => setCmsConfig(DEFAULT_CMS_CONFIG)}
            onPreviewLive={() => setViewMode('landing')}
          />
        )}

        {viewMode === 'customer' && (
          <CustomerPortal
            cars={cars}
            bookings={bookings}
            drivers={drivers}
            currency={currency}
            language={lang}
            exchangeRate={exchangeRate}
            companyName={cmsConfig.header.companyName}
            companyLogoUrl={cmsConfig.header.logoUrl}
            slogan={cmsConfig.header.slogan}
            address={cmsConfig.footer.mainGeoAddress || 'صنعاء — شارع حدة الرئيسي'}
            phone={cmsConfig.header.directPhone || cmsConfig.footer.phone}
            crNumber={cmsConfig.brandIdentity?.crNumber || 'س.ت 10492'}
            whatsappNumber={
              cmsConfig.brandIdentity?.whatsappNumber ||
              cmsConfig.header.whatsappNumber ||
              cmsConfig.footer.phone
            }
            onSelectCarForBooking={(car) => setSelectedCarForBooking(car)}
            onSelectCarForLanding={(car) => setSelectedCarForLanding(car)}
            onCancelBooking={handleCancelBooking}
            onSubmitRfq={handleSubmitRfq}
            onAcceptCounterOffer={handleAcceptCounterOffer}
            onExtendBooking={handleExtendBooking}
            onReleaseDeposit={handleReleaseDeposit}
            onUpdateBookingClauses={(bId, updatedClauses, updatedSpecial) => {
              const target = bookings.find((b) => b.id === bId);
              if (target) {
                handleSaveBooking({
                  ...target,
                  contractClauses: updatedClauses,
                  contractSpecialTerms: updatedSpecial
                });
              }
            }}
          />
        )}

        {viewMode === 'driver' && (
          <DriverPortal
            driver={drivers[0]}
            activeBooking={activeDriverBooking}
            onUpdateBooking={handleUpdateBookingObject}
            currency={currency}
            lang={lang}
          />
        )}

        {viewMode === 'admin' && (
          <AdminPortal
            activeModule={activeAdminModule}
            onChangeModule={setActiveAdminModule}
            cars={cars}
            bookings={bookings}
            drivers={drivers}
            clients={clients}
            onSaveClient={handleSaveClient}
            onDeleteClient={handleDeleteClient}
            onUpdateClientStatus={handleUpdateClientStatus}
            inspections={inspections}
            onAddInspection={handleAddInspection}
            onSaveInspection={handleSaveInspection}
            onDeleteInspection={handleDeleteInspection}
            maintenanceRecords={maintenanceRecords}
            onSaveMaintenance={handleSaveMaintenance}
            onDeleteMaintenance={handleDeleteMaintenance}
            currency={currency}
            language={lang}
            exchangeRate={exchangeRate}
            onExchangeRateChange={setExchangeRate}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            onVerifyGuarantee={handleVerifyGuarantee}
            onAssignDriver={handleAssignDriver}
            onCreateDirectBooking={handleCreateBooking}
            onSaveBooking={handleSaveBooking}
            onDeleteBooking={handleDeleteBooking}
            onToggleCarAvailability={handleToggleCarAvailability}
            onSaveCar={handleSaveCar}
            onDeleteCar={handleDeleteCar}
            onPreviewCarLanding={(car) => setSelectedCarForLanding(car)}
            onSaveDriver={handleSaveDriver}
            onDeleteDriver={handleDeleteDriver}
            transactions={transactions}
            onAddTransaction={handleAddTransaction}
            onSaveTransaction={handleSaveTransaction}
            onDeleteTransaction={handleDeleteTransaction}
            rfqRequests={rfqRequests}
            onUpdateRfqStatus={handleUpdateRfqStatus}
            onSaveRfq={handleSaveRfq}
            onDeleteRfq={handleDeleteRfq}
            cmsConfig={cmsConfig}
            onUpdateCmsConfig={setCmsConfig}
            onResetCmsConfig={() => setCmsConfig(DEFAULT_CMS_CONFIG)}
            themeMode={themeMode}
            onToggleThemeMode={setThemeMode}
            onPreviewLiveLanding={() => setViewMode('landing')}
            adminAccessRole={adminAccessRole}
          />
        )}
      </main>

      {/* Dedicated Vehicle Landing Page Modal / View */}
      {selectedCarForLanding && (
        <VehicleLandingPage
          car={selectedCarForLanding}
          currency={currency}
          lang={lang}
          onClose={() => setSelectedCarForLanding(null)}
          onBookNow={(car) => {
            setSelectedCarForLanding(null);
            setSelectedCarForBooking(car);
          }}
        />
      )}

      {/* 4-Step Contractual Booking, Remote Negotiation, KYC Upload, Digital Signature & Yemeni E-Wallet Modal */}
      {selectedCarForBooking && (
        <BookingModal
          cars={cars}
          selectedCar={selectedCarForBooking}
          isOpen={!!selectedCarForBooking}
          currency={currency}
          lang={lang}
          companyName={cmsConfig.header.companyName}
          whatsappNumber={
            cmsConfig.brandIdentity?.whatsappNumber ||
            cmsConfig.header.whatsappNumber ||
            cmsConfig.footer.phone
          }
          onClose={() => setSelectedCarForBooking(null)}
          onSubmitBooking={handleCreateBooking}
        />
      )}

      {/* Smart Concierge Drawer */}
      <ConciergeDrawer
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        lang={lang}
        onQuickBook={() => {
          setIsAssistantOpen(false);
          setSelectedCarForBooking(cars[0]);
        }}
      />

      {/* Icon-Only Bottom Dock on Inner Views */}
      {viewMode !== 'landing' && (
        <IconOnlyBottomDock
          themeMode={themeMode}
          accentBg={accentBg}
          accentText={accentText}
          onOpenBookingModal={() => setSelectedCarForBooking(cars[0])}
          onSwitchRole={handleSwitchRole}
          onOpenConcierge={() => setIsAssistantOpen(true)}
        />
      )}
    </div>
  );
}

export default App;
