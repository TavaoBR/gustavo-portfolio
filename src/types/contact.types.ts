export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string; // anti-spam
}

export interface ContactSubmission extends ContactFormData {
  id: string;
  timestamp: string;
  status: 'sent' | 'read';
}
