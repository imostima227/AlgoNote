public class Test {
    public static void main(String[] args) {
        System.out.println(generateRandomChar());
    }

    public static char generateRandomChar() {
        return (char)('a' + Math.random() * 26);
    }
}
