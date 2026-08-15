export const currentUser = {
  name: "Aarav Mehta",
  email: "aarav@datapilot.ai",
  role: "Lead Data Scientist",
  initials: "AM",
};

export type Project = {
  id: string;
  name: string;
  dataset: string;
  rows: string;
  status: "Training" | "Completed" | "Cleaning" | "Draft";
  accuracy: string;
  updated: string;
  owner: string;
};

export const projects: Project[] = [
  {
    id: "PRJ-4821",
    name: "Churn Prediction Q3",
    dataset: "telecom_customers.csv",
    rows: "184,220",
    status: "Completed",
    accuracy: "94.2%",
    updated: "12 min ago",
    owner: "Aarav Mehta",
  },
  {
    id: "PRJ-4817",
    name: "Credit Risk Scoring",
    dataset: "loan_applications.parquet",
    rows: "62,940",
    status: "Training",
    accuracy: "—",
    updated: "48 min ago",
    owner: "Lena Fischer",
  },
  {
    id: "PRJ-4805",
    name: "Retail Demand Forecast",
    dataset: "store_sales_2024.csv",
    rows: "1,204,880",
    status: "Cleaning",
    accuracy: "—",
    updated: "3 hours ago",
    owner: "Diego Ramos",
  },
  {
    id: "PRJ-4791",
    name: "Marketing Attribution",
    dataset: "campaign_touchpoints.xlsx",
    rows: "318,402",
    status: "Completed",
    accuracy: "89.7%",
    updated: "Yesterday",
    owner: "Priya Nair",
  },
  {
    id: "PRJ-4780",
    name: "Fraud Signal Detection",
    dataset: "transactions_stream.json",
    rows: "2,940,116",
    status: "Draft",
    accuracy: "—",
    updated: "2 days ago",
    owner: "Aarav Mehta",
  },
];

export const stats = [
  { label: "Active projects", value: "12", delta: "+3 this month", trend: "up" as const },
  { label: "Datasets processed", value: "168", delta: "+24 this month", trend: "up" as const },
  { label: "Models trained", value: "341", delta: "+58 this month", trend: "up" as const },
  { label: "Avg. model accuracy", value: "92.4%", delta: "+1.8 pts", trend: "up" as const },
];

export const activity = [
  {
    title: "Churn Prediction Q3 finished training",
    detail: "XGBoost reached 94.2% accuracy across 5-fold validation.",
    time: "12 min ago",
    kind: "success" as const,
  },
  {
    title: "Cleaning plan approved",
    detail: "9 of 11 recommendations applied to telecom_customers.csv.",
    time: "51 min ago",
    kind: "info" as const,
  },
  {
    title: "Schema drift detected",
    detail: "store_sales_2024.csv gained 2 new columns since last ingest.",
    time: "3 hours ago",
    kind: "warning" as const,
  },
  {
    title: "Report exported",
    detail: "Priya Nair exported Marketing Attribution executive summary (PDF).",
    time: "Yesterday",
    kind: "info" as const,
  },
];

export const aiInsights = [
  {
    title: "Contract type drives 41% of churn risk",
    body: "Month-to-month customers churn 3.4x more than annual contracts. Shifting 10% to annual could retain ~2,180 accounts.",
    confidence: 94,
  },
  {
    title: "Support call volume is a leading indicator",
    body: "Three or more support calls in 30 days precedes churn in 68% of cases, typically 22 days ahead.",
    confidence: 87,
  },
];

export const uploads = [
  { name: "telecom_customers.csv", size: "48.2 MB", rows: "184,220", when: "Today, 09:41", status: "Ready" },
  { name: "loan_applications.parquet", size: "12.8 MB", rows: "62,940", when: "Today, 08:02", status: "Ready" },
  { name: "store_sales_2024.csv", size: "312 MB", rows: "1,204,880", when: "Yesterday", status: "Processing" },
  { name: "campaign_touchpoints.xlsx", size: "26.4 MB", rows: "318,402", when: "Mar 14", status: "Ready" },
];

