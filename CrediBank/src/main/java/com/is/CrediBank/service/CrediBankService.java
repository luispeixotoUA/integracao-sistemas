package com.is.CrediBank.service;

import com.is.CrediBank.model.CheckResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;

@Service
public class CrediBankService {

    private static final Logger logger = LoggerFactory.getLogger(CrediBankService.class);

    private final RestTemplate restTemplate;

    public CrediBankService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public CheckResponse getDigitalCheckReal(String accountId, int value) {
        validateInput(accountId, value);

        String url = String.format(
                "https://credibank.intsis.utad.pt:8080/check/%s/ammount/%d/",
                accountId, value
        );

        logger.info("A realizar o pedido real ao endpoint: {}", url);

        try {
            CheckResponse response = restTemplate.getForObject(url, CheckResponse.class);
            logger.info("Resposta obtida do endpoint real: {}", response);
            return response;
        } catch (Exception e) {
            logger.error("Erro ao obter resposta do endpoint real: {}", e.getMessage());
            throw new RuntimeException("Erro ao processar o pedido real.", e);
        }
    }

    public CheckResponse getDigitalCheckMock(String accountId, int value) {
        validateInput(accountId, value);

        logger.info("A gerar resposta mock para accountId={} e valor={}", accountId, value);

        // Data e hora atual
        String agora = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);

        // Número aleatório de 16 dígitos
        String checkID = String.format("%016d", new Random().nextLong() & Long.MAX_VALUE);

        // Criar resposta mock
        CheckResponse respostaMock = new CheckResponse();
        respostaMock.setDate(agora); // Set da data/hora gerada
        respostaMock.setCheckID(checkID); // Set do checkID aleatório

        logger.info("Resposta mock gerada: {}", respostaMock);

        return respostaMock; // Return da resposta mock
    }

    private void validateInput(String accountId, int value) {
        logger.info("A validar input: accountId={} valor={}", accountId, value);

        if (accountId == null || accountId.length() != 16 || !accountId.matches("\\d+")) {
            logger.error("O ID da conta é inválido: {}", accountId);
            throw new IllegalArgumentException("O ID da conta deve ter exatamente 16 dígitos numéricos.");
        }
        if (value <= 0) {
            logger.error("O valor é inválido: {}", value);
            throw new IllegalArgumentException("O valor deve ser maior que 0.");
        }

        logger.info("Input validado com sucesso.");
    }
}