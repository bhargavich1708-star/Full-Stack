package com.example.calculator.dto;

public class SquareResponse {
    private double side;
    private double area;

    public SquareResponse(double side, double area) {
        this.side = side;
        this.area = area;
    }

    public double getSide() {
        return side;
    }

    public void setSide(double side) {
        this.side = side;
    }

    public double getArea() {
        return area;
    }

    public void setArea(double area) {
        this.area = area;
    }
}
