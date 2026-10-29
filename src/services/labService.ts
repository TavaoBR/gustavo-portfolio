export interface SpringParams {
  stiffness: number;
  damping: number;
  mass: number;
}

export interface PixSimulationStep {
  id: string;
  label: { en: string; pt: string };
  detail: { en: string; pt: string };
  status: 'pending' | 'running' | 'success';
}

class LabService {
  public defaultSpringParams: SpringParams = {
    stiffness: 400,
    damping: 28,
    mass: 1.0,
  };

  public generateSpringCode(params: SpringParams): string {
    return `// Framer Motion / Web Spring Physics
transition: {
  type: "spring",
  stiffness: ${params.stiffness},
  damping: ${params.damping},
  mass: ${params.mass.toFixed(1)}
}`;
  }

  public getInitialPixSteps(): PixSimulationStep[] {
    return [
      {
        id: '1',
        label: {
          en: '1. Webhook Notification Arrives',
          pt: '1. Notificação de Webhook Recebida',
        },
        detail: {
          en: 'Mercado Pago payload event received with SHA256 signature.',
          pt: 'Payload do evento recebido com assinatura SHA256.',
        },
        status: 'pending',
      },
      {
        id: '2',
        label: {
          en: '2. Distributed Redis Idempotency Lock',
          pt: '2. Trava Atômica de Idempotência no Redis',
        },
        detail: {
          en: 'SETNX transaction_id_109283 EX 60 acquired.',
          pt: 'Chave SETNX transaction_id_109283 EX 60 adquirida com sucesso.',
        },
        status: 'pending',
      },
      {
        id: '3',
        label: {
          en: '3. DTO Validation & Domain Service',
          pt: '3. Validação de DTO & Camada de Serviço',
        },
        detail: {
          en: 'Clean Architecture service validates entity integrity.',
          pt: 'Service Layer processa regras de negócio livres de acoplamento.',
        },
        status: 'pending',
      },
      {
        id: '4',
        label: {
          en: '4. Atomic Ledger Update (PostgreSQL)',
          pt: '4. Persistência Contábil Atômica (PostgreSQL)',
        },
        detail: {
          en: 'Ledger record committed with zero balance discrepancy.',
          pt: 'Lançamento registrado com conciliação bancária validada.',
        },
        status: 'pending',
      },
      {
        id: '5',
        label: {
          en: '5. Instant Liquidation Response',
          pt: '5. Confirmação de Liquidação (200 OK)',
        },
        detail: {
          en: 'PIX instant payment confirmed in < 120ms total latency.',
          pt: 'PIX liquidado com confirmação imediata em latência de 98ms.',
        },
        status: 'pending',
      },
    ];
  }
}

export const labService = new LabService();
