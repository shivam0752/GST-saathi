
export const dummyBusiness = {
  name: 'SHARMA GENERAL STORE',
  gstin: '27AABCS1234A1ZK',
  address: 'Sector 12, Meerut, Uttar Pradesh',
  type: 'Regular Taxpayer',
  filing: 'Monthly',
  status: 'Active',
  ownerInitial: 'S',
}

export const dummyInvoice = {
  number: 'INV-2024-0142',
  date: '20 Apr 2024',
  customer: 'Shyam Kumar',
  item: 'Cheeni (Sugar)',
  hsn: '1701',
  qty: '20 kg',
  rate: '₹42.5',
  gstPercent: '5%',
  subtotal: '₹857',
  gst: '₹43',
  total: '₹900',
}

export const dummyBill = {
  supplier: 'Gupta Distributors Pvt Ltd',
  gstin: '09AAACG1234L1ZB',
  invoiceNo: 'GD/2024/4421',
  date: '8 May 2024',
  total: '₹7,800',
  gstPaid: '₹200',
  itcAmount: '₹200',
}

export const dummyFiling = {
  month: 'April 2024',
  totalSales: '₹1,24,000',
  gstDue: '₹8,400',
  itcCredit: '₹3,240',
  finalPayable: '₹5,160',
  readiness: 94,
  deadlineDays: 11,
  deadlineDate: '20 May 2024',
  complianceScore: 98,
  gstr1Ref: 'AA2024042187234',
  gstr3bRef: 'AA2024042187891',
  paidTime: '20 Apr 2024, 11:42 AM',
  bankAccount: 'SBI ••••4521',
}

export const dummyTransactions = [
  {
    id: 1,
    type: 'sale',
    name: 'Shyam Kumar',
    detail: 'Cheeni 20kg',
    invoice: 'INV-2024-0142',
    amount: '₹900',
    time: 'Aaj, 11:42 AM',
  },
  {
    id: 2,
    type: 'purchase',
    name: 'Gupta Distributors',
    detail: 'Purchase bill',
    invoice: 'GD/2024/4421',
    amount: '₹7,800',
    time: 'Kal, 3:15 PM',
  },
]

export const dummyAlerts = [
  {
    id: 1,
    type: 'itc_risk',
    supplier: 'Gupta Distributors',
    gstin: '09AAACG...',
    amount: '₹1,200',
    invoiceDate: '8 May',
    deadline: '20 May',
    daysLeft: 8,
    progressPercent: 60,
  },
  {
    id: 2,
    type: 'filing_deadline',
    daysLeft: 11,
    deadline: '20 May',
    readiness: 94,
  },
]
