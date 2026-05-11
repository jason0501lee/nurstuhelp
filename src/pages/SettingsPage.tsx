import { PagePlaceholder } from './_placeholder';

export default function SettingsPage() {
  return (
    <PagePlaceholder
      title="設定"
      step="Step 13"
      pendingItems={[
        '內容包版本資訊',
        '清除本地紀錄',
        '遙測開關（預設關）',
        '關於 / 回饋連結',
      ]}
    />
  );
}
