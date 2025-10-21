package com.govimansala.payment_service.controller;

import com.govimansala.payment_service.model.Payment;
import com.govimansala.payment_service.repository.PaymentRepository;
import com.govimansala.payment_service.service.PaymentService;
import com.govimansala.payment_service.utils.PayHereUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payhere")
public class PayHereController {

    private final PaymentService paymentService;
    private final PaymentRepository paymentRepository;

    public PayHereController(PaymentService paymentService, PaymentRepository paymentRepository) {
        this.paymentService = paymentService;
        this.paymentRepository = paymentRepository;
    }

    @PostMapping("/create-payment")
    public ResponseEntity<Map<String, String>> createPayment(@RequestBody Map<String, String> requestData) {
        String paymentUrl = paymentService.generatePaymentForm(requestData);
        return ResponseEntity.ok(Map.of("payment_url", paymentUrl));
    }

    @PostMapping("/notify")
    public ResponseEntity<String> notify(@RequestParam Map<String, String> params) {
        System.out.println("🔔 IPN Notification Received: " + params);

        boolean success = PayHereUtils.verifyMd5Signature(params);
        paymentService.updatePaymentStatus(params.get("order_id"), success);

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

    @GetMapping("/summary")
    public ResponseEntity<List<Payment>> getAllPayments() {
        return ResponseEntity.ok(paymentRepository.findAll());
    }

    @GetMapping("/summary/status/{status}")
    public ResponseEntity<List<Payment>> getPaymentsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(paymentRepository.findByStatus(status.toUpperCase()));
    }
}
