import { PagePlaceholder } from '../_placeholder';

export default function LearnPage() {
  return (
    <PagePlaceholder
      title="學習"
      step="Step 13"
      pendingItems={[
        '關於 App',
        '完整安全聲明 (DISC-D1)',
        '內容包版本與變更日誌',
        '回饋入口',
      ]}
    />
  );
}
