---
title: "Apple Pay behaviors"
date: "2020-03-04"
---

Payment Sheet 组成模块：CARD, SHIPPING, METHOD, CONTACT, SUMMARY, FINGERPRINT

CONTACT 部分的变动不会触发任何回调

### ApplePayErrorContactField

| 触发模块 | phoneNumber | emailAddress | name | phoneticName | postalAddress | addressLines(stree) | locality | subLocality | postalCode | administrativeArea | subAdministrativeArea | country | countryCode |
| -------- | ----------- | ------------ | ---- | ------------ | ------------- | ------------------- | -------- | ----------- | ---------- | ------------------ | --------------------- | ------- | ----------- |
| SHIPPING |             |              | ✅   | ✅           |               | ✅                  | ✅       | ✅          | ✅         | ✅                 | ✅                    | ✅      | ✅          |
| CONTACT  | ✅          | ✅           |      |              | ✅            |                     |          |             |            |                    |                       |         |             |

### 各个模块切换选择时的行为

| 模块        | 监听回调函数              | 回调函数 30s 内需执行的完成函数  |
| ----------- | ------------------------- | -------------------------------- |
| CARD        | onpaymentmethodselected   | completePaymentMethodSelection   |
| SHIPPING    | onshippingcontactselected | completeShippingContactSelection |
| METHOD      | onshippingmethodselected  | completeShippingMethodSelection  |
| CONTACT     | -                         |                                  |
| SUMMARY     | -                         |                                  |
| FINGERPRINT | onpaymentauthorized       | completePayment                  |

###  完成函数带错误更新时的模块的报错信息

| complete 系列函数                | Error codeField ( / separate)                           | FINGERPRINT              | PAYMENT | METHOD | CONTACT | SHIPPING                                                                                                              | 错误小弹窗及内容                                                    |
| -------------------------------- | ------------------------------------------------------- | ------------------------ | ------- | ------ | ------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| completeShippingContactSelection | addressUnserviceable / shippingContactInvalid / unknown | Shipping Address Invalid | -       | -      | -       | SHIPPING UNAVAILABLE, address unserviceable / SHIPPING ADDRESS INVALID, {message} / {selected whole shipping address} | Y, {label} does not allow delivery to your shipping address / N / N |

### onpaymentauthorized 错误实例表现

| STATUS                                 | Error & codeField      | contactField | FINGERPRINT                | PAYMENT | METHOD | CONTACT                                                 | SHINPPING(postalAddress exists)                | Cancel transaction directly | Small Popup & Content | Payment Done |
| -------------------------------------- | ---------------------- | ------------ | -------------------------- | ------- | ------ | ------------------------------------------------------- | ---------------------------------------------- | --------------------------- | --------------------- | ------------ |
| STATUS_SUCCESS                         | N Error Object         | N            | -                          | -       | -      | -                                                       | -                                              | N                           | N                     | Y            |
| STATUS_SUCCESS                         | Y                      | Y            | Try Again                  | -       | -      | -                                                       | -                                              | N                           | N                     | N            |
| STATUS_FAILURE                         | N                      | N            | Payment Not Completed      | -       | -      | -                                                       | -                                              | Y                           | N                     | N            |
| STATUS_FAILURE                         | shippingContactInvalid | Y            | Shipping Address Invalid   | -       | -      | -                                                       | SHIPPING ADDRESS INVALID, {message}            | N                           | N                     | N            |
| STATUS_FAILURE                         | shippingContactInvalid | N            | Verify Contact Information | -       | -      | VERIFY CONTACT INFORMATION, invalid contact information | -                                              | N                           | N                     | N            |
| STATUS_FAILURE                         | addressUnserviceable   | N            | Shipping Unavailable       | -       | -      | -                                                       | SHIPPING UNAVAILABLE, Address not supported    | N                           | Y                     | N            |
| STATUS_FAILURE                         | addressUnserviceable   | Y            | Shipping Address Invalid   | -       | -      | -                                                       | SHIPPING ADDRESS INVALID, {message}            | N                           | Y                     | N            |
| STATUS_FAILURE                         | unknown                | N            | Try Again                  | -       | -      | -                                                       | -                                              | N                           | N                     | N            |
| STATUS_FAILURE                         | unknown                | Y            | Try Again                  | -       | -      | -                                                       | -                                              | N                           | N                     | N            |
| STATUS_INVALID_SHIPPING_CONTACT        | shippingContactInvalid | Y            | Verify Contact Information |         |        | VERIFY CONTACT INFORMATION, invalid contact information | - SHIPPING ADDRESS INVALID, {message}          | N                           | N                     | N            |
| STATUS_INVALID_SHIPPING_CONTACT        | shippingContactInvalid | N            | Verify Contact Information |         |        | VERIFY CONTACT INFORMATION, invalid contact information | -                                              | N                           | N                     | N            |
| STATUS_INVALID_SHIPPING_CONTACT        | addressUnserviceable   | Y            | Verify Contact Information |         |        | VERIFY CONTACT INFORMATION, invalid contact information | - SHIPPING UNAVAILABLE , {message}             | N                           | Y                     | N            |
| STATUS_INVALID_SHIPPING_CONTACT        | addressUnserviceable   | N            | Verify Contact Information |         |        | VERIFY CONTACT INFORMATION, invalid contact information | - SHIPPING UNAVAILABLE , Address not supported | N                           | Y                     | N            |
| STATUS_INVALID_SHIPPING_CONTACT        | unknown                | Y            | Verify Contact Information |         |        | VERIFY CONTACT INFORMATION, invalid contact information | -                                              | N                           | N                     | N            |
| STATUS_INVALID_SHIPPING_CONTACT        | unknown                | N            | Verify Contact Information |         |        | VERIFY CONTACT INFORMATION, invalid contact information | -                                              | N                           | N                     | N            |
| STATUS_INVALID_SHIPPING_POSTAL_ADDRESS | shippingContactInvalid | Y            | Shipping Address Invalid   | -       | -      | -                                                       | SHIPPING ADDRESS INVALID, invalid address      | N                           | N                     | N            |
| STATUS_INVALID_SHIPPING_POSTAL_ADDRESS | shippingContactInvalid | N            | Shipping Address Invalid   | -       | -      | VERIFY CONTACT INFORMATION, invalid contact information | SHIPPING ADDRESS INVALID, invalid address      | N                           | N                     | N            |
| STATUS_INVALID_SHIPPING_POSTAL_ADDRESS | addressUnserviceable   | Y            | Shipping Address Invalid   | -       | -      | -                                                       | SHIPPING ADDRESS INVALID, invalid address      | N                           | Y                     | N            |
| STATUS_INVALID_SHIPPING_POSTAL_ADDRESS | addressUnserviceable   | N            | Shipping Address Invalid   | -       | -      | -                                                       | SHIPPING ADDRESS INVALID, invalid address      | N                           | Y                     | N            |
| STATUS_INVALID_SHIPPING_POSTAL_ADDRESS | unknown                | Y            | Shipping Address Invalid   | -       | -      | -                                                       | SHIPPING ADDRESS INVALID, invalid address      | N                           | N                     | N            |
| STATUS_INVALID_SHIPPING_POSTAL_ADDRESS | unknown                | N            | Shipping Address Invalid   | -       | -      | -                                                       | SHIPPING ADDRESS INVALID, invalid address      | N                           | N                     | N            |