export const previewColumns = [
  "customer_id",
  "tenure_months",
  "contract",
  "monthly_charges",
  "support_calls",
  "churned",
];

export const previewRows = [
  ["CUS-100241", "2", "Month-to-month", "89.35", "4", "Yes"],
  ["CUS-100242", "34", "Two year", "56.10", "0", "No"],
  ["CUS-100243", "11", "One year", "74.80", "1", "No"],
  ["CUS-100244", "1", "Month-to-month", "102.45", "6", "Yes"],
  ["CUS-100245", "58", "Two year", "48.90", "0", "No"],
  ["CUS-100246", "7", "Month-to-month", "95.20", "3", "Yes"],
  ["CUS-100247", "22", "One year", "61.75", "1", "No"],
];

export const cleaningActions = [
  {
    id: "cl-1",
    title: "Impute missing monthly_charges",
    detail: "1,842 nulls (1.0%) filled with median by contract group instead of dropping rows.",
    impact: "Retains 1,842 rows",
    severity: "high" as const,
    columns: ["monthly_charges"],
  },
  {
    id: "cl-2",
    title: "Remove 612 duplicate records",
    detail: "Exact duplicates on customer_id + signup_date. Keeps most recent snapshot.",
    impact: "-0.3% rows, +2.1% label purity",
    severity: "high" as const,
    columns: ["customer_id", "signup_date"],
  },
  {
    id: "cl-3",
    title: "Standardise contract labels",
    detail: "Maps 'M2M', 'month to month', 'Monthly' to a single canonical category.",
    impact: "Reduces cardinality 7 → 3",
    severity: "medium" as const,
    columns: ["contract"],
  },
  {
    id: "cl-4",
    title: "Cap outliers in total_charges",
    detail: "Winsorise at the 99.5th percentile; 214 values exceed 4 standard deviations.",
    impact: "Stabilises variance",
    severity: "medium" as const,
    columns: ["total_charges"],
  },
  {
    id: "cl-5",
    title: "Drop internal_notes column",
    detail: "96.4% missing and free-text only; carries no predictive signal.",
    impact: "-1 feature",
    severity: "low" as const,
    columns: ["internal_notes"],
  },
];

export const distribution = [
  { bucket: "0-12", customers: 42100, churn: 31 },
  { bucket: "13-24", customers: 33800, churn: 22 },
  { bucket: "25-36", customers: 29400, churn: 16 },
  { bucket: "37-48", customers: 27600, churn: 11 },
  { bucket: "49-60", customers: 26100, churn: 8 },
  { bucket: "61-72", customers: 25220, churn: 5 },
];

export const monthlyRuns = [
  { month: "Oct", runs: 28, accuracy: 88.1 },
  { month: "Nov", runs: 34, accuracy: 89.4 },
  { month: "Dec", runs: 41, accuracy: 90.2 },
  { month: "Jan", runs: 46, accuracy: 91.6 },
  { month: "Feb", runs: 52, accuracy: 92.0 },
  { month: "Mar", runs: 58, accuracy: 94.2 },
];

export const correlationFeatures = [
  "tenure",
  "charges",
  "calls",
  "contract",
  "add-ons",
  "churn",
];

export const correlationMatrix: number[][] = [
  [1.0, 0.31, -0.24, 0.62, 0.18, -0.41],
  [0.31, 1.0, 0.12, -0.19, 0.55, 0.28],
  [-0.24, 0.12, 1.0, -0.33, 0.09, 0.57],
  [0.62, -0.19, -0.33, 1.0, 0.21, -0.49],
  [0.18, 0.55, 0.09, 0.21, 1.0, 0.14],
  [-0.41, 0.28, 0.57, -0.49, 0.14, 1.0],
];

export const featureImportance = [
  { feature: "contract_type", weight: 0.24 },
  { feature: "tenure_months", weight: 0.19 },
  { feature: "support_calls", weight: 0.16 },
  { feature: "monthly_charges", weight: 0.12 },
  { feature: "payment_method", weight: 0.09 },
  { feature: "add_on_count", weight: 0.07 },
  { feature: "late_payments", weight: 0.06 },
  { feature: "region", weight: 0.04 },
];

