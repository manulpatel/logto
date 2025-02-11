import { cls } from '#src/utils.js';

import ExpectExperience from './expect-experience.js';

/**
 * Note: The backup code tests are based on the WebAuthn experience flow since the backup code factor cannot be enabled alone.
 */
export default class ExpectMfaExperience extends ExpectExperience {
  constructor(thePage = global.page) {
    super(thePage);
  }

  /**
   * Expect the page to be at the backup code page and retrieve backup codes.
   */
  async retrieveBackupCodes() {
    this.toBeAt('mfa-binding/BackupCode');
    const backupCodesDiv = await expect(this.page).toMatchElement(cls('backupCodes'));
    const backupCodesSpanList = await backupCodesDiv.$$('span');
    return Promise.all(
      backupCodesSpanList.map(async (span) => {
        return span.evaluate((element) => element.textContent);
      })
    );
  }

  async toClickSwitchFactorsLink({ isBinding }: { isBinding: boolean }) {
    await this.toClick(
      'a',
      isBinding ? 'Link another 2-step authentication' : 'Try another method to verify'
    );
  }
}
