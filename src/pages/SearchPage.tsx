import { PagePlaceholder } from './_placeholder';

export default function SearchPage() {
  return (
    <PagePlaceholder
      title="搜尋"
      step="Step 9"
      pendingItems={[
        'Fuse.js 加權索引（title / aliases / 型別專屬名稱）',
        '中英別名同卡命中（lasix / Furosemide / 腎益康）',
        '結果分群（藥物 / 量表 / SOP / ...）',
        '空狀態 + 內容缺漏回報入口',
      ]}
    />
  );
}