export const leaderboard = [
  { rank: 1, model: "XGBoost", accuracy: 94.2, precision: 92.8, recall: 90.4, f1: 91.6, time: "4m 12s" },
  { rank: 2, model: "LightGBM", accuracy: 93.6, precision: 92.1, recall: 89.8, f1: 90.9, time: "2m 48s" },
  { rank: 3, model: "Random Forest", accuracy: 91.8, precision: 90.4, recall: 87.2, f1: 88.8, time: "6m 05s" },
  { rank: 4, model: "CatBoost", accuracy: 91.4, precision: 89.9, recall: 88.1, f1: 89.0, time: "5m 31s" },
  { rank: 5, model: "Logistic Regression", accuracy: 86.9, precision: 84.2, recall: 81.6, f1: 82.9, time: "0m 21s" },
  { rank: 6, model: "K-Nearest Neighbors", accuracy: 82.4, precision: 79.8, recall: 76.1, f1: 77.9, time: "1m 04s" },
];

export const trainingLogs = [
  "[09:41:02] Loading cleaned dataset telecom_customers_v3.parquet (182,378 rows)",
  "[09:41:04] Stratified split — train 145,902 / valid 18,238 / test 18,238",
  "[09:41:06] Encoding 7 categorical features with target encoding",
  "[09:41:09] Starting XGBoost trial 1/24 — max_depth=6 eta=0.10",
  "[09:41:38] Trial 1 complete — valid AUC 0.9184",
  "[09:42:11] Trial 6 complete — valid AUC 0.9376 (new best)",
  "[09:43:02] Early stopping patience reset at iteration 412",
  "[09:44:20] Trial 18 complete — valid AUC 0.9461 (new best)",
  "[09:45:14] Refitting best configuration on train + valid",
  "[09:45:52] Test accuracy 0.9420 · F1 0.9160 · AUC 0.9483",
];

export const businessInsights = {
  findings: [
    "Month-to-month contracts account for 41% of total churn risk while representing 28% of the customer base.",
    "Customers with 3+ support calls in 30 days churn at 3.4x the baseline rate.",
    "Churn concentrates in the first 8 months of tenure — 62% of exits happen before month 9.",
  ],
  opportunities: [
    "Migrating 10% of month-to-month customers to annual plans protects an estimated $1.42M in annual revenue.",
    "A proactive outreach queue for the top 5% risk decile can be actioned 22 days before predicted churn.",
    "Bundling two add-ons lifts predicted retention by 6.8 percentage points.",
  ],
  risks: [
    "Payment-method data is 4.2% incomplete for the enterprise segment, weakening scores there.",
    "Schema drift detected in the upstream billing export may degrade the model within two cycles.",
    "Regional coverage is imbalanced — APAC accounts for 6% of rows but 14% of revenue.",
  ],
  recommendations: [
    "Deploy the XGBoost model behind the retention workflow with a 0.62 decision threshold.",
    "Trigger a save offer when risk score exceeds 0.70 and tenure is under 9 months.",
    "Schedule weekly retraining and monitor PSI on the top 5 features.",
  ],
};

export const suggestedPrompts = [
  "Which customer segment has the highest churn risk?",
  "Compare revenue retention across contract types",
  "What changed in the data since last week?",
  "Summarise the top 3 drivers of churn",
];

export const reportTemplates = [
  {
    name: "Executive Summary",
    detail: "One-page narrative of findings, risks and recommendations for leadership.",
    pages: 4,
    format: "PDF",
  },
  {
    name: "Full Technical Report",
    detail: "Data profile, cleaning log, EDA, model comparison and explainability.",
    pages: 28,
    format: "PDF",
  },
  {
    name: "Model Card",
    detail: "Intended use, training data, evaluation metrics and known limitations.",
    pages: 6,
    format: "PDF",
  },
  {
    name: "Data Quality Audit",
    detail: "Column-level completeness, drift, duplicates and validation rules.",
    pages: 11,
    format: "XLSX",
  },
];

