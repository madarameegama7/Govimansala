package com.govimansala.payment_service.utils;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Map;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

public class PayHereUtils {

    private static final String MERCHANT_ID = "1230183";
    private static final String MERCHANT_SECRET = "MTMyNjg4MjE4NjI0OTYwOTkzNjIxMTE2OTQ2NDUyMTA2NTg2NDY0NQ==";

    public static String buildPayHereForm(Long orderId, BigDecimal amount, String currency, String email) {
        String hashInput = MERCHANT_ID + orderId + amount.setScale(2, RoundingMode.HALF_UP) + currency + md5Upper(MERCHANT_SECRET);
        String hash = md5Upper(hashInput);

        return "<html><body onload='document.forms[0].submit()'>"
                + "<form action='https://sandbox.payhere.lk/pay/checkout' method='post'>"
                + "<input type='hidden' name='merchant_id' value='" + MERCHANT_ID + "'/>"
                + "<input type='hidden' name='return_url' value='http://localhost:8080/payments/return'/>"
                + "<input type='hidden' name='cancel_url' value='http://localhost:8080/payments/cancel'/>"
                + "<input type='hidden' name='notify_url' value='http://localhost:8081/payments/notify'/>"
                + "<input type='hidden' name='order_id' value='" + orderId + "'/>"
                + "<input type='hidden' name='items' value='Order #" + orderId + "'/>"
                + "<input type='hidden' name='currency' value='" + currency + "'/>"
                + "<input type='hidden' name='amount' value='" + amount + "'/>"
                + "<input type='hidden' name='hash' value='" + hash + "'/>"
                + "</form></body></html>";
    }

    public static boolean verifyMd5Signature(Map<String, String> params) {
        String merchantId = params.get("merchant_id");
        String orderId = params.get("order_id");
        String amount = params.get("payhere_amount");
        String currency = params.get("payhere_currency");
        String statusCode = params.get("status_code");
        String receivedMd5 = params.get("md5sig");

        String localMd5 = md5Upper(merchantId + orderId + amount + currency + statusCode + md5Upper(MERCHANT_SECRET));

        return localMd5.equals(receivedMd5) && "2".equals(statusCode);
    }

    private static String md5Upper(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] digest = md.digest(input.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : digest) sb.append(String.format("%02x", b));
            return sb.toString().toUpperCase();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
