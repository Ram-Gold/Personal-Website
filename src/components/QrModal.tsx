"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { IconArrowUpRight, IconX } from '@tabler/icons-react';
import { hapticLight } from '../utils/haptics';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QR_IMAGE_URL =
  'https://2jb116hoscccm9hn.public.blob.vercel-storage.com/qrcode-mfmtoh4j8CROvZPa5cVhMJ98rzUTw0.png';

export const QrModal: React.FC<QrModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Save previous active element to restore focus when closing
    previousActiveElementRef.current = document.activeElement as HTMLElement | null;

    // Move initial focus to close button
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        hapticLight();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusable = Array.from(focusableElements).filter(
          (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
        );

        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    // Prevent background scroll while modal is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previousActiveElementRef.current?.focus();
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Ram Guinto QR Code"
        >
          {/* Dimmed Scrim Backdrop with Exit Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
            onClick={() => {
              hapticLight();
              onClose();
            }}
            aria-hidden="true"
          />

          {/* Floating QR Content with Spring Entrance & Smooth Exit Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.92,
              y: 8,
              transition: { duration: 0.16, ease: [0.32, 0, 0.67, 0] },
            }}
            transition={{
              type: 'spring',
              damping: 26,
              stiffness: 360,
              mass: 0.8,
            }}
            className="relative z-10 flex flex-col items-center gap-3.5"
          >
            {/* Pure QR Island */}
            <div className="relative p-4 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20">
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => {
                  hapticLight();
                  onClose();
                }}
                className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-neutral-900 text-neutral-300 hover:text-white flex items-center justify-center shadow-lg border border-neutral-700 active:scale-90 focus-visible:ring-2 focus-visible:ring-white outline-none transition-all duration-150 cursor-pointer"
                aria-label="Close QR modal"
              >
                <IconX size={14} />
              </button>
              <Image
                src={QR_IMAGE_URL}
                alt="Ram Guinto QR Code"
                width={240}
                height={240}
                priority
                className="w-[230px] h-[230px] object-contain select-none"
              />
            </div>

            {/* Detached Frosted Pill Link */}
            <a
              href="https://domodomo.site"
              target="_blank"
              rel="noopener noreferrer"
              onClick={hapticLight}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white/90 hover:text-white backdrop-blur-xl border border-white/15 text-xs font-mono tracking-tight transition-all duration-150 shadow-lg cursor-pointer"
            >
              <span>Made with Domodomo</span>
              <IconArrowUpRight size={12} className="shrink-0" />
            </a>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
