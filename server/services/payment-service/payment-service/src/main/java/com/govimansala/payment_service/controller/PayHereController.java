package com.govimansala.payment_service.controller;

import com.govimansala.payment_service.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/payhere")
public class PayHereController {

    private final PaymentService paymentService;

    public PayHereController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create-payment")
    public ResponseEntity<Map<String, String>> createPayment(@RequestBody Map<String, String> requestData) {
        String paymentUrl = paymentService.generatePaymentForm(requestData);
        Map<String, String> result = new HashMap<>();
        result.put("payment_url", paymentUrl);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/notify")
    public ResponseEntity<String> notify(@RequestParam Map<String, String> params) {
        System.out.println("🔔 IPN Notification Received: " + params);
        return ResponseEntity.ok("Received");
    }

    @GetMapping("/return")
    public String returnUrl() {
        return "<h2>✅ Payment successful!</h2>";
    }

    @GetMapping("/cancel")
    public String cancelUrl() {
        return "<h2>❌ Payment cancelled.</h2>";
    }
}
