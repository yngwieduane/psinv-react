'use client';

import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { Locale } from '@/i18n/routing';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Globe } from 'lucide-react';
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { Fragment } from 'react';

type Props = {
  items: { value: string; label: string }[]; // Changed to accept items array
  defaultValue: string;
  label: string;
  css: string;
};

export default function LocaleSwitcherSelect({
  items,
  defaultValue,
  label,
  css
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(nextLocale: Locale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  const getFlag = (locale: string) => {
    switch (locale) {
      case 'en': return '🇬🇧';
      case 'ar': return '🇦🇪';
      case 'ru': return '🇷🇺';
      case 'de': return '🇩🇪';
      case 'zh': return '🇨🇳';
      default: return '🌐';
    }
  };

  return (
    <div className={clsx('relative', isPending && 'transition-opacity disabled:opacity-30')}>
      <Popover className="relative">
        {({ open }) => (
          <>
            <PopoverButton
              className={`cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 border border-gray-100 hover:bg-gray-200 transition-colors outline-none ${css}`}
              aria-label={label}
            >
              <span className="text-xl leading-none">{getFlag(defaultValue)}</span>
            </PopoverButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute right-0 z-50 mt-2 w-40 origin-top-right rounded-xl bg-white p-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="flex flex-col py-1">
                  {items.map((item) => (
                    <button
                      key={item.value}
                      onClick={() => onSelectChange(item.value as Locale)}
                      disabled={isPending}
                      className={clsx(
                        'text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-secondary transition-colors flex items-center gap-3',
                        defaultValue === item.value && 'bg-gray-50 font-bold text-secondary'
                      )}
                    >

                      {item.label}
                    </button>
                  ))}
                </div>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}