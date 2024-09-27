/* eslint-disable @typescript-eslint/no-explicit-any */
declare const SmileIdentity: any;
export const useSmileId = () => {

  const getWebToken = async (product: string) => {
    const baseAPIURL = `${process.env.VITE_SANDBOX_URL}`;
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

      if (response.status === 201) {
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
    const callback_url = `${process.env.VITE_CALLBACK_URL}`;
    const partner_id = `${process.env.VITE_PARTNER_ID}`;
    SmileIdentity({
      token,
      product,
      callback_url,
      environment: 'sandbox',
      partner_details: {
        partner_id,
        name: `Deriv`,
        logo_url: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTAFsSsUijWsY8OPOc9i2muyKdgVkUGDuDKw&s`,
        policy_url: `https://deriv.com/terms-and-conditions#clients`,
        theme_color: '#000',
      },

      onSuccess: () => {
        console.log('SmileIdentityWebIntegration: onSuccess');
      },
      onClose: () => {
        console.log('SmileIdentityWebIntegration: onClose');
      },
      onError: () => {
        console.log('SmileIdentityWebIntegration: onError');
      },
    });
  };

  const initSmileIdentity = async ({ product }: { product: string }) => {
    const response = await getWebToken(product);
    configureSmileIdentityWebIntegration(response.token, product);
  };

  return { initSmileIdentity };
};
