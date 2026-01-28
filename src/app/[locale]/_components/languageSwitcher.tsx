import { useLocale, useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';

export default function LocaleSwitcher({ css }: { css: string }) {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  const items = routing.locales.map((cur) => ({
    value: cur,
    label: t('locale', { locale: cur })
  }));

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t('label')} css={css} items={items} />
  );
}