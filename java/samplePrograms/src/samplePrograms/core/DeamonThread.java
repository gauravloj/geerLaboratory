package samplePrograms.core;

public class DeamonThread extends Thread {

	// Java program to demonstrate the usage of
	// setDaemon() and isDaemon() method.
	public DeamonThread(String name) {
		super(name);
	}

	public void run() {
		// Checking whether the thread is Daemon or not
		if (Thread.currentThread().isDaemon()) {
			System.out.println(getName() + " is Daemon thread");
		}

		else {
			System.out.println(getName() + " is User thread");
		}
	}

	public static void main(String[] args)

	{

		DeamonThread thread1 = new DeamonThread("thread1");
		DeamonThread thread2 = new DeamonThread("thread2");
		DeamonThread thread3 = new DeamonThread("thread3");

		// Setting user thread thread1 to Daemon
		thread1.setDaemon(true);

		// starting first 2 threads
		thread1.start();
		thread2.start();

		// Setting user thread thread3 to Daemon
		thread3.setDaemon(true);
		thread3.start();
	}
}