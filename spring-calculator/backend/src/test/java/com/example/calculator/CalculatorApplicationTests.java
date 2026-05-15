package com.example.calculator;

import com.example.calculator.dto.SquareRequest;
import com.example.calculator.dto.SquareResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class CalculatorApplicationTests {

	@Autowired
	private TestRestTemplate restTemplate;

	@Test
	void testCalculateArea() {
		SquareRequest request = new SquareRequest();
		request.setSide(10.0);

		ResponseEntity<SquareResponse> response = restTemplate.postForEntity("/api/calculator/square", request, SquareResponse.class);

		assertThat(response.getStatusCodeValue()).isEqualTo(200);
		assertThat(response.getBody()).isNotNull();
		assertThat(response.getBody().getArea()).isEqualTo(100.0);
		assertThat(response.getBody().getSide()).isEqualTo(10.0);
	}

}
