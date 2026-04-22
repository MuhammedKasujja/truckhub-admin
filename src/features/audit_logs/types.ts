export type AuditLog = {
  user_id: string;
  resource_type: string;
  source: string;
  action: string;
  created_at: Date;
};
