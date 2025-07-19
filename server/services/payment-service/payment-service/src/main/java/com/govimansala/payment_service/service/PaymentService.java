package com.govimansala.payment_service.service;

import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.UUID;

@Service
public class PaymentService {

    private final String MERCHANT_ID = "4OVxzQlcRlY4JFnJVFQBZF3LK"; // replace with actual
    private final String RETURN_URL = "http://localhost:8080/api/payhere/return";
    private final String CANCEL_URL = "http://localhost:8080/api/payhere/cancel";
    private final String NOTIFY_URL = "http://localhost:8080/api/payhere/notify";

    public String generatePaymentForm(Map<String, String> requestData) {
        String orderId = UUID.randomUUID().toString();

        String htmlForm = "<form method='post' action='https://sandbox.payhere.lk/pay/checkout' id='payhereForm'>" +
                "<input type='hidden' name='merchant_id' value='" + MERCHANT_ID + "'>" +
                "<input type='hidden' name='return_url' value='" + RETURN_URL + "'>" +
                "<input type='hidden' name='cancel_url' value='" + CANCEL_URL + "'>" +
                "<input type='hidden' name='notify_url' value='" + NOTIFY_URL + "'>" +
                "<input type='hidden' name='order_id' value='" + orderId + "'>" +
                "<input type='hidden' name='items' value='Govimansala Order'>" +
                "<input type='hidden' name='amount' value='" + requestData.get("amount") + "'>" +
                "<input type='hidden' name='first_name' value='" + requestData.get("first_name") + "'>" +
                "<input type='hidden' name='last_name' value='" + requestData.get("last_name") + "'>" +
                "<input type='hidden' name='email' value='" + requestData.get("email") + "'>" +
                "<input type='hidden' name='phone' value='" + requestData.get("phone") + "'>" +
                "<input type='hidden' name='address' value='" + requestData.get("address") + "'>" +
                "<input type='hidden' name='city' value='" + requestData.get("city") + "'>" +
                "<script>document.getElementById('payhereForm').submit();</script>" +
                "</form>";

        return "data:text/html," + URLEncoder.encode(htmlForm, StandardCharsets.UTF_8);
    }
}
