const session = {
  not_found: 'Sessione non trovata. Torna indietro e accedi nuovamente.',
  invalid_credentials: 'Account o password non corretti. Controlla le tue credenziali.',
  invalid_sign_in_method: 'Metodo di accesso corrente non disponibile.',
  invalid_connector_id: 'Impossibile trovare un connettore disponibile con ID {{connectorId}}.',
  insufficient_info: 'Informazioni di accesso insufficienti.',
  connector_id_mismatch: "L'ID del connettore non corrisponde con il record della sessione.",
  connector_session_not_found:
    'Sessione del connettore non trovata. Torna indietro e accedi nuovamente.',
  verification_session_not_found:
    'La verifica non è stata completata con successo. Riavvia il processo di verifica e riprova.',
  verification_expired:
    'La connessione è scaduta. Verifica di nuovo per garantire la sicurezza del tuo account.',
  /** UNTRANSLATED */
  verification_blocked_too_many_attempts:
    'Too many attempts in a short time. Please try again {{relativeTime}}.',
  unauthorized: 'Accedi prima di procedere.',
  unsupported_prompt_name: 'Nome del prompt non supportato.',
  forgot_password_not_enabled: 'Recupero password non abilitato.',
  verification_failed:
    'La verifica non è stata completata con successo. Riavvia il processo di verifica e riprova.',
  connector_validation_session_not_found:
    'Sessione del connettore per la convalida del token non trovata.',
  identifier_not_found: 'Identificativo utente non trovato. Torna indietro e accedi nuovamente.',
  interaction_not_found:
    'Sessione di interazione non trovata. Torna indietro e avvia la sessione nuovamente.',
  /** UNTRANSLATED */
  not_supported_for_forgot_password: 'This operation is not supported for forgot password.',
  mfa: {
    /** UNTRANSLATED */
    require_mfa_verification: 'Mfa verification is required to sign in.',
    /** UNTRANSLATED */
    mfa_sign_in_only: 'Mfa is only available for sign-in interaction.',
    /** UNTRANSLATED */
    pending_info_not_found: 'Pending MFA info not found, please initiate MFA first.',
    /** UNTRANSLATED */
    invalid_totp_code: 'Invalid TOTP code.',
    /** UNTRANSLATED */
    webauthn_verification_failed: 'WebAuthn verification failed.',
    /** UNTRANSLATED */
    webauthn_verification_not_found: 'WebAuthn verification not found.',
    /** UNTRANSLATED */
    bind_mfa_existed: 'MFA already exists.',
    /** UNTRANSLATED */
    backup_code_can_not_be_alone: 'Backup code can not be the only MFA.',
    /** UNTRANSLATED */
    backup_code_required: 'Backup code is required.',
    /** UNTRANSLATED */
    invalid_backup_code: 'Invalid backup code.',
  },
};

export default Object.freeze(session);
