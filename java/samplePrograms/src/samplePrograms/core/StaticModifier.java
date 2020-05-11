package samplePrograms.core;

public class StaticModifier {
	// static variable
	static int j = 10;
	static int n;

	// static variable
	static int k = nit();

	// static variable
	static int l = 100;

	// instance variable
	int o = 200;

	// static method
	static void a() {
		// a = 200;
		System.out.println("Print from a");

		// Cannot make a static reference to the non-static field b
		// o = 100; // compilation error

		// Cannot make a static reference to the
		// non-static method a2() from the type StaticModifier
		// a2(); // compilation error

		// Cannot use super in a static context
		// System.out.println(super.l); // compiler error
	}

	// instance method
	void a2() {
		System.out.println("Inside a2");
	}

	// static block
	static {
		System.out.println("Static block initialized.");
		n = j * 8;
	}

	// Static Class
	private static String str = "Edureka";

	// Static class
	static class MyNestedClass {
		// non-static method
		public void disp() {
			System.out.println(str);
		}
	}

	/*
	 * Methods declared as static can have the following restrictions: 1. They can
	 * directly call other static methods only. 2. They can access static data
	 * directly.
	 * 
	 */
	// static method
	static int nit() {
		System.out.println("from n ");
		return 20;
	}

	public static void main(String[] args) {
		System.out.println("Inside main method");
		System.out.println("Value of j : " + j);
		System.out.println("Value of n : " + n);
		System.out.println("Value of j : " + k);
		
		StaticModifier.MyNestedClass obj = new StaticModifier.MyNestedClass();
		obj.disp();

	}

}
