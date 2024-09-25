/* eslint-disable @typescript-eslint/no-explicit-any */
declare const SmileIdentity: any;
export const useSmileId = () => {
  const baseAPIURL = `${process.env.VITE_SANDBOX_URL}`;

  const getWebToken = async (baseAPIURL: string, product: string) => {
    const fetchConfig: RequestInit = {};

    fetchConfig.cache = 'no-cache';
    fetchConfig.mode = 'cors';
    fetchConfig.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    fetchConfig.body = JSON.stringify({
      partner_id: '1091',
      product: product,
    });
    fetchConfig.method = 'POST';

    const URL = `${baseAPIURL}/token/`;
    try {
      const response = await fetch(URL, fetchConfig);

      if (response.status === 200) {
        const json = await response.json();

        if (json.error) {
          throw new Error(json.error);
        }

        return json;
      }
    } catch (e) {
      const error = e as Error;
      console.log(`API: ${error.name}, ${error.message}`);
      throw error;
    }
  };

  const configureSmileIdentityWebIntegration = (
    token: string,
    product: string,
  ) => {
    SmileIdentity({
      token,
      product,
      callback_url: `url/callback`,
      environment: 'sandbox',
      partner_details: {
        partner_id: `partner_id`,
        name: `app_name`,
        logo_url: `app_logo_url`,
        policy_url: `data_privacy_policy_url`,
        theme_color: '#000',
      },
      onSuccess: () => {},
      onClose: () => {},
      onError: () => {},
    });
  };

  const initSmileIdentity = async ({ product }: { product: string }) => {
    const token = await getWebToken(baseAPIURL, product);
    configureSmileIdentityWebIntegration(token, product);
  };

  return { initSmileIdentity };
};
