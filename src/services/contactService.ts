import type { ContactFormData, ContactSubmission } from '@/types/contact.types';
import { storageService } from './storageService';

const STORAGE_KEY = 'gustavo_portfolio_submissions';

class ContactService {
  public async submitMessage(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
    // 1. Verificação Honeypot anti-spam
    if (data.honeypot && data.honeypot.trim().length > 0) {
      // Rejeição silenciosa para bots
      return { success: true };
    }

    // 2. Validação estrita
    if (!data.name.trim() || data.name.trim().length < 2) {
      return { success: false, error: 'O nome deve conter pelo menos 2 caracteres.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      return { success: false, error: 'Por favor, informe um endereço de e-mail corporativo válido.' };
    }

    if (!data.message.trim() || data.message.trim().length < 10) {
      return { success: false, error: 'A mensagem deve conter pelo menos 10 caracteres explicativos.' };
    }

    // 3. Simulação de latência de rede realista (450ms)
    await new Promise((resolve) => setTimeout(resolve, 450));

    // 4. Persistência local (armazenamento de mensagens enviadas)
    const newSubmission: ContactSubmission = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: data.name.trim(),
      email: data.email.trim(),
      subject: data.subject.trim() || 'General Inquiry',
      message: data.message.trim(),
      timestamp: new Date().toISOString(),
      status: 'sent',
    };

    const currentList = this.getSentSubmissions();
    const updatedList = [newSubmission, ...currentList].slice(0, 20); // guarda as últimas 20
    storageService.setItem(STORAGE_KEY, updatedList);

    return { success: true };
  }

  public getSentSubmissions(): ContactSubmission[] {
    return storageService.getItem<ContactSubmission[]>(STORAGE_KEY, []);
  }

  public clearSentSubmissions(): void {
    storageService.removeItem(STORAGE_KEY);
  }
}

export const contactService = new ContactService();
