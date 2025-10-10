import chapter.ch9.Circle;

public class Test {
    public static void main(String[] args) {
        Circle c1 = new Circle(1);
        Circle c2 = new Circle(25);
        Circle c3 = new Circle(125);
        System.out.println(c1.getRadius() + "," + c2.getRadius());
        System.out.println(c3.getRadius() + "," + c3.getArea());
        c2.setRadius(100);
        System.out.println(c2.getRadius() + "," + c2.getArea());
    }

    public static char generateRandomChar() {
        return (char)('a' + Math.random() * 26);
    }
}

