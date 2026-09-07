import { apiRequest } from './client';

export function createRefundRequest(paymentId, reason) {
  return apiRequest(`/payments/${paymentId}/refund-requests`, {
    method: 'POST',
    body: { reason },
  });
}

export function getRefundRequests(status = 'requested') {
  return apiRequest(`/payments/refund-requests?status=${encodeURIComponent(status)}`);
}

export function decideRefundRequest(refundId, decision, note) {
  return apiRequest(`/payments/refund-requests/${refundId}`, {
    method: 'PATCH',
    body: { decision, note },
  });
}
