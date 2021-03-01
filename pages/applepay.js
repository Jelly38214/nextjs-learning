import React, { useCallback, useEffect, useState } from "react";

const ApplyPayComponent = () => {
  const [applePayAvailabel, setApplePayAvailabel] = useState(false);

  useEffect(() => {
    if (window.ApplePaySession) {
      // const merchantIdentifier = 'merchant.com.iherb.iherb.webtest'
      // window.ApplePaySession.canMakePaymentsWithActiveCard(merchantIdentifier).then((canMakePayments) => {
      //   if (canMakePayments) {
      //     setApplePayAvailabel(canMakePayments)
      //   }
      // })
      setApplePayAvailabel(true);
    }
  }, []);

  const createApplyPaySession = useCallback(() => {
    const shippingMethods = [
      {
        ID: 141,
        name: "Expedited",
        totalCost: "$6.99",
        flagFree: false,
        isDDU: false,
        isSelected: true,
        flagErrorMsg: false,
        errorMsg: [],
        logoUrl: "https://s3.images-iherb.com/static/i/ss/UPS-Grd.gif",
        description: "",
        flagFreeShipping: false,
        freeShippingName: null,
        flagDutyAndTaxNotInclude: false,
        flagDutyAndTaxInclude: false,
        flagPriceFree: false,
        flagPrice: true,
        price: "$6.99",
        flagDeliveryTime: true,
        deliveryTime: "Feb 27 - Mar 03",
        flagCostLabel: false,
        flagPrepaidLabel: false,
        flagTaxLabel: false,
        taxLabel: "Tax",
        flagTaxCollected: false,
        flagCostFree: false,
        flagCost: false,
        cost: "$6.99",
        flagCustomDutyTotal: false,
        customDutyTotal: "",
        flagTaxTotal: false,
        taxTotal: "$1.54",
        flagCustomDuty: false,
        customDuty: "$0.00",
        flagSpecialNote: false,
        specialNote: null
      },
      {
        ID: 7,
        name: "PO BOX or APO Address",
        totalCost: "$8.10",
        flagFree: false,
        isDDU: false,
        isSelected: false,
        flagErrorMsg: false,
        errorMsg: [],
        logoUrl: "https://s3.images-iherb.com/static/i/ss/USPS-Pri.gif",
        description:
          ' <span class="free-shipping">Free shipping for orders over $20.00 in the contiguous U.S.!</span>\n<span class="additional-info">Orders of $80 or less, max 6 lbs., APO takes up to 4 weeks</span>',
        flagFreeShipping: false,
        freeShippingName: null,
        flagDutyAndTaxNotInclude: false,
        flagDutyAndTaxInclude: false,
        flagPriceFree: false,
        flagPrice: true,
        price: "$8.10",
        flagDeliveryTime: true,
        deliveryTime: "Mar 02 - Mar 25",
        flagCostLabel: false,
        flagPrepaidLabel: false,
        flagTaxLabel: false,
        taxLabel: "Tax",
        flagTaxCollected: false,
        flagCostFree: false,
        flagCost: false,
        cost: "$8.10",
        flagCustomDutyTotal: false,
        customDutyTotal: "",
        flagTaxTotal: false,
        taxTotal: "$1.54",
        flagCustomDuty: false,
        customDuty: "$0.00",
        flagSpecialNote: false,
        specialNote: null
      },
      {
        ID: 67,
        name: "Two Day",
        totalCost: "$13.76",
        flagFree: false,
        isDDU: false,
        isSelected: false,
        flagErrorMsg: false,
        errorMsg: [],
        logoUrl: "https://s3.images-iherb.com/static/i/ss/UPS-Int.gif",
        description: '<span class="additional-info">No Po Box or APO</span>',
        flagFreeShipping: false,
        freeShippingName: null,
        flagDutyAndTaxNotInclude: false,
        flagDutyAndTaxInclude: false,
        flagPriceFree: false,
        flagPrice: true,
        price: "$13.76",
        flagDeliveryTime: true,
        deliveryTime: "Mar 02",
        flagCostLabel: false,
        flagPrepaidLabel: false,
        flagTaxLabel: false,
        taxLabel: "Tax",
        flagTaxCollected: false,
        flagCostFree: false,
        flagCost: false,
        cost: "$13.76",
        flagCustomDutyTotal: false,
        customDutyTotal: "",
        flagTaxTotal: false,
        taxTotal: "$1.54",
        flagCustomDuty: false,
        customDuty: "$0.00",
        flagSpecialNote: false,
        specialNote: null
      },
      {
        ID: 15,
        name: "Next Day",
        totalCost: "$17.32",
        flagFree: false,
        isDDU: false,
        isSelected: false,
        flagErrorMsg: false,
        errorMsg: [],
        logoUrl: "https://s3.images-iherb.com/static/i/ss/UPS-Int.gif",
        description: '<span class="additional-info">No Po Box or APO</span>',
        flagFreeShipping: false,
        freeShippingName: null,
        flagDutyAndTaxNotInclude: false,
        flagDutyAndTaxInclude: false,
        flagPriceFree: false,
        flagPrice: true,
        price: "$17.32",
        flagDeliveryTime: true,
        deliveryTime: "Feb 27",
        flagCostLabel: false,
        flagPrepaidLabel: false,
        flagTaxLabel: false,
        taxLabel: "Tax",
        flagTaxCollected: false,
        flagCostFree: false,
        flagCost: false,
        cost: "$17.32",
        flagCustomDutyTotal: false,
        customDutyTotal: "",
        flagTaxTotal: false,
        taxTotal: "$1.54",
        flagCustomDuty: false,
        customDuty: "$0.00",
        flagSpecialNote: false,
        specialNote: null
      }
    ];
    const transformedShippingMethods = shippingMethods.map((method) => ({
      label: method.name,
      amount: method.totalCost.replace("$", ""),
      detail: method.deliveryTime,
      identifier: `${method.ID}`
    }));

    const ApplePayPaymentRequest = {
      countryCode: "US",
      currencyCode: "USD",
      supportedNetworks: ["visa", "masterCard", "amex", "discover"],
      merchantCapabilities: ["supports3DS", "supportsDebit", "supportsCredit"],
      shippingMethods: transformedShippingMethods,
      shippingType: "shipping",
      // requiredBillingContactFields: ['postalAddress', 'name', 'phone', 'email'],
      requiredShippingContactFields: [
        // "name"
        "phone"
        // "email",
        // "postalAddress"
      ],
      total: {
        label: "iHerb LLC.",
        amount: "1",
        type: "final"
      }
    };

    const appleSession = new window.ApplePaySession(3, ApplePayPaymentRequest);

    /**
     * Add Event Handler
     */
    appleSession.onvalidatemerchant = function onvalidatemerchant(event) {
      const validateURL = event.validationURL;
      // Send Request To server for validation
      fetch(
        "https://cors.sinchang.workers.dev/?https://checkout.iherb.com/pro/getApplePaySession",
        {
          method: "POST",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            url: validateURL,
            domain: "checkout.iherb.com"
          })
        }
      )
        .then((res) => res.json())
        .then((merchantSession) => {
          appleSession.completeMerchantValidation(merchantSession);
        })
        .catch(() => appleSession.completeMerchantValidation({}));
    };

    appleSession.onshippingcontactselected = function onshippingcontactselected(
      event
    ) {
      const shippingContact = event.shippingContact;
      console.log("ShippingContact Selected:");
      console.table(shippingContact);

      // Use country & zipcode to check if the shipping country is supportd
      const countryCode = shippingContact.countryCode;
      const zipCode = shippingContact.postalCode;

      console.log(countryCode, zipCode);

      const error = new window.ApplePayError(
        "addressUnserviceable", // code
        "country", // contactField
        "Not Supported" // message
      );

      // const update: ApplePayJS.ApplePayShippingContactUpdate = {
      //   newTotal: {
      //     amount: `${Math.floor(Math.random() * 100)}`,
      //     label: 'iHerb LLC.',
      //     type: 'final',
      //   },
      //   newShippingMethods: transformedShippingMethods,
      // }

      const update = {
        // errors: [error],
        newShippingMethods: transformedShippingMethods,
        newTotal: {
          amount: `${Math.floor(Math.random() * 100)}`,
          label: "iHerb LLC.",
          type: "final"
        }
      };

      if (Math.floor(Math.random() * 10) > 4) {
        update["errors"] = [error];
      }

      try {
        appleSession.completeShippingContactSelection(update);
      } catch (error) {
        console.error(error);
      }
    };

    appleSession.onshippingmethodselected = function onshippingmethodselected(
      event
    ) {
      const shippingMethod = event.shippingMethod;
      console.log("ShippingMethod Selected:");
      console.table(shippingMethod);

      const update = {
        newTotal: {
          amount: `${Math.floor(Math.random() * 100)}`,
          label: "iHerb LLC.",
          type: "final"
        }
      };
      appleSession.completeShippingMethodSelection(update);
    };

    appleSession.onpaymentmethodselected = function onpaymentmethodselected(
      event
    ) {
      const paymentMethod = event.paymentMethod;
      console.log("paymentMethod Selected:");
      console.table(paymentMethod);

      const update = {
        newTotal: {
          amount: `${Math.floor(Math.random() * 100)}`,
          label: "iHerb LLC.",
          type: "final"
        }
      };

      appleSession.completePaymentMethodSelection(update);
    };

    appleSession.onpaymentauthorized = async function onpaymentauthorized(
      event
    ) {
      alert("Start Payment.");
      const applePayment = event.payment;
      console.log(JSON.stringify(applePayment, null, 2));
      // const applePaymentToken: ApplePayJS.ApplePayPaymentToken = applePayment.token // it should be send to backend for payment.

      const errorItem = new window.ApplePayError(
        "addressUnserviceable",
        "phone",
        "Wrong Phone Number"
      );
      const result = {
        // status: window.ApplePaySession.STATUS_SUCCESS
        // status: window.ApplePaySession.STATUS_INVALID_SHIPPING_CONTACT,
        status: window.ApplePaySession.STATUS_FAILURE,
        errors: [errorItem]
      };

      appleSession.completePayment(result);
    };

    appleSession.oncancel = function oncancel() {
      alert("Payment Canceled.");
    };

    appleSession.abort = function abort() {
      alert("Payment aborted.");
    };

    appleSession.begin();
  }, []);

  return (
    <div>
      <div
        onClick={createApplyPaySession}
        className="apple-pay-button apply-pay-button-black"
      ></div>
      <style jsx>{`
        .apple-pay-button {
          cursor: pointer;
          display: inline-block;
          -webkit-appearance: -apple-pay-button;
          -apple-pay-button-type: Buy; /* Use any supported button type. */
        }
        .apple-pay-button-black {
          -apple-pay-button-style: black;
        }
        .apple-pay-button-white {
          -apple-pay-button-style: white;
        }
        .apple-pay-button-white-with-line {
          -apple-pay-button-style: white-outline;
        }
      `}</style>
    </div>
  );
};

export default ApplyPayComponent;
