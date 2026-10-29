import React from 'react';
import {
  Layers,
  Database,
  Boxes,
  Code2,
  Key,
  CheckCircle2,
  Activity,
  GitBranch,
} from 'lucide-react';

export interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = 'w-4 h-4', size = 16 }) => {
  const normalized = name.toLowerCase();

  // PHP
  if (normalized.includes('php') && !normalized.includes('unit')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-4.7 12.3h-1.5l1.6-6.6h2.7c1.3 0 2.2.8 1.9 2-.3 1.3-1.4 2-2.7 2h-1l-.5 2.6zm6.3-2.6h-1l-.5 2.6h-1.5l1.6-6.6h2.7c1.3 0 2.2.8 1.9 2-.3 1.3-1.4 2-2.7 2zm4.3 2.6h-1.5l1.6-6.6h1.5l-1.6 6.6zM8.3 9.7l-.4 1.7h.9c.7 0 1.2-.3 1.3-.8.1-.5-.2-.9-.8-.9h-1zm4.8 0l-.4 1.7h.9c.7 0 1.2-.3 1.3-.8.1-.5-.2-.9-.8-.9h-1z" />
      </svg>
    );
  }

  // Symfony
  if (normalized.includes('symfony')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.3 14.8c-.8.5-1.9.7-2.9.7-3.4 0-5.3-2.2-5.3-5.2 0-3.3 2.3-5.5 5.5-5.5 1.5 0 2.6.4 3.2.9l-.9 1.9c-.6-.4-1.3-.7-2.3-.7-1.9 0-3.3 1.4-3.3 3.4 0 1.9 1.1 3.2 3.1 3.2.7 0 1.4-.2 1.8-.4l.8 1.7z" />
      </svg>
    );
  }

  // Laravel
  if (normalized.includes('laravel')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3.2 4.5l8-4.5 8 4.5v3l-8-4.5-8 4.5v-3zm0 6l8-4.5 8 4.5v3l-8-4.5-8 4.5v-3zm8 13.5l-8-4.5v-6l8 4.5v6zm1.6 0l8-4.5v-6l-8 4.5v6z" />
      </svg>
    );
  }

  // C# / .NET
  if (normalized.includes('c#') || normalized.includes('.net') || normalized.includes('asp.net') || normalized.includes('entity framework')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M11.5 3L3 7.8v9.4L11.5 22l8.5-4.8V7.8L11.5 3zm-2.2 12.8c-2 0-3.3-1.4-3.3-3.8s1.3-3.8 3.3-3.8c1.2 0 2 .5 2.5 1.2l-1.3 1.1c-.3-.4-.7-.7-1.2-.7-1.1 0-1.8.9-1.8 2.2 0 1.3.7 2.2 1.8 2.2.5 0 .9-.3 1.2-.7l1.3 1.1c-.5.8-1.3 1.3-2.5 1.3zm6.7-1.2h-.7l.2-1.2h1.2l.3-1.2h-1.2l.2-1h1.1l.3-1.2h-1.1l.3-1.3h-1.3l-.3 1.3h-1.2l.3-1.3h-1.3l-.3 1.3h-.9l-.3 1.2h.9l-.2 1h-.9l-.3 1.2h.9l-.3 1.2h-1l-.3 1.2h1l-.3 1.3h1.3l.3-1.3h1.2l-.3 1.3h1.3l.3-1.3h.7l.3-1.2zm-2.2-1.2h-1.2l.2-1h1.2l-.2 1z" />
      </svg>
    );
  }

  // Node.js
  if (normalized.includes('node')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2l9 5.2v10.4L12 22l-9-5.2V7.2L12 2zm6.9 14.3V8.3L12 4.3 5.1 8.3v8L12 20.3l6.9-4z" />
      </svg>
    );
  }

  // Vue.js
  if (normalized.includes('vue')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M2 3h3.5L12 14.5 18.5 3H22L12 21 2 3zm4.5 0h3L12 7.5 14.5 3h3L12 12 6.5 3z" />
      </svg>
    );
  }

  // TypeScript
  if (normalized.includes('typescript')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3 3h18v18H3V3zm10.7 13.5c1.4 0 2.4-.6 3.1-1.6l-1.3-1c-.5.7-1.1 1-1.8 1-.9 0-1.4-.4-1.4-1.1 0-.7.5-1.1 1.7-1.4 1.9-.5 2.9-1.2 2.9-2.7 0-1.7-1.3-2.7-3.1-2.7-1.3 0-2.3.5-3 1.3l1.2 1c.5-.5 1-.8 1.8-.8.8 0 1.3.4 1.3 1 0 .6-.5.9-1.5 1.2-1.9.5-3.1 1.2-3.1 2.8 0 1.9 1.4 3 3.2 3zM10.8 9H6.5v1.6H8v6.9h1.8v-6.9h1.5V9h-.5z" />
      </svg>
    );
  }

  // JavaScript
  if (normalized === 'javascript') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3 3h18v18H3V3zm10.7 13.5c1.4 0 2.4-.6 3.1-1.6l-1.3-1c-.5.7-1.1 1-1.8 1-.9 0-1.4-.4-1.4-1.1 0-.7.5-1.1 1.7-1.4 1.9-.5 2.9-1.2 2.9-2.7 0-1.7-1.3-2.7-3.1-2.7-1.3 0-2.3.5-3 1.3l1.2 1c.5-.5 1-.8 1.8-.8.8 0 1.3.4 1.3 1 0 .6-.5.9-1.5 1.2-1.9.5-3.1 1.2-3.1 2.8 0 1.9 1.4 3 3.2 3zM9.5 9H7.8v5.5c0 1.2-.5 1.7-1.4 1.7-.6 0-1.1-.3-1.4-.8l-1.2 1.1c.6 1 1.5 1.5 2.7 1.5 2 0 3-1.1 3-3.2V9z" />
      </svg>
    );
  }

  // React
  if (normalized.includes('react')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="currentColor" />
      </svg>
    );
  }

  // Next.js
  if (normalized.includes('next')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.8 14.5l-5.3-7.5h-1.3v8h-1.6V7h2l5.3 7.5h.1V7h1.6v9.5h-.8z" />
      </svg>
    );
  }

  // Tailwind CSS
  if (normalized.includes('tailwind')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 6c-2.4 0-3.9 1.2-4.5 3.6 1-.8 2-.9 3-.3.6.4 1 1 1.5 1.7 1 1.4 2.2 3 4.5 3 2.4 0 3.9-1.2 4.5-3.6-1 .8-2 .9-3 .3-.6-.4-1-1-1.5-1.7-1-1.4-2.2-3-4.5-3zM7.5 12c-2.4 0-3.9 1.2-4.5 3.6 1-.8 2-.9 3-.3.6.4 1 1 1.5 1.7 1 1.4 2.2 3 4.5 3 2.4 0 3.9-1.2 4.5-3.6-1 .8-2 .9-3 .3-.6-.4-1-1-1.5-1.7-1-1.4-2.2-3-4.5-3z" />
      </svg>
    );
  }

  // Vite
  if (normalized.includes('vite')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M20.2 3.5l-8.5 17-8.5-17h3.8l4.7 9.8 4.7-9.8h3.8z" />
      </svg>
    );
  }

  // Angular
  if (normalized.includes('angular')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2L2 6l1.6 12L12 22l8.4-4L22 6 12 2zm0 3.2l5.2 11.6h-2l-1.1-2.6H9.9L8.8 16.8h-2L12 5.2zm-1.4 7.2h2.8L12 9.2l-1.4 3.2z" />
      </svg>
    );
  }

  // PostgreSQL
  if (normalized.includes('postgres')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.8 15.5c-1.2.6-2.5.8-3.8.8-3.3 0-5-2-5-5 0-3.2 2-5.3 5.3-5.3 1.2 0 2.2.3 3 .8l-.7 1.6c-.7-.4-1.4-.6-2.3-.6-2.1 0-3.4 1.4-3.4 3.5 0 2.1 1.2 3.4 3.2 3.4.9 0 1.6-.2 2.2-.5l.5 1.3z" />
      </svg>
    );
  }

  // MySQL
  if (normalized.includes('mysql')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M4 18c2-3 4-8 8-8s6 5 8 8c-2.5 1.5-5.5 2-8 2s-5.5-.5-8-2zm8-14c-2.2 0-4 1.8-4 4 0 1.5.8 2.8 2 3.5V14h4v-2.5c1.2-.7 2-2 2-3.5 0-2.2-1.8-4-4-4z" />
      </svg>
    );
  }

  // Redis
  if (normalized.includes('redis')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 3L2 8l10 5 10-5-10-5zm0 8L4.2 8 12 4.1 19.8 8 12 11zm-10 2l10 5 10-5v2.8l-10 5-10-5V13zm0 4.5l10 5 10-5v2.8l-10 5-10-5v-2.8z" />
      </svg>
    );
  }

  // Docker
  if (normalized.includes('docker')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M22 12.5c-.2-.1-1.8-1.1-3.6-.5-.3-1.6-1.5-2.8-3.1-3-.3-.1-.5-.1-.8-.1-.4-2.8-2.6-4.9-5.5-4.9v2.2c0 1.4.9 2.5 2.2 2.8-1.5.1-2.9.9-3.6 2.2H2.5C1.1 11.2 0 12.3 0 13.7c0 4.6 3.7 8.3 8.3 8.3 5.4 0 9.8-3.6 11-8.7 1.3-.2 2.3-.5 2.7-.8zM7.5 7h2v2h-2V7zm-3 3h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2z" />
      </svg>
    );
  }

  // Git / GitHub / GitLab
  if (normalized.includes('git') || normalized.includes('github') || normalized.includes('gitlab')) {
    return <GitBranch className={className} />;
  }

  // Linux
  if (normalized.includes('linux')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C9.5 2 7.5 4 7.5 6.5c0 1.2.5 2.3 1.3 3.1-.8 1.4-1.3 3.1-1.3 4.9 0 2 .6 3.9 1.6 5.4-1.1.5-2.1 1.4-2.1 2.6 0 1.4 2.2 1.5 4 1.5 1.5 0 2.5-.5 3-.9.5.4 1.5.9 3 .9 1.8 0 4-.1 4-1.5 0-1.2-1-2.1-2.1-2.6 1-1.5 1.6-3.4 1.6-5.4 0-1.8-.5-3.5-1.3-4.9.8-.8 1.3-1.9 1.3-3.1C18.5 4 16.5 2 14 2h-2zm-1 5c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm4 0c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" />
      </svg>
    );
  }

  // Databases fallback
  if (normalized.includes('sql') || normalized.includes('database') || normalized.includes('supabase')) {
    return <Database className={className} />;
  }

  // Architecture / DDD / Patterns
  if (normalized.includes('architecture') || normalized.includes('ddd') || normalized.includes('solid') || normalized.includes('pattern')) {
    return <Layers className={className} />;
  }

  // Testing (PHPUnit, xUnit, Vitest, Moq, FluentAssertions)
  if (normalized.includes('unit') || normalized.includes('test') || normalized.includes('moq') || normalized.includes('assertion')) {
    return <CheckCircle2 className={className} />;
  }

  // Security / JWT
  if (normalized.includes('jwt') || normalized.includes('token') || normalized.includes('auth')) {
    return <Key className={className} />;
  }

  // APIs / Microservices
  if (normalized.includes('api') || normalized.includes('microsserviço') || normalized.includes('microservice') || normalized.includes('webhook')) {
    return <Activity className={className} />;
  }

  // DevOps / Containers / Infra / Swagger / Postman
  if (normalized.includes('ci/cd') || normalized.includes('nginx') || normalized.includes('railway') || normalized.includes('swagger') || normalized.includes('openapi') || normalized.includes('postman')) {
    return <Boxes className={className} />;
  }

  return <Code2 className={className} />;
};
