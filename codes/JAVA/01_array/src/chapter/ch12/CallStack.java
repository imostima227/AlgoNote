package chapter.ch12;

public class CallStack {
    public static void methodA() {
        System.out.println("in methodA");
        try {
            methodB();
        }
        catch (Exception e) {
            System.out.println(e);
        }
        System.out.println("end methodA");
    }

    public static void methodB() {
        System.out.println("in methodB");
        methodC();
        System.out.println("end methodB");
    }

    public static void methodC() {
        System.out.println("in methodC");
        int i = 10 / 0;
        System.out.println(i);
        System.out.println("end methodC");
    }

    public static void main(String[] args) {
        System.out.println("in methodMain");
        methodA();
        System.out.println("end methodMain");
    }
}
