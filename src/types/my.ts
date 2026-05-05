export type DashboardStatTone =
  | "default"
  | "primary"
  | "danger"
  | "success";

export type DashboardStat = {
  id: string;
  label: string;
  value: string;
  helperText?: string;
  tone?: DashboardStatTone;
};

export type ModelStatusState = "normal" | "warning" | "error";

export type ModelStatus = {
  title: string;
  statusLabel: string;
  status: ModelStatusState;
  description: string;
  metricsText?: string;
};

export type MyMenuItemData = {
  id: string;
  label: string;
  description?: string;
  href?: string;
  iconLabel?: string;
};

export type MyData = {
  user: {
    name: string;
  };
  summary: {
    label: string;
    subtitle: string;
    highlightedValue: string;
    description: string;
  };
  stats: DashboardStat[];
  modelStatus: ModelStatus;
  menuItems: MyMenuItemData[];
};
