package stringss;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class StreamReader {
	public static void main(String args[]) throws IOException {
		FileReader f = new FileReader("filelocation");
		BufferedReader b = new BufferedReader(f);

		int i;
		while ((i = b.read()) != -1) {
			System.out.println((char) i);
		}
		b.close();
		f.close();

		// BufferedReader in JDK7 Example
		try (BufferedReader c = new BufferedReader(new FileReader("filename"))) {
			String s;
			while ((s = c.readLine()) != null) {
				System.out.println(s);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

		// Reading Data From Console By InputStreamReader And BufferedReader in Java
		InputStreamReader j = new InputStreamReader(System.in);
		BufferedReader d = new BufferedReader(j);
		System.out.println("Enter Course");
		String course = d.readLine();
		System.out.println("Edureka" + course);

		// Reading Data From Console Until User Writes Stop
		InputStreamReader k = new InputStreamReader(System.in);
		BufferedReader e = new BufferedReader(k);
		course = "";
		while (!course.equals("stop")) {
			System.out.println("enter course:");
			course = e.readLine();
			System.out.println("Course is:" + course);
		}
		e.close();
		k.close();

	}
}
