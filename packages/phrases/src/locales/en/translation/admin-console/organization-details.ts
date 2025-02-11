const organization_details = {
  page_title: 'Organization details',
  delete_confirmation:
    'Once deleted, all members will lose their membership and roles in this organization. This action cannot be undone.',
  organization_id: 'Organization ID',
  settings_description:
    'An organization is a group of identities (usually users) that are recognized by a common identifier.\n\nEach organization has its own set of members, roles, and permissions, while the roles and permissions are defined by the organization template.',
  name_placeholder: 'The name of the organization, not required to be unique.',
  description_placeholder: 'A description of the organization.',
  member: 'Member',
  member_other: 'Members',
  add_members_to_organization: 'Add members to organization {{name}}',
  add_members_to_organization_description:
    'Find appropriate users by searching name, email, phone, or user ID. Existing members are not shown in the search results.',
  add_with_organization_role: 'Add with organization role(s)',
  user: 'User',
  authorize_to_roles: 'Authorize {{name}} to access the following roles:',
  edit_organization_roles: 'Edit organization roles',
  edit_organization_roles_of_user: 'Edit organization roles of {{name}}',
  remove_user_from_organization: 'Remove user from organization',
  remove_user_from_organization_description:
    'Once removed, the user will lose their membership and roles in this organization. This action cannot be undone.',
  search_role_placeholder: 'Type to search for roles',
  search_user_placeholder: 'Type to search for users',
  at_least_one_user: 'At least one user is required.',
};

export default Object.freeze(organization_details);
