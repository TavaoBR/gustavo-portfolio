import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  maxWidth = '3xl',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Bloqueia scroll da página
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Fechar com tecla Escape
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop com blur sutil */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        aria-hidden="true"
      />

      {/* Janela Modal */}
      <div
        ref={modalRef}
        className={cn(
          'relative w-full z-10 rounded-2xl border border-emerald-500/20 bg-graphite-900/95 p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-all my-8 max-h-[90vh] overflow-y-auto',
          maxWidthStyles[maxWidth],
          className
        )}
      >
        {/* Header com Título e Fechar */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-graphite-700/60">
          <div className="font-bold text-lg sm:text-xl text-white">{title}</div>
          <button
            onClick={onClose}
            type="button"
            className="rounded-lg p-1.5 text-graphite-400 hover:text-white hover:bg-graphite-800 transition-colors tap-feedback"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo */}
        <div>{children}</div>
      </div>
    </div>
  );
};
