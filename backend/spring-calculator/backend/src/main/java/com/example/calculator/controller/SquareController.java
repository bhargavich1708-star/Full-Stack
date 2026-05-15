package com.example.calculator.controller;

import com.example.calculator.dto.SquareRequest;
import com.example.calculator.dto.SquareResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calculator")
public class SquareController {

    @PostMapping("/square")
    public SquareResponse calculateSquareArea(@RequestBody SquareRequest request) {
        double side = request.getSide();
        double area = side * side;
        return new SquareResponse(side, area);
    }
}
