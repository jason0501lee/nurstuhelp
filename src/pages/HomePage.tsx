import { PagePlaceholder } from './_placeholder';

export default function HomePage() {
  return (
    <PagePlaceholder
      title="首頁"
      step="Step 7"
      pendingItems={[
        '全域搜尋條',
        '快速動作：ISBAR / 三讀六對 / 劑量 / 滴速',
        '今日捷徑（最近 + 高頻）',
        '我的收藏',
        '攔截紀錄條',
        'Footer disclaimer (DISC-D2)',
      ]}
    />
  );
}