export const exportHistory = [
  { name: "Churn Prediction Q3 — Executive Summary", by: "Aarav Mehta", when: "Today, 10:12", size: "1.2 MB" },
  { name: "Credit Risk Scoring — Model Card", by: "Lena Fischer", when: "Yesterday", size: "840 KB" },
  { name: "Retail Demand — Data Quality Audit", by: "Diego Ramos", when: "Mar 13", size: "3.4 MB" },
  { name: "Marketing Attribution — Full Report", by: "Priya Nair", when: "Mar 11", size: "7.9 MB" },
];

export const pipelineStages = [
  { name: "Ingest", state: "done" as const, detail: "182,378 rows · 20 cols" },
  { name: "Profile", state: "done" as const, detail: "Schema inferred" },
  { name: "Clean", state: "done" as const, detail: "9 actions applied" },
  { name: "EDA", state: "done" as const, detail: "24 charts generated" },
  { name: "Train", state: "active" as const, detail: "Trial 18 / 24 · AUC 0.946" },
  { name: "Explain", state: "queued" as const, detail: "SHAP queued" },
  { name: "Report", state: "queued" as const, detail: "Awaiting model" },
];

export const processingActivity = [
  { day: "Mon", rows: 412, jobs: 9 },
  { day: "Tue", rows: 528, jobs: 12 },
  { day: "Wed", rows: 486, jobs: 11 },
  { day: "Thu", rows: 704, jobs: 16 },
  { day: "Fri", rows: 812, jobs: 21 },
  { day: "Sat", rows: 366, jobs: 7 },
  { day: "Sun", rows: 598, jobs: 14 },
];

export const modelPerformance = [
  { metric: "Accuracy", champion: 94.2, baseline: 86.9 },
  { metric: "Precision", champion: 92.8, baseline: 84.2 },
  { metric: "Recall", champion: 90.4, baseline: 81.6 },
  { metric: "F1", champion: 91.6, baseline: 82.9 },
  { metric: "AUC", champion: 94.8, baseline: 88.1 },
];

export const kpis = [
  { label: "Active pipelines", value: "12", delta: "+3", spark: [4, 6, 5, 8, 7, 10, 12] },
  { label: "Rows processed", value: "3.9M", delta: "+412K", spark: [12, 18, 16, 24, 21, 30, 34] },
  { label: "Models trained", value: "341", delta: "+58", spark: [20, 26, 31, 34, 41, 52, 58] },
  { label: "Champion accuracy", value: "94.2%", delta: "+1.8 pts", spark: [88, 89, 90, 91, 92, 93, 94] },
];

export const aiSuggestedActions = [
  {
    title: "Approve 2 pending cleaning actions",
    detail: "Winsorising total_charges unlocks the retraining queue.",
    to: "/cleaning" as const,
    cta: "Review plan",
  },
  {
    title: "Promote XGBoost v4 to production",
    detail: "Beats the deployed champion by 1.8 pts on F1 with no latency regression.",
    to: "/leaderboard" as const,
    cta: "Open leaderboard",
  },
  {
    title: "Investigate schema drift in store_sales_2024",
    detail: "Two new columns since last ingest; the profile is 3 days stale.",
    to: "/dataset" as const,
    cta: "Inspect dataset",
  },
];

export const aiSummaryCards = [
  {
    label: "Revenue at risk",
    value: "$1.42M",
    body: "Concentrated in month-to-month accounts under 9 months of tenure.",
  },
  {
    label: "Accounts flagged",
    value: "9,184",
    body: "Top risk decile scored above 0.70 in last night's batch.",
  },
  {
    label: "Lead time",
    value: "22 days",
    body: "Median warning window before a predicted churn event.",
  },
];

export const datasetPreviewStats = [
  { label: "Rows", value: "184,220" },
  { label: "Columns", value: "20" },
  { label: "Missing", value: "1.4%" },
  { label: "Duplicates", value: "612" },
];
