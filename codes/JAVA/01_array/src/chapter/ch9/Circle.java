package chapter.ch9;

public class Circle {
    private double radius;
    public Circle(double radius) {
        this.radius = radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }

    public double getRadius() {
        return this.radius;
    }

    public double getArea() {
        return Math.PI * radius * radius;
    }
}
