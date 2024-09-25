/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useScript, useSmileId } from './hooks';
import Logos from './Logos';

const WebIntegration = () => {
  const scriptStatus = useScript('https://cdn.smileidentity.com/inline/v1/js/script.min.js');
  const [ButtonLabel, setButtonLabel] = useState('Verify with Smile Identity');
  const [selelctedProduct, setSelectedProduct] = useState('');
  const { initSmileIdentity } = useSmileId();


  const handleClick = () => {
    if (scriptStatus === 'ready') {
      initSmileIdentity({
        product: selelctedProduct,
      });
    }
  };

  return (
    <>
      <Logos />
      <p className="small-id-wrapper">
        <select id="language" onChange={(e) => setSelectedProduct(e.target.value)}>
          <option value="">--Select Product---</option>
          <option value="biometric_kyc">Biometric KYC</option>
          <option value="authentication">SmartSelfie Authentication</option>
          <option value="smartselfie">User Registration</option>
          <option value="basic_kyc">Basic KYC</option>
          <option value="enhanced_kyc">Enhanced KYC</option>
          <option value="doc_verification">Document Verification</option>
        </select>

        <button onClick={handleClick}>
          {ButtonLabel}
        </button>
      </p>
    </>
  );
};

export default WebIntegration;
