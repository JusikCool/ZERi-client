import type { MyData } from "../types/my";

export const mockMyData: MyData = {
  user: {
    name: "유진",
  },
  summary: {
    label: "이번 달 BEFORE 효과",
    subtitle: "매수하려던 수량을",
    highlightedValue: "-32%",
    description: "줄였어요. 그중 8건은 실제로 더 떨어졌어요.",
  },
  stats: [
    {
      id: "reviews",
      label: "재검토",
      value: "14",
      helperText: "번",
      tone: "primary",
    },
    {
      id: "actual-downside",
      label: "실제 하락",
      value: "8",
      helperText: "건",
      tone: "danger",
    },
    {
      id: "hit-rate",
      label: "적중률",
      value: "71%",
      helperText: "최근 30일",
      tone: "success",
    },
  ],
  modelStatus: {
    title: "모델 정상성 리포트",
    statusLabel: "정상",
    status: "normal",
    description: "최근 업데이트 기준 정상 작동 중이에요.",
    metricsText: "Q05 커버률 5.2% · 목표 5.0% · Kupiec p 0.74",
  },
  menuItems: [
    {
      id: "notifications",
      label: "알림 설정",
      description: "위험 신호 알림 기준을 바꿀 수 있어요",
      href: "/my/notifications",
      iconLabel: "알림",
    },
    {
      id: "watchlist",
      label: "관심 종목 관리",
      description: "추적할 종목을 추가하거나 삭제해요",
      href: "/my/watchlist",
      iconLabel: "관심",
    },
    {
      id: "reports",
      label: "리스크 리포트 기록",
      description: "이전에 확인한 리포트를 다시 볼 수 있어요",
      href: "/my/reports",
      iconLabel: "기록",
    },
    {
      id: "support",
      label: "문의하기",
      description: "서비스 이용 중 궁금한 점을 남겨요",
      href: "/my/support",
      iconLabel: "문의",
    },
  ],
};
