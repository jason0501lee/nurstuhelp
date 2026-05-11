import { PagePlaceholder } from './_placeholder';

export default function FavoritesPage() {
  return (
    <PagePlaceholder
      title="我的收藏"
      step="Step 10"
      pendingItems={['本地優先儲存', '清除使用紀錄', '排序：最近收藏優先']}
    />
  );
}
