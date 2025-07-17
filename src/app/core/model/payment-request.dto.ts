export interface PaymentRequestDTO {
  orderId: number;
  paymentMethod: string;
  amount: number;
  transferType?: string;
  journalNo?: string;
  remarks?: string;
}
