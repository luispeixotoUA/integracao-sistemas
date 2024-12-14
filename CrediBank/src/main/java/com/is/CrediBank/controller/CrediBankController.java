package com.is.CrediBank.controller;

import com.is.CrediBank.model.CheckResponse;
import com.is.CrediBank.service.CrediBankService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CrediBankController {

    private static final Logger logger = LoggerFactory.getLogger(CrediBankController.class);

    private final CrediBankService crediBankService;

    public CrediBankController(CrediBankService crediBankService) {
        this.crediBankService = crediBankService;
    }

    @GetMapping("/get-check")
    public CheckResponse getCheck(@RequestParam String accountId, @RequestParam int value) {
        logger.info("Pedido mock recebido: accountId={} valor={}", accountId, value);
        CheckResponse response = crediBankService.getDigitalCheckMock(accountId, value);
        logger.info("Resposta mock devolvida: {}", response);
        return response;
    }

    @GetMapping("/api/get-check")
    public CheckResponse getRealCheck(@RequestParam String accountId, @RequestParam int value) {
        logger.info("Pedido real recebido: accountId={} valor={}", accountId, value);
        try {
            CheckResponse response = crediBankService.getDigitalCheckReal(accountId, value);
            logger.info("Resposta real obtida com sucesso: {}", response);
            return response;
        } catch (Exception e) {
            logger.error("Erro ao processar o pedido real: {}", e.getMessage(), e);
            throw new RuntimeException("Erro ao processar o pedido real.", e);
        }
    }


}