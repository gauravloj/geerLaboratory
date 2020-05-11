package samplePrograms.core.threading;

public class MultiThreading {

	// Implementation of runnable
	class MyThread implements Runnable {
		String name;
		Thread t;

		MyThread(String threadname) {
			name = threadname;
			t = new Thread(this, name);
			System.out.println("New thread: " + t);
			t.start();
		}

		public void run() {
			try {
				for (int i = 5; i > 0; i--) {
					System.out.println(name + ": " + i);
					Thread.sleep(1000);
				}
			} catch (InterruptedException e) {
				System.out.println(name + "Interrupted");
			}
			System.out.println(name + " exiting.");
		}
	}

	public static void main(String args[]) {
		MultiThreading mt = new MultiThreading();

		// Runnable Threads example
		mt.new MyThread("One");
		mt.new MyThread("Two");
		mt.new MyThread("Three");
		try {
			Thread.sleep(10000);
		} catch (InterruptedException e) {
			System.out.println("Main thread Interrupted");
		}
		System.out.println("Main thread exiting.");

	}
}
