const entity = {
  invalid_input: 'Saisie invalide. La liste des valeurs ne doit pas être vide.',
  create_failed: 'Échec de la création de {{name}}.',
  db_constraint_violated: 'Violations de contraintes de base de données.',
  not_exists: "Le {{name}} n'existe pas.",
  not_exists_with_id: "Le {{name}} avec l'ID `{{id}}` n'existe pas.",
  not_found: "La ressource n'existe pas.",
  /** UNTRANSLATED */
  relation_foreign_key_not_found:
    'Cannot find one or more foreign keys. Please check the input and ensure that all referenced entities exist.',
  /** UNTRANSLATED */
  unique_integrity_violation: 'The entity already exists. Please check the input and try again.',
};

export default Object.freeze(entity);
