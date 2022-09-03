const authConfig = {
  secret_token: '36aecfd4a953c6388e7d604881fd9088',
  secret_refresh_token: '12e700b2024cdd6a82e108436c7b1751',
  expires_in_token: '15m',
  expires_in_refresh_token_days: 30,
  expires_in_refresh_token: '30d',
};

authConfig.expires_in_refresh_token = `${authConfig.expires_in_refresh_token_days}d`;

export { authConfig };