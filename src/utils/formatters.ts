export function formatTimeInTimezone(timezone: string = 'America/Maceio'): string {
  try {
    const formatter = new Intl.DateTimeFormat('pt-BR', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    return formatter.format(new Date());
  } catch {
    const d = new Date();
    return d.toTimeString().split(' ')[0];
  }
}

export function formatDateRelative(isoString: string, lang: 'en' | 'pt' = 'en'): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return isoString;
  }
}
