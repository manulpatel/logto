import { createMockUtils } from '@logto/shared/esm';

import { mockSsoConnector } from '#src/__mocks__/sso.js';
import { SsoProviderName } from '#src/sso/types/index.js';

const { jest } = import.meta;
const { mockEsmWithActual } = createMockUtils(jest);
const fetchOidcConfig = jest.fn();

await mockEsmWithActual('#src/sso/OidcConnector/utils.js', () => ({
  fetchOidcConfig,
}));

const { ssoConnectorFactories } = await import('#src/sso/index.js');
const { parseFactoryDetail, fetchConnectorProviderDetails } = await import('./utils.js');

describe('parseFactoryDetail', () => {
  it.each(Object.values(SsoProviderName))('should return correct detail for %s', (providerName) => {
    const { logo, description } = ssoConnectorFactories[providerName];
    const detail = parseFactoryDetail(ssoConnectorFactories[providerName], 'en');

    expect(detail).toEqual({
      providerName,
      logo,
      description: description.en,
    });
  });

  it.each(Object.values(SsoProviderName))(
    'should return correct detail for %s with unknown locale',
    (providerName) => {
      const { logo, description } = ssoConnectorFactories[providerName];
      const detail = parseFactoryDetail(ssoConnectorFactories[providerName], 'zh');

      expect(detail).toEqual({
        providerName,
        logo,
        description: description.en,
      });
    }
  );
});

describe('fetchConnectorProviderDetails', () => {
  it('providerConfig should be undefined if connector config is invalid', async () => {
    const connector = {
      ...mockSsoConnector,
      config: { clientId: 'foo' },
    };
    const result = await fetchConnectorProviderDetails(connector);

    expect(result).toEqual({
      ...connector,
      providerLogo: ssoConnectorFactories[connector.providerName as SsoProviderName].logo,
    });

    expect(fetchOidcConfig).not.toBeCalled();
  });

  it('providerConfig should be undefined if failed to fetch config', async () => {
    const connector = {
      ...mockSsoConnector,
      config: { clientId: 'foo', clientSecret: 'bar', issuer: 'http://example.com' },
    };

    fetchOidcConfig.mockRejectedValueOnce(new Error('mock-error'));
    const result = await fetchConnectorProviderDetails(connector);

    expect(result).toEqual({
      ...connector,
      providerLogo: ssoConnectorFactories[connector.providerName as SsoProviderName].logo,
    });

    expect(fetchOidcConfig).toBeCalledWith(connector.config.issuer);
  });

  it('should return correct details for supported provider', async () => {
    const connector = {
      ...mockSsoConnector,
      config: { clientId: 'foo', clientSecret: 'bar', issuer: 'http://example.com' },
    };

    fetchOidcConfig.mockResolvedValueOnce({ tokenEndpoint: 'http://example.com/token' });
    const result = await fetchConnectorProviderDetails(connector);

    expect(result).toEqual({
      ...connector,
      providerLogo: ssoConnectorFactories[connector.providerName as SsoProviderName].logo,
      providerConfig: {
        ...connector.config,
        scope: 'openid', // Default scope
        tokenEndpoint: 'http://example.com/token',
      },
    });
  });
});
