import { type Organization } from '@logto/schemas';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import useSWR from 'swr';

import OrganizationIcon from '@/assets/icons/organization-preview.svg';
import ActionsButton from '@/components/ActionsButton';
import AppError from '@/components/AppError';
import DetailsPage from '@/components/DetailsPage';
import Skeleton from '@/components/DetailsPage/Skeleton';
import PageMeta from '@/components/PageMeta';
import ThemedIcon from '@/components/ThemedIcon';
import Card from '@/ds-components/Card';
import CopyToClipboard from '@/ds-components/CopyToClipboard';
import TabNav, { TabNavItem } from '@/ds-components/TabNav';
import useApi, { type RequestError } from '@/hooks/use-api';
import useTenantPathname from '@/hooks/use-tenant-pathname';

import Members from './Members';
import Settings from './Settings';
import * as styles from './index.module.scss';

const pathname = '/organizations';
const tabs = Object.freeze({
  settings: 'settings',
  members: 'members',
});

function OrganizationDetails() {
  const { id } = useParams();
  const { navigate } = useTenantPathname();
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const { data, error, mutate } = useSWR<Organization, RequestError>(
    id && `api/organizations/${id}`
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const api = useApi();

  const deleteOrganization = useCallback(async () => {
    if (!id || isDeleting) {
      return;
    }
    setIsDeleting(true);

    try {
      await api.delete(`api/organizations/${id}`);
      navigate(pathname);
    } finally {
      setIsDeleting(false);
    }
  }, [api, id, isDeleting, navigate]);

  const isLoading = !data && !error;

  return (
    <DetailsPage backLink={pathname} backLinkTitle="organizations.title" className={styles.page}>
      <PageMeta titleKey="organization_details.page_title" />
      {isLoading && <Skeleton />}
      {error && <AppError errorCode={error.body?.code} errorMessage={error.body?.message} />}
      {data && (
        <>
          <Card className={styles.header}>
            <div className={styles.metadata}>
              <ThemedIcon for={OrganizationIcon} size={60} />
              <div>
                <div className={styles.name}>{data.name}</div>
                <div className={styles.row}>
                  <span className={styles.label}>{t('organization_details.organization_id')} </span>
                  <CopyToClipboard size="default" value={data.id} />
                </div>
              </div>
            </div>
            <ActionsButton
              buttonProps={{
                type: 'default',
                size: 'large',
              }}
              deleteConfirmation="organization_details.delete_confirmation"
              fieldName="organizations.title"
              onDelete={deleteOrganization}
            />
          </Card>
          <TabNav>
            <TabNavItem href={`${pathname}/${data.id}/${tabs.settings}`}>
              {t('general.settings_nav')}
            </TabNavItem>
            <TabNavItem href={`${pathname}/${data.id}/${tabs.members}`}>
              {t('organizations.members')}
            </TabNavItem>
          </TabNav>
          <Routes>
            <Route index element={<Navigate replace to={tabs.settings} />} />
            <Route
              path={tabs.settings}
              element={
                <Settings
                  isDeleting={isDeleting}
                  data={data}
                  onUpdated={async (data) => mutate(data)}
                />
              }
            />
            <Route path={tabs.members} element={<Members organization={data} />} />
          </Routes>
        </>
      )}
    </DetailsPage>
  );
}

export default OrganizationDetails;
