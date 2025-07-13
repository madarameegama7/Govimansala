package com.govimansala.payment_service.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payhere")
public class TestController {

    @GetMapping("/test")
    public String test() {
        return "✅ Spring Boot backend is working!";
    }
}
